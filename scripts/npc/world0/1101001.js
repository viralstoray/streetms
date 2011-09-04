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
var status = -1;

function start() {
	if (cm.getLevel() > 9 && cm.getJobId() == 1000) 
		cm.sendSimple("Now that you've seen all your job possibilities, which one would you like to become?\r\n#b#L0#Dawn Warrior#l\r\n#L1#Blaze Wizard#l\r\n#L2#Wind Archer#l\r\n#L3#Night Walker#l\r\n#L4#Thunder Breaker#l#k");
	else if (cm.getPlayer().isCygnus()) {
		cm.getItemEffect(2022458).applyTo(cm.getPlayer());
		cm.sendOk("Don't stop training. Every ounce of your energy is required to protect Maple World...");
		cm.dispose();
	}
}

function action(mode, type, selection) {
    if(mode != 1)
        cm.dispose();
    else {
        status++;
        if (status == 0) {
			select = selection;
			if (select == 0)
				cm.sendNext("The foundation of being a Dawn Warrior is becoming both a Warrior and a Swordsman. It requires strength, power, and stamina to defeat monsters that are up-close. #bHigh STR is a priority, but a dose of DEX is just as required to achieve balance#k. That being said, this only makes you a Warrior, not a Dawn Warrior.");
			else if (select == 1)
				cm.sendNext("Blaze Wizards are Magicians at heart, which means each one of them possesses a #bhigh level of INT and magic powers#k. Just like other Magicians, Blaze Wizards aren't adept at melee combat, and they don't possess a high level of stamina, either. Those aren't the only things that define a Blaze Wizard, though...");
			else if (select == 2)
				cm.sendNext("Wind Archers are Bowmen first and foremost, using regular bows. Like Bowmen, Wind Archers pride themselves in being masters of long-range attacks. #bIt is a given that all prospective Wind Archers need a high level of DEX for accurate attacks#k... but that's not all.");
			else if (select == 3)
				cm.sendNext("Night Walkers are Thieves before all else, using throwing stars as weapons. Becoming one requires a lot of #bLUK and DEX, with a bit of a cunning brain#k. You'll be attacking primarily from long distance, so it shouldn't be too dangerous. Of course, Night Walkers are more than that...");
			else if (select == 4)
				cm.sendNext("Thunder Breakers are Brawlers at heart. This job requires a healthy dose of #bSTR and DEX. Use your padded fists to fight your opposition#k! With fancy and successive combo moves, you can probably consider yourself ready to become a Thunder Breaker... but that's not all.");
		} else if (status == 1) {
			if (select == 0)
				cm.sendNextPrev("Dawn Warriors are the special few that receive divine protection from the Spirit of Light. That's why the Dawn Warriors are #bconstantly accompanied by Soul, the Spirit of Light#k. If you indeed become a Dawn Warrior, then Soul will be equal parts companion, comrade, and savior, sticking by you through thick and thin.");
			else if (select == 1)
				cm.sendNextPrev("Blaze Wizards are the special few that receive divine protection from the Spirit of Fire. If you indeed take on the path of a Blaze Wizard, you will be able to summon #bIgnis, the Spirit of Fire, to accompany you in battles#k. You can even combine your powers with lgnis to create lethal magic to combat monsters, something regular Magicians aren't capable of doing.");
			else if (select == 2)
				cm.sendNextPrev("Wind Archers are the special few that receive divine protection from the Spirit of the Wind. If you indeed take on the path of the Wind Archer, then you'll be able to summon #bVentus, the Spirit of Wind#k. Ventus will be there to provide you much-needed protection and provide some power to you and your bow for added effect.");
			else if (select == 3)
				cm.sendNextPrev("Night Walkers are the special few that receive divine protection from the Spirit of Darkness. If you indeed take on the path of the Night Walker, then you'll be able to summon #bUmbra, the Spirit of Darkness#k. It is, however, foolish to pin all your hopes on the power of the spirits. We're slightly different fom the rest of the world, in that we are the \"different\" ones searching for an answer using the power of poison.");
			else if (select == 4)
				cm.sendNextPrev("Thunder Breakers are the special few that receive divine protection from the Spirit of Lightning. Yes, that means if you become one, you'll be able to #bsummon Fulgar, the Spirit of Lightning! Fulgar will provide you protection and even fight for you. You may also use powerful skills from the depths of the heart#k. Doesn't that sound exciting?");
		} else if (status == 2) {
			if (select == 0)
				cm.sendYesNo("Being a Dawn Warrior requires one to have a clear head, deadly sword, warm heart, and an eternal loyalty towards the Empress. If you are willing to develop these qualities, then I will make you a #bDawn Warrior.#k");
			else if (select == 1)
				cm.sendYesNo("You... you can become a Blaze Wizard if you have the desire and perseverence to keep striving for your goal, along with a determined set of eyes that never deviate from an opponent. If you are willing to take these steps then I will make you a #bBlaze Wizard#k.");
			else if (select == 2)
				cm.sendYesNo("Wind represents freedom, but unconditional freedom is nothing more than just being uncontrollable. When logic and freedom collide, that's where a Wind Archer comes in. If you wish to free your mind then I will make you a #bWind Archer#k.");
			else if (select == 3)
				cm.sendYesNo("We're the ones walking on the path of darkness--it's not necessarily the path of a saint, but we aren't full of anger and hatred like the Black Mage, either. Darkness is required for us because we are responsible for enforcing justice in places where light is not readily available. If you wish to follow the darkness fixed by light then I will make you a #bNight Walker#k.");
			else if (select == 4)
				cm.sendYesNo("Fighting the Black Mage will be a difficult task, yes... but it's no fun having to cringe everytime you run into a brick wall. You should enjoy it, always with a smile on your face! Being a #bThunder Breaker#k will allow you to have dynamic life experiences that you may not face anywhere else. Are you interested in becoming a #bThunder Breaker#k?");
		} else if (status == 3) {
			cm.resetStats();
			cm.setRemainingAp(63);
			cm.changeJobById(1000 + (100 * (select + 1)));
			cm.forceCompleteQuest(20100 + (select + 1), 1101001);
			cm.gainItem(1142066, 1);
			cm.sendOk("You have made a wise decision. You are now a #b" + cm.getPlayer().getJobName() + "#k.");
			cm.dispose();
		}
    }
}