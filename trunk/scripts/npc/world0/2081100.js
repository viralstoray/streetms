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
            if (cm.getJobId() >= 200) {
                cm.sendOk("May #rOdin#k be with you!");
                cm.dispose();
                return;
            }
			if (cm.getJobId() % 10 > 1) {
				if (cm.getPlayer().getMasterLevel(1121000) < 30 && cm.getPlayer().getMasterLevel(1221000) < 30 && cm.getPlayer().getMasterLevel(1321000) < 30) {
					if (cm.getJobId() == 112) {
						cm.changeMastery(1121000, 30);
						cm.changeMastery(1120003, 30);
						cm.changeMastery(1120004, 30);
						cm.changeMastery(1120005, 30);
						cm.changeMastery(1121001, 30);
						cm.changeMastery(1121002, 30);
						cm.changeMastery(1121006, 30);
						cm.changeMastery(1121008, 30);
						cm.changeMastery(1121010, 30);
						cm.changeMastery(1121011, 5);
					} else if (cm.getJobId() == 122) {
						cm.changeMastery(1221000, 30);
						cm.changeMastery(1220005, 30);
						cm.changeMastery(1220006, 30);
						cm.changeMastery(1221001, 30);
						cm.changeMastery(1221002, 30);
						cm.changeMastery(1221003, 20);
						cm.changeMastery(1221004, 20);
						cm.changeMastery(1221007, 30);
						cm.changeMastery(1221009, 30);
						cm.changeMastery(1221012, 5);
						cm.changeMastery(1220010, 10);
						cm.changeMastery(1221011, 30);
					} else if (cm.getJobId() == 132) {
						cm.changeMastery(1321000, 30);
						cm.changeMastery(1320005, 30);
						cm.changeMastery(1320006, 30);
						cm.changeMastery(1320008, 25);
						cm.changeMastery(1320009, 25);
						cm.changeMastery(1321001, 30);
						cm.changeMastery(1321002, 30);
						cm.changeMastery(1321003, 30);
						cm.changeMastery(1321007, 10);
						cm.changeMastery(1321010, 5);
					}
					cm.sendOk("It seems you were not properly advanced and were missing some skills. That has been fixed now.");
				} else {
					cm.sendOk("Your abilities are now at their maximum. Train hard and one day you may become one of the Greats.");
				}
				cm.dispose();
			} else if (cm.getJobId() < 200 && cm.getLevel() >= 120) {
                cm.sendNext("It seems you have advanced quite far, young one.");
            } else {
                cm.sendOk("You must train harder and come back when you are ready.");
                cm.dispose();
            }
        } else if (status == 1) {
            cm.sendAcceptDecline("Are you ready to take the final step into your destiny?");
        } else if (status == 2) {
			cm.changeJobById(cm.getJobId() + 1);
			if (cm.getJobId() == 112) {
				cm.teachSkill(1121000, 0, 30);
				cm.teachSkill(1120003, 0, 30);
				cm.teachSkill(1120004, 0, 30);
				cm.teachSkill(1120005, 0, 30);
				cm.teachSkill(1121001, 0, 30);
				cm.teachSkill(1121002, 0, 30);
				cm.teachSkill(1121006, 0, 30);
				cm.teachSkill(1121008, 0, 30);
				cm.teachSkill(1121010, 0, 30);
				cm.teachSkill(1121011, 0, 5);
			} else if (cm.getJobId() == 122) {
				cm.teachSkill(1221000, 0, 30);
				cm.teachSkill(1220005, 0, 30);
				cm.teachSkill(1220006, 0, 30);
				cm.teachSkill(1221001, 0, 30);
				cm.teachSkill(1221002, 0, 30);
				cm.teachSkill(1221003, 0, 20);
				cm.teachSkill(1221004, 0, 20);
				cm.teachSkill(1221007, 0, 30);
				cm.teachSkill(1221009, 0, 30);
				cm.teachSkill(1221012, 0, 5);
				cm.teachSkill(1220010, 0, 10);
				cm.teachSkill(1221011, 0, 30);
			} else if (cm.getJobId() == 132) {
				cm.teachSkill(1321000, 0, 30);
				cm.teachSkill(1320005, 0, 30);
				cm.teachSkill(1320006, 0, 30);
				cm.teachSkill(1320008, 0, 25);
				cm.teachSkill(1320009, 0, 25);
				cm.teachSkill(1321001, 0, 30);
				cm.teachSkill(1321002, 0, 30);
				cm.teachSkill(1321003, 0, 30);
				cm.teachSkill(1321007, 0, 10);
				cm.teachSkill(1321010, 0, 5);
			}
			cm.sendOk("You are now a #b"+cm.getPlayer().getJobName()+"#k. Wear it proudly!");
			cm.dispose();
		}
    }
}	
