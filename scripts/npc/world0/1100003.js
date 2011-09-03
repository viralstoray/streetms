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
        NPC Name: Kiriru
*/

status = -1;

function start() {
    cm.sendNext("Eh, Hello...again. Do you want to leave Ereve and go somewhere else? If so, you've come to the right place.");
}

function action(mode, type, selection){
    status++;
    if (mode != 1) {
        cm.dispose();
        return;
    }
    if (status == 0) {
		if (cm.haveItem(4032288))
			cm.sendYesNo("Ummm, it looks like you have a special taxi coupon from Neinheart. Would you like to use it to go to #bHenesys#k?");
		else
			cm.sendYesNo("Ummm, are you trying to leave Ereve again? I can take you to #bEllinia#k if you want...");
    } else if (status == 1) {
        cm.sendNext("Okay, off you go!");
	} else if (status == 2) {
		if (cm.haveItem(4032288)) {
			cm.gainItem(4032288, -1);
			cm.warp(100000000);
		} else
			cm.warp(101000400);
        cm.dispose();
    }
}
