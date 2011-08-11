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
		qm.sendNext("Alright, I've done enough explaining for now. Let's move on to the next stage. What's the next stage, you ask? I just told you. Train as hard as you can until you become strong enough to defeat the Black Mage with a single blow.");
	} else if (status == 1) {
		qm.sendNextPrev("You may have been a hero in the past, but that was hundreds of years ago. Even if it weren't for the curse of the Black Mage, all those years you spent frozen in time have stiffened your body. You must loosen up a bit and slowly regain your agility. How do you do that, you ask?");
	} else if (status == 2) {
		qm.sendAcceptDecline("Don't you know that you must first master the fundamentals? So the wise thing to do is to begin with #bBasic Training#k. Oh, of course. I forgot that you lost your memory. Well, that's why I'm here. You'll just have to experience it yourself. Shall we begin?");
	} else if (status == 3) {
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
		qm.sendOk("Were you able to defeat the Murupas? I mean, those monsters are the easiest ones you can find around here. So easy that you can swing a sword around blindfolded and still defeat them. C'mon, a hero that's even slower than a penguin? That's embarrassing...\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v2000022# 15 #t2000022#\r\n#v2000023# 15 #t2000023#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 320 exp");
	} else if (status == 1) {
		if (qm.canHold(2000022) && qm.canHold(2000023)) {
			qm.forceCompleteQuest();
			if (qm.isQuestCompleted(21015)) {
				qm.gainExp(320);
				qm.gainItem(2000022, 15);
				qm.gainItem(2000023, 15);
				qm.dispose();
			}
			qm.sendOk("That was a bit better than the penguins, but still not enough. Let's move to the next level. Talk to me when you're ready.", 9);
		} else {
			qm.dropMessage(1,"Your inventory is full");   
			qm.dispose();
		}
	}
}