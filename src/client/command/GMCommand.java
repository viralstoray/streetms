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
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
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
import scripting.portal.PortalScriptManager;
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
import tools.Logger;
import tools.MaplePacketCreator;
import tools.Pair;

/**
 * Manages all of the normal-level GM Commands.
 * 
 * @author Doctor
 * @version %I% %G%
 */
public class GMCommand {
    
    /**
     * Executes a GM command.
     * 
     * @param c the {@link MapleClient} object of the player
     * @param sub the full command given, excluding the '!'
     * @return true if command exists, false if not
     * @see PlayerCommand#execute
     */
    public static boolean execute(MapleClient c, String[] sub) {
        MapleCharacter player = c.getPlayer();
        Channel cserv = c.getChannelServer();
        Server srv = Server.getInstance();
        if (sub[0].equals("allgms")) {  // Send message to GMs
            String message = joinStringFrom(sub, 1);
            for (Channel ch : srv.getChannelsFromWorld(player.getWorld())) {
                for (MapleCharacter gms : ch.getPlayerStorage().getAllCharacters()) {
                    if (gms.isGM()) {
                        gms.message("GMChat: [" + c.getPlayer().getName() + "] " + message);
                    }
                }
            }
        } else if (sub[0].equals("ap")) {  // Set your AP
            if (sub.length < 2) {
                player.message("Syntax: !ap amount");
                return true;
            }
            try {
                player.setRemainingAp(Integer.parseInt(sub[1]));
                player.updateSingleStat(MapleStat.AVAILABLEAP, Integer.parseInt(sub[1]));
            } catch (NumberFormatException e) {
                player.message("You need to provide a number.");
                return true;
            }
        } else if (sub[0].equals("buffme")) {  // Buff you
            final int[] array = {9001000, 9101002, 9101003, 9101008, 2001002, 1101007, 1005, 2301003, 5121009, 1111002, 4111001, 4111002, 4211003, 4211005, 1321000, 2321004, 3121002};
            for (int i : array) {
                SkillFactory.getSkill(i).getEffect(SkillFactory.getSkill(i).getMaxLevel()).applyTo(player);
            }
        } else if (sub[0].equals("ban")) {  // Ban a user
            if (sub.length < 2) {
                player.message("Syntax: !ban player");
            } else if (c.getPlayer().gmLevel() < 2) {
                player.message("Only administrators or moderators can ban. Forward this request.");
            } else {
                MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
                if (victim.ban(joinStringFrom(sub, 2))) {
                    player.message(victim.getName() + " has been banned. Be sure to log this.");
                } else {
                    player.message("Something went wrong.");
                }
            }
        } else if (sub[0].equals("bomb")) {  // Bomb a person or map
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
        } else if (sub[0].equals("checklottery")) {  // Check lottery amount
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
        } else if (sub[0].equals("cleardrops")) {  // Remove all drops on the map
            player.getMap().clearDrops(player);
        } else if (sub[0].equals("dc")) {  // Disconnect a player
            if (sub.length < 2) {
                player.message("Syntax: !dc player");
                return true;
            }
            MapleCharacter chr = c.getWorldServer().getPlayerStorage().getCharacterByName(sub[1]);
            if (c.getPlayer().gmLevel() > chr.gmLevel()) {
                chr.getClient().disconnect();
            }
        } else if (sub[0].equals("dispose")) {  // Dispose stuck NPC script
            NPCScriptManager.getInstance().dispose(c);
            c.getSession().write(MaplePacketCreator.enableActions());
        } else if (sub[0].equals("droprate")) {  // Temporarily change the drop rate
            if (sub.length < 2) {
                player.message("Syntax: !droprate rate");
                return true;
            }
            try {
                Integer.parseInt(sub[1]);
            } catch (NumberFormatException e) {
                player.message("You need to provide a number.");
                return true;
            }
            c.getWorldServer().setDropRate((byte) (Byte.parseByte(sub[1]) % 128));
            cserv.broadcastPacket(MaplePacketCreator.serverNotice(6, "The Drop Rate has been changed to " + Integer.parseInt(sub[1]) + "x."));
            for (MapleCharacter mc : c.getWorldServer().getPlayerStorage().getAllCharacters()) {
                mc.setRates();
            }
        } else if (sub[0].equals("drawlottery")) {  // Draw the lottery winner and award NX
            MapleCharacter winner = c.getWorldServer().getPlayerStorage().getCharacterById(player.getLotteryWinner());
            winner.giftNX(player.getCurrentLotteryAmount() / 1000);
            String message = "[Lottery] " + winner.getName() + " has just won " + (player.getCurrentLotteryAmount() / 1000) + " NX Cash by winning the lottery! Congratulations!";
            Server.getInstance().broadcastMessage(player.getWorld(), MaplePacketCreator.serverNotice(5, message));
            player.resetLottery();
        } else if (sub[0].equals("exprate")) {  // Temporarily change the experience rate
            if (sub.length < 2) {
                player.message("Syntax: !exprate rate");
                return true;
            }
            try {
                Integer.parseInt(sub[1]);
            } catch (NumberFormatException e) {
                player.message("You need to provide a number.");
                return true;
            }
            c.getWorldServer().setExpRate((byte) (Byte.parseByte(sub[1]) % 128));
            cserv.broadcastPacket(MaplePacketCreator.serverNotice(6, "The EXP Rate has been changed to " + Integer.parseInt(sub[1]) + "x."));
            for (MapleCharacter mc : c.getWorldServer().getPlayerStorage().getAllCharacters()) {
                mc.setRates();
            }
        } else if (sub[0].equals("fame")) {  // Set a player's fame level
            if (sub.length < 2) {
                player.message("Syntax: !fame player amount");
                return true;
            }
            try {
                MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
                victim.setFame(Integer.parseInt(sub[2]));
                victim.updateSingleStat(MapleStat.FAME, victim.getFame());
            } catch (NumberFormatException e) {
                player.message("You need to provide a number.");
                return true;
            }
        } else if (sub[0].equals("freeze")) {  // Freeze a player in place
            if (sub.length < 2) {
                player.message("Syntax: !freeze player");
                return true;
            }
            MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
            victim.disableMovement();
            player.message(victim.getName() + " has been frozen.");
            victim.dropMessage(1, "You have been frozen by " + player.getName());
        } else if (sub[0].equals("giftnx")) {  // Give NX to a player
            if (sub.length < 3) {
                player.message("Syntax: !giftnx player amount");
                return true;
            }
            try {
                cserv.getPlayerStorage().getCharacterByName(sub[1]).getCashShop().gainCash(1, Integer.parseInt(sub[2]));
                player.message("Done");
            } catch (NumberFormatException e) {
                player.message("You need to provide a number.");
                return true;
            }
        } else if (sub[0].equals("giveitem")) {
            if (sub.length < 3) {
                player.message("Syntax: !giveitem person itemid amount");
                return true;
            }
            try {
                MapleCharacter victim = c.getChannelServer().getPlayerStorage().getCharacterByName(sub[1]);
                int itemId = Integer.parseInt(sub[2]);
                short quantity = 1;
                if (sub.length > 3)
                    quantity = Short.parseShort(sub[3]);
                int petid = -1;
                if (ItemConstants.isPet(itemId)) {
                    petid = MaplePet.createPet(itemId);
                }
                MapleInventoryManipulator.addById(victim.getClient(), itemId, quantity, player.getName(), petid, -1);
                player.message("You have given " + victim.getName() + " " + quantity + " " + MapleItemInformationProvider.getInstance().getName(itemId) + (quantity == 1 ? "." : "s."));
            } catch (NumberFormatException NFE) {
                player.message("Either that player doesn't exist, or you didn't use the correct syntax: !giveitem person itemid amount");
                return true;
            }
        } else if (sub[0].equals("gmshop")) {  // Opens the GM shop
            MapleShopFactory.getInstance().getShop(1337).sendShop(c);
        } else if (sub[0].equals("gmtext")) {  // Change the color of your text
            if (sub.length < 2) {
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
        } else if (sub[0].equals("goto")) {  // Warp to a map
            if (sub.length < 2) {
                player.message("Syntax: !goto map");
                return true;
            }
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
        } else if (sub[0].equals("heal")) {  // Heal a player/all players on a map
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
        } else if (sub[0].equals("hidenpc")) {
            if (sub.length == 1) {
                player.message("Usage: !hidenpc [id]");
                return true;
            }
            try {
                int id = Integer.parseInt(sub[1]);
                c.getPlayer().getMap().toggleHiddenNPC(id);
            } catch (NumberFormatException nfe) {
                player.message("You need to provide an id.");
                return true;
            }
        } else if (sub[0].equals("hp")) {  // Set your HP
            if (sub.length < 2) {
                player.message("Syntax: !hp amount");
                return true;
            }
            try {
                player.setHp(Integer.parseInt(sub[1]));
                player.updateSingleStat(MapleStat.HP, Integer.parseInt(sub[1]));
            } catch (NumberFormatException e) {
                player.message("You need to provide a number.");
                return true;
            }
        } else if (sub[0].equals("maxhp")) {  // Set your max HP
            if (sub.length < 2) {
                player.message("Syntax: !maxhp amount");
                return true;
            }
            try {
                if (Integer.parseInt(sub[1]) < player.getHp()) {
                    player.setHp(Integer.parseInt(sub[1]));
                    player.updateSingleStat(MapleStat.HP, Integer.parseInt(sub[1]));
                }
                player.setMaxHp(Integer.parseInt(sub[1]));
                player.updateSingleStat(MapleStat.MAXHP, Integer.parseInt(sub[1]));
            } catch (NumberFormatException e) {
                player.message("You need to provide a number.");
                return true;
            }
        } else if (sub[0].equals("mp")) {  // Set your MP
            if (sub.length < 2) {
                player.message("Syntax: !mp amount");
                return true;
            }
            try {
                player.setMp(Integer.parseInt(sub[1]));
                player.updateSingleStat(MapleStat.MP, Integer.parseInt(sub[1]));
            } catch (NumberFormatException e) {
                player.message("You need to provide a number.");
                return true;
            }
        } else if (sub[0].equals("maxmp")) {  // Set your max MP
            if (sub.length < 2) {
                player.message("Syntax: !maxmp amount");
                return true;
            }
            try {
                if (Integer.parseInt(sub[1]) < player.getMp()) {
                    player.setMp(Integer.parseInt(sub[1]));
                    player.updateSingleStat(MapleStat.MP, Integer.parseInt(sub[1]));
                }
                player.setMaxMp(Integer.parseInt(sub[1]));
                player.updateSingleStat(MapleStat.MAXMP, Integer.parseInt(sub[1]));
            } catch (NumberFormatException e) {
                player.message("You need to provide a number.");
                return true;
            }
        } else if (sub[0].equals("item") || sub[0].equals("drop")) {
            if (sub.length < 2) {
                if (sub[0].equals("item"))
                    player.message("Syntax: !item itemid amount");
                else
                    player.message("Syntax: !drop itemid amount");
                return true;
            }
            try {
                int itemId = Integer.parseInt(sub[1]);
                short quantity = 1;
                if (sub.length > 2)
                    quantity = Short.parseShort(sub[2]);
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
            } catch (NumberFormatException e) {
                player.message("You need to provide a number.");
                return true;
            }
        } else if (sub[0].equals("jail")) {  // Jail a player
            if (sub.length < 2) {
                player.message("Syntax: !jail player");
                return true;
            }
            MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
            MapleMap jail = cserv.getMapFactory().getMap(980000404);
            victim.setPlayerVariable("jail", victim.getMapId()+"");
            victim.changeMap(jail);
            victim.message("You've been jailed by " + player.getName() + ".");
        } else if (sub[0].equals("job")) {  // Set your job
            if (sub.length < 2) {
                player.message("Syntax: !job jobid");
                return true;
            }
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
        } else if (sub[0].equals("jobperson")) {  // Set another player's job
            if (sub.length < 3) {
                player.message("Syntax: !jobperson player jobid");
                return true;
            }
            if (c.getPlayer().gmLevel() < 2) {
                player.message("You need to be an admin for this silly.");
                return true;
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
        } else if (sub[0].equals("kill")) {  // Kill a player/everyone on a map (set their HP to 0)
            if (sub.length < 2) {
                player.message("Syntax: !kill player/map");
                return true;
            }
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
        } else if (sub[0].equals("killall")) {  // Kill all mobs on the map
            List<MapleMapObject> monsters = player.getMap().getMapObjectsInRange(player.getPosition(), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.MONSTER));
            MapleMap map = player.getMap();
            for (MapleMapObject monstermo : monsters) {
                MapleMonster monster = (MapleMonster) monstermo;
                map.killMonster(monster, player, true);
                monster.giveExpToCharacter(player, monster.getExp() * c.getPlayer().getExpRate(), true, 1);
            }
            player.dropMessage("Killed " + monsters.size() + " monsters.");
        } else if (sub[0].equals("level")) {  // Set your level
            if (sub.length < 2) {
                player.message("Syntax: !level level");
                return true;
            }
            try {
                player.setLevel(Integer.parseInt(sub[1]));
                player.gainExp(-player.getExp(), false, false);
                player.updateSingleStat(MapleStat.LEVEL, player.getLevel());
            } catch (NumberFormatException e) {
                player.message("You need to provide a number.");
                return true;
            }
        } else if (sub[0].equals("levelperson")) {  // Set another player's level
            if (sub.length < 3) {
                player.message("Syntax: !levelperson player level");
                return true;
            }
            try {
                MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
                victim.setLevel(Integer.parseInt(sub[2]));
                victim.gainExp(-victim.getExp(), false, false);
                victim.updateSingleStat(MapleStat.LEVEL, victim.getLevel());
            } catch (NumberFormatException e) {
                player.message("You need to provide a number.");
                return true;
            }
        } else if (sub[0].equals("maps")) {  // List map names
            c.announce(MaplePacketCreator.getNPCTalk(9010000, (byte) 0, "!goto Maps\r\n" + 
            MapleMap.MapTextList, "00 00", (byte) 0));
        } else if (sub[0].equals("maxstat")) {  // Set all your stats to the maximum value
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
        } else if (sub[0].equals("maxskills")) {  // Set all your skills to the maximum value
            for (MapleData skill_ : MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/" + "String.wz")).getData("Skill.img").getChildren()) {
                try {
                    ISkill skill = SkillFactory.getSkill(Integer.parseInt(skill_.getName()));
                    player.changeSkillLevel(skill, (byte) skill.getMaxLevel(), skill.getMaxLevel(), -1);
                } catch (NumberFormatException e) {
                    break;
                } catch (NullPointerException npe) {
                    continue;
                }
            }
        } else if (sub[0].equals("mesoperson")) {  // Give mesos to a player
            if (sub.length < 3) {
                player.message("Syntax: !mesoperson player amount");
                return true;
            }
            try {
                cserv.getPlayerStorage().getCharacterByName(sub[1]).gainMeso(Integer.parseInt(sub[2]), true);
            } catch (NumberFormatException e) {
                player.message("You need to provide a number.");
                return true;
            }
        } else if (sub[0].equals("meso")) {  // Give mesos to yourself
            if (sub.length < 2) {
                player.message("Syntax: !meso amount");
                return true;
            }
            try {
                player.gainMeso(Integer.parseInt(sub[1]), true);
            } catch (NumberFormatException e) {
                player.message("You need to provide a number.");
                return true;
            }
        } else if (sub[0].equals("notice")) {  // Send a server-wide notice
            if (sub.length < 2) {
                player.message("Syntax: !notice [type] message");
                return true;
            }
            if (sub[1].equals("p")) {
                Server.getInstance().broadcastMessage(player.getWorld(), MaplePacketCreator.serverNotice(1, joinStringFrom(sub, 2)));
            } else if (sub[1].equalsIgnoreCase("n")) {
                Server.getInstance().broadcastMessage(player.getWorld(), MaplePacketCreator.serverNotice(0, joinStringFrom(sub, 2)));
            } else if (sub[1].equalsIgnoreCase("scr")) {
                if (c.getPlayer().gmLevel() < 2) {
                    player.message("You need to be an admin to do this.");
                } else {
                    Server.getInstance().broadcastMessage(player.getWorld(), MaplePacketCreator.serverMessage(joinStringFrom(sub, 2)));
                }
            } else if (sub[1].equalsIgnoreCase("r")) {
                Server.getInstance().broadcastMessage(player.getWorld(), MaplePacketCreator.serverNotice(5, joinStringFrom(sub, 2)));
            } else if (sub[1].equalsIgnoreCase("b")) {
                Server.getInstance().broadcastMessage(player.getWorld(), MaplePacketCreator.serverNotice(6, joinStringFrom(sub, 2)));
            } else {
                Server.getInstance().broadcastMessage(player.getWorld(), MaplePacketCreator.serverNotice(6, "[Notice] " + joinStringFrom(sub, 1)));
            }
        } else if (sub[0].equals("online")) {  // List online players
            for (Channel ch : srv.getChannelsFromWorld(player.getWorld())) {
                String s = "Characters online (Channel " + ch.getId() + " Online: " + ch.getPlayerStorage().getAllCharacters().size() + ") : ";
                if (ch.getPlayerStorage().getAllCharacters().size() < 50) {
                    for (MapleCharacter chr : ch.getPlayerStorage().getAllCharacters()) {
                        s += MapleCharacter.makeMapleReadable(chr.getName()) + ", ";
                    }
                    player.dropMessage(s.substring(0, s.length() - 2));
                }
            }
        } else if (sub[0].equals("pap")) {  // Spawn Papulatus
            player.getMap().spawnMonsterOnGroudBelow(MapleLifeFactory.getMonster(8500001), player.getPosition());
        } else if (sub[0].equals("pianus")) {  // Spawn Pianus
            player.getMap().spawnMonsterOnGroudBelow(MapleLifeFactory.getMonster(8510000), player.getPosition());
        } else if (sub[0].equals("pmob")) {  // Spawn a permanent mob
            if (sub.length < 3) {
                player.message("Syntax: !pmob mobid spawndelay");
                return true;
            }
            try {
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
                        player.dropMessage("Failed to save mob to the database.");
                        Logger.logError(player, "Failed to save mob to the database: " + e, true);
                    }
                    player.getMap().addMonsterSpawn(mob, mobTime, 0);
                } else {
                    player.dropMessage("You have entered an invalid Mob-Id");
                }
            } catch (NumberFormatException e) {
                player.message("You need to provide a number.");
                return true;
            }
        } else if (sub[0].equals("pnpc")) {  // Spawn a permanent NPC
            if (sub.length < 2) {
                player.message("Syntax: !pnpc npcid");
                return true;
            }
            try {
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
                        player.dropMessage("Failed to save NPC to the database.");
                        Logger.logError(player, "Failed to save NPC to the database: " + e, true);
                    }
                    player.getMap().addMapObject(npc);
                    player.getMap().broadcastMessage(MaplePacketCreator.spawnNPC(npc));
                } else {
                    player.dropMessage("You have entered an invalid Npc-Id");
                }
            } catch (NumberFormatException e) {
                player.message("You need to provide a number.");
                return true;
            }
        } else if (sub[0].equals("pos")) {  // Get your position
            player.message("X: " + player.getPosition().getX() + " Y: " + player.getPosition().getY() + " FH: " + player.getFh());
        } else if (sub[0].equals("reloadshops")) {  // Reload all shops
            try {
                player.message("Attempting to reload all shops. This may take awhile...");
                MapleShopFactory.getInstance().reloadShops();
                player.message("Completed.");
            } catch (Exception e) {
                player.message("Error occurred while attempting to reload shops.");
                Logger.logError(player, "Error occurred while attempting to reload shops: " + e, true);
            }
        } else if (sub[0].equals("reloadportals")) {  // Reload all portals
            try {
                player.message("Attempting to reload all portals. This may take awhile...");
                PortalScriptManager.getInstance().clearScripts();
                player.message("Completed.");
            } catch (Exception e) {
                player.message("Error occurred while attempting to reload portals.");
                Logger.logError(player, "Error occurred while attempting to reload portals: " + e, true);
            }
        } else if (sub[0].equals("rename")) {  // Rename a player
            if (c.getPlayer().gmLevel() < 2) {
                player.message("You need to be an admin.");
            }
            if (sub.length < 3) {
                player.message("Syntax: !rename player newname");
                return true;
            }
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = null;
            ResultSet rs = null;
            try {
                // Check if player exists
                ps = con.prepareStatement("SELECT id FROM characters WHERE name = ?");
                ps.setString(1, sub[1]);
                rs = ps.executeQuery();
                if (!rs.next()) {
                    player.message(sub[1] + " does not exist.");
                    return true;
                }
                
                // Check if name is already in use
                ps = con.prepareStatement("SELECT id FROM characters WHERE name = ?");
                ps.setString(1, sub[2]);
                rs = ps.executeQuery();
                if (rs.next()) {
                    player.message(sub[2] + " is already in use.");
                    return true;
                }
                
                // Rename
                ps = con.prepareStatement("UPDATE characters SET name = ? WHERE name = ?");
                ps.setString(1, sub[2]);
                ps.setString(2, sub[1]);
                ps.executeUpdate();
                //if (rs.getInt("guildid") > 0) { } TODO Update guild when renaming without having to restart
                player.message(sub[1] + " renamed to " + sub[2]);
                ps.close();
            } catch (SQLException e) {
                player.dropMessage("Failed to rename " + sub[1]);
                Logger.logError(player, "Failed to rename " + sub[1] + ": " + e, true);
            } finally {
                try {
                    if (ps != null && !ps.isClosed()) {
                        ps.close();
                    }
                    if (rs != null && !ps.isClosed()) {
                        rs.close();
                    }
                } catch (SQLException e) {
                }
            }
        } else if (sub[0].equals("saveall")) {  // Save all online players
            if (c.getPlayer().gmLevel() < 2) {
                player.message("You need to be an admin.");
            }
            player.message("Saving...");
            for (MapleCharacter chr : cserv.getPlayerStorage().getAllCharacters()) {
                chr.saveToDB(true);
            }
            player.message("Everyone's saved!");
        } else if (sub[0].equals("savemap")) {  // Save all players on the map
            player.message("Saving...");
            for (MapleCharacter chr : player.getMap().getCharacters()) {
                chr.saveToDB(true);
            }
            player.message("Everyone's saved!");
        } else if (sub[0].equals("search") || sub[0].equals("lookup")) {  // Search for an item/npc/mob/skill/map
            if (sub.length < 3) {
                player.message("Syntax: !search type query");
                return true;
            }
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
        } else if (sub[0].equals("setall")) {  // Set all your stats to x
            if (sub.length < 2) {
                player.message("Syntax: !setall amount");
                return true;
            }
            try {
                final int x = Short.parseShort(sub[1]);
                player.setStr(x);
                player.setDex(x);
                player.setInt(x);
                player.setLuk(x);
                player.updateSingleStat(MapleStat.STR, x);
                player.updateSingleStat(MapleStat.DEX, x);
                player.updateSingleStat(MapleStat.INT, x);
                player.updateSingleStat(MapleStat.LUK, x);
            } catch (NumberFormatException e) {
                player.message("You need to provide a number.");
                return true;
            }
        } else if (sub[0].equals("shutdown") || sub[0].equals("shutdownnow")) {  // Shutdown the server
            if (c.getPlayer().gmLevel() < 2) {
                player.message("You need to be an owner to do this silly.");
                return true;
            }
            if (sub[0].equals("shutdown") && sub.length < 2) {
                player.message("Syntax: !shutdown delay");
                return true;
            }
            int time = 60000;
            if (sub[0].equals("shutdownnow")) {
                time = 1;
            } else if (sub.length > 1) {
                time *= Integer.parseInt(sub[1]);
            }
            Server.getInstance().broadcastMessage(player.getWorld(), MaplePacketCreator.serverNotice(6, "[Notice] The server will be shut down in " + (time/60000) + " minute" + ((time/60000) == 1 ? "" : "s") + ". Please log off safely."));
            TimerManager.getInstance().schedule(Server.getInstance().shutdown(false), time);
        } else if (sub[0].equals("smega")) {  // Send a super megaphone message
            if (sub.length < 3 || (!sub[1].equals("love") && !sub[1].equals("cloud") && !sub[1].equals("diablo"))) {
                player.message("Usage: !smega love/cloud/diablo text");
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
        } else if (sub[0].equals("smegap")) {  // Send a super megaphone as another player
            if (c.getPlayer().gmLevel() < 2) {
                player.message("You need to be an admin to do this.");
                return true;
            }
            if (sub.length < 3 || (!sub[1].equals("love") && !sub[1].equals("cloud") && !sub[1].equals("diablo"))) {
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
        } else if (sub[0].equals("sp")) {  // Set your SP
            if (sub.length < 2) {
                player.message("Syntax: !sp amount");
                return true;
            }
            try {
                player.setRemainingSp(Integer.parseInt(sub[1]));
                player.updateSingleStat(MapleStat.AVAILABLESP, player.getRemainingSp());
            } catch (NumberFormatException e) {
                player.message("You need to provide a number.");
                return true;
            }
        } else if (sub[0].equals("spawn")) {  // Spawns a mob
            if (sub.length < 2) {
                player.message("Syntax: !spawn mobid [amount]");
                return true;
            }
            try {
                if (sub.length > 2) {
                    for (int i = 0; i < Integer.parseInt(sub[2]); i++) {
                        player.getMap().spawnMonsterOnGroudBelow(MapleLifeFactory.getMonster(Integer.parseInt(sub[1])), player.getPosition());
                    }
                } else {
                    player.getMap().spawnMonsterOnGroudBelow(MapleLifeFactory.getMonster(Integer.parseInt(sub[1])), player.getPosition());
                }
            } catch (NumberFormatException e) {
                player.message("You need to provide a number.");
                return true;
            }
        } else if (sub[0].equals("strip")) {  // Remove all a player's equips
            if (c.getPlayer().gmLevel() == 2) {
                cserv.getPlayerStorage().getCharacterByName(sub[1]).unequipAll(player);
            } else {
                player.message("You need to be an admin or a mod for this.");
            }
        } else if (sub[0].equals("suicide")) {  // Kill yourself
            player.setHpMp(0);
        } else if (sub[0].equals("unban")) {  // Unban a player
            if (sub.length < 2) {
                player.message("Syntax: !unban player");
                return true;
            }
            cserv.getPlayerStorage().getCharacterByName(sub[1]).unban();
            player.message(sub[1] + " has been unbanned.");
        } else if (sub[0].equals("unfreeze")) { // Unfreeze a player
            if (sub.length < 2) {
                player.message("Syntax: !unfreeze player");
                return true;
            }
            MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
            victim.enableMovement();
            player.message(sub[1] + " has been unfrozen.");
            victim.dropMessage(1, "You've been unfrozen by " + player.getName());
        } else if (sub[0].equals("unjail")) {  // Unjail a player
            if (sub.length < 2) {
                player.message("Syntax: !unjail player");
                return true;
            }
            MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
            if (victim.getPlayerVariable("jail") != null) {
                MapleMap unjail = cserv.getMapFactory().getMap(Integer.parseInt(victim.getPlayerVariable("jail")));
                victim.changeMap(unjail);
                victim.deletePlayerVariable("jail");
                victim.message("You've been unjailed by " + player.getName() + ". Please follow the rules.");
            } else {
                player.message(sub[1] + " is not currently jailed.");
            }
        } else if (sub[0].equals("warpto")) {  // Warp to a player
            if (sub.length < 2) {
                player.message("Syntax: !warpto player");
                return true;
            }
            MapleCharacter warpUser = cserv.getPlayerStorage().getCharacterByName(sub[1]);
            MapleMap map = warpUser.getMap();
            player.changeMap(map, map.findClosestSpawnpoint(warpUser.getPosition()));
        } else if (sub[0].equals("warphere")) {  // Warp a player to you
            if (sub.length < 2) {
                player.message("Syntax: !warphere player");
                return true;
            }
            MapleCharacter warpUser = cserv.getPlayerStorage().getCharacterByName(sub[1]);
            warpUser.message("You're being warped to " + player.getName() + ".");
            MapleMap map = player.getMap();
            warpUser.changeMap(map, map.findClosestSpawnpoint(player.getPosition()));
        } else if (sub[0].equals("whereami")) {  // Tell you the map you're on
            player.message(player.getMapId() + " - " + player.getMap().getMapName());
        } else {
            return false;
        }
        Logger.logCommand(player, joinStringFrom(sub, 0), false);
        return true;
    }
    
    /**
     * Concatenates a <code>String</code> array into a string
     * 
     * @param arr String array to join
     * @param start which index of the array to start at
     * @return the concatenated string
     */
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
