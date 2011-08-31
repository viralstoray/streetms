/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/*
	Author: Biscuit
*/
var status = -1;

function start() {
	cm.sendNext("The Seal Stone should be here somewhere... Wait a minute, it's gone! No way... It couldn't have been the Black Wings, could it...?!", 3);
}

function action(mode, type, selection) {
    if(mode != 1) {
        cm.dispose();
    } else {
        status++;
		if (status == 0) {
			cm.warp(300000010);
			cm.sendNext("I thought I just heard something from the Library... Was that you, Aran? Did you find the Seal Stone?", 9);
		} else if (status == 1) {
			cm.sendNextPrev("#b(You tell her what happened in the Library.)#k", 3);
		} else if (status == 2) {
			cm.sendNextPrev("I... I never thought something like that would appear in a place like this. I'm sorry Aran. I should have stored it in a safer place.", 9);
		} else if (status == 3) {
			cm.sendNextPrev("It isn't your fault, Athena Pierce.", 3);
		} else if (status == 4) {
			cm.sendNextPrev("You're still the same after all these years. After giving some thought about the Seal Stone, I may have found a clue that could help us.", 9);
		} else if (status == 5) {
			cm.sendNextPrev("A clue?", 3);
		} else if (status == 6) {
			cm.sendAcceptDecline("Yes, I found a letter you wrote me a long time ago, and I remember reading something about the Seal Stone. Would you like to see it?");
		} else if (status == 7) {
			cm.forceStartQuest(21753, 2131000);
			cm.sendNext("Hm...? The letter...", 9);
		} else if (status == 8) {
			cm.sendNext("#i4032327#\r\n#b(You could not take the letter. The letter slipped right through your fingers and landed gently on the ground.)#k", 3);
		} else if (status == 9) {
			cm.sendNextPrev("I do not know the law of time, but I think the reason I can't give you this letter is because #bwe belong to different time periods#k. This really saddens me, especially since you used to be one of us until recently...", 9);
		} else if (status == 10) {
			cm.sendNextPrev("I am sure you know this, but I am a fairy that can live a long time. Even if you have awaken hundreds of years later, I'll probably be around. So Aran, #bI'll hold on to this letter close to my heart until you come looking for it in your time#k.", 9);
		} else if (status == 11) {
			cm.sendNextPrev("No matter how many years pass, I will never forget this promise nor will I ever forget you, Aran. Until we meet again...", 9);
		} else if (status == 12) {
			cm.sendPrev("#b(You should probably return to Lilin's time and find Athena Pierce. If you ask Tru, you're sure you'll be able to track down Athena Pierce.)#k", 3);
			cm.dispose();
		}
    }
}