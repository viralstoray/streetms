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
/* Fredrick NPC (9030000)
 * By kevintjuh93
 */

var status = -1;

function start() {
		cm.sendSimple("What would you like to do?\r\n#b#L0#Shop at FM Shop#l\r\n#L1#Retrieve items or mesos#l#k");
} 

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else {
        cm.dispose();
        return;
    }
	if (status == 0)
		if (selection == 0) {
			cm.getPlayer().getShop(1338);
			cm.dispose();
		} else if (selection == 1) {
			if (!cm.hasMerchant() && cm.hasMerchantItems()) {
				cm.showFredrick();
				cm.dispose();
			} else {
				if (cm.hasMerchant()) {
					cm.sendOk("You have a Merchant open.");
					cm.dispose();
				} else {
					cm.sendOk("You don't have any items or mesos to be retrieved.");
					cm.dispose();
				}
			}
		}
}