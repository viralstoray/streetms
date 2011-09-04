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
	if (cm.haveItem(4032096, 30) || cm.haveItem(4032097, 30) || cm.haveItem(4032098, 30) || cm.haveItem(4032099, 30) || cm.haveItem(4032100, 30))
		cm.sendYesNo("Have you found all the proof for the test? Do you want to get out of here?");
	else
		cm.sendYesNo("You have not completed your exam yet. If you leave now you'll have to start over again. Do you want to get out of here?");
}

function action(mode, type, selection) {
    if(mode != 1)
        cm.dispose();
    else {
        status++;
        if(status == 1) {
			if (!cm.haveItem(4032096, 30) && !cm.haveItem(4032097, 30) && !cm.haveItem(4032098, 30) && !cm.haveItem(4032099, 30) && !cm.haveItem(4032100, 30)) {
				cm.removeAll(4032096);
				cm.removeAll(4032097);
				cm.removeAll(4032098);
				cm.removeAll(4032099);
				cm.removeAll(4032100);
			}
            cm.warp(130020000, "in01");
			cm.dispose();
        }
    }
}