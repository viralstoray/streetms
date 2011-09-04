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
		qm.sendAcceptDecline("#d(A crystal ball is placed at the center of the cave. It's so dark inside that it's barely visible. Let's get up close and see what it looks like.)#k");
	} else if (status == 1) {
		qm.forceStartQuest();
		qm.forceCompleteQuest();
		qm.sendOk("#d(As soon as I touch the crystal, a rough, raspy voice entered.) This is Dunamis. I was unable to spot the origin of the curse, but I did find the device used for it, so I'm sending it straight to Ereve. I'm leaving this message in case a Knight is sent here to search for items. You may now return to Ereve.#k");
		qm.dispose();
	}
}