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

function end(mode, type, selection) {
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
		qm.sendAcceptDecline("So, you brought all the Proof of Exam. Okay, I believe that you are now qualified to become an official knight. Do you want to become one?");
	} else if (status == 1) {
		qm.forceCompleteQuest();
		qm.changeJobById(1110);
		qm.gainItem(1142067, 1);
		qm.removeAll(4032096);
		qm.sendNext("You are a Knight-in-Training no more. You are now an official Knight of Cygnus.");
	} else if (status == 2) {
		qm.sendNext("I have given you some #bSP#k. I have also given you a number of skills for a Dawn Warrior that's only available to knights, so I want you to work on it and hopefully cultivate it as much as your soul.");
	} else if (status == 3) {
		qm.sendPrev("Now that you are officially a Cygnus Knight, act like one so that you will continue to honor the Empress.");
		qm.dispose();
	}
}