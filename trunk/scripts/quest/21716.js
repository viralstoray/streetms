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
			qm.sendOk("Aran, you cannot turn away from your destiny!");
			qm.dispose();
			return;
		}else{
			qm.dispose();
			return;
		}
	}
	
	if (status == 0) {
		qm.sendNext("So what did #Talking Tree# say?", 9);
	} else if (status == 1) {
		qm.sendNextPrev("#b(You tell him what you heard from Talking Tree)#k", 3);
	} else if (status == 2) {
		qm.sendAcceptDecline("A kid with a puppet? This seems very suspicious. I'm sure the kid is the reason why the Green Mushrooms have turned violent all of a sudden.", 9);
	} else if (status == 3) {
		qm.forceStartQuest();
		qm.sendOk("How dare that kid wreak havoc on the #bForest Down South#k. This is really a serious matter. Restoring the #bForest Down South#k will take years... Which means I'll have to devote my time to restoring that area now.");
	} else if (status == 4) {
		qm.sendNext("#b(I was able to find out what caused the changes to the Green Mushrooms. Now I should gather up the information and hand it over to Tru.)#k", 3);
	} else if (status == 5) {
		qm.dispose();
	}
}