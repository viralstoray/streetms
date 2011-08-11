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
		qm.sendNext("It seems like you're warmed up now. This is when rigorous training can really help you build a strong foundation. Let's proceed with the Basic Training, shall we?", 9);
	} else if (status == 1) {
		qm.sendNextPrev("Go defeat some #rMurumurus#k in #bSnow-covered Field 3#k this time. I think about #r20#k should do it. Go on ahead and... Hm? Do you have something you'd like to say?", 9);
	} else if (status == 2) {
		qm.sendNextPrev("Isn't the number getting bigger and bigger?", 3);
	} else if (status == 3) {
		qm.sendNextPrev("Of course it is. What, are you not happy with 20? Would you like to defeat 100 of them instead? Oh, how about 999 of them? Someone in Sleepywood would be able to do it easily. After all, we are training...", 9);
	} else if (status == 4) {
		qm.sendNextPrev("Oh no, no, no. Twenty is plenty.", 3);
	} else if (status == 5) {
		qm.sendAcceptDecline("You don't have to be so modest. I understand your desire to quickly become the hero you once were. This sort of attitude is what makes you a hero.", 9);
	} else if (status == 6) {
		qm.sendNext("#b(You accepted, thinking you might end up having to defeat 999 of them if you let her keep talking.)#k", 3);
	} else if (status == 7) {
		qm.sendNextPrev("Please go ahead and slay 20 Murumurus.", 9);
	} else if (status == 8) {
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
		qm.sendNext("You were able to successfully defeat all the Murumurus. Were they enough for you to get some training done? I guess you'll need to take on about...300...of them now?\r\n#b#L0#(Oh heck no...)#l#k");
	} else if (status == 1) {
		qm.sendOk("Well, that was wishful thinking. You look like your stamina has significantly improved already. I don't think you'll need to go through 300 of them now.\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v2000022# 25 #t2000022#\r\n#v2000023# 25 #t2000023#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 550 exp");
	} else if (status == 1) {
		if (qm.canHold(2000022) && qm.canHold(2000023)) {
			qm.forceCompleteQuest();
			if (qm.isQuestCompleted(21016)) {
				qm.gainExp(550);
				qm.gainItem(2000022, 25);
				qm.gainItem(2000023, 25);
			}
			qm.sendOk("Now I want you to go through a physical fitness test to see if you're ready for more. Talk to me when you're ready.", 9);
			qm.dispose();
		} else {
			qm.dropMessage(1,"Your inventory is full");   
			qm.dispose();
		}
	}
}