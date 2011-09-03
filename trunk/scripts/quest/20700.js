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
			qm.dispose();
			return;
		}else{
			qm.dispose();
			return;
		}
	}
	
	if (status == 0) {
		qm.sendNext("You have finally become a Knight-in-Training. I'd like to give you a mission right away, but you still look miles away from even being able to handle a task on your own. Are you sure you can even go to Victoria Island like this?");
	} else if (status == 1) {
		qm.sendAcceptDecline("It's up to you to head over to Victoria Island, but a Knight-in-Training that can't even take care of one's self in battles is likely to cause harm to the Empress's impeccable reputation. As the Head Tactician of this island, I can't let that happen, period. I want you to keep training until the right time comes.");
	} else if (status == 2) {
		qm.forceStartQuest();
		qm.forceCompleteQuest();
		qm.sendNext("Kiku, the Training Instructor, will help you train into a servicable knight. Once you reach Level 13, I'll assign you a mission or two. So until then, keep training.");
	} else if (status == 3) {
		qm.sendOk("Oh, and you are aware that if you strike a conversation with Shinsoo, she'll give you a blessing? The blessing will definitely help you on your journey.");
		qm.dispose();
	}
}