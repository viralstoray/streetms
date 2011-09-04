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
		qm.sendNext("#h #... First of all, thank you for your great work. If it weren't for you, I... I wouldn't be safe from the curse of Black Witch. Thank you so much.");
	} else if (status == 1) {
		qm.sendNextPrev("If nothing else, this chain of events makes one thing crystal clear, you have put in countless hours of hard work to better yourself and contribute to the Cygnus Knights.");
	} else if (status == 2) {
		qm.sendAcceptDecline("To celebrate your hard work and accomplishments... I would like to award you a new title. Will you... accept this?");
	} else if (status == 3) {
		qm.forceStartQuest();
		qm.forceCompleteQuest();
		qm.changeJobById(qm.getJobId() + 1);
		qm.gainItem(1142069, 1);
		qm.sendOk("#h #. For courageously battling the Black Mage, I will appoint you as the new Chief Knight of Cygnus from this moment forward. Please use your power and authority wisely to help protect the citizens of the Maple World.");
		qm.dispose();
	}
}