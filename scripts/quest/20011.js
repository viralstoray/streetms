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
		qm.sendNext("There are a number of ways to hunt, but the most basic way is with your #bRegular Attack#k. All you need is a weapon in your hand, since it's a simple matter of just swinging your weapon at monsters.");
	} else if (status == 1) {
		qm.sendNextPrev("Press the #bCtrl key#k to use your Regular Attack. Usually the Ctrl Key is located #bat the bottom left of the keyboard#k, but you don't need me to tell you that, right? Find the Ctrl key and try it out!");
	} else if (status == 2) {
		qm.sendAcceptDecline("Now that you've tried it, we've got to test it out. In this area, you can find the weakest #rTinos#k in Ereve, which is perfect for you. Try hunting #r1#k. I'll give you a reward when you get back.");
	} else if (status == 3) {
		qm.forceStartQuest();
		qm.guideHint(4);
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
		qm.sendNext("Ah, it seems you've successfully hunted a Tino. Pretty simple, right? Regular Attacks may be easy to use, but they are pretty weak. Don't worry, though. Kinu will teach you how to use more powerful skills. Wait, let me give you a well-deserved quest reward before you go.");
	} else if (status == 1) {
		qm.sendNextPrev("This equipment is for Noblesses. It's much cooler than what you're wearing right now, isn't it? Follow the arrows to your left to meet my younger brother #bKinu#k. How about you change into your new Noblesse outfit before you go?\r\n\r\n#fUI/UIWindow.img/Quest/reward#\r\n\r\n#v1002869# #z1002869# - 1\r\n#v1052177# #z1052177# - 1\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 30 exp");
	} else if (status == 2) {
		qm.forceCompleteQuest();
		qm.gainItem(1002869, 1);
		qm.gainItem(1052177, 1);
		qm.gainExp(30);
		qm.guideHint(6);
		qm.dispose();
	}
}