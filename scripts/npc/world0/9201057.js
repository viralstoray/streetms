/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
        Author :        BubblesDev
        NPC Name:       Bell
        Description:    Subway ticket seller and taker off.
*/

function start() {
    cm.sendYesNo("Hello, would you like to go to " + (cm.getPlayer().getMapId() == 600010001 ? "back to #bKerning City" : "#bNew Leaf City") + "?#k");
}

function action(mode, type, selection) {
    if(mode != 1){
        cm.dispose();
        return;
    }
    cm.warp(cm.getPlayer().getMapId() == 600010001 ? 103000100 : 600010001);
    cm.dispose();
}