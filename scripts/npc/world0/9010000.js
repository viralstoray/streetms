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
	Author: Biscuit
*/
var status = 0;

function start() {
	if (cm.getMapId() == 910000000) {
		cm.sendSimple("It looks like you have a #bBlue Wish Ticket#k! Would you like to use it now?\r\n#b#L0#Yes#l\r\n#L1#What does a Blue Wish Ticket get me?#l#k");
	}
}

function action(mode, type, selection) {
    if(mode != 1)
        cm.dispose();
    else {
        status++;
        if(status == 1) {
            if (selection == 0) {
				var em = cm.getEventManager("slimeRoom");
				if (em == null) {
                    cm.sendOk("Sorry, but this room is currently undergoing maintenance. Try again soon!");
					cm.dispose();
                } else if (em.getProperty("canEnter").equals("true")) {
					cm.gainItem(4031545, -1);
					em.startInstance(cm.getPlayer());
					cm.dispose();
				} else {
					cm.sendOk("Sorry, but this room is currently taken. Try again soon!");
					cm.dispose();
				}
			} else if (selection == 1) {
				cm.sendOk("A #bBlue Wish Ticket#k gives you access to our NX Slime room once for #r3 minutes#k. There you can kill NX Slimes that drop Cash Shop Items to your heart's content until the time's up.");
				cm.dispose();
			}
        }
    }
}