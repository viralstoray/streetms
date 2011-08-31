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
		qm.sendNext("Seal Stone... It's an item that has been protected in Mu Lung for a long time. And now, someone is after it.", 9);
	} else if (status == 1) {
		qm.sendNextPrev("Please tell me everything you know about the Seal Stone.", 3);
	} else if (status == 2) {
		qm.sendAcceptDecline("I can't do that. How do I know that you're not as dangerous as the Shadow Knight? I must first test you. Do you want to take my #btest#k?");
	} else if (status == 3) {
		qm.forceStartQuest();
		qm.warp(925040001);
		qm.dispose();
	}
}