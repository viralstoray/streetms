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
		qm.sendNext("There isn't many records left of the heroes that fought against the Black Mage. Even in the Book of Prophecy, the only information available is that there were five of them. There is nothing about who they were or what they looked like. Is there anything you remember? Anything at all?", 9);
	} else if (status == 1) {
		qm.sendNextPrev("I don't remember a thing...", 3);
	} else if (status == 2) {
		qm.sendNextPrev("As I expected. Of course, the curse of the Black Mage was strong enough to wipe out all of your memory. But even if that's the case, there has got to be a point where the past will become uncovered, especially now that we are certain you are one of the heroes. I know you've lost your armor and weapon during the battle but... Oh, yes, yes. I almost forgot! Your #bweapon#k!", 9);
	} else if (status == 3) {
		qm.sendNextPrev("My weapon?", 3);
	} else if (status == 4) {
		qm.sendNextPrev("I found an incredible weapon while digging through blocks of ice a while back. I figured the weapon belonged to a hero, so I brought it to town and placed it somewhere in the center of town. Haven't you seen it? #bThe Giant Polearm#k...\r\n#i4032372#\r\nIt looks like this...", 9);
	} else if (status == 5) {
		qm.sendNextPrev("Come to think of it, I did see a Giant Polearm in town.", 3);
	} else if (status == 6) {
		qm.sendAcceptDecline("Yes, that's it. According to what's been recorded, the weapon of a hero will recognize its rightful owner, and if you're the hero that used the Giant Polearm, the Giant Polearm will react when you grab the Giant Polearm. Please go find the #bGiant Polearm and click on it#k.");
	} else if (status == 7) {
		qm.sendOk("If the Giant Polearm reacts to you, then we'll know that you're #bAran#k, the hero that wielded a Giant Polearm.");
		qm.showIntro("Effect/Direction1.img/aranTutorial/ClickPoleArm");
		qm.forceStartQuest();
		qm.forceCompleteQuest();
		qm.dispose();
	}
}