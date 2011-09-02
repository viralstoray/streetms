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
		qm.sendNext("You must have worked diligently, seeing how you've already reached Lv. 10. Very well, then. I think you're ready to progress. You have what it takes to become a Knight-in-Training. But before anything, I'd like to ask you a question. Have you thought about what kind of Knight you would like to become?");
	} else if (status == 1) {
		qm.sendNextPrev("There are 5 different paths of Cygnus Knights to choose from. The choice is completely yours, but you can't change your mind after you've made your decision, so spend some time considering your options. Let me show you what you would look like if you were to become a Knight.");
	} else if (status == 2) {
		qm.sendSimple("What do you think? Would you like to see yourself as a Knight first? It's pointless if you've already made up your mind.\r\n#b#L0#I want to see what I would look like as a Chief Knight.#l\r\n#L1#No, thanks. I don't need to see what I'd look like as a Chief Knight.#l#k");
	} else if (status == 3) {
		select = selection;
		if (select == 0)
			qm.sendYesNo("Would you like to see what you would look like as a Chief Knight? You will be able to select your Job after. Please talk to #e#bShinsoo#k#n once you decide on a path. The choice is completely yours.");
		else if (select == 1)
			qm.sendNext("Okay, please talk to #e#bShinsoo#k#n once you decide on a path. The choice is completely yours.");
	} else if (status == 4) {
		qm.forceStartQuest();
		qm.forceStartQuest(20100);
		qm.forceCompleteQuest(20100);
		if (!qm.isQuestCompleted(20017))
			qm.forceCompleteQuest(20017);
		if (!qm.isQuestCompleted(20018))
			qm.forceCompleteQuest(20018);
		if (!qm.isQuestCompleted(20019))
			qm.forceCompleteQuest(20019);
		qm.removeGuide();
		if (select == 0)
			qm.warp(913040100);
		qm.dispose();
	}
}