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
		qm.sendNext("Now, you will undergo a test that will determine whether you're fit or not. All you have to do is take on the most powerful monster on this island. Murukuns. About #r50#k of them would suffice, but...");
	} else if (status == 1) {
		qm.sendAcceptDecline("We can't have you wipe out the entire population of Murukuns, since there aren't many of them out there. How about 5 of them? You're here to train, not to destroy the ecosystem.");
	} else if (status == 2) {
		qm.forceStartQuest();
		qm.showInfo("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow4");
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
		qm.sendOk("I see that you have defeated all 5 Murukuns. Have you noticed how much stronger you've gotten since the first training session? Well, now that you're ready, let's get on with the real training, and... Wait!\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 1200 exp");
	} else if (status == 1) {
		qm.sendNext("Come to think of it, I still have yet to ask you your name, dear hero. You are one of the five heroes, yes, but which of them are you? You lost all of your memories, so you probably can't answer...");
	} else if (status == 2) {
		qm.sendNextPrev("It's time for your to begin your real training so you can defeat the Black Mage, but we must first know which of the five heroes you are so we can create a training program that caters to your strengths. There's no point learning skills for weapons you've never used. That won't help you against the Black Mage either.");
	} else if (status == 3) {
		qm.sendPrev("But really...who are you?");
		qm.forceCompleteQuest();
		qm.gainExp(1200);
	}
}