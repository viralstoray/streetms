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
	Author: Biscuit
*/

function start() {
	if (cm.isQuestCompleted(20706)) {
		cm.sendOk("So you spotted a black shadow in between the forest? Ahh... it would have been nice if we could have captured him. But if it is indeed one of the Black Mage's men, then there's no way he would have been caught that easily.\r\n\r\n#fUI/UIWindow.img/Quest/reward#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 224 exp");
		cm.dispose();
	}
}