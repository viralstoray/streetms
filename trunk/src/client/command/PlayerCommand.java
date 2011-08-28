package client.command;

import client.MapleCharacter;
import client.MapleClient;
import client.MapleStat;
import net.server.Channel;
import net.server.Server;
import scripting.npc.NPCScriptManager;
import server.maps.MapleMap;
import tools.MaplePacketCreator;

/**
 * PlayerCommand
 * Manages all of our (@) player commands.
 * @author Doctor
 */
public class PlayerCommand {
    
    public static boolean execute(MapleClient c, String[] sub) {
        MapleCharacter player = c.getPlayer();
        if (sub[0].equals("dispose")) {
            NPCScriptManager.getInstance().dispose(c);
            c.announce(MaplePacketCreator.enableActions());
            player.message("[StreetSys] Done.");
        } else if (sub[0].equals("fm")) {
            if (player.getPlayerVariable("jail") != null) {
                player.message("[StreetSys] You cannot go to the FM while you're jailed.");
            } else if (player.getMapId() >= 910000000 && player.getMapId() <= 910000022)
                player.message("[StreetSys] You are already in the Free Market.");
            else {
                player.setPlayerVariable("FREE_MARKET", player.getMapId()+"");
                MapleMap map = c.getChannelServer().getMapFactory().getMap(910000000);
                player.changeMap(map, map.getPortal(0));
            }
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
        } else if (sub[0].equals("help")) {
            player.message("**************************************************");
            player.message("@dispose - when you're stuck");
            player.message("@fm - warps you to the Free Market");
            player.message("@gms - gives you a list of all the online GMs");
            player.message("@rates - lists the current server rates");
            player.message("@save - saves your character information");
            player.message("@str/@dex/@int@luk - allocates AP into the desired stat");
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
        } else {
            return false;
        }
        return true;
    }
    
}
