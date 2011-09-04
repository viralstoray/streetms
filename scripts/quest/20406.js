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
		qm.sendNext("Hmmm? What are you doing here? Aren't you supposed to be out there helping Dunamis? ...What? Dunamis's mission is completed? Only a note has been left behind saying that he has already gone back to Ereve? What are you talking about? #rDunamis never returned to Ereve.#k");
	} else if (status == 1) {
		qm.sendAcceptDecline("Something doesn't add up. The fact that Dunamis, who's ALWAYS on top of things, disappeared without leaving his contact information, was suspicious enough for me to assign you to him, and now..... Hmmm... So you're saying that he last remnants of Dunamis is at the cave of Black Witch, right?");
	} else if (status == 2) {
		qm.forceStartQuest();
		qm.forceCompleteQuest();
		qm.sendOk("Please re-enter #bBlack Witch's Cave#k, and search for any other types of evidence left behind by Dunamis. Who knows, you may have missed something. We, too, will do our best to find him.");
		qm.dispose();
	}
}