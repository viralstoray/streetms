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
			qm.sendOk("Hmmm... you seem way too at ease. It's a waste of talent and firepower for an accomplished individual like you to just sit around, being content with the way things are...");
			qm.dispose();
			return;
		}else{
			qm.dispose();
			return;
		}
	}
	
	if (status == 0) {
		qm.sendAcceptDecline("Well, I know I may have talked to you like this is a joke, but it is true that you are one of the better Knights, and that is why you are given a task with a huge responsibility. I'll be looking forward to your work.");
	} else if (status == 1) {
		qm.forceStartQuest();
		qm.forceCompleteQuest();
		qm.sendNext("It's been a while since I last saw you. I can't even recognize you now, seeing how powerful you have become since our last meeting. I can honestly say that you just might be one of the most powerful Knights in all of Cygnus Knights, Chief Knights included. Okay, enough pleasantries. Let's get down to business.");
	} else if (status == 2) {
		qm.sendNext("It's a new mission. According to the information we acquired, a member of the #rBlack Wings#k is targeting the Empress. In order to prevent that, Advanced Knight #b#p1103000##k has been secretly tracing that individual, but it doesn't look too good from here.");
	} else if (status == 3) {
		qm.sendPrev("If it's Victoria Island, at least we know everything that goes on there. This one's Ossyria, where not even the intelligence officials know everything inside out. This means the Advanced Knight will need help. Please provide help to #p1103000#. The last place she contacted was at #b#m211000000##k, so try looking for #p1103000#.");
		qm.dispose();
	}
}