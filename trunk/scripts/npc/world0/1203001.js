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

function start() {
	if (!cm.isQuestStarted(21303))
		cm.sendNext("*Sob sob* Tititi is sad. Tititi is mad. Tititi cries. *Sob sob*", 9);
	else
		cm.dispose();
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
    } else {
        status++;
        if (status == 0) {
			cm.sendNextPrev("Wh...What's wrong?", 3);
		} else if (status == 1) {
			cm.sendNextPrev("Tititi made gem. #bGem as red as apple#k. But #rthief#k stole gem. Tititi no longer has gem. Tititi is sad...", 9);
		} else if (status == 2) {
			cm.sendNextPrev("A thief stole your red gem?", 3);
		} else if (status == 3) {
			cm.sendAcceptDecline("Yes. Tititi wants gem back. Tititi reward you if you find gem. Catch thief and you get reward.");
		} else if (status == 4) {
			cm.forceStartQuest(21303, 1203001);
			cm.sendOk("The thief went that way! Which way? Hold on...eat with right hand, not left hand... #bLeft#k! He went left! Go left and you find thief.");
			cm.dispose();
		}
    }
}