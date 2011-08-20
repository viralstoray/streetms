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
var status = -1;

function start() {
    if (cm.getParty() != null) {
		if (cm.isLeader()) {
			for (var i = 0; i < 5; i++) {
				var map = 980000100 + i*100;
				if (cm.getMapId() == map) {
					var party = cm.getPlayer().getCpqChar().getParty().getMembers();
					var message = "#b";
					for (var i = 0; i < party.size(); i++) {
						message += party.get(i).getName() + " / Level " + party.get(i).getLevel() + " / " + cm.getPlayer().getJobName(party.get(i)) + "\r\n";
					}
					message += "#k\r\nWould you like to battle this party at the Monster Carnival?";
					cm.sendAcceptDecline(message);
				}
			}
			if (cm.getMapId() == 980000000) {
				var message = "Sign up for Monster Carnival!\r\n#b";
				if (cm.getPlayerCount(980000101) == 0)
					message += "#L0#Carnival Field 1(" + (cm.getPlayerCount(980000100) > 0 ? cm.getPartyLeader(980000100) + "/" + cm.getPlayerCount(980000100) + "user" + (cm.getPlayerCount(980000100) == 1 ? "" : "s") + "/" + cm.getAverageUserLevel(980000100) : "2~4 ppl") + ")#l\r\n";
				if (cm.getPlayerCount(980000201) == 0)
					message += "#L1#Carnival Field 2(" + (cm.getPlayerCount(980000200) > 0 ? cm.getPartyLeader(980000200) + "/" + cm.getPlayerCount(980000200) + "user" + (cm.getPlayerCount(980000200) == 1 ? "" : "s") + "/" + cm.getAverageUserLevel(980000200) : "2~4 ppl") + ")#l\r\n";
				if (cm.getPlayerCount(980000301) == 0)
					message += "#L2#Carnival Field 3(" + (cm.getPlayerCount(980000300) > 0 ? cm.getPartyLeader(980000300) + "/" + cm.getPlayerCount(980000300) + "user" + (cm.getPlayerCount(980000300) == 1 ? "" : "s") + "/" + cm.getAverageUserLevel(980000300) : "2~4 ppl") + ")#l\r\n";
				if (cm.getPlayerCount(980000401) == 0)
					message += "#L3#Carnival Field 4(" + (cm.getPlayerCount(980000400) > 0 ? cm.getPartyLeader(980000400) + "/" + cm.getPlayerCount(980000400) + "user" + (cm.getPlayerCount(980000400) == 1 ? "" : "s") + "/" + cm.getAverageUserLevel(980000400) : "2~4 ppl") + ")#l\r\n";
				if (cm.getPlayerCount(980000501) == 0)
					message += "#L4#Carnival Field 5(" + (cm.getPlayerCount(980000500) > 0 ? cm.getPartyLeader(980000500) + "/" + cm.getPlayerCount(980000500) + "user" + (cm.getPlayerCount(980000500) == 1 ? "" : "s") + "/" + cm.getAverageUserLevel(980000500) : "3~6 ppl") + ")#l\r\n";
				if (cm.getPlayerCount(980000601) == 0)
					message += "#L5#Carnival Field 6(" + (cm.getPlayerCount(980000600) > 0 ? cm.getPartyLeader(980000600) + "/" + cm.getPlayerCount(980000600) + "user" + (cm.getPlayerCount(980000600) == 1 ? "" : "s") + "/" + cm.getAverageUserLevel(980000600) : "3~6 ppl") + ")#l\r\n";
				message += "#L6#How to play#l\r\n#k";
				cm.sendSimple(message);
			}
		} else {
			cm.sendOk("The party leader can make a request to join the Monster Carnival.");
			cm.dispose();
		}
    } else {
        cm.sendOk("The party leader can make a request to join the Monster Carnival.");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
        status++;
		if (status == 0) {
			for (var i = 0; i < 6; i++) {
				var map = 980000100 + i*100;
				if (cm.getMapId() == map) {
					var em = cm.getEventManager("monsterCarnivalPQLobby");
					em.setProperty("toLobby", (i+1));
					em.setProperty("lobbyOpen" + (i+1), "false");
					em.startInstance(cm.getPlayer().getCpqChar().getParty(), cm.getPlayer().getCpqChar().getMap());
					cm.getPlayer().resetCpqChar();
					cm.dispose();
				}
			}
			if (cm.getMapId() == 980000000) {
				select = selection;
				for (var i = 0; i < 6; i++) {
					if (select == i) {
						var map = 980000100 + i*100;
						if (cm.getPlayerCount(map) > 0) {
							if (cm.getPartyLeader(map).getParty().getMembers().size() != cm.getPlayer().getParty().getMembers().size()) {
								cm.sendOk("The two parties participating in Monster Carnival must have an equal number of party members.");
								cm.dispose();
							} else {
								var party = cm.getPartyLeader(map).getParty().getMembers();
								var message = "#b";
								for (var i = 0; i < party.size(); i++) {
								message += party.get(i).getName() + " / Level " + party.get(i).getLevel() + " / " + cm.getPlayer().getJobName(party.get(i)) + "\r\n";
							}
							message += "#k\r\nWould you like to battle this party at the Monster Carnival?";
							cm.sendAcceptDecline(message);
							}
						} else {
							if (cm.getPlayer().getParty().getMembers().size() < (i < 4 ? 2 : 3) || cm.getPlayer().getParty().getMembers().size() > (i < 4 ? 4 : 6)) {
								cm.sendOk("Carnival Field " + (i+1) + " can only be opened to a party of " + (i < 4 ? "2~4" : "3~6") + ". Please organize your party to meet this requirement.");
								cm.dispose();
							} else {
								var em = cm.getEventManager("monsterCarnivalPQLobby");
								if (em == null) {
									cm.sendOk("Sorry, but this PQ is currently undergoing maintenance. Try again soon!");
								} else {
									em.setProperty("toLobby", (i+1));
									em.startInstance(cm.getParty(), cm.getPlayer().getMap());
								}
								cm.dispose();
							}
						}
					}
				}
				if (select == 6) {
					cm.sendSimple("What do you want to know?\r\n#b#L0#What's the Monster Carnival?#l\r\n#L1#General Overview of the Monster Carnival#l\r\n#L2#Detailed instructions about the Monster Carnival#l\r\n#L3#Nothing, really. I've changed my mind.#l#k");
				}
			}
		} else if (status == 1) {
			howtoplay = selection;
			for (var i = 0; i < 6; i++) {
				if (select == i) {
					var map = 980000100 + i*100;
					cm.getPartyLeader(map).sendCPQInvitation(cm.getPlayer());
					cm.dispose();
				}
			}
			if (howtoplay == 0) {
				cm.sendNext("Haha! I'm Spiegelmann, the leader of this traveling carnival. I started the 1st ever #bMonster Carnival#k here, waiting for travelers like you to participate in this extravaganza!");
			} else if (howtoplay == 1) {
				cm.sendNext("#bMonster Carnival#k consists of 2 parties entering the battleground, and hunting the monsters summoned by the other party. It's a #bcombat quest that determines the victor by the amount of Carnival Points (CP) earned#k.");
			} else if (howtoplay == 2) {
				cm.sendNext("Once you enter the Carnival Field, you'll see a Monster Carnival window pop up. It's actually really easy to use. All you have to do is #bselect the ones you want to use, and press OK#k.");
			} else if (howtoplay == 3) {
				cm.dispose();
			}
		} else if (status == 2) {
			if (howtoplay == 0) {
				cm.sendNextPrev("What's the #bMonster Carnival#k? Hahaha! I'm glad you asked! Let's just say that it's an experience unlike anything you've ever imagined! It's a #bbattle against other travelers#k!");
			} else if (howtoplay == 1) {
				cm.sendNextPrev("Once you enter the Carnival Field, the task is to #bearn Carnival Points by hunting monsters summoned by the opposing party, and use those Carnival Points to distract the opposing party from hunting monsters#k.");
			} else if (howtoplay == 2) {
				cm.sendNextPrev("Once you get used to it, try using #bthe Hotkeys TAB and F1 ~ F12. TAB toggles between Summon a Monster/Skill/Protector, and, F1~F12 allows you to directly enter one of the windows#k.");
			}
		} else if (status == 3) {
			if (howtoplay == 0) {
				cm.sendNextPrev("I know that it is way too dangerous for you to fight one another using real weapons; and would never advocate such a thing. No, what I offer is the spirit of competition. A test of unity, strength, and will! The basic premise is that there are two parties. Both #bsummon monsters, and defeat the monsters summoned by the opposing party. That's the essence of the Monster Carnival. Also, you can use Maple Coins earned during the Monster Carnival to obtain new items and weapons!#k");
			} else if (howtoplay == 1) {
				cm.sendNextPrev("There are three ways to distract the other party: #bSummon a Monster, Skill, and Protector#k. I'll give you more details in the Detailed Instructions of the Game.");
			} else if (howtoplay == 2) {
				cm.sendNextPrev("#bSummon a Monster#k is a command that sends a monster to attack the opposing party, all under your control. Use CP to bring out a Summoned Monster, and it'll appear in the same area, attacking the opposing party.");
			}
		} else if (status == 4) {
			if (howtoplay == 0) {
				cm.sendNextPrev("Of course, it's not as simple as that. There are different ways to prevent the other party from hunting monsters, and it's up to you to figure out how. What do you think? Interested in a little competition?");
				cm.dispose();
			} else if (howtoplay == 1) {
				cm.sendNextPrev("Please remember this, though. It's never a good idea to save up CP just for the sake of it. #bThe CP's you've used will also help determine the winner and the loser of the carnival#k.");
			} else if (howtoplay == 2) {
				cm.sendNextPrev("#bSkill#k is an option of using skills such as Darkness, Weakness, and others to directly affect the opposing party and prevent them from defeating the monsters. It requires a lot of CP, but it's well worth it. The only problem is that it doesn't last that long. Use it wisely!");
			}
		} else if (status == 5) {
			if (howtoplay == 1) {
				cm.sendNextPrev("Oh, and don't worry about turning into a ghost. At Monster Carnival, #byou won't lose EXP even after death#k. It's truly an experience like no other!");
				cm.dispose();
			} else if (howtoplay == 2) {
				cm.sendNextPrev("#bProtector#k is basically a summoned item that greatly boosts the abilities of the monsters summoned by your party. Protector works as long as it's not demolished by the opposing party, so I suggest you summon a lot of monsters first, and then bring out the Protector.");
			}
		} else if (status == 6) {
			cm.sendNextPrev("Lastly, at Monster Carnival, #byou cannot use the recovery items/potions that you carry around with you#k. But, the monsters will drop those items every once in awhile, and #bas soon as you pick it up, the item will activate immediately#k. That's why it's just as important to know WHEN to pick up those items.");
			cm.dispose();
		}
    }
}