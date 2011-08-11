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
		qm.sendAcceptDecline("Shall we continue with your Basic Training? Before accepting, please make sure you have properly equipped your sword and your skills and potions are readily accessible.");
	} else if (status == 1) {
		qm.forceStartQuest();
		qm.showInfo("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow3");
		qm.dispose();
	}
}

function end(mode, type, selection) {
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
		qm.sendOk("Oh, you were able to defeat all the Murupias like I asked? You do look like you have gotten a bit stronger. Somewhere on the scale of...penguins flapping their wings?\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v2000022# 20 #t2000022#\r\n#v2000023# 20 #t2000023#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 450 exp");
	} else if (status == 1) {
		if (qm.canHold(2000022) && qm.canHold(2000023)) {
			qm.forceCompleteQuest();
			if (qm.isQuestCompleted(21016)) {
				qm.gainExp(450);
				qm.gainItem(2000022, 20);
				qm.gainItem(2000023, 20);
			}
			qm.sendOk("Train a bit more, and you may one day be strong enough to carry a penguin all by yourself. Now talk to me when you're ready to move on to the next level.", 9);
			qm.dispose();
		} else {
			qm.dropMessage(1,"Your inventory is full");   
			qm.dispose();
		}
	}
}