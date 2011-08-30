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

function start() {
	if (!cm.isQuestStarted(21202))
		cm.sendNext("Hmm... What's a young person like you doing in this secluded place?", 9);
	else
		cm.dispose();
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
    } else {
        status++;
        if (status == 0) {
			cm.sendNextPrev("I've come to get the best Polearm there is!", 3);
		} else if (status == 1) {
			cm.sendNextPrev("The best Polearm? You should be able to purchase it in some town or other...", 9);
		} else if (status == 2) {
			cm.sendNextPrev("I hear that you are the best blacksmith in all of the Maple World! I want nothing less than a weapon made by you!", 3);
		} else if (status == 3) {
			cm.sendAcceptDecline("I'm too old to make weapons now, but...I do have a Polearm that I made way back when. It's still in excellent shape. But I can't give it to you because that Polearm is extremely sharp, so sharp it could even hurt its master. Do you still want it?");
		} else if (status == 4) {
			cm.forceStartQuest(21202, 1203000);
			cm.sendOk("Well, if you say so... I can't object to that. I'll tell you what. I'll give you a quick test, and if you pass it, the Giant Polearm is yours. Head over to the #bTraining Center#k and take on the #rScarred Bears#k that are there. Your job is to bring back #b30 Sign of Acceptances#k.");
			cm.dispose();
		}
    }
}