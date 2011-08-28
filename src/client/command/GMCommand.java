package client.command;

import client.IItem;
import client.ISkill;
import client.Item;
import client.MapleCharacter;
import client.MapleClient;
import client.MapleInventoryType;
import client.MapleJob;
import client.MaplePet;
import client.MapleStat;
import client.SkillFactory;
import constants.ItemConstants;
import java.io.File;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import net.server.Channel;
import net.server.Server;
import provider.MapleData;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;
import scripting.npc.NPCScriptManager;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.MapleShopFactory;
import server.TimerManager;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.life.MapleNPC;
import server.maps.MapleMap;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import tools.DatabaseConnection;
import tools.MaplePacketCreator;
import tools.Pair;

/**
 * GMCommand
 * Manages all of our normal-level GM Commands.
 * @author Doctor
 */
public class GMCommand {
    
    public static boolean execute(MapleClient c, String[] sub) {
        MapleCharacter player = c.getPlayer();
        Channel cserv = c.getChannelServer();
        Server srv = Server.getInstance();
        if (sub[0].equals("allgms") || sub[0].equals("allgms")) {
            String message = joinStringFrom(sub, 1);
            for (Channel ch : srv.getChannelsFromWorld(player.getWorld())) {
                for (MapleCharacter gms : ch.getPlayerStorage().getAllCharacters()) {
                    if (gms.isGM()) {
                        gms.message("GMChat: [" + c.getPlayer().getName() + "] " + message);
                    }
                }
            }
        } else if (sub[0].equals("ap")) {
            player.setRemainingAp(Integer.parseInt(sub[1]));
        } else if (sub[0].equals("buffme")) {
            final int[] array = {9001000, 9101002, 9101003, 9101008, 2001002, 1101007, 1005, 2301003, 5121009, 1111002, 4111001, 4111002, 4211003, 4211005, 1321000, 2321004, 3121002};
            for (int i : array) {
                SkillFactory.getSkill(i).getEffect(SkillFactory.getSkill(i).getMaxLevel()).applyTo(player);
            }
	} else if (sub[0].equals("ban")) {
            if (sub.length < 2) {
                player.message("Syntax: !ban player length duration reason");
            } else if (player.gmLevel() < 2) {
                player.message("Only administrators or moderators can ban. Forward this request.");
            } else {
                MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
                if (victim.ban(joinStringFrom(sub, 2))) {
                    player.message(victim.getName() + " has been banned. Be sure to log this.");
                } else {
                    player.message("Something went wrong.");
                }
            }
        } else if (sub[0].equals("bomb")) {
            if (sub.length == 1) {
                MapleMonster mob = MapleLifeFactory.getMonster(9300166);
                player.getMap().spawnMonsterOnGroudBelow(mob, player.getPosition());
            } else {
                if (sub[1].equals("map")) {
                    for (MapleCharacter chr : player.getMap().getCharacters()) {
                        chr.getMap().spawnMonsterOnGroudBelow(MapleLifeFactory.getMonster(9300166), chr.getPosition());
                    }
                } else {
                    MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
                    MapleMonster mob = MapleLifeFactory.getMonster(9300166);
                    victim.getMap().spawnMonsterOnGroundBelow(mob, victim.getPosition());
                }
            }
        } else if (sub[0].equals("checklottery")) {
            int amount = player.getCurrentLotteryAmount();
            String newAmount = "";
            if (amount > 999999999)
		newAmount = (amount / 1000000000) + "B";
            else if (amount > 999999)
		newAmount = (amount / 1000000) + "M";
            else if (amount > 999)
		newAmount = (amount / 1000) + "K";
            else
                newAmount = Integer.toString(amount);
            player.message("The current lottery amount is " + newAmount + " mesos = " + (amount / 1000) + " NX.");
        } else if (sub[0].equals("cleardrops")) {
            player.getMap().clearDrops(player);
        } else if (sub[0].equals("dc")) {
            MapleCharacter chr = c.getWorldServer().getPlayerStorage().getCharacterByName(sub[1]);
            if (player.gmLevel() > chr.gmLevel()) {
                chr.getClient().disconnect();
            }
        } else if (sub[0].equals("dispose")) {
            NPCScriptManager.getInstance().dispose(c);
            c.getSession().write(MaplePacketCreator.enableActions());
        } else if (sub[0].equals("droprate")) {
            c.getWorldServer().setDropRate((byte) (Byte.parseByte(sub[1]) % 128));
            cserv.broadcastPacket(MaplePacketCreator.serverNotice(6, "The Drop Rate has been changed to " + Integer.parseInt(sub[1]) + "x."));
            for (MapleCharacter mc : c.getWorldServer().getPlayerStorage().getAllCharacters()) {
                mc.setRates();
            }
        } else if (sub[0].equals("drawlottery")) {
            MapleCharacter winner = c.getWorldServer().getPlayerStorage().getCharacterById(player.getLotteryWinner());
            winner.giftNX(player.getCurrentLotteryAmount() / 1000);
            String message = "[Lottery] " + winner.getName() + " has just won " + (player.getCurrentLotteryAmount() / 1000) + " NX Cash by winning the lottery! Congratulations!";
            Server.getInstance().broadcastMessage(player.getWorld(), MaplePacketCreator.serverNotice(5, message));
            player.resetLottery();
        } else if (sub[0].equals("exprate")) {
            c.getWorldServer().setExpRate((byte) (Byte.parseByte(sub[1]) % 128));
            cserv.broadcastPacket(MaplePacketCreator.serverNotice(6, "The EXP Rate has been changed to " + Integer.parseInt(sub[1]) + "x."));
            for (MapleCharacter mc : c.getWorldServer().getPlayerStorage().getAllCharacters()) {
                mc.setRates();
            }
        } else if (sub[0].equals("fame")) {
            MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
            victim.setFame(Integer.parseInt(sub[2]));
            victim.updateSingleStat(MapleStat.FAME, victim.getFame());
        } else if (sub[0].equals("freeze")) {
            MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
            victim.disableMovement();
            player.message(victim.getName() + " has been frozen.");
            victim.dropMessage(1, "You have been frozen by " + player.getName());
        } else if (sub[0].equals("giftnx")) {
            cserv.getPlayerStorage().getCharacterByName(sub[1]).getCashShop().gainCash(1, Integer.parseInt(sub[2]));
            player.message("Done");
        } else if (sub[0].equals("gmshop")) {
            MapleShopFactory.getInstance().getShop(1337).sendShop(c);
        } else if (sub[0].equals("gmtext")) {
            if (sub.length == 0) {
                player.message("Usage: !gmtext normal/whitebg/blue/pink/yellow/orange/purple/green");
                return true;
            }
            sub[1] = sub[1].toLowerCase();
            if (sub[1].equals("normal")) {
                player.setGMText(0);
            } else if (sub[1].equals("whitebg")) {
                player.setGMText(1);
            } else if (sub[1].equals("blue")) {
                player.setGMText(2);
            } else if (sub[1].equals("pink")) {
                player.setGMText(3);
            } else if (sub[1].equals("yellow")) {
                player.setGMText(4);
            } else if (sub[1].equals("orange")) {
                player.setGMText(5);
            } else if (sub[1].equals("purple")) {
                player.setGMText(6);
            } else if (sub[1].equals("green")) {
                player.setGMText(7);
            } else {
                player.message("Usage: !gmtext normal/whitebg/blue/pink/yellow/orange/purple/green");
                return true;
            }
            try {
                PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE characters SET gmtext = ? WHERE id = ?");
                ps.setInt(1, player.getGMText());
                ps.setInt(2, player.getId());
                ps.executeUpdate();
                ps.close();
            } catch (Exception e) {}
        } else if (sub[0].equals("goto")) {
            // change our 1st argument to lower to simplify things
            sub[1] = sub[1].toLowerCase();
            // moved the gigantic hashmap to MapleMap and set it to static so we aren't
            // creating it every time a command is issued
            if (MapleMap.MapList.containsKey(sub[1])) {
                MapleMap map = cserv.getMapFactory().getMap(MapleMap.MapList.get(sub[1]));
                player.changeMap(map, map.getPortal(0));
            } else {
                player.message("That map doesn't exist. You can find the map list with !maps.");
            }
        } else if (sub[0].equals("heal")) {
            if (sub.length == 2) {
                if (sub[1].equals("map")) {
                    for (MapleCharacter chr : player.getMap().getCharacters()) {
                        chr.setHpMp(30000);
                        chr.message("The map has been healed by " + player.getName());
                    }
                } else {
                    cserv.getPlayerStorage().getCharacterByName(sub[1]).setHpMp(30000);
                    cserv.getPlayerStorage().getCharacterByName(sub[1]).message("You have been healed by " + player.getName());
                }
            } else {
                player.setHpMp(30000);
            }
        } else if (sub[0].equals("hp")) {
            player.setMaxHp(Integer.parseInt(sub[0]));
            player.updateSingleStat(MapleStat.MAXHP, Integer.parseInt(sub[0]));
        } else if (sub[0].equals("mp")) {
            player.setMaxMp(Integer.parseInt(sub[1]));
            player.updateSingleStat(MapleStat.MAXMP, Integer.parseInt(sub[1]));
        } else if (sub[0].equals("item") || sub[0].equals("drop")) {
            int itemId = Integer.parseInt(sub[1]);
            short quantity = 1;
            try {
                quantity = Short.parseShort(sub[2]);
            } catch (Exception e) {
            }
            if (sub[0].equals("item")) {
                int petid = -1;
                if (ItemConstants.isPet(itemId)) {
                    petid = MaplePet.createPet(itemId);
                }
                MapleInventoryManipulator.addById(c, itemId, quantity, player.getName(), petid, -1);
            } else {
                IItem toDrop;
                if (MapleItemInformationProvider.getInstance().getInventoryType(itemId) == MapleInventoryType.EQUIP) {
                    toDrop = MapleItemInformationProvider.getInstance().getEquipById(itemId);
                } else {
                    toDrop = new Item(itemId, (byte) 0, quantity);
                }
                c.getPlayer().getMap().spawnItemDrop(c.getPlayer(), c.getPlayer(), toDrop, c.getPlayer().getPosition(), true, true);
            }
        } else if (sub[0].equals("jail")) {
            MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
            MapleMap jail = cserv.getMapFactory().getMap(980000404);
            victim.setPlayerVariable("jail", victim.getMapId()+"");
            victim.changeMap(jail);
            victim.message("You've been jailed by " + player.getName() + ".");
        } else if (sub[0].equals("job")) {
            MapleJob[] jobs = MapleJob.values();
            for (int i = 0; i < jobs.length; i++) {
                if (sub[1].toUpperCase().equals(jobs[i].toString())) {
                    player.changeJob(jobs[i]);
                    player.equipChanged();
                }
            }
            try {
                player.changeJob(MapleJob.getById(Integer.parseInt(sub[1])));
                player.equipChanged();
            } catch (java.lang.NumberFormatException job) {}
        } else if (sub[0].equals("jobperson")) {
            if (c.getPlayer().gmLevel() < 2) {
                player.message("You need to be an admin for this silly.");
                return false;
            }
            MapleCharacter victim = c.getChannelServer().getPlayerStorage().getCharacterByName(sub[1]);
            MapleJob[] jobs = MapleJob.values();
            for (int i = 0; i < jobs.length; i++) {
                if (sub[1].toUpperCase().equals(jobs[i].toString())) {
                    victim.changeJob(jobs[i]);
                    victim.equipChanged();
                }
            }
            try {
                victim.changeJob(MapleJob.getById(Integer.parseInt(sub[2])));
                victim.equipChanged();
            } catch (java.lang.NumberFormatException job) {}
        } else if (sub[0].equals("kill")) {
            if (sub[1].equals("map")) {
                for (MapleCharacter chr : player.getMap().getCharacters()) {
                    if (chr != player) {
                        chr.setHpMp(0);
                        chr.message("The map has been killed by " + player.getName());
                    }
                }
            } else {
                cserv.getPlayerStorage().getCharacterByName(sub[1]).setHpMp(0);
                cserv.getPlayerStorage().getCharacterByName(sub[1]).message("You have been killed by " + player.getName());
            }
        } else if (sub[0].equals("killall")) {
            List<MapleMapObject> monsters = player.getMap().getMapObjectsInRange(player.getPosition(), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.MONSTER));
            MapleMap map = player.getMap();
            for (MapleMapObject monstermo : monsters) {
                MapleMonster monster = (MapleMonster) monstermo;
                map.killMonster(monster, player, true);
                monster.giveExpToCharacter(player, monster.getExp() * c.getPlayer().getExpRate(), true, 1);
            }
            player.dropMessage("Killed " + monsters.size() + " monsters.");
        } else if (sub[0].equals("level")) {
            player.setLevel(Integer.parseInt(sub[1]));
            player.gainExp(-player.getExp(), false, false);
            player.updateSingleStat(MapleStat.LEVEL, player.getLevel());
        } else if (sub[0].equals("levelperson")) {
            MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
            victim.setLevel(Integer.parseInt(sub[2]));
            victim.gainExp(-victim.getExp(), false, false);
            victim.updateSingleStat(MapleStat.LEVEL, victim.getLevel());
        } else if (sub[0].equals("maps")) {
            c.announce(MaplePacketCreator.getNPCTalk(9010000, (byte) 0, "!goto Maps\r\n" + 
            MapleMap.MapTextList, "00 00", (byte) 0));
        } else if (sub[0].equals("maxstat")) {
            // workaround here for !setall ~ Doctor
            final String[] s = {"setall", String.valueOf(Short.MAX_VALUE)};
            execute(c, s);
            player.setLevel(255);
            player.setFame(13337);
            player.setMaxHp(30000);
            player.setMaxMp(30000);
            player.updateSingleStat(MapleStat.LEVEL, 255);
            player.updateSingleStat(MapleStat.FAME, 13337);
			player.updateSingleStat(MapleStat.MAXHP, 30000);
            player.updateSingleStat(MapleStat.MAXMP, 30000);
        } else if (sub[0].equals("maxskills")) {
            for (MapleData skill_ : MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/" + "String.wz")).getData("Skill.img").getChildren()) {
                try {
                    ISkill skill = SkillFactory.getSkill(Integer.parseInt(skill_.getName()));
                    player.changeSkillLevel(skill, (byte) skill.getMaxLevel(), skill.getMaxLevel(), -1);
                } catch (NumberFormatException nfe) {
                    break;
                } catch (NullPointerException npe) {
                    continue;
                }
            }
        } else if (sub[0].equals("mesoperson")) {
            cserv.getPlayerStorage().getCharacterByName(sub[1]).gainMeso(Integer.parseInt(sub[2]), true);
        } else if (sub[0].equals("meso")) {
            player.gainMeso(Integer.parseInt(sub[1]), true);
        } else if (sub[0].equals("notice")) {
            if (sub[1].equals("p")) {
                Server.getInstance().broadcastMessage(player.getWorld(), MaplePacketCreator.serverNotice(1, joinStringFrom(sub, 2)));
            } else if (sub[1].equalsIgnoreCase("n")) {
                Server.getInstance().broadcastMessage(player.getWorld(), MaplePacketCreator.serverNotice(0, joinStringFrom(sub, 2)));
            } else if (sub[1].equalsIgnoreCase("r")) {
                Server.getInstance().broadcastMessage(player.getWorld(), MaplePacketCreator.serverNotice(5, joinStringFrom(sub, 2)));
            } else if (sub[1].equalsIgnoreCase("b")) {
                Server.getInstance().broadcastMessage(player.getWorld(), MaplePacketCreator.serverNotice(6, joinStringFrom(sub, 2)));
            } else {
                Server.getInstance().broadcastMessage(player.getWorld(), MaplePacketCreator.serverNotice(6, "[Notice] " + joinStringFrom(sub, 1)));
            }
        } else if (sub[0].equals("online")) {
            for (Channel ch : srv.getChannelsFromWorld(player.getWorld())) {
                String s = "Characters online (Channel " + ch.getId() + " Online: " + ch.getPlayerStorage().getAllCharacters().size() + ") : ";
                if (ch.getPlayerStorage().getAllCharacters().size() < 50) {
                    for (MapleCharacter chr : ch.getPlayerStorage().getAllCharacters()) {
                        s += MapleCharacter.makeMapleReadable(chr.getName()) + ", ";
                    }
                    player.dropMessage(s.substring(0, s.length() - 2));
                }
            }
        } else if (sub[0].equals("pap")) {
            player.getMap().spawnMonsterOnGroudBelow(MapleLifeFactory.getMonster(8500001), player.getPosition());
        } else if (sub[0].equals("pianus")) {
            player.getMap().spawnMonsterOnGroudBelow(MapleLifeFactory.getMonster(8510000), player.getPosition());
        } else if (sub[0].equals("pmob")) {
            int npcId = Integer.parseInt(sub[1]);
            int mobTime = Integer.parseInt(sub[2]);
            int xpos = player.getPosition().x;
            int ypos = player.getPosition().y;
            int fh = player.getMap().getFootholds().findBelow(player.getPosition()).getId();
            if (sub[2] == null) {
                mobTime = 0;
            }
            MapleMonster mob = MapleLifeFactory.getMonster(npcId);
            if (mob != null && !mob.getName().equals("MISSINGNO")) {
                mob.setPosition(player.getPosition());
                mob.setCy(ypos);
                mob.setRx0(xpos + 50);
                mob.setRx1(xpos - 50);
                mob.setFh(fh);
                try {
                    PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO spawns ( idd, f, fh, cy, rx0, rx1, type, x, y, mid, mobtime ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )");
                    ps.setInt(1, npcId);
                    ps.setInt(2, 0);
                    ps.setInt(3, fh);
                    ps.setInt(4, ypos);
                    ps.setInt(5, xpos + 50);
                    ps.setInt(6, xpos - 50);
                    ps.setString(7, "m");
                    ps.setInt(8, xpos);
                    ps.setInt(9, ypos);
                    ps.setInt(10, player.getMapId());
                    ps.setInt(11, mobTime);
                    ps.executeUpdate();
                } catch (SQLException e) {
                    player.dropMessage("Failed to save MOB to the database");
                }
                player.getMap().addMonsterSpawn(mob, mobTime, 0);
            } else {
                player.dropMessage("You have entered an invalid Mob-Id");
            }
        } else if (sub[0].equals("pnpc")) {
            int npcId = Integer.parseInt(sub[1]);
            MapleNPC npc = MapleLifeFactory.getNPC(npcId);
            int xpos = player.getPosition().x;
            int ypos = player.getPosition().y;
            int fh = player.getMap().getFootholds().findBelow(player.getPosition()).getId();
            if (npc != null && !npc.getName().equals("MISSINGNO")) {
                npc.setPosition(player.getPosition());
                npc.setCy(ypos);
                npc.setRx0(xpos + 50);
                npc.setRx1(xpos - 50);
                npc.setFh(fh);
                npc.setCustom(true);
                try {
                    PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO spawns ( idd, f, fh, cy, rx0, rx1, type, x, y, mid ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )");
                    ps.setInt(1, npcId);
                    ps.setInt(2, 0);
                    ps.setInt(3, fh);
                    ps.setInt(4, ypos);
                    ps.setInt(5, xpos + 50);
                    ps.setInt(6, xpos - 50);
                    ps.setString(7, "n");
                    ps.setInt(8, xpos);
                    ps.setInt(9, ypos);
                    ps.setInt(10, player.getMapId());
                    ps.executeUpdate();
                } catch (SQLException e) {
                    player.dropMessage("Failed to save NPC to the database");
                }
                player.getMap().addMapObject(npc);
                player.getMap().broadcastMessage(MaplePacketCreator.spawnNPC(npc));
            } else {
                player.dropMessage("You have entered an invalid Npc-Id");
            }
        } else if (sub[0].equals("reloadshops")) {
            try {
                player.message("Attempting to reload all shops. This may take awhile...");
                MapleShopFactory.getInstance().reloadShops();
                player.message("Completed.");
            } catch (Exception re) {
                player.message("RemoteException occurred while attempting to reload shops.");
                System.out.println("RemoteException occurred while attempting to reload shops: " + re);
            }
        } else if (sub[0].equals("saveall")) {
            if (player.gmLevel() < 2) {
                player.message("You need to be an admin.");
            }
            for (MapleCharacter chr : cserv.getPlayerStorage().getAllCharacters()) {
                player.message("Saving...");
                chr.saveToDB(true);
                player.message("Everyone's saved!");
            }
        } else if (sub[0].equals("savemap")) {
            for (MapleCharacter chr : player.getMap().getCharacters()) {
                player.message("Saving...");
                chr.saveToDB(true);
                player.message("Everyone's saved!");
            }
        } else if (sub[0].equals("search") || sub[0].equals("lookup")) {
            StringBuilder sb = new StringBuilder();
            sub[1] = sub[1].toLowerCase();
            if (sub.length > 2) {
                String search = joinStringFrom(sub, 2);
                MapleData data = null;
                MapleDataProvider dataProvider = MapleDataProviderFactory.getDataProvider(new File("wz/String.wz"));
                if (!sub[1].equals("item")) {
                    if (sub[1].equals("npc")) {
                        data = dataProvider.getData("Npc.img");
                    } else if (sub[1].equals("mob") || sub[1].equals("monster")) {
                        data = dataProvider.getData("Mob.img");
                    } else if (sub[1].equals("skill")) {
                        data = dataProvider.getData("Skill.img");
                    } else if (sub[1].equals("map")) {
                        sb.append("#bUse the !maps command to find a map.");
                    } else {
                        sb.append("#bInvalid search.\r\nSyntax: '!search [type] [name]', where [type] is NPC, ITEM, MOB, or SKILL.");
                    }
                    if (data != null) {
                        String name;
                        player.message("Searching...");
                        int i = 0;
                        for (MapleData searchData : data.getChildren()) {
                            name = MapleDataTool.getString(searchData.getChildByPath("name"), "NO-NAME");
                            if (name.toLowerCase().contains(search.toLowerCase())) {
                                if (!sub[1].equals("mob") && !sub[1].equals("monster")) {
                                    sb.append("#b").append(Integer.parseInt(searchData.getName())).append("#k - #r").append(name).append("\r\n");
                                } else {
                                    sb.append("#L").append(i).append("##b").append(Integer.parseInt(searchData.getName())).append("#k").append(i).append(" - #r").append(name).append("#l\r\n");
                                    i++;
                                }
                            }
                        }
                    }
                } else {
                    int i = 0;
                    for (Pair<Integer, String> itemPair : MapleItemInformationProvider.getInstance().getAllItems()) {
                        if (sb.length() < 32654) {//ohlol
                            if (itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
                                //#v").append(id).append("# #k- 
                                sb.append("#L").append(i).append("##b").append(itemPair.getLeft()).append("#k").append(i).append(" - #r").append(itemPair.getRight()).append("#l\r\n");
                                i++;
                            }
                        } else {
                            sb.append("#bCouldn't load all items, there are too many results.");
                            break;
                        }
                    }
                }
            } else {
                sb.append("#bInvalid search.\r\nSyntax: '!search [type] [name]', where [type] is NPC, ITEM, MOB, or SKILL.");
            }
            if (sb.length() == 0) {
                c.announce(MaplePacketCreator.getNPCTalk(9010000, (byte) 0, ("#bNo " + sub[1].toLowerCase() + "s found.#k"), "00 00", (byte) 0));
            } else if (!sub[1].equals("mob") && !sub[1].equals("monster") && !sub[1].equals("item")) {
                c.announce(MaplePacketCreator.getNPCTalk(9010000, (byte) 0, sb.toString(), "00 00", (byte) 0));
            } else {
                c.getPlayer().setPlayerVariable("search_list", sb.toString());
                c.getPlayer().setPlayerVariable("search_type", sub[1].toLowerCase());
                NPCScriptManager.getInstance().dispose(c);
                NPCScriptManager.getInstance().start(c, 9010000, null, null);
            }
        } else if (sub[0].equals("setall")) {
            final int x = Short.parseShort(sub[1]);
            player.setStr(x);
            player.setDex(x);
            player.setInt(x);
            player.setLuk(x);
            player.updateSingleStat(MapleStat.STR, x);
            player.updateSingleStat(MapleStat.DEX, x);
            player.updateSingleStat(MapleStat.INT, x);
            player.updateSingleStat(MapleStat.LUK, x);
        } else if (sub[0].equals("shutdown") || sub[0].equals("shutdownnow")) {
            if (c.getPlayer().gmLevel() < 2) {
                player.message("You need to be an owner to do this silly.");
                return false;
            }
            int time = 60000;
            if (sub[0].equals("shutdownnow")) {
                time = 1;
            } else if (sub.length > 1) {
                time *= Integer.parseInt(sub[1]);
            }
            Server.getInstance().broadcastMessage(player.getWorld(), MaplePacketCreator.serverNotice(6, "[Notice] The server will be shut down in " + (time/60000) + " minute" + ((time/60000) == 1 ? "" : "s") + ". Please log off safely."));
            TimerManager.getInstance().schedule(Server.getInstance().shutdown(false), time);
        } else if (sub[0].equals("smega")) {
            if (sub.length == 0) {
                player.message("Usage: !smega [love/cloud/diablo] text");
                return true;
            }
            String[] lines = {"", "", "", ""};
            String text = joinStringFrom(sub, 2);
            int item = 0;
            if (sub[1].equals("love")) {
                item = 5390002;
            } else if (sub[1].equals("cloud")) {
                item = 5390001;
            } else if (sub[1].equals("diablo")) {
                item = 5390000;
            } else {
                player.message("Usage: !smega [love/cloud/diablo] text");
            }
            if (text.length() > 30) {
                lines[0] = text.substring(0, 10);
                lines[1] = text.substring(10, 20);
                lines[2] = text.substring(20, 30);
                lines[3] = text.substring(30);
            } else if (text.length() > 20) {
                lines[0] = text.substring(0, 10);
                lines[1] = text.substring(10, 20);
                lines[2] = text.substring(20);
            } else if (text.length() > 10) {
                lines[0] = text.substring(0, 10);
                lines[1] = text.substring(10);
            } else if (text.length() <= 10) {
                lines[0] = text;
            }
            LinkedList<String> list = new LinkedList<String>();
            list.add(lines[0]);
            list.add(lines[1]);
            list.add(lines[2]);
            list.add(lines[3]);
            Server.getInstance().broadcastMessage(player.getWorld(), MaplePacketCreator.getAvatarMega(player, "", c.getChannel(), item, list, true));
        } else if (sub[0].equals("smegap")) {
            if (player.gmLevel() < 2) {
                player.message("You need to be an admin to do this.");
                return false;
            }
            if (sub.length == 0) {
                player.message("Usage: !smegap [love/cloud/diablo] player text");
                return true;
            }
            String[] lines = {"", "", "", ""};
            String text = joinStringFrom(sub, 3);
            int item = 0;
            if (sub[1].equals("love")) {
                item = 5390002;
            } else if (sub[1].equals("cloud")) {
                item = 5390001;
            } else if (sub[1].equals("diablo")) {
                item = 5390000;
            } else {
                player.message("Usage: !smega [love/cloud/diablo] text");
            }
            if (text.length() > 30) {
                lines[0] = text.substring(0, 10);
                lines[1] = text.substring(10, 20);
                lines[2] = text.substring(20, 30);
                lines[3] = text.substring(30);
            } else if (text.length() > 20) {
                lines[0] = text.substring(0, 10);
                lines[1] = text.substring(10, 20);
                lines[2] = text.substring(20);
            } else if (text.length() > 10) {
                lines[0] = text.substring(0, 10);
                lines[1] = text.substring(10);
            } else if (text.length() <= 10) {
                lines[0] = text;
            }
            LinkedList<String> list = new LinkedList<String>();
            list.add(lines[0]);
            list.add(lines[1]);
            list.add(lines[2]);
            list.add(lines[3]);
            MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(sub[2]);
            Server.getInstance().broadcastMessage(player.getWorld(), MaplePacketCreator.getAvatarMega(victim, "", c.getChannel(), item, list, true));
        } else if (sub[0].equals("sp")) { 
            player.setRemainingSp(Integer.parseInt(sub[1]));
            player.updateSingleStat(MapleStat.AVAILABLESP, player.getRemainingSp());
        } else if (sub[0].equals("spawn")) {
            if (sub.length > 2) {
                for (int i = 0; i < Integer.parseInt(sub[2]); i++) {
                    player.getMap().spawnMonsterOnGroudBelow(MapleLifeFactory.getMonster(Integer.parseInt(sub[1])), player.getPosition());
	        }
	    } else {
                player.getMap().spawnMonsterOnGroudBelow(MapleLifeFactory.getMonster(Integer.parseInt(sub[1])), player.getPosition());
	    }
        } else if (sub[0].equals("strip")) {
            if (player.gmLevel() == 2) {
                cserv.getPlayerStorage().getCharacterByName(sub[1]).unequipAll(player);
            } else {
                player.message("You need to be an admin or a mod for this.");
            }
        } else if (sub[0].equals("suicide")) {
            player.setHpMp(0);
        } else if (sub[0].equals("unban")) {
            cserv.getPlayerStorage().getCharacterByName(sub[1]).unban();
            player.message(sub[1] + " has been unbanned.");
        } else if (sub[0].equals("unfreeze")) {
            MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
            victim.enableMovement();
            player.message(sub[1] + " has been unfrozen.");
            victim.dropMessage(1, "You've been unfrozen by " + player.getName());
        } else if (sub[0].equals("unjail")) {
            MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
            if (victim.getPlayerVariable("jail") != null) {
                MapleMap unjail = cserv.getMapFactory().getMap(Integer.parseInt(victim.getPlayerVariable("jail")));
                victim.changeMap(unjail);
                victim.deletePlayerVariable("jail");
                victim.message("You've been unjailed by " + player.getName() + ". Please follow the rules.");
            } else {
                player.message(sub[1] + " is not currently jailed.");
            }
        } else if (sub[0].equals("warpto")) {
            MapleCharacter warpUser = cserv.getPlayerStorage().getCharacterByName(sub[1]);
            MapleMap map = warpUser.getMap();
            player.changeMap(map, map.findClosestSpawnpoint(warpUser.getPosition()));
        } else if (sub[0].equals("warphere")) {
            MapleCharacter warpUser = cserv.getPlayerStorage().getCharacterByName(sub[1]);
            warpUser.message("You're being warped to " + player.getName() + ".");
            MapleMap map = player.getMap();
            warpUser.changeMap(map, map.findClosestSpawnpoint(player.getPosition()));
        } else if (sub[0].equals("whereami")) {
            player.message(player.getMapId() + " - " + player.getMap().getMapName());
        } else {
            return false;
        }
        return true;
    }
    
    private static String joinStringFrom(String arr[], int start) {
        StringBuilder builder = new StringBuilder();
        for (int i = start; i < arr.length; i++) {
            builder.append(arr[i]);
            if (i != arr.length - 1) {
                builder.append(" ");
            }
        }
        return builder.toString();
    }
}
