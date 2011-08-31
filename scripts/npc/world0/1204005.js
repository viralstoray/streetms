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
	if (cm.getNumMobs() == 0 && cm.getPlayerVariable("PUPPET_KILLED") == null)
		cm.sendNext("They... just ambushed me. and... don't worry about me, just eliminate him first!");
	else if (cm.getNumMobs() == 0)
		cm.sendNext("What... were you able to defeat them? Wow... of course, you're Aran the hero. Hmph... let's clean this place up first.");
}

function action(mode, type, selection) {
    if(mode != 1) {
        cm.dispose();
    } else {
        status++;
		if (status == 0) {
			if (cm.getPlayerVariable("PUPPET_KILLED") == "no") {
				cm.deletePlayerVariable("PUPPET_KILLED");
				cm.warp(104000004);
				cm.dispose();
				cm.openNpc(1002104);
			} else
				cm.sendNextPrev("Who?!", 3);
		} else if (status == 1) {
			cm.spawnMonster(9300345, 100, 116);
			cm.setPlayerVariable("PUPPET_KILLED", "no");
			cm.sendOk("Him!!");
			cm.dispose();
		}
    }
}