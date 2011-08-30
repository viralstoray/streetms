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
var status = -1;

function start() {
	if (!cm.haveItem(4032322))
		cm.sendNext("You again? How in the world did you get in? I thought I warned you not to stand in my way!", 9);
	else
		cm.dispose();
}

function action(mode, type, selection) {
    if(mode != 1) {
        cm.dispose();
    } else {
        status++;
		if (status == 0) {
			cm.sendNextPrev("What exactly are you trying to do? Why are you controlling those monsters? Tell me what the Black Wings are up to!", 3);
		} else if (status == 1) {
			cm.sendNextPrev("Hmph, I don't have to tell you anything! Now prepare to die!", 9);
		} else if (status == 2) {
			cm.hideNpc(1104000);
			cm.spawnMonster(9300344, 679, 245);
			cm.dispose();
		}
    }
}