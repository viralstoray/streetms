package client.command;

import client.MapleCharacter;
import client.MapleClient;
import client.MapleStat;
import net.server.Channel;
import net.server.Server;
import scripting.npc.NPCScriptManager;
import scripting.quest.QuestScriptManager;
import server.MapleItemInformationProvider;
import server.maps.MapleMap;
import tools.MaplePacketCreator;
import tools.Pair;

/**
 * PlayerCommand
 * Manages all of our (@) player commands.
 * @author Doctor
 */
public class PlayerCommand {
    
    public static boolean execute(MapleClient c, String[] sub) {
        MapleCharacter player = c.getPlayer();
        int itemid = 0;
        if (sub[0].equals("autopot")) {
            if (sub.length == 1) {
                player.message("Auto Potion: " + (player.getPlayerVariable("AUTO_POT") != null ? "ON" : "OFF"));
                if (player.getPlayerVariable("AUTO_POT") != null) {
                    player.message("Notices: " + (player.getPlayerVariable("AUTO_POT_notices") != null ? "on" : "off"));
                    player.message("Percentage: " + (player.getPlayerVariable("AUTO_POT_percent") != null ? player.getPlayerVariable("AUTO_POT_percent") + "%" : "40%"));
                    player.message("HP Potion: " + (player.getPlayerVariable("AUTO_HP") != null ? MapleItemInformationProvider.getInstance().getName(Integer.parseInt(player.getPlayerVariable("AUTO_HP"))) : "none"));
                    player.message("MP Potion: " + (player.getPlayerVariable("AUTO_MP") != null ? MapleItemInformationProvider.getInstance().getName(Integer.parseInt(player.getPlayerVariable("AUTO_MP"))) : "none"));
                }
                return true;
            }
            if (sub[1].equals("on")) {
                player.setPlayerVariable("AUTO_POT", "on");
                player.message("Auto Potion has been turned ON!");
                return true;
            }
            if (sub[1].equals("off")) {
                player.deletePlayerVariable("AUTO_POT");
                player.message("Auto Potion has been turned OFF!");
                return true;
            }
            if (sub[1].equals("notices")) {
                if (sub[2].equals("on")) {
                    player.setPlayerVariable("AUTO_POT_notices", "on");
                    player.message("Auto Potion notices have been turned on.");
                } else if (sub[2].equals("off")) {
                    player.deletePlayerVariable("AUTO_POT_notices");
                    player.message("Auto Potion notices have been turned off.");
                } else {
                    player.message("Use @autopot notices [on/off].");
                }
                return true;
            }
            if (sub[1].equals("percent")) {
                try {
                    Integer.valueOf(sub[2]);
                } catch (NumberFormatException e) {
                    player.message("Please enter a number for your percentage.");
                    return true;
                }
                if (sub[2].equals("100")) {
                    player.message("You must choose a percentage between 0% ~ 99%");
                    return true;
                }
                player.setPlayerVariable("AUTO_POT_percent", sub[2]);
                player.message("Your Auto Potion percentage has been changed to " + sub[2] + "%");
                return true;
            }
            if (!sub[1].equals("hp") && !sub[1].equals("mp")) {
                player.message("Usage: @autopot [hp/mp] [item name] OR @autopot [on/off] OR @autopot percent [percentage]");
                return true;
            }
            String search = joinStringFrom(sub, 2);
            for (Pair<Integer, String> itemPair : MapleItemInformationProvider.getInstance().getAllItems()) {
                if (itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
                    if (player.getItemQuantity(itemPair.getLeft(), false) > 0) {
                        if (itemPair.getLeft() >= 2000000 && itemPair.getLeft() < 3000000) {
                            itemid = itemPair.getLeft();
                            break;
                        }
                    }
                }
            }
            if (itemid != 0) {
                player.deletePlayerVariable("AUTO_POT_warned");
                player.setPlayerVariable(sub[1].equals("hp") ? "AUTO_HP" : "AUTO_MP", itemid+"");
                player.message("Your Auto " + (sub[1].equals("hp") ? "HP" : "MP") + " Potion has been set to " + MapleItemInformationProvider.getInstance().getName(itemid) + ".");
            } else {
                player.message("The item: " + search + " either doesn't exist or you don't have any of it.");
            }
        } else if (sub[0].equals("dispose")) {
            NPCScriptManager.getInstance().dispose(c);
            c.announce(MaplePacketCreator.enableActions());
            QuestScriptManager.getInstance().dispose(c);
            c.announce(MaplePacketCreator.enableActions());
            player.message("[StreetSys] Done.");
        } else if (sub[0].equals("fm")) {
            if (player.getPlayerVariable("jail") != null) {
                player.message("[StreetSys] You cannot go to the FM while you're jailed.");
                return true;
            }
            if (player.getMapId() >= 910000000 && player.getMapId() <= 910000022) {
                player.message("[StreetSys] You are already in the Free Market.");
                return true;
            }
            player.setPlayerVariable("FREE_MARKET", player.getMapId()+"");
            player.changeMap(910000000);
        } else if (sub[0].equals("gms")) {
            String names = "";
            for (Channel ch : Server.getInstance().getChannelsFromWorld(player.getWorld())) {
                for (MapleCharacter chr : ch.getPlayerStorage().getAllCharacters()) {
                    if (chr.isGM()) {
                        names += chr.getName() + ", ";
                    }
                }
            }
            if (names.equals(""))
                player.message("Online GM's: none");
            else
                player.message("Online GM's:" + names);
        } else if (sub[0].equals("nearesttown")) {
            if (player.getPlayerVariable("jail") != null) {
                player.message("[StreetSys] You cannot use this command while you're jailed.");
                return true;
            }
            if (player.getMeso() < 500) {
                player.message("[StreetSys] You need at least 500 mesos to use this command.");
                return true;
            }
            if (player.getMapId() == player.getMap().getReturnMapId()) {
                player.message("[StreetSys] You are already in a town.");
                return true;
            }
            MapleMap returnMap = player.getMap().getReturnMap();
            player.gainMeso(-500, true);
            player.changeMap(returnMap);
            player.message("[StreetSys] You have been warped to " + returnMap.getMapName() + " for 500 mesos.");
        } else if (sub[0].equals("help")) {
            player.message("**************************************************");
            player.message("@autopot - enables/sets up auto potion feature.");
            player.message("@dispose - when NPCs or Quests won't open.");
            player.message("@fm - warps you to the Free Market.");
            player.message("@gms - gives you a list of all the online GMs.");
            player.message("@nearesttown - warps you to nearest town for 500 mesos.");
            player.message("@rates - lists the current server rates.");
            player.message("@save - saves your character information.");
            player.message("@str/@dex/@int@luk - allocates AP into the desired stat.");
            player.message("**************************************************");
        } else if (sub[0].equals("rates")) {
            player.message("[StreetSys] Current EXP Rate: " + c.getWorldServer().getExpRate() + "x");
            player.message("[StreetSys] Current MESO Rate: " + c.getWorldServer().getMesoRate() + "x");
            player.message("[StreetSys] Current DROP Rate: " + c.getWorldServer().getDropRate() + "x");
        } else if (sub[0].equals("save")) {
            //if (player.canUrgentSave()) {
                player.saveToDB(true);
                player.message("[StreetSys] Your character information has been saved.");
            /*} else if (player.isPendingSave()) {
                player.message("[StreetSys] You're already pending a save.");
            } else {
                player.markPendingSave();
                player.message("[StreetSys] You can only save once per session, so on logout your information will be saved");
            }*/
        } else if (sub[0].equals("str") || sub[0].equals("int") || sub[0].equals("luk") || sub[0].equals("dex")) {
            try {
                int amount = Integer.parseInt(sub[1]);
                if (amount > 0 && amount <= player.getRemainingAp() && amount < 31997) { 
                    if (sub[0].equals("str") && amount + player.getStr() < 32001) {
                        player.setStr(player.getStr() + amount); 
                        player.updateSingleStat(MapleStat.STR, player.getStr());
                        player.message("[StreetSys] " + amount + " STR has been added, making your total: " + player.getStr());
                    } else if (sub[0].equals("int") && amount + player.getInt() < 32001) {
                        player.setInt(player.getInt() + amount); 
                        player.updateSingleStat(MapleStat.INT, player.getInt());
                        player.message("[StreetSys] " + amount + " INT has been added, making your total: " + player.getInt());
                    } else if (sub[0].equals("luk") && amount + player.getLuk() < 32001) {
                        player.setLuk(player.getLuk() + amount); 
                        player.updateSingleStat(MapleStat.LUK, player.getLuk());
                        player.message("[StreetSys] " + amount + " LUK has been added, making your total: " + player.getLuk());
                    } else if (sub[0].equals("dex") && amount + player.getDex() < 32001) {
                        player.setDex(player.getDex() + amount); 
                        player.updateSingleStat(MapleStat.DEX, player.getDex());
                        player.message("[StreetSys] " + amount + " DEX has been added, making your total: " + player.getDex());
                    } else { 
                        player.message("[StreetSys] The stat cannot exceed the maximum amount.");
                    } 
                    player.setRemainingAp(player.getRemainingAp() - amount); 
                    player.updateSingleStat(MapleStat.AVAILABLEAP, player.getRemainingAp()); 
                } else { 
                player.message("[StreetSys] Please make sure you have enough AP.");
                }
            } catch (NumberFormatException NFE) {
                player.message("You need to provide a number.");
                return true;
            }
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
