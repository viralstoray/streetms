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
	if (cm.isQuestStarted(21733))
		cm.sendNext("Wow... never did I think this would happen. Never in my wildest dreams did I think the puppeteer would enter here. I should have trained too. I just got completely ambushed.", 9);
	else
		cm.sendNext("Hmmm? I still haven't found a suitable Informant Assignment for you... well, do you need me for anything else? Or do you have some juicy information for me...?\r\n#b#L0#(You tell him about your encounter with Francis the Puppeteer.)#l\r\n#k");
}

function action(mode, type, selection) {
    if (mode != 1) {
		if (!cm.isQuestStarted(21733))
			cm.sendOk("You don't want to give #p1201000# the dangerous news? She may seem weak on the outside, but remember, she lived alone on that island a long time, just to find you. She's much stronger than you think.");
        cm.dispose();
    } else {
        status++;
        if (status == 0) {
			if (cm.isQuestStarted(21733))
				cm.sendNextPrev("I'm so sorry. It's all because of me...", 3);
			else
				cm.sendAcceptDecline("#p1204001#, the Black Wing Puppeteer. Okay, now this all makes sense. What happened with the #o1210102#s in #m100000000# and the #o1110100#s in #m101000000# are all being done by the same guy. But wait...are you telling me he also mentioned the Black Mage?");
		} else if (status == 1) {
			if (cm.isQuestStarted(21733))
				cm.sendNextPrev("Eh? Why would you feel sorry for this? You wouldn't have known that they'd take this route, either. No need to apologize. If nothing else, they just revealed their weaknesses.", 9);
			else {
				cm.forceStartQuest(21720, 1002104);
				cm.dispose();
			}
		} else if (status == 2) {
			cm.sendNextPrev("Weaknesses?", 3);
		} else if (status == 3) {
			cm.sendNextPrev("If the document that the puppeteer lost is fake, then he wouldn't have acted so urgently. This proves that the document is the real deal, and that the Black Wings' Ultimate target is the Seal Stone at Victoria Island.", 9);
		} else if (status == 4) {
			cm.sendNextPrev("But your location is also exposed...", 3);
		} else if (status == 5) {
			cm.sendYesNo("No worries. I was attacked this time while waiting for some items from Lilin, but usually I'm not this careless. Never underestimate the power and the alertness of the information merchant. I always come up with an escape route wherever I go. Before that, do you know of a skill called #bPole Arm Mastery#k?");
		} else if (status == 6) {
			cm.teachSkill(21100000, 0, 20);
			cm.forceCompleteQuest(21733, 1002104);
			cm.sendNext("Oh, so it must be a skill that you used to use. It's a skill that Lilin found while deciphering the Record of Heroes, and sent it to me thinking it might be perfect for you. I was worried I might lose this, so that's why I didn't put up as much of a fight, because I was trying to protect this. Mission accomplished?");
		} else if (status == 7) {
			cm.sendOk("Regardless of how much the Black Wings act up, they will not be able to prevent you from your progress towards returning to your heroic form. Let's keep training until you can manhandle the Black Wizard, okay? I'll try my best to gather up as much information as possible.");
			cm.dispose();
		}
    }
}