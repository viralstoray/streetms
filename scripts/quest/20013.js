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
		qm.sendNext("#b(*clang clang*)#k");
	} else if (status == 1) {
		qm.sendNextPrev("Whoa! Hey! You scared me! I didn't know I had a visitor. You must be the Noblesse Kinu was talking about. Welcome! I'm Kia, and my hobby is making #bChairs#k. I'm thinking about making you one as a welcome present.");
	} else if (status == 2) {
		qm.sendNextPrev("But wait, I can't make you one because I don't have enough materials. Could you find me the materials I need? Around this area, you will find a lot of boxes with items inside. Could you bring me back a Building Stone and a Drape, which are found inside those boxes?");
	} else if (status == 3) {
		qm.sendNextPrev("Do you know how to get items from boxes? All you have to do is break the Boxes like you'd attack a monster. The difference is that you can attack monsters using your Skills, but you can #bonly use Regular Attacks to break Boxes#k.");
	} else if (status == 4) {
		qm.sendAcceptDecline("Please bring me 1 #bBuilding Stone#k and 1 #bDrape#k found inside the Boxes. I'll make you an awesome Chair as soon as I have what I need. I'll wait here!");
	} else if (status == 5) {
		qm.forceStartQuest();
		qm.guideHint(9);
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
		qm.sendNext("Did you bring me a Building Stone and a Drape? Cool! I'll build you this chair right away.");
	} else if (status == 1) {
		qm.sendNextPrev("Here it is, a Nobelesse Chair. To sit in it all you have to do is press #bX#k. When sitting on it you cannot attack, but you will gain HP and MP faster than just standing.\r\n\r\n#fUI/UIWindow.img/Quest/reward#\r\n#v3010060# #z3010060#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 95 exp");
	} else if (status == 2) {
		qm.forceCompleteQuest();
		qm.gainItem(3010060, 1);
		qm.gainItem(4032267, -1);
		qm.gainItem(4032268, -1);
		qm.gainExp(95);
		qm.guideHint(10);
		qm.dispose();
	}
}