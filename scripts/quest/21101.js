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
importPackage(Packages.client);

var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode != 1) {
		if(type == 1 && mode == 0) {
			qm.sendOk("Aran, you cannot turn away from your destiny!");
			qm.dispose();
			return;
		}else{
			qm.dispose();
			return;
		}
	}
	
	if (status == 0) {
		qm.sendYesNo("#b(Are you certain that you were the hero that wielded the Giant Polearm? Yes, you're sure. You better grab the Giant Polearm really tightly. Surely it will react to you.)#k");
	} else if (status == 1) {
		qm.sendNext("#b(You might be starting to remember something...)#k", 3);
		qm.changeJobById(2100);
		qm.c.getPlayer().setRemainingAp(23);
		qm.c.getPlayer().setStr(35);
		qm.c.getPlayer().updateSingleStat(MapleStat.STR, 35);
		qm.c.getPlayer().setDex(4);
		qm.c.getPlayer().updateSingleStat(MapleStat.DEX, 4);
		qm.c.getPlayer().setInt(4);
		qm.c.getPlayer().updateSingleStat(MapleStat.INT, 4);
		qm.c.getPlayer().setLuk(4);
		qm.c.getPlayer().updateSingleStat(MapleStat.LUK, 4);
		var hp = Math.round((Math.random() * 100) + 400);
		var mp = Math.round((Math.random() * 100) + 100);
		qm.c.getPlayer().setMaxHp(hp);
		qm.c.getPlayer().updateSingleStat(MapleStat.MAXHP, hp);
		qm.c.getPlayer().setMaxMp(mp);
		qm.c.getPlayer().updateSingleStat(MapleStat.MAXMP, mp);
		qm.forceStartQuest();
		qm.forceCompleteQuest();
	} else if (status == 2) {
		qm.warp(914090100);
		qm.dispose();
	}
}