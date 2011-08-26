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
            if (cm.getJobId() < 400 || cm.getJobId() >= 500) {
                cm.sendOk("May #rOdin#k be with you!");
                cm.dispose();
                return;
            }
			if (cm.getJobId() % 10 > 1) {
				cm.sendOk("Your abilities are now at their maximum. Train hard and one day you may become one of the Greats.");
				cm.dispose();
			} else if ((cm.getJobId() >= 400 && cm.getJobId() < 500) && cm.getLevel() >= 120) {
                cm.sendNext("It seems you have advanced quite far, young one.");
            } else {
                cm.sendOk("You must train harder and come back when you are ready.");
                cm.dispose();
            }
        } else if (status == 1) {
            cm.sendAcceptDecline("Are you ready to take the final step into your destiny?");
        } else if (status == 2) {
			cm.changeJobById(cm.getJobId() + 1);
			cm.sendOk("You are now a #b"+cm.getPlayer().getJobName()+"#k. Wear it proudly!");
			cm.dispose();
		}
    }
}	
