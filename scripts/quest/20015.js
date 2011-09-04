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
	Author : Biscuit
*/
var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode != 1) {
		if(type == 1 && mode == 0) {
			qm.dispose();
			return;
		}else{
			qm.dispose();
			return;
		}
	}
	
	if (status == 0) {
		qm.sendNext("Did you know? The Maple World may look peaceful, but certain areas are filled with forces of darkness. The Black Mage and those who want to revive the Black Mage are threatening the Maple World.");
	} else if (status == 1) {
		qm.sendNextPrev("We can't just sit here and do nothing while our enemies get stronger. Our own fear will will only come back to haunt us.");
	} else if (status == 2) {
		qm.sendAcceptDecline("But I won't worry too much... Someone as determined as you will be able to protect the Maple World from danger, right? If you are brave enough to volunteer to become one of the Knights, I know I can count on you.\r\n\r\n#fUI/UIWindow.img/Quest/reward#\r\n#v1142065# #z1142065# - 1");
	} else if (status == 3) {
		qm.forceStartQuest();
		qm.forceCompleteQuest();
		qm.forceCompleteQuest(29905);
		qm.gainItem(1142065, 1);
		qm.sendNext("Heehee, I knew you'd say yes.");
	} else if (status == 4) {
		qm.sendOk("Neinheart, my Tactician, who is standing right next to me, will help you become an honorable Knight. I'll be looking forward to your progress. I'm counting on you!");
		qm.dispose();
	}
}