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
		qm.sendNext("What can I do for you? Tru sent me a message saying that you've been training diligently in Victoria Island while helping him with his work. What is it? What? The Black Wings?", 9);
	} else if (status == 1) {
		qm.sendNextPrev("#b(You tell her about the Puppeteer and the Black Wings, and about their mission.)#k", 3);
	} else if (status == 2) {
		qm.sendNextPrev("I see... I didn't know there was a group called the Black Wings... They must be fools if they're trying to revive the Black Mage, knowing how dangerous he is.", 9);
	} else if (status == 3) {
		qm.sendNextPrev("That...that's true.\r\n#b(She's definitely not afraid to speak her mind.)#k", 3);
	} else if (status == 4) {
		qm.sendNextPrev("The Book of Prophecy states that the hero will revive and fight against the Black Mage. I wasn't sure if that was true, but this confirms that the Black Mage is still around.", 9);
	} else if (status == 5) {
		qm.sendNextPrev("Aren't you scared?", 3);
	} else if (status == 6) {
		qm.sendYesNo("Scared? Pfft. Who cares if the Black Mage appears. You'll be here to protect us. If anything, this makes me want to prepare you for the big battle. Ah, that reminds me, I found a #bskill#k. Would you like to see it?");
	} else if (status == 7) {
		qm.teachSkill(21001003, 0, 20);
		qm.forceCompleteQuest();
		qm.sendNext("#b(You remembered the Polearm Booster skill.)#k", 3);
	} else if (status == 7) {
		qm.sendNext("This skill was found in an ancient incomprehensible script. I had a hunch it might be a skill you used in the past, and I think I was right. You're not as strong as you used to be, but you'll get there, in time.", 9);
	} else if (status == 8) {
		qm.sendNextPrev("You are steadily becoming more powerful, and I'll be here to keep motivating you. You have nothing to be afraid of. You will not lose the battle. You didn't emerge from ice only to lose to the Black Mage, did you? This time, you'll finish him, once and for all.", 9);
	} else if (status == 9) {
		qm.sendPrev("To do so, there's only one thing you can do. Train, train, train... Head to Victoria Island and continue training. Let's make sure you become so powerful that the Black Mage doesn't stand a chance!", 9);
		qm.dispose();
	}
}