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
/* Author: Xterminator
	NPC Name: 		Shanks
	Map(s): 		Maple Road : Southperry (60000)
	Description: 		Brings you to Victoria Island
*/
var status = 0;

function start() {
    cm.sendYesNo("Take this ship and you'll head off to a bigger continent. I'll take you to #bVictoria Island#k. The thing is, once you leave this place, you can't ever come back. What do you think? Do you want to go to Victoria Island?");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1){
        if(mode == 0 && type != 1)
            status -= 2;
        else if(type == 1 || (mode == -1 && type != 1)){
            if(mode == 0)
                cm.sendOk("Hmm... I guess you still have things to do here?");
            cm.dispose();
            return;
        }
    }
    if (status == 1) {
        cm.sendNext("Bored of this place?");
    } else if (status == 2) {
        if (cm.getLevel() > 6) {
            cm.sendNext("Alright, off to Victoria Island!");
        } else {
            cm.sendOk("Let's see... I don't think you are strong enough. You'll have to be at least Level 7 to go to Victoria Island.");
            cm.dispose();
        }
    } else if (status == 3) {
        if (cm.haveItem(4031801))
            cm.gainItem(4031801, -1);
        cm.warp(2010000);
        cm.dispose();
    }
}