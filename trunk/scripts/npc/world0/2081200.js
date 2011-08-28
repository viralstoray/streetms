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
            if (cm.getJobId() < 200 || cm.getJobId() >= 300) {
                cm.sendOk("May #rOdin#k be with you!");
                cm.dispose();
                return;
            }
			if (cm.getJobId() % 10 > 1) {
				if (cm.getPlayer().getMasterLevel(2121000) < 30 && cm.getPlayer().getMasterLevel(2221000) < 30 && cm.getPlayer().getMasterLevel(2321000) < 30) {
					if (cm.getJobId() == 212) {
						cm.changeMastery(2121000, 30);
						cm.changeMastery(2121001, 30);
						cm.changeMastery(2121002, 30);
						cm.changeMastery(2121003, 30);
						cm.changeMastery(2121004, 30);
						cm.changeMastery(2121005, 30);
						cm.changeMastery(2121006, 30);
						cm.changeMastery(2121007, 30);
						cm.changeMastery(2121008, 5);
					} else if (cm.getJobId() == 222) {
						cm.changeMastery(2221000, 30);
						cm.changeMastery(2221001, 30);
						cm.changeMastery(2221002, 30);
						cm.changeMastery(2221003, 30);
						cm.changeMastery(2221004, 30);
						cm.changeMastery(2221005, 30);
						cm.changeMastery(2221006, 30);
						cm.changeMastery(2221007, 30);
						cm.changeMastery(2221008, 5);
					} else if (cm.getJobId() == 232) {
						cm.changeMastery(2321000, 30);
						cm.changeMastery(2321001, 30);
						cm.changeMastery(2321002, 30);
						cm.changeMastery(2321003, 30);
						cm.changeMastery(2321004, 30);
						cm.changeMastery(2321005, 30);
						cm.changeMastery(2321006, 10);
						cm.changeMastery(2321007, 30);
						cm.changeMastery(2321008, 30);
						cm.changeMastery(2321009, 5);
					}
					cm.sendOk("It seems you were not properly advanced and were missing some skills. That has been fixed now.");
				} else {
					cm.sendOk("Your abilities are now at their maximum. Train hard and one day you may become one of the Greats.");
				}
				cm.dispose();
			} else if ((cm.getJobId() >= 200 && cm.getJobId() < 300) && cm.getLevel() >= 120) {
                cm.sendNext("It seems you have advanced quite far, young one.");
            } else {
                cm.sendOk("You must train harder and come back when you are ready.");
                cm.dispose();
            }
        } else if (status == 1) {
            cm.sendAcceptDecline("Are you ready to take the final step into your destiny?");
        } else if (status == 2) {
			cm.changeJobById(cm.getJobId() + 1);
			if (cm.getJobId() == 212) {
				cm.teachSkill(2121000, 0, 30);
				cm.teachSkill(2121001, 0, 30);
				cm.teachSkill(2121002, 0, 30);
				cm.teachSkill(2121003, 0, 30);
				cm.teachSkill(2121004, 0, 30);
				cm.teachSkill(2121005, 0, 30);
				cm.teachSkill(2121006, 0, 30);
				cm.teachSkill(2121007, 0, 30);
				cm.teachSkill(2121008, 0, 5);
			} else if (cm.getJobId() == 222) {
				cm.teachSkill(2221000, 0, 30);
				cm.teachSkill(2221001, 0, 30);
				cm.teachSkill(2221002, 0, 30);
				cm.teachSkill(2221003, 0, 30);
				cm.teachSkill(2221004, 0, 30);
				cm.teachSkill(2221005, 0, 30);
				cm.teachSkill(2221006, 0, 30);
				cm.teachSkill(2221007, 0, 30);
				cm.teachSkill(2221008, 0, 5);
			} else if (cm.getJobId() == 232) {
				cm.teachSkill(2321000, 0, 30);
				cm.teachSkill(2321001, 0, 30);
				cm.teachSkill(2321002, 0, 30);
				cm.teachSkill(2321003, 0, 30);
				cm.teachSkill(2321004, 0, 30);
				cm.teachSkill(2321005, 0, 30);
				cm.teachSkill(2321006, 0, 10);
				cm.teachSkill(2321007, 0, 30);
				cm.teachSkill(2321008, 0, 30);
				cm.teachSkill(2321009, 0, 5);
			}
			cm.sendOk("You are now a #b"+cm.getPlayer().getJobName()+"#k. Wear it proudly!");
			cm.dispose();
		}
    }
}	
