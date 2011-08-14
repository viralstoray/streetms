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
/**
* @Author : Biscuit
**/

var select;
var status = 0;

function start() {
	cm.sendSimple("Welcome to the #bStreetMS Lottery#k! What would you like to do?\r\n#eCurrent Lottery Amount: #r" + mesoSlang(cm.getPlayer().getCurrentLotteryAmount()) + " (" + mesoComma(cm.getPlayer().getCurrentLotteryAmount()) + ") mesos#n#k#b\r\n#L0#Add 100,000 mesos into the lottery#l\r\n#L1#What is the lottery?#l\r\n#L2#How does the lottery work?#l\r\n#L3#How much NX will I win?#l");
}

function action(mode, type, selection) {
	var payAmount = cm.getPlayer().getLotteryPrice();
    if(mode != 1) {
        cm.dispose();
		return;
    } else {
		status++;
		if (status == 1) {
			select = selection;
			if (select == 0) {
				if (cm.getMeso() >= payAmount) {
					cm.gainMeso(-payAmount);
					cm.getPlayer().addToLottery();
					var oldAmount = cm.getPlayer().getCurrentLotteryAmount();
					cm.sendOk("The current lottery amount is now at #r" + mesoSlang(oldAmount) + " (" + mesoComma(oldAmount) + ") mesos#k = #r#e" + mesoSlang(oldAmount / 1000) + " (" + mesoComma(oldAmount / 1000) + ") NX Cash.#k#n");
					cm.dispose();
					return;
				} else {
					cm.sendOk("Sorry, but you don't have enough mesos to add to the lottery!");
					cm.dispose();
				}
			} else if (select == 1) {
				cm.sendOk("The lottery is where you can win big! All you have to do is add mesos into the lottery, and you get a chance to earn #bNX Cash#k!");
				cm.dispose();
				return;
			} else if (select == 2) {
				cm.sendNext("It's quite simple, really. Just add 100,000 mesos into the lottery to start off.  Every time you do so you have a greater chance to win NX when a GM draws a ticket!");
			} else {
				cm.sendOk("The amount of NX you receive if you win is the current lottery amount divided by 1000. For example, if you tried right now and won you'd get:\r\n\r\n#e" + mesoSlang(cm.getPlayer().getCurrentLotteryAmount()+100000) + " (" + mesoComma(cm.getPlayer().getCurrentLotteryAmount()+100000) + ") mesos = #r" + mesoSlang((cm.getPlayer().getCurrentLotteryAmount()+100000) / 1000) + " (" + mesoComma((cm.getPlayer().getCurrentLotteryAmount()+100000) / 1000) + ") NX Cash#k#n");
				cm.dispose();
			}
		} else if (status == 2) {
			cm.sendNextPrev("If you don't win, then feel free to try again. Every time somebody in StreetMS adds mesos into the lottery, the reward increases.  So everytime you add money into the lottery you have a chance for a bigger NX reward!");
		} else if (status == 3) {
			cm.sendPrev("When the winner is finally chosen, it will be announced server-wide. Also, the last winner's name will be posted on this menu so you can tell if it has been reset since you last added to the lottery.");
			cm.dispose();
		}
	}
}

function mesoSlang(amount) {
	if (amount > 999999999) {
		return (amount / 1000000000) + "B";
	} else if (amount > 999999) {
		return (amount / 1000000) + "M";
	} else if (amount > 999) {
		return (amount / 1000) + "K";
	} else {
		return amount;
	}
}

function mesoComma(amount) {
	amount += '';
	x = amount.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}