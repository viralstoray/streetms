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
    cm.sendNext("Hmmm? I still haven't found a suitable Informant Assignment for you... well, do you need me for anything else? Or do you have some juicy information for me...?\r\n#b#L0#(You tell him about your encounter with Francis the Puppeteer.)#l\r\n#k");
}

function action(mode, type, selection) {
    if (mode != 1) {
		cm.sendOk("You don't want to give #p1201000# the dangerous news? She may seem weak on the outside, but remember, she lived alone on that island a long time, just to find you. She's much stronger than you think.");
        cm.dispose();
    } else {
        status++;
        if (status == 0) {
			cm.sendAcceptDecline("#p1204001#, the Black Wing Puppeteer. Okay, now this all makes sense. What happened with the #o1210102#s in #m100000000# and the #o1110100#s in #m101000000# are all being done by the same guy. But wait...are you telling me he also mentioned the Black Mage?");
		} else if (status == 1) {
			cm.forceStartQuest(21720, 1002104);
			cm.dispose();
		}
    }
}