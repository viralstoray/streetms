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
		qm.sendNext("Your abilities are really beginning to take shape. I am surprised that an old man like me was able to help you. I'm tearing up just thinking about how happy it makes me to have been of assistance to you. *Sniff sniff*");
	} else if (status == 1) {
		qm.sendNextPrev("#b(You didn't even train that long with him... Why is he crying?)#k", 3);
	} else if (status == 2) {
		qm.sendNextPrev("Alright, here's the third and the final stage of training. Your last opponent is... #rTarget Pigs#k! Do you know anything about Pigs?");
	} else if (status == 3) {
		qm.sendNextPrev("Well, a little bit...", 3);
	} else if (status == 4) {
		qm.sendNextPrev("They are natural warriors! They're born with a votacious appetite for food. They devour any food that's visible the moment they sweep by. Terrifying, isn't it?");
	} else if (status == 5) {
		qm.sendNextPrev("#b(Is that really true?)#k", 3);
	} else if (status == 6) {
		qm.sendAcceptDecline("Okay, now... #bEnter the Training Center again#k, defeat #r30#k Target Pigs, and show me what you're made of! You'll have to evert all your energy to defeat them! Go, go, go! Rise above me!");
	} else if (status == 7) {
		qm.forceStartQuest();
		qm.sendOk("Now go and take on those monstrous Target Pigs!");
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
		qm.sendNext("Ah, you've come back after defeating all 30 Target Pigs. I knew you had it in you... Even though you have no memories and few abilities, I could see that you were different! How? Because you're carrying around a Polearm, obviously!");
	} else if (status == 1) {
		qm.sendNextPrev("#b(Is he pulling your leg?)#k", 3);
	} else if (status == 2) {
		qm.sendYesNo("I have nothing more to teach you, as you've surpassed my level of skill. Go now! Don't look back! This old man is happy to have served as your instructor.");
	} else if (status == 3) {
		qm.teachSkill(21000000, 0, 10);
		qm.forceCompleteQuest();
		qm.sendNext("(You remembered the #bCombo Ability#k skill! You were skeptical of the training at first, since the old man suffers form Alzheimer's and all, but boy, was it effective!)", 3);
	} else if (status == 4) {
		qm.sendPrev("Now report back to Lilin. I know she'll be ecstatic when she sees the progress you've made!");
		qm.dispose();
	}
}