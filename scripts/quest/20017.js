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
		qm.sendNext("What's that? #p1101002# sent you? Oh! Wow, are you a newbie? Good to meet ya. Really. I'm #p1102000#. I'm the Training Instructor who's in charge of Noblesse like you. But... why are you looking at me like that...? Ah, this must be your first time seeing a Piyo.");
	} else if (status == 1) {
		qm.sendNextPrev("We are called Piyos. You've talked to #p1101001# who's always next to the Empress, haven't you? Well, Piyos are from the same family as #p1101001# though we differ in type. Piyos only live in Ereve, so I'm sure it'll take some time for you to get used to us.");
	} else if (status == 2) {
		qm.sendNextPrev("Oh, and did you know that there are no monsters in Ereve? Not even a smidgeon of evil dare enter Ereve. But don't you worry. You'll be able to train with illusory monsters created by #p1101001# called Mimis. Shall we begin the training now?");
	} else if (status == 3) {
		qm.sendAcceptDecline("Shall we begin your second training then? Let's have you hunt #r#o100123##ks this time. It should be a bit more challenging. What are #o100123#s, you wonder? You probably saw them while you were hunting the #o100122#s... They somewhat resemble the #o100123#.");
	} else if (status == 4) {
		qm.forceStartQuest();
		qm.guideHint(12);
		qm.dispose();
	}
}