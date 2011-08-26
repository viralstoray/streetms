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

var status = 0;
var job;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 1) {
            cm.sendOk("Make up your mind and visit me again.");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (cm.getJobId() < 300 || cm.getJobId() >= 400) {
                cm.sendOk("May #rOdin#k be with you!");
                cm.dispose();
                return;
            }
			if (cm.getJobId() % 10 > 0) {
				cm.sendOk("You have chosen wisely.");
				cm.dispose();
			} else if ((cm.getJobId() >= 300 && cm.getJobId() < 400) && cm.getLevel() >= 70) {
                cm.sendNext("#rBy Odin's beard!#k You are a strong one.");
            } else {
                cm.sendOk("Your time has yet to come...");
                cm.dispose();
            }
        } else if (status == 1) {
            cm.sendAcceptDecline("Is your mind ready to undertake this new power?");
        } else if (status == 2) {
			cm.changeJobById(cm.getJobId() + 1);
			cm.sendOk("You are now a #b"+cm.getPlayer().getJobName()+"#k. May #rOdin#k be with you!");
			cm.dispose();
		}
    }
}	
