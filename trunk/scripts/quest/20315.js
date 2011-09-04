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
		qm.sendNext("The jewel you brought back from the Master of Disguise is Shinsoo's Teardrop. It is the crystalization of Shinsoo's powers. If the Black Mage gets his hands on this, then this spells doom for all of us.");
	} else if (status == 1) {
		qm.sendYesNo("For your effort in preventing a potentially serious disaster, the Empress has decided to present you with a new title. Are you ready to accept it?");
	} else if (status == 2) {
		qm.forceStartQuest();
		qm.forceCompleteQuest();
		qm.changeJobById(1511);
		qm.gainItem(1142068, 1);
		qm.teachSkill(15111004, 0, 20);
		qm.teachSkill(15111005, 0, 20);
		qm.sendOk("#h #, as of this moment, you are an Advanced Knight. From this moment on, you shall carry yourself with dignity and respect befitting your new title, an Advanced Knight of Cygnus. May your glory continue to shine as bright as this moment.");
		qm.dispose();
	}
}