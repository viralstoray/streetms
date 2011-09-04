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
import client.MapleClient;
import client.MapleInventoryType;
import java.net.InetAddress;
import java.net.UnknownHostException;
import net.AbstractMaplePacketHandler;
import server.MapleInventoryManipulator;
import server.MaplePortal;
import server.maps.MapleMap;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;

public final class ChangeMapHandler extends AbstractMaplePacketHandler {

    @Override
    public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        MapleCharacter chr = c.getPlayer();

        if (chr.isBanned()) {
            return;
        }

        if (slea.available() == 0) { //Cash Shop :)
            String[] socket = c.getChannelServer().getIP().split(":");
            chr.getCashShop().open(false);
            c.getChannelServer().removePlayer(chr);
            c.updateLoginState(MapleClient.LOGIN_NOTLOGGEDIN);
            try {
                c.announce(MaplePacketCreator.getChannelChange(InetAddress.getByName(socket[0]), Integer.parseInt(socket[1])));
            } catch (UnknownHostException ex) {
            }
        } else {
            try {
                slea.readByte(); // 1 = from dying 0 = regular portals
                int targetid = slea.readInt();
                String startwp = slea.readMapleAsciiString();
                MaplePortal portal = chr.getMap().getPortal(startwp);
                slea.readByte();
                boolean wheel = slea.readShort() > 0;
                if (targetid != -1 && !chr.isAlive()) {
                    boolean executeStandardPath = true;
                    if (chr.getEventInstance() != null) {
                        executeStandardPath = chr.getEventInstance().revivePlayer(chr);
                    }
                    if (executeStandardPath) {
                        MapleMap to = chr.getMap();
                        if (wheel && chr.getItemQuantity(5510000, false) > 0) {
                            MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, 5510000, 1, true, false);
                            chr.announce(MaplePacketCreator.showWheelsLeft(chr.getItemQuantity(5510000, false)));
                        } else {
                            chr.cancelAllBuffs(false);
                            to = chr.getMap().getReturnMap();
                            chr.setStance(0);
                        }
                        chr.setHp(50);
                        chr.changeMap(to, to.getPortal(0));
                    }
                } else if (targetid != -1 && chr.isGM()) {
                    MapleMap to = c.getChannelServer().getMapFactory().getMap(targetid);
                    chr.changeMap(to, to.getPortal(0));
                    chr.unlockUI();
                } else if (targetid != -1 && !chr.isGM()) {//Thanks celino for saving me some time (:
                    final int divi = chr.getMapId();
                    boolean warp = false;
                    if (divi == 0) {
                        if (targetid == 10000) {
                            warp = true;
                        }
                    } else if (divi == 2010000) {
                        if (targetid == 104000000) {
                            warp = true;
                        }
                    } else if (divi == 913040100) {
                        if (targetid == 130000000 || targetid == 913040000 || targetid == 913040001 || targetid == 913040002 || targetid == 913040003 || targetid == 913040004 || targetid == 913040005 || targetid == 913040006) { // Cygnus introduction
                            warp = true;
                        }
                    } else if (divi == 914090000) { // Aran Introduction
                        if (targetid == 914090011 || targetid == 914090012 || targetid == 914090013 || targetid == 140090000) {
                            warp = true;
                        }
                    } else if (divi == 913040100) { // Cygnus Job Tutorial
                        if (targetid == 913040100 || targetid == 913040101 || targetid == 913040102 || targetid == 913040103 || targetid == 913040104 || targetid == 913040105 || targetid == 913040106) {
                            warp = true;
                        }
                    } else if (divi == 914090100) { // Aran 1st Job Advancement Clip
                        if (targetid == 140000000) {
                            warp = true;
                        }
                    } else if (divi / 10 == 102000) { // Adventurer movie clip Intro
                        if (targetid == 1020000) {
                            warp = true;
                        }
                    } else if (divi == 914090200) { // Aran 2nd Job Advancement Clip
                        if (targetid == 140000000) {
                            warp = true;
                        }
                    } else if (divi == 914090201) { // Aran 2nd Job Advancement Clip #2
                        if (targetid == 140030000) {
                            warp = true;
                        }
                    }
                    if (warp) {
                        final MapleMap to = c.getChannelServer().getMapFactory().getMap(targetid);
                        chr.changeMap(to, to.getPortal(0));
                        chr.unlockUI();
                    }
                }
                if (portal != null && !portal.getPortalStatus()) {
                    c.announce(MaplePacketCreator.blockedMessage(1));
                    c.announce(MaplePacketCreator.enableActions());
                    return;
                }
                if (chr.getMapId() == 109040004) {
                    chr.getFitness().resetTimes();
                }
                if (chr.getMapId() == 109030003 || chr.getMapId() == 109030103) {
                    chr.getOla().resetTimes();
                }
                if (portal != null) {
                    portal.enterPortal(c);
                } else {
                    c.announce(MaplePacketCreator.enableActions());
                }
                chr.setRates();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

    }
}
