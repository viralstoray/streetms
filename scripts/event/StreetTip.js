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
var setupTask;

var tips = new Array(
    "Find a bug? Post it on the forums so we can get it fixed!",
    "Use @fm to warp to the free market.",
    "Need something? Use @gms to find the nearest GM.",
	"Did you know you can use player commands? Type @help to see them!",
	"Visit our forums at www.streetsidegaming.com and our website at street.ariact.org.",
	"To advance to 1st Job as a Knight of Cygnus, talk to Shinsoo in Ereve.",
	"Out of return scrolls? Use @nearesttown to transport to the nearest town for 500 mesos.",
	"Use @autopot to toggle auto potion on or off.",
	"Use @help to see all the commands available for you to use.",
	"Feeling lucky? Try the lottery by talking to Agent E. in the free market!",
	"Crank up the beats by talking to Treasure Chest in the free market."
);

function init() {
    scheduleNew();
}

function scheduleNew() {
    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR, 0);
    cal.set(java.util.Calendar.MINUTE, 0);
    cal.set(java.util.Calendar.SECOND, 0);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis())
        nextTime += 300 * 1000;
    setupTask = em.scheduleAtTimestamp("start", nextTime);
}

function cancelSchedule() {
    setupTask.cancel(true);
}

function start() {
    scheduleNew();
    em.getChannelServer().yellowWorldMessage("[StreetTip] " + tips[Math.floor(Math.random() * tips.length)]);
}