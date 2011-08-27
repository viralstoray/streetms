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
/*
	Author: Biscuit
*/
var status = 0;

function start() {
	if (cm.getMapId() == 550000000 || cm.getMapId() == 551000000)
		cm.sendYesNo("Would you like to go back to #bCBD#k now?");
	else
		cm.sendSimple("Hello, where would you like to go?\r\n#b#L0#Trend Zone Metropolis#l\r\n#L1#Kampung Village#l#k");
}

function action(mode, type, selection) {
    if(mode != 1)
        cm.dispose();
    else {
        status++;
        if(status == 1) {
			if (cm.getMapId() == 550000000 || cm.getMapId() == 551000000) {
				cm.warp(540000000);
				cm.dispose();
				return;
			}
			select = selection;
			cm.sendYesNo("Are you sure you want to go to #b" + (select == 0 ? "Trend Zone Metropolis" : "Kampung Village") + "#k?");
        } else if (status == 2) {
			cm.warp(select == 0 ? 550000000 : 551000000);
			cm.dispose();
		}
    }
}