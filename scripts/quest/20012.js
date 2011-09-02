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
		qm.sendNext("I've been waiting for you, #h #. My name is Kinu and I'm the third brother you are going to meet. So you've learned about using Regular Attacks, correct? Well, next you'll be learning about your #bSkills#k, which you will find very helpful in the Maple World.");
	} else if (status == 1) {
		qm.sendNextPrev("You earn Skill Points every time you level up, which means you probably have a few saved up already. Press the #bK key#k to see your skills. Invest your Skill Points in the skill you wish to strengthen and don't forget to #bplace the skill in a Quick Slot for easy use#k.");
	} else if (status == 2) {
		qm.sendAcceptDecline("Time to practice before you forget. You will find a lot of Tivs in this area. Why don't you hunt #r3 Tivs#k using your #bThree Snails skill and bring me 1 Tiv's Feather#k as proof? I'll wait for you here.");
	} else if (status == 3) {
		qm.forceStartQuest();
		qm.guideHint(7);
		qm.dispose();
	}
}

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
		qm.sendNext("You've successfully defeated the Tiv and brought me a Tiv's Feather. That's very impressive! #bYou earn 3 Skill Points every time you level up...after you officially become a knight, that is. Keep following the arrow left, and you'll meet Kia#k, who will guide you through the next step.\r\n\r\n#fUI/UIWindow.img/Quest/reward#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 40 exp");
	} else if (status == 1) {
		qm.forceCompleteQuest();
		qm.gainItem(4000483, -1);
		qm.gainExp(40);
		qm.dispose();
	}
}