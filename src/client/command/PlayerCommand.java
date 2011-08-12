package client.command;

import client.MapleCharacter;
import client.MapleClient;
import client.MapleStat;
import constants.ServerConstants;
import scripting.npc.NPCScriptManager;
import tools.MaplePacketCreator;

/**
 * PlayerCommand
 * Manages all of our (@) player commands.
 * @author Doctor
 */
public class PlayerCommand {
    
    public static boolean execute(MapleClient c, String[] sub) {
        MapleCharacter player = c.getPlayer();
        if (sub[0].equalsIgnoreCase("dispose")) {
            NPCScriptManager.getInstance().dispose(c);
            c.announce(MaplePacketCreator.enableActions());
            player.message("[StreetSys] Done.");
        } else if (sub[0].equalsIgnoreCase("help")) {
            player.message("**************************************************");
            player.message("@dispose - when you're stuck");
            player.message("@rates - lists the current server rates");
            player.message("@save - saves your character information");
            player.message("@str/@dex/@int@luk - allocates AP into the desired stat");
            player.message("**************************************************");
        } else if (sub[0].equalsIgnoreCase("rates")) {
            player.message("[StreetSys] Current EXP Rate: " + (int) c.getWorldServer().getExpRate() + "x");
            player.message("[StreetSys] Current MESO Rate: " + (int) c.getWorldServer().getMesoRate() + "x");
            player.message("[StreetSys] Current DROP Rate: " + (int) c.getWorldServer().getDropRate() + "x");
        } else if (sub[0].equalsIgnoreCase("save")) {
            player.saveToDB(true); 
            player.message("[StreetSys] Your character information has been saved.");
        } else if (sub[0].equalsIgnoreCase("str") || sub[0].equalsIgnoreCase("int") || sub[0].equalsIgnoreCase("luk") || sub[0].equalsIgnoreCase("dex")) {
            int amount = Integer.parseInt(sub[1]);
            if (amount > 0 && amount <= player.getRemainingAp() && amount < 31997) { 
                if (sub[0].equalsIgnoreCase("str") && amount + player.getStr() < 32001) {
                    player.setStr(player.getStr() + amount); 
                    player.updateSingleStat(MapleStat.STR, player.getStr());
                    player.message("[StreetSys] " + amount + " STR has been added, making your total: " + player.getStr());
                } else if (sub[0].equalsIgnoreCase("int") && amount + player.getInt() < 32001) {
                    player.setInt(player.getInt() + amount); 
                    player.updateSingleStat(MapleStat.INT, player.getInt());
                    player.message("[StreetSys] " + amount + " INT has been added, making your total: " + player.getInt());
                } else if (sub[0].equalsIgnoreCase("luk") && amount + player.getLuk() < 32001) {
                    player.setLuk(player.getLuk() + amount); 
                    player.updateSingleStat(MapleStat.LUK, player.getLuk());
                    player.message("[StreetSys] " + amount + " LUK has been added, making your total: " + player.getLuk());
                } else if (sub[0].equalsIgnoreCase("dex") && amount + player.getDex() < 32001) {
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
