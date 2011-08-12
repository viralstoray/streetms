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
			qm.sendOk("Aran, you cannot turn away from your destiny!");
			qm.dispose();
			return;
		}else{
			qm.dispose();
			return;
		}
	}
	
	if (status == 0) {
		qm.sendNext("How did the training go? The penguin Teacher Puo likes to exaggerate and it worried me knowing that he has bouts of Alzheimer's, but I'm sure he helped you. He's been studying the skills of heroes for a very long time.", 9);
	} else if (status == 1) {
		qm.sendNextPrev("#b(You tell her that you were able to remember the Combo Ability skill.)#k", 3);
	} else if (status == 2) {
		qm.sendAcceptDecline("That's great! Honestly, though, I think it has less to do with the method of Puo's training and more to do with your body remembering its old abilities. #bI'm sure your body will remember more skills as you continue to train!#k\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 500 exp");
	} else if (status == 3) {
		qm.forceStartQuest();
		qm.forceCompleteQuest();
		qm.dispose();
	}
}