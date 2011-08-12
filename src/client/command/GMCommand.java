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
import java.util.Arrays;
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
        if (sub[0].equalsIgnoreCase("allgms")) {
            String message = joinStringFrom(sub, 1);
            for (Channel ch : srv.getChannelsFromWorld(player.getWorld())) {
                for (MapleCharacter gms : ch.getPlayerStorage().getAllCharacters()) {
                    if (gms.isGM()) {
                        gms.message("GMChat: [" + c.getPlayer().getName() + "] " + message);
                    }
                }
            }
        } else if (sub[0].equalsIgnoreCase("ap")) {
            player.setRemainingAp(Integer.parseInt(sub[1]));
        } else if (sub[0].equalsIgnoreCase("buffme")) {
            final int[] array = {9001000, 9101002, 9101003, 9101008, 2001002, 1101007, 1005, 2301003, 5121009, 1111002, 4111001, 4111002, 4211003, 4211005, 1321000, 2321004, 3121002};
            for (int i : array) {
                SkillFactory.getSkill(i).getEffect(SkillFactory.getSkill(i).getMaxLevel()).applyTo(player);
            }
	} else if (sub[0].equalsIgnoreCase("ban")) {
            try {
                PreparedStatement p = DatabaseConnection.getConnection().prepareStatement("UPDATE accounts SET banned = 1 WHERE id = " + MapleCharacter.getIdByName(sub[1]));
                p.executeUpdate();
                p.close();
            } catch (Exception e) {
                player.message("Failed to ban " + sub[1]);
                return true;
            }
            player.message("Banned " + sub[1]);
        } else if (sub[0].equalsIgnoreCase("bomb")) {
            if (sub.length == 1) {
                MapleMonster mob = MapleLifeFactory.getMonster(9300166);
                player.getMap().spawnMonsterOnGroudBelow(mob, player.getPosition());
            } else {
                if (sub[1].equals("map")) {
                    for (MapleCharacter chr : player.getMap().getCharacters()) {
                        player.getMap().spawnMonsterOnGroudBelow(MapleLifeFactory.getMonster(9300166), chr.getPosition());
                    }
                } else {
                    MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
                    MapleMonster mob = MapleLifeFactory.getMonster(9300166);
                    victim.getMap().spawnMonsterOnGroundBelow(mob, victim.getPosition());
                }
            }
        } else if (sub[0].equalsIgnoreCase("cleardrops")) {
            player.getMap().clearDrops(player);
        } else if (sub[0].equalsIgnoreCase("dc")) {
            MapleCharacter chr = c.getWorldServer().getPlayerStorage().getCharacterByName(sub[1]);
            if (player.gmLevel() > chr.gmLevel()) {
                chr.getClient().disconnect();
            }
        } else if (sub[0].equalsIgnoreCase("dispose")) {
            NPCScriptManager.getInstance().dispose(c);
            c.getSession().write(MaplePacketCreator.enableActions());
        } else if (sub[0].equalsIgnoreCase("exprate")) {
            c.getWorldServer().setExpRate((byte) (Byte.parseByte(sub[1]) % 128));
            cserv.broadcastPacket(MaplePacketCreator.serverNotice(6, "The EXP Rate has been changed to " + Integer.parseInt(sub[1]) + "x."));
            for (MapleCharacter mc : c.getWorldServer().getPlayerStorage().getAllCharacters()) {
                mc.setRates();
            }
        } else if (sub[0].equalsIgnoreCase("fame")) {
            MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
            victim.setFame(Integer.parseInt(sub[2]));
            victim.updateSingleStat(MapleStat.FAME, victim.getFame());
        } else if (sub[0].equalsIgnoreCase("giftnx")) {
            cserv.getPlayerStorage().getCharacterByName(sub[1]).getCashShop().gainCash(1, Integer.parseInt(sub[2]));
            player.message("Done");
        } else if (sub[0].equalsIgnoreCase("gmshop")) {
            MapleShopFactory.getInstance().getShop(1337).sendShop(c);
        } else if (sub[0].equalsIgnoreCase("heal")) {
            player.setHpMp(30000);
        } else if (sub[0].equalsIgnoreCase("hp")) {
            player.setMaxHp(Integer.parseInt(sub[0]));
            player.updateSingleStat(MapleStat.MAXHP, Integer.parseInt(sub[0]));
        } else if (sub[0].equalsIgnoreCase("mp")) {
            player.setMaxMp(Integer.parseInt(sub[1]));
            player.updateSingleStat(MapleStat.MAXMP, Integer.parseInt(sub[1]));
        } else if (sub[0].equalsIgnoreCase("item") || sub[0].equalsIgnoreCase("drop")) {
            int itemId = Integer.parseInt(sub[1]);
            short quantity = 1;
            try {
                quantity = Short.parseShort(sub[2]);
            } catch (Exception e) {
            }
            if (sub[0].equalsIgnoreCase("item")) {
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
        } else if (sub[0].equalsIgnoreCase("job")) {
            player.changeJob(MapleJob.getById(Integer.parseInt(sub[1])));
            player.equipChanged();
        } else if (sub[0].equalsIgnoreCase("jobperson")) {
            if (c.gmLevel() < 2) {
                player.message("You need to be an admin for this silly.");
                return false;
            }
            MapleCharacter victim = c.getChannelServer().getPlayerStorage().getCharacterByName(sub[1]);
            victim.changeJob(MapleJob.getById(Integer.parseInt(sub[2])));
            player.equipChanged();
        } else if (sub[0].equalsIgnoreCase("kill")) {
            cserv.getPlayerStorage().getCharacterByName(sub[1]).setHpMp(0);
            cserv.getPlayerStorage().getCharacterByName(sub[1]).updateSingleStat(MapleStat.HP, 0);
        } else if (sub[0].equalsIgnoreCase("killall")) {
            List<MapleMapObject> monsters = player.getMap().getMapObjectsInRange(player.getPosition(), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.MONSTER));
            MapleMap map = player.getMap();
            for (MapleMapObject monstermo : monsters) {
                MapleMonster monster = (MapleMonster) monstermo;
                map.killMonster(monster, player, true);
                monster.giveExpToCharacter(player, monster.getExp() * c.getPlayer().getExpRate(), true, 1);
            }
            player.dropMessage("Killed " + monsters.size() + " monsters.");
        } else if (sub[0].equalsIgnoreCase("level")) {
            player.setLevel(Integer.parseInt(sub[1]));
            player.gainExp(-player.getExp(), false, false);
            player.updateSingleStat(MapleStat.LEVEL, player.getLevel());
        } else if (sub[0].equalsIgnoreCase("levelperson")) {
            MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
            victim.setLevel(Integer.parseInt(sub[2]));
            victim.gainExp(-victim.getExp(), false, false);
            victim.updateSingleStat(MapleStat.LEVEL, victim.getLevel());
        } else if (sub[0].equalsIgnoreCase("maxstat")) {
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
        } else if (sub[0].equalsIgnoreCase("maxskills")) {
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
        } else if (sub[0].equalsIgnoreCase("mesoperson")) {
            cserv.getPlayerStorage().getCharacterByName(sub[1]).gainMeso(Integer.parseInt(sub[2]), true);
        } else if (sub[0].equalsIgnoreCase("meso")) {
            player.gainMeso(Integer.parseInt(sub[1]), true);
        } else if (sub[0].equalsIgnoreCase("exprate")) {
            c.getWorldServer().setMesoRate((byte) (Byte.parseByte(sub[1]) % 128));
            cserv.broadcastPacket(MaplePacketCreator.serverNotice(6, "The Meso Rate has been changed to " + Integer.parseInt(sub[1]) + "x."));
            for (MapleCharacter mc : c.getWorldServer().getPlayerStorage().getAllCharacters()) {
                mc.setRates();
            }
        } else if (sub[0].equalsIgnoreCase("notice")) {
            if (sub[1].equalsIgnoreCase("p")) {
                Server.getInstance().broadcastMessage(player.getWorld(), MaplePacketCreator.serverNotice(1, joinStringFrom(sub, 2)));
            } else if (sub[1].equalsIgnoreCase("n")) {
                Server.getInstance().broadcastMessage(player.getWorld(), MaplePacketCreator.serverNotice(0, joinStringFrom(sub, 2)));
            } else if (sub[1].equalsIgnoreCase("m")) {
                Server.getInstance().broadcastMessage(player.getWorld(), MaplePacketCreator.serverNotice(2, joinStringFrom(sub, 2)));
            } else if (sub[1].equalsIgnoreCase("s")) {
                Server.getInstance().broadcastMessage(player.getWorld(), MaplePacketCreator.serverNotice(3, joinStringFrom(sub, 2)));
            } else if (sub[1].equalsIgnoreCase("r")) {
                Server.getInstance().broadcastMessage(player.getWorld(), MaplePacketCreator.serverNotice(5, joinStringFrom(sub, 2)));
            } else if (sub[1].equalsIgnoreCase("b")) {
                Server.getInstance().broadcastMessage(player.getWorld(), MaplePacketCreator.serverNotice(6, joinStringFrom(sub, 2)));
            } else {
                Server.getInstance().broadcastMessage(player.getWorld(), MaplePacketCreator.serverNotice(6, "[Notice] " + joinStringFrom(sub, 1)));
            }
        } else if (sub[0].equalsIgnoreCase("online")) {
            for (Channel ch : srv.getChannelsFromWorld(player.getWorld())) {
                String s = "Characters online (Channel " + ch.getId() + " Online: " + ch.getPlayerStorage().getAllCharacters().size() + ") : ";
                if (ch.getPlayerStorage().getAllCharacters().size() < 50) {
                    for (MapleCharacter chr : ch.getPlayerStorage().getAllCharacters()) {
                        s += MapleCharacter.makeMapleReadable(chr.getName()) + ", ";
                    }
                    player.dropMessage(s.substring(0, s.length() - 2));
                }
            }
        } else if (sub[0].equalsIgnoreCase("search") || sub[0].equalsIgnoreCase("lookup")) {
            StringBuilder sb = new StringBuilder();
            if (sub.length > 2) {
                String search = joinStringFrom(sub, 2);
                MapleData data = null;
                MapleDataProvider dataProvider = MapleDataProviderFactory.getDataProvider(new File("wz/String.wz"));
                if (!sub[1].equalsIgnoreCase("ITEM")) {
                    if (sub[1].equalsIgnoreCase("NPC")) {
                        data = dataProvider.getData("Npc.img");
                    } else if (sub[1].equalsIgnoreCase("MOB") || sub[1].equalsIgnoreCase("MONSTER")) {
                        data = dataProvider.getData("Mob.img");
                    } else if (sub[1].equalsIgnoreCase("SKILL")) {
                        data = dataProvider.getData("Skill.img");
                    } else if (sub[1].equalsIgnoreCase("MAP")) {
                        sb.append("#bUse the '/m' command to find a map. If it finds a map with the same name, it will warp you to it.");
                    } else {
                        sb.append("#bInvalid search.\r\nSyntax: '/search [type] [name]', where [type] is NPC, ITEM, MOB, or SKILL.");
                    }
                    if (data != null) {
                        String name;
                        for (MapleData searchData : data.getChildren()) {
                            name = MapleDataTool.getString(searchData.getChildByPath("name"), "NO-NAME");
                            if (name.toLowerCase().contains(search.toLowerCase())) {
                                sb.append("#b").append(Integer.parseInt(searchData.getName())).append("#k - #r").append(name).append("\r\n");
                            }
                        }
                    }
                } else {
                    for (Pair<Integer, String> itemPair : MapleItemInformationProvider.getInstance().getAllItems()) {
                        if (sb.length() < 32654) {//ohlol
                            if (itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
                                //#v").append(id).append("# #k- 
                                sb.append("#b").append(itemPair.getLeft()).append("#k - #r").append(itemPair.getRight()).append("\r\n");
                            }
                        } else {
                            sb.append("#bCouldn't load all items, there are too many results.");
                            break;
                        }
                    }
                }
                if (sb.length() == 0) {
                    sb.append("#bNo ").append(sub[1].toLowerCase()).append("s found.");
                }
            } else {
                sb.append("#bInvalid search.\r\nSyntax: '/search [type] [name]', where [type] is NPC, ITEM, MOB, or SKILL.");
            }
            c.announce(MaplePacketCreator.getNPCTalk(9010000, (byte) 0, sb.toString(), "00 00", (byte) 0));
        } else if (sub[0].equalsIgnoreCase("setall")) {
            final int x = Short.parseShort(sub[1]);
            player.setStr(x);
            player.setDex(x);
            player.setInt(x);
            player.setLuk(x);
            player.updateSingleStat(MapleStat.STR, x);
            player.updateSingleStat(MapleStat.DEX, x);
            player.updateSingleStat(MapleStat.INT, x);
            player.updateSingleStat(MapleStat.LUK, x);
        } else if (sub[0].equalsIgnoreCase("shutdown") || sub[0].equalsIgnoreCase("shutdownnow")) {
            if (c.gmLevel() < 2) {
                player.message("You need to be an owner to do this silly.");
                return false;
            }
            int time = 60000;
            if (sub[0].equalsIgnoreCase("shutdownnow")) {
                time = 1;
            } else if (sub.length > 1) {
                time *= Integer.parseInt(sub[1]);
            }
            TimerManager.getInstance().schedule(Server.getInstance().shutdown(false), time);
        } else if (sub[0].equalsIgnoreCase("sp")) {
            player.setRemainingSp(Integer.parseInt(sub[1]));
            player.updateSingleStat(MapleStat.AVAILABLESP, player.getRemainingSp());
        } else if (sub[0].equalsIgnoreCase("suicide")) {
            player.setHp(0);
            player.updateSingleStat(MapleStat.HP, 0);
        } else if (sub[0].equalsIgnoreCase("unban")) {
            try {
                PreparedStatement p = DatabaseConnection.getConnection().prepareStatement("UPDATE accounts SET banned = -1 WHERE id = " + MapleCharacter.getIdByName(sub[1]));
                p.executeUpdate();
                p.close();
            } catch (Exception e) {
                player.message("Failed to unban " + sub[1]);
                return true;
            }
            player.message("Unbanned " + sub[1]);
        } else if (sub[0].equals("warpto")) {
            MapleCharacter warpUser = cserv.getPlayerStorage().getCharacterByName(sub[1]);
            MapleMap map = warpUser.getMap();
            player.changeMap(map, map.findClosestSpawnpoint(warpUser.getPosition()));
        } else if (sub[0].equals("warphere")) {
            MapleCharacter warpUser = cserv.getPlayerStorage().getCharacterByName(sub[1]);
            warpUser.message("You're being warped to " + player.getName() + ".");
            MapleMap map = player.getMap();
            warpUser.changeMap(map, map.findClosestSpawnpoint(player.getPosition()));
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
