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
	Author: Biscuit
*/
var status = -1;

function start() {
	if (cm.isQuestStarted(20712))
		cm.sendAcceptDecline("Are you here for that doll Matthias asked for, Ha? I can't give you the doll, ha! Matthias never paid for this, ha! If you can't pay for it, do something for me then, ha!");
}

function action(mode, type, selection) {
    if (mode != 1) {
		cm.sendOk("If you can't do it, then forget it, ha! I can't give you the doll for free!");
        cm.dispose();
    } else {
        status++;
        if (status == 0) {
			cm.forceStartQuest(20713, 9000008);
			cm.dispose();
        }
    }
}