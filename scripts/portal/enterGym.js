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
function enter(pi) {
	if (pi.isQuestStarted(21701)) {
		pi.warp(914010000, "out00");
		return true;
	} else if (pi.isQuestStarted(21702)) {
		pi.warp(914010100, "out00");
		return true;
	} else if (pi.isQuestStarted(21703)) {
		pi.warp(914010200, "out00");
		return true;
	} else {
		pi.getPlayer().dropMessage(5,"You can only enter the Penguin Training Center if you are getting trained by Puo.");
		return false;
	}
}