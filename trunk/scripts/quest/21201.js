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
		qm.sendNext("First you promise to defeat the Black Mage and make me a famous weapon, then you abandon me for hundreds of years, and now you're telling me you don't remember who I am? What the..?! Do you think I'll let you get away with that? You're the one who begged and pined for me!", 9);
	} else if (status == 1) {
		qm.sendNextPrev("I did tell Sir Blacksmith to make a polearm for me if I could prove my worth.", 3);
	} else if (status == 2) {
		qm.sendNextPrev("After all that begging, shouldn't you treat me with a little more love and respect? Ya know, a weapon like me's a rare and wonderful thing. I am the ultimate Giant Polearm that can help you defeat the Black Mage. How could you ditch me for hundreds of years...", 9);
	} else if (status == 3) {
		qm.sendNextPrev("Hey, I never begged for you.", 3);
	} else if (status == 4) {
		qm.sendNextPrev("What? You never begged for me? Ha! Sir Blacksmith told me you got on your knees, begged for me in tears, and... Wait a sec. Aran! Did you just remember who I am?!", 9);
	} else if (status == 5) {
		qm.sendNextPrev("Maybe a little bit...", 3);
	} else if (status == 6) {
		qm.sendNextPrev("Aran, it's you! *Sniff sniff* Wait, *ahem* I didn't get emotional, it's just allergies. I know the Black Mage has stripped you of your abilities so you probably don't even have the strength to lift me...but at least you remember me! I'm glad that your memory's starting to return.", 9);
	} else if (status == 7) {
		qm.sendYesNo("Even though you've lost your memory, you're still my master. You endured some very tough training in the past, and I'm sure your body still remembers the skills that got you through those hard times. Alright, I'll restore your abilities!");
	} else if (status == 8) {
		qm.forceCompleteQuest();
		qm.changeJobById(2110);
		qm.sendNext("Your level isn't what it used to be back in your glory days, so I can't restore all your old abilities. But the few that I can restore should help you level up faster. Now hurry up and train so you can return to the old you.");
		qm.dispose();
	}
}