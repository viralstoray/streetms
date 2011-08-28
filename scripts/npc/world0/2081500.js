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
            if (cm.getJobId() < 500 || cm.getJobId() >= 600) {
                cm.sendOk("May #rOdin#k be with you!");
                cm.dispose();
                return;
            }
			if (cm.getJobId() % 10 > 1) {
				if (cm.getPlayer().getMasterLevel(cm.getJobId == 512 ? 5121000 : 5221000) < 30) {
					if (cm.getJobId() == 512) {
						cm.changeMastery(5121000, 30);
						cm.changeMastery(5121001, 30);
						cm.changeMastery(5121002, 30);
						cm.changeMastery(5121003, 20);
						cm.changeMastery(5121004, 30);
						cm.changeMastery(5121005, 30);
						cm.changeMastery(5121007, 30);
						cm.changeMastery(5121008, 5);
						cm.changeMastery(5121009, 20);
						cm.changeMastery(5121010, 30);
					} else if (cm.getJobId() == 522) {
						cm.changeMastery(5221000, 30);
						cm.changeMastery(5220001, 30);
						cm.changeMastery(5220002, 20);
						cm.changeMastery(5220011, 20);
						cm.changeMastery(5221003, 30);
						cm.changeMastery(5221004, 30);
						cm.changeMastery(5221006, 10);
						cm.changeMastery(5221007, 30);
						cm.changeMastery(5221008, 30);
						cm.changeMastery(5221009, 20);
						cm.changeMastery(5221010, 5);
					}
					cm.sendOk("It seems you were not properly advanced and were missing some skills. That has been fixed now.");
				} else {
					cm.sendOk("Your abilities are now at their maximum. Train hard and one day you may become one of the Greats.");
				}
				cm.dispose();
			} else if ((cm.getJobId() >= 500 && cm.getJobId() < 600) && cm.getLevel() >= 120) {
                cm.sendNext("It seems you have advanced quite far, young one.");
            } else {
                cm.sendOk("You must train harder and come back when you are ready.");
                cm.dispose();
            }
        } else if (status == 1) {
            cm.sendAcceptDecline("Are you ready to take the final step into your destiny?");
        } else if (status == 2) {
			cm.changeJobById(cm.getJobId() + 1);
			if (cm.getJobId() == 512) {
				cm.teachSkill(5121000, 0, 30);
				cm.teachSkill(5121001, 0, 30);
				cm.teachSkill(5121002, 0, 30);
				cm.teachSkill(5121003, 0, 20);
				cm.teachSkill(5121004, 0, 30);
				cm.teachSkill(5121005, 0, 30);
				cm.teachSkill(5121007, 0, 30);
				cm.teachSkill(5121008, 0, 5);
				cm.teachSkill(5121009, 0, 20);
				cm.teachSkill(5121010, 0, 30);
			} else if (cm.getJobId() == 522) {
				cm.teachSkill(5221000, 0, 30);
				cm.teachSkill(5220001, 0, 30);
				cm.teachSkill(5220002, 0, 20);
				cm.teachSkill(5220011, 0, 20);
				cm.teachSkill(5221003, 0, 30);
				cm.teachSkill(5221004, 0, 30);
				cm.teachSkill(5221006, 0, 10);
				cm.teachSkill(5221007, 0, 30);
				cm.teachSkill(5221008, 0, 30);
				cm.teachSkill(5221009, 0, 20);
				cm.teachSkill(5221010, 0, 5);
			}
			cm.sendOk("You are now a #b"+cm.getPlayer().getJobName()+"#k. Wear it proudly!");
			cm.dispose();
		}
    }
}	
