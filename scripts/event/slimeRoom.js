/*
 * This file is part of the OdinMS Maple Story Server
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

/*
	Author: Biscuit
*/

importPackage(Packages.world);
var exitMap;
var map;

function init() {
    exitMap = em.getChannelServer().getMapFactory().getMap(910000000);
	map = em.getChannelServer().getMapFactory().getMap(910000007);
    em.setProperty("canEnter", "true");
    instanceId = 1;
}

function setup() {
    var eim = em.newInstance("KerningPQ");
    var eventTime = 1 * (1000 * 60); // 3 mins.
    em.schedule("timeOut", eim, eventTime);
    eim.startEventTimer(eventTime);
    return eim;
}

function playerEntry(eim, player) {
	em.setProperty("canEnter", "false");
	var portal = eim.getMapInstance(910000007).getPortal("out00");
    var map = eim.getMapInstance(910000007);
    player.changeMap(map, portal);
}

function playerDead(eim, player) {
}

function playerRevive(eim, player) {
	var player = eim.getPlayers().get(0);
    playerExit(eim, player);
}

function playerDisconnected(eim, player) {
	var player = eim.getPlayers().get(0);
    removePlayer(eim, player);
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    player.changeMap(exitMap, exitMap.getPortal(0));
	player.clearDrops(910000007);
	em.setProperty("canEnter", "true");
}

function removePlayer(eim, player) {
    eim.unregisterPlayer(player);
    player.getMap().removePlayer(player);
    player.setMap(exitMap);
	player.clearDrops(910000007);
	em.setProperty("canEnter", "true");
}

function clearPQ(eim) {
	var player = eim.getPlayers().get(0);
    playerExit(eim, player);
    eim.dispose();
}

function allMonstersDead(eim) {
}

function cancelSchedule() {
}

function dispose() {
    em.setProperty("canEnter", "true");
}

function timeOut(eim) {
	var player = eim.getPlayers().get(0);
    playerExit(eim, player);
    eim.dispose();
}