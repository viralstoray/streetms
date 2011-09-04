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
		qm.sendNext("Hmm? Dunamis? Oh, of course I know. He and Scadur used to hang out and hunt together all the time. He seemed quite imposing, so I had a difficult time trying to strike up a conversation. For awhile, it looked like he was investigating something at El Nath; and then soon, he disappeared from the world. Do you have any idea where he might be?\r\n#b#L0#I had been looking for one as well. What did he do?#l#k");
	} else if (status == 1) {
		qm.sendAcceptDecline("He was never really home; rather, he was just concentrating on #rhunting down the zombies#k. I thought he was training, but that wasn't the case. If nothing else, he seemed intent on finding some item. I have no idea what that is, but I do know that he possessed incredible strength. So, is this it for the question?");
	} else if (status == 2) {
		qm.forceStartQuest();
		qm.forceCompleteQuest();
		qm.sendOk("You must be in the same field with him. Huh? How did I know? Well, I can't really pinpoint it, but it felt like you and that person had a similar feel to it. Anyway, good luck!! Dunamis is such a no-nonsense, intense guy that it worries me that you might later take on a #rdangerous task...#k");
		qm.dispose();
	}
}