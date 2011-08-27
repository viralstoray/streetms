/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Bullet Taxi of the Danger Zone
-- By ---------------------------------------------------------------------------------------------
	Information
-- Version Info -----------------------------------------------------------------------------------
	1.3 - Completely redone by Biscuit
	1.2 - Fix and shortened by Moogra
	1.1 - Statement fix, add support to multiple place [Information]
	1.0 - First Version by Information
---------------------------------------------------------------------------------------------------
**/

var fromMap = new Array(211000000, 220000000, 240000000);
var toMap = new Array(211040200, 220050300, 240030000);
var cost = new Array(10000, 25000, 55000);
var location;
var status = 0;

function start() {
    for (var i = 0; i < toMap.length; i++) {
		if (cm.getMapId() == fromMap[i]) {
			location = toMap[i]
		}
	}
    cm.sendNext("Hello there! This Bullet Taxi will take you to #b#m"+location+"##k!");
}

function action(mode, type, selection) {
    if (mode != 1)
        cm.dispose();
    else {
        status++;
		if (status == 1)
			cm.sendYesNo("#bDo you want to go to #b#m"+location+"##k?");
		else if (status == 2) {
			cm.warp(location);
			cm.dispose();
		}
	}
}
