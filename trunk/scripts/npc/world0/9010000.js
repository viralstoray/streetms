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
/*
	Author: Biscuit
*/
var status = 0;

function start() {
	if (cm.getPlayer().getPlayerVariable("search_list") != null) {
		var newSearchList = cm.getPlayer().getPlayerVariable("search_list");
		newSearchList = newSearchList.replaceAll("#k0", "#k");
		for (var i = 1000; i > 0; i--) {
			newSearchList = newSearchList.replace("#k"+i, "#k");
		}
		cm.sendSimple(newSearchList);
	} else {
		if (cm.getMapId() == 910000000) {
			cm.sendSimple("It looks like you have a #bBlue Wish Ticket#k! Would you like to use it now?\r\n#b#L0#Yes#l\r\n#L1#What does a Blue Wish Ticket get me?#l#k");
		}
	}
}

function action(mode, type, selection) {
    if(mode != 1)
        cm.dispose();
    else {
        status++;
        if(status == 1) {
			if (cm.getPlayer().getPlayerVariable("search_list") != null) {
				select = selection;
				var nameSearchList = cm.getPlayer().getPlayerVariable("search_list");
				if (cm.getPlayer().getPlayerVariable("search_type") == "mob" || cm.getPlayer().getPlayerVariable("search_type") == "monster") {
					var mob = parseInt(nameSearchList.substring(nameSearchList.indexOf("#L" + select) + (5 + (select + "").length), nameSearchList.indexOf("#k" + select)));
					cm.sendGetNumber("How many #e#r#o" + mob + "#s#k#n would you like to summon?", 1, 1, 100);
				} else if (cm.getPlayer().getPlayerVariable("search_type") == "item") {
					var item = parseInt(nameSearchList.substring(nameSearchList.indexOf("#L" + select) + (5 + (select + "").length), nameSearchList.indexOf("#k" + select)));
					cm.sendGetNumber("How many #e#r#t" + item + "#s#k#n would you like to receive?", 1, 1, 10000);
				}
			} else {
				if (selection == 0) {
					var em = cm.getEventManager("slimeRoom");
					if (em == null) {
						cm.sendOk("Sorry, but this room is currently undergoing maintenance. Try again soon!");
						cm.dispose();
					} else if (em.getProperty("canEnter").equals("true")) {
						cm.gainItem(4031545, -1);
						em.startInstance(cm.getPlayer());
						cm.dispose();
					} else {
						cm.sendOk("Sorry, but this room is currently taken. Try again soon!");
						cm.dispose();
					}
				} else if (selection == 1) {
					cm.sendOk("A #bBlue Wish Ticket#k gives you access to our NX Slime room once for #r3 minutes#k. There you can kill NX Slimes that drop Cash Shop Items to your heart's content until the time's up.");
					cm.dispose();
				}
			}
        } else if (status == 2) {
			qty = selection;
			var searchList = cm.getPlayer().getPlayerVariable("search_list")
			if (cm.getPlayer().getPlayerVariable("search_type") == "mob" || cm.getPlayer().getPlayerVariable("search_type") == "monster") {
				for (var i = 0; i < qty; i++) {
					cm.spawnMonster(parseInt(searchList.substring(searchList.indexOf("#L" + select) + (5 + (select + "").length), searchList.indexOf("#k" + select))));
				}
			} else if (cm.getPlayer().getPlayerVariable("search_type") == "item") {
				cm.gainItem(parseInt(searchList.substring(searchList.indexOf("#L" + select) + (5 + (select + "").length), searchList.indexOf("#k" + select))), qty);
			}
			cm.getPlayer().deletePlayerVariable("search_list")
			cm.getPlayer().deletePlayerVariable("search_type")
			cm.dispose();
		}
    }
}