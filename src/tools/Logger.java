/*
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation version 3 as published by
the Free Software Foundation. You may not use, modify or distribute
this program under any other version of the GNU Affero General Public
License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package tools;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import client.MapleCharacter;
import server.maps.MapleMap;

/**
 * Logs various events to the console and files
 * 
 * @author Scootz
 * @version %I% %G%
 */
public class Logger {
    
    private String chatLog = "chat.log";  // File to log all chat
    private PrintWriter chatLogger = null;
    private String commandLog = "commands.log"; // File to log all GM commands
    private PrintWriter commandLogger = null;
    private String errorLog = "error.log";  // File to log all errors
    private PrintWriter errorLogger = null;
    private Logger ioErrorLog = new Logger(false);
    private boolean persistentOpen;
    private SimpleDateFormat sdfDate = new SimpleDateFormat("yy-MM-dd HH:mm:ss");
    
    /**
     * Initializes a Logger object. persistentOpen will take effect
     * after the first write.
     * 
     * @param persistentOpen keep files open after first write (true),
     * or open and close for every write (false)
     */
    public Logger(boolean persistentOpen) {
        this.persistentOpen = persistentOpen;
    }
    
    /**
     * Logs chat messages to chatLog and optionally the console
     * 
     * @param player the {@link MapleCharacter} object of the player who spoke
     * @param message the message sent by the player
     * @param writeToConsole if true, write chat to the console
     * @return true if the write was successful, false if there was an error
     * @see #logCommand
     * @see #logError(client.MapleCharacter, java.lang.String, boolean)
     */
    public boolean logChat(MapleCharacter player, String message, int toWhom, boolean writeToConsole) {
        try {
            String name = player.getName();
            MapleMap mapObj = player.getMap();
            String map = mapObj.getMapName();
            int mapId = player.getMapId();
            Date now = new Date();
            
            if (writeToConsole) {
                System.out.format("[SAY] [%s] %s on map %s to %d: %s%n", sdfDate.format(now), name, map, toWhom, message);
            }
            if (chatLogger == null) {
                chatLogger = new PrintWriter(new BufferedWriter(new FileWriter(chatLog, true)));
            }
            chatLogger.format("[%s] %s on map %s (%d): %s%n", sdfDate.format(now), name, map, mapId, message);
            return true;
        } catch (Exception e) {
            ioErrorLog.logError(player, String.format("Error writing chat log to %s: %s", chatLog, e), true);
            chatLogger.close();
            chatLogger = null;
        } finally {
            if (!persistentOpen && chatLogger != null) {
                chatLogger.close();
                chatLogger = null;
            }
            return false;
        }
    }
    // TODO Implement chat logging

    /**
     * Logs GM commands to commandLog and optionally the console
     * 
     * @param player the {@link MapleCharacter} object 
     * of the player who gave the command
     * @param command the command given by the player
     * @param writeToConsole if true, write command to the console
     * @return true if the write was successful, false if there was an error
     * @see #logChat
     * @see #logError(client.MapleCharacter, java.lang.String, boolean)
     */
    public boolean logCommand(MapleCharacter player, String command, boolean writeToConsole) {
        try {
            String name = player.getName();
            MapleMap mapObj = player.getMap();
            String map = mapObj.getMapName();
            int mapId = player.getMapId();
            Date now = new Date();
            
            if (writeToConsole) {
                System.out.format("[CMD] [%s] %s on map %s: %s%n", sdfDate.format(now), name, map, command);
            }
            if (commandLogger == null) {
                commandLogger = new PrintWriter(new BufferedWriter(new FileWriter(commandLog, true)));
            }
            commandLogger.format("[%s] %s on map %s (%d): %s%n", sdfDate.format(now), name, map, mapId, command);
            return true;
        } catch (Exception e) {
            ioErrorLog.logError(player, String.format("Error writing command log to %s: %s", commandLog, e), true);
            commandLogger.close();
            commandLogger = null;
        } finally {
            if (!persistentOpen && commandLogger != null) {
                commandLogger.close();
                commandLogger = null;
            }
            return false;
        }
    }
    
    /**
     * logError(MapleCharacter, Exception, boolean)
     * Converts errors with Exception objects to a string and logs
     * 
     * @param player the {@link MapleCharacter} object
     * of the player who triggered the error, null if none
     * @param exception the <code>Exception</code> object
     * @param writeToConsole if true, write error to the console
     * @return true if the write was successful, false if there was an error
     * @see #logChat
     * @see #logCommand
     * @see #logError(client.MapleCharacter, java.lang.String, boolean)
     */
    public boolean logError(MapleCharacter player, Exception exception, boolean writeToConsole) {
        String error = exception.toString();
        return logError(player, error, writeToConsole);
    }
        
    
    /**
     * logError(MapleCharacter, String, boolean)
     * Logs errors to errorLog and optionally the console
     * 
     * @param player the {@link MapleCharacter} object
     * of the player who triggered the error, null if none
     * @param error the error message
     * @param writeToConsole if true, write error to the console
     * @return true if the write was successful, false if there was an error
     * @see #logChat
     * @see #logCommand
     * @see #logError(client.MapleCharacter, java.lang.Exception, boolean)
     */
    public boolean logError(MapleCharacter player, String error, boolean writeToConsole) {
        try {
            Date now = new Date();
            if (player != null) {
                String name = player.getName();
                MapleMap mapObj = player.getMap();
                String map = mapObj.getMapName();
                int mapId = player.getMapId();
                
                if (writeToConsole) {
                    System.err.println(String.format("[ERR] [%s] %s on map %s: %s", sdfDate.format(now), name, map, error));
                }
                if (errorLogger == null) {
                    errorLogger = new PrintWriter(new BufferedWriter(new FileWriter(errorLog, true)));
                }
                errorLogger.println(String.format("[%s] %s on map %s (%d): %s", sdfDate.format(now), name, map, mapId, error));
            } else {
                if (writeToConsole) {
                    System.err.println(String.format("[ERR] [%s] %s", sdfDate.format(now), error));
                }
                if (errorLogger == null) {
                    errorLogger = new PrintWriter(new BufferedWriter(new FileWriter(errorLog, true)));
                }
                errorLogger.println(String.format("[%s] %s", sdfDate.format(now), error));
            }
            return true;
        } catch (Exception e) {
            System.err.format("Error writing error log to %s: %s%n", errorLog, e);
            errorLogger.close();
            errorLogger = null;
        } finally {
            if (!persistentOpen && errorLogger != null) {
                errorLogger.close();
                errorLogger = null;
            }
            return false;
        }
    }
    
}
