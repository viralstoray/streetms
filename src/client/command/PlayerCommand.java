package client.command;

import client.MapleCharacter;
import client.MapleClient;
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
        if (sub[0].equals("dispose")) {
            NPCScriptManager.getInstance().dispose(c);
            c.announce(MaplePacketCreator.enableActions());
            player.message("Done.");
        } else if (sub[0].equals("help")) {
            player.message("**************************************************");
            player.message("@dispose - when you're stuck");
            player.message("**************************************************");
        } else {
            return false;
        }
        return true;
    }
    
}
