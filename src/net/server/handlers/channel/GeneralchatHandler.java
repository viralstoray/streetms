/*
This file is part of the OdinMS Maple Story Server
Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
Matthias Butz <matze@odinms.de>
Jan Christian Meyer <vimes@odinms.de>

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
package net.server.handlers.channel;

import client.MapleCharacter;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;
import client.MapleClient;
import client.command.GMCommand;
import client.command.PlayerCommand;

public final class GeneralchatHandler extends net.AbstractMaplePacketHandler {

    public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        String s = slea.readMapleAsciiString();
        MapleCharacter chr = c.getPlayer();
        char heading = s.charAt(0);
        // if we have a command, parse it
        if (heading == '!' || heading == '@') {
            String[] sp = s.split(" ");
            sp[0] = sp[0].toLowerCase().substring(1);
            if (chr.isGM()) {
                if (!GMCommand.execute(c, sp)) {
                    chr.getMap().broadcastMessage(MaplePacketCreator.getGMChatText(chr, s, slea.readByte()));
                }
            } else {
                if (!PlayerCommand.execute(c, sp)) {
                    chr.getMap().broadcastMessage(MaplePacketCreator.getChatText(chr.getId(), s, false, slea.readByte()));
                }
            }
        // if not, pass it through
        } else {
            if (chr.isGM()) {
                chr.getMap().broadcastMessage(MaplePacketCreator.getGMChatText(chr, s, slea.readByte()));
            } else {
                chr.getMap().broadcastMessage(MaplePacketCreator.getChatText(chr.getId(), s, false, slea.readByte()));
            }
        }
    }
}

