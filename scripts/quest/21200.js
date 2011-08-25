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
		qm.sendAcceptDecline("How is training going? Wow, you've reached such a high level! That's amazing. I knew you would do just fine on Victoria Island... Oh, look at me. I'm wasting your time. I know you're busy, but you'll have to return to the island for a bit.");
	} else if (status == 1) {
		qm.sendOk("Your #b#p1201001##k in #b#m140000000##k is acting strange all of a sudden. According to the records, the Polearm acts this way when it is calling for its master. #bPerhaps it's calling for you.#k Please return to the island and check things out.");
		qm.forceStartQuest();
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
		qm.sendNext("Voom voom voom voom voom....", 1);
	} else if (status == 1) {
		qm.sendNextPrev("#b(The Giant Polearm is producing an undulating echo. But who is that boy standing over there?)#k", 3);
	} else if (status == 2) {
		qm.sendNextPrev("#b(You've never seen him before. He doesn't look human.)#k", 3);
	} else if (status == 3) {
		qm.sendNextPrev("Yo, Aran! Do you not hear me? I said, do you not hear me! Ugh, how frustrating!", 9);
	} else if (status == 4) {
		qm.sendNextPrev("#b(Hm? Who's voice was that? It sounds like an angry boy...)#k", 3);
	} else if (status == 5) {
		qm.sendNextPrev("Ugh, my only master had to end up trapped in ice for hundreds of years, abandoning me completely, and is now completely ignoring me.", 9);
	} else if (status == 6) {
		qm.sendNextPrev("Who...are you?", 3);
	} else if (status == 7) {
		qm.sendNextPrev("Aran? Do you hear me now? It's me! Don't you recognize me? I'm your weapon, #bMaha the Polearm#k!", 9);
	} else if (status == 8) {
		qm.sendNextPrev("#b(...Maha? A Giant Polearm can talk?)#k", 3);
	} else if (status == 9) {
		qm.sendNextPrev("What's with that suspicious look on your face? I know you've lost your memory, but did you forget about me, too? How could you?!", 9);
	} else if (status == 10) {
		qm.sendNextPrev("I'm so sorry, but I can't remember a thing.", 3);
	} else if (status == 11) {
		qm.sendYesNo("Sorry doesn't cut it! Do you know how lonely and bored I was for hundreds of years? I don't care what it takes! Remember me! Remember me now!", 9);
	} else if (status == 12) {
		qm.forceCompleteQuest();
		qm.sendNext("#b(The voice that claims to be Maha the Polearm is yelling in frustration. You don't think this conversation is going anywhere. You better go talk to Lilin first.)#k");
	} else if (status == 13) {
		qm.warp(914090200);
		qm.dispose();
	}
}