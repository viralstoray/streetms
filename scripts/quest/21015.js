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