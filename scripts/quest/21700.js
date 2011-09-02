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
		qm.sendNext("It seems like you've started to remember things. Your Polearm must have recognized you. This means you are surely #bAran, the wielder of Polearms#k. Is there anything else you remember? Skills you used with the Polearm perhaps? Anything?", 9);
	} else if (status == 1) {
		qm.sendNextPrev("#b(You tell her that you remember a few skills.)#k", 3);
	} else if (status == 2) {
		qm.sendNextPrev("That's not a lot, but it's progress. Our focus, then, should be to get you back to the state before you were frozen. You may have lost your memory, but I'm sure it won't take long for you to recover the abilities that your body remembers.", 9);
	} else if (status == 3) {
		qm.sendNextPrev("How do I recover my abilities?", 3);
	} else if (status == 4) {
		qm.sendAcceptDecline("There is only one way to do that. Train! Train! Train! Train! If you continue to train, your body will instinctively remember its abilities. To help you through the process, I'll introduce you to an instructor.");
	} else if (status == 5) {
		qm.sendNext("I gave you a #bPolearm#k because I figured it would be best for you to use a weapon you're familiar with. It will be useful in your training.");
		qm.gainItem(1142129, 1);
		qm.gainItem(1442077, 1);
	} else if (status == 6) {
		qm.sendPrev("You'll find a Training Center if you exit to the #bleft#k. There, you'll meet #bPuo#k. I'm a bit worried because I think he may be struggling with bouts of Alzheimer's, but he spent a long time researching skills to help you. I'm sure you'll learn a thing or two from him.");
		qm.forceStartQuest();
		qm.dispose();
	}
}