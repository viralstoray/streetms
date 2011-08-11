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
/* Shumi JQ Chest #1
*/
var cost = 10000;
var status = 0;
var music = Array("Bgm00/SleepyWood","Bgm00/FloralLife","Bgm00/GoPicnic","Bgm00/Nightmare","Bgm00/RestNPeace","Bgm01/AncientMove","Bgm01/MoonlightShadow","Bgm01/WhereTheBarlogFrom","Bgm01/CavaBien","Bgm01/HighlandStar","Bgm01/BadGuys","Bgm02/MissingYou","Bgm02/WhenTheMorningComes","Bgm02/EvilEyes","Bgm02/JungleBook","Bgm02/AboveTheTreetops","Bgm03/Subway","Bgm03/Elfwood","Bgm03/BlueSky","Bgm03/Beachway","Bgm03/SnowyVillage","Bgm04/PlayWithMe","Bgm04/WhiteChristmas","Bgm04/UponTheSky","Bgm04/ArabPirate","Bgm04/Shinin'Harbor","Bgm04/WarmRegard","Bgm05/WolfWood","Bgm05/DownToTheCave","Bgm05/AbandonedMine","Bgm05/MineQuest","Bgm05/HellGate","Bgm06/FinalFight","Bgm06/WelcomeToTheHell","Bgm06/ComeWithMe","Bgm06/FlyingInABlueDream","Bgm06/FantasticThinking","Bgm07/WaltzForWork","Bgm07/WhereverYouAre","Bgm07/FunnyTimeMaker","Bgm07/HighEnough","Bgm07/Fantasia","Bgm08/LetsMarch","Bgm08/ForTheGlory","Bgm08/FindingForest","Bgm08/LetsHuntAliens","Bgm08/PlotOfPixie","Bgm09/DarkShadow","Bgm09/TheyMenacingYou","Bgm09/FairyTale","Bgm09/FairyTalediffvers","Bgm09/TimeAttack","Bgm10/Timeless","Bgm10/TimelessB","Bgm10/BizarreTales","Bgm10/TheWayGrotesque","Bgm10/Eregos","Bgm11/BlueWorld","Bgm11/Aquarium","Bgm11/ShiningSea","Bgm11/DownTown","Bgm11/DarkMountain","Bgm12/AquaCave","Bgm12/DeepSee","Bgm12/WaterWay","Bgm12/AcientRemain","Bgm12/RuinCastle","Bgm12/Dispute","Bgm13/CokeTown","Bgm13/Leafre","Bgm13/Minar'sDream","Bgm13/AcientForest","Bgm13/TowerOfGoddess","Bgm13/FightSand","Bgm14/DragonLoad","Bgm14/HonTale","Bgm14/CaveOfHontale","Bgm14/DragonNest","Bgm14/Ariant","Bgm14/HotDesert","Bgm15/MureungHill","Bgm15/MureungForest","Bgm15/WhiteHerb","Bgm15/Pirate","Bgm15/SunsetDesert","Bgm15/Nautilus","Bgm15/inNautilus","Bgm15/ElinForest","Bgm15/PoisonForest","Bgm16/TimeTemple","Bgm16/Remembrance","Bgm16/Repentance","Bgm16/Forgetfulness","Bgm16/Duskofgod","Bgm16/FightingPinkBeen","Bgm17/MureungSchool1","Bgm17/MureungSchool2","Bgm17/MureungSchool3","Bgm17/MureungSchool4","Bgm18/QueensGarden","Bgm18/DrillHall","Bgm18/BlackWing","Bgm18/RaindropFlower","Bgm18/WolfAndSheep","Bgm19/RienVillage","Bgm19/SnowDrop","Bgm19/BambooGym","Bgm19/CrystalCave","Bgm19/MushCatle","Bgm20/NetsPiramid","Bgm20/NetsPiramid2","Bgm20/UnderSubway","Bgm20/UnderSubway2","Bgm20/GhostShip","Bgm21/KerningSquare","Bgm21/KerningSquareField","Bgm21/KerningSquareSubway","Bgm21/TeraForest","Bgm21/2021year","Bgm21/2099year","Bgm21/2215year","Bgm21/2230year","Bgm21/2503year","BgmEvent/FunnyRabbit","BgmEvent/FunnyRabbitFaster","BgmEvent/wedding","BgmEvent/weddingDance","BgmEvent/wichTower","BgmGL/amoria","BgmGL/chapel","BgmGL/cathedral","BgmGL/Amorianchallenge","BgmGL/NLCupbeat","BgmGL/NLChunt","BgmGL/NLCtown","BgmGL/HauntedHouse","BgmGL/CrimsonwoodKeep","BgmGL/Bigfoot","BgmGL/PhantomForest","BgmGL/CrimsonwoodKeepInterior","BgmGL/GrandmastersGauntlet","BgmGL/PartyQuestGL","BgmGL/Courtyard","BgmJp/Feeling","BgmJp/BizarreForest","BgmJp/Hana","BgmJp/Yume","BgmJp/Bathroom","BgmJp/BattleField","BgmJp/FirstStepMaster","BgmMY/KualaLumpur","BgmMY/Highland","BgmSG/CBD_town","BgmSG/CBD_field","BgmSG/BoatQuay_field","BgmSG/Ghostship","BgmSG/BoatQuay_town","BgmUI/NxLogo","BgmUI/WzLogo","BgmUI/WCSelect","BgmUI/ShopBgm","BgmUI/Title","BgmUI/NxLogoMS");

function start() {
	if (cm.getPlayer().getMapId() == 910000000) {
		cm.sendNext("I'm a magical chest that holds...you guessed it!\r\n#e#bF#k#gu#k#bn#k#gk#k#by#k #gb#k#be#k#ga#k#bt#k#gs#k#b!#k#n");
	} else {
		prizes = [4020000,4020001,4020002,4020003,4020004];
		if (cm.isQuestStarted(2055))
			cm.gainItem(4031039,1);
		else
			cm.gainItem(4020000 + ((Math.random()*5)|0), 1);
		cm.warp(103000100);
		cm.dispose();
	}
}

function action(mode, type, selection) {
    if(mode != 1)
        cm.dispose();
    else {
        status++;
        if (status == 1) {
            cm.sendSimple("What would you like to do?\r\n#b#L0#Choose a song to play#l\r\n#L1#Play a random song#l#k");
        } else if (status == 2) {
			isRandom = selection;
			if (isRandom == 0) {
				message = "Which song would you like to play?#b";
				for (var i = 0; i < music.length; i++) {
					message += "\r\n#L" + i + "#" + music[i] + "#l";
				}
				cm.sendSimple(message);
			} else if (isRandom == 1) {
				cm.sendYesNo("Are you sure you want to play a random song? It will cost you #r" + cost + " mesos#k.");
			}
		} else if (status == 3) {
			if (isRandom == 0) {
				song = selection;
				cm.sendYesNo("Are you sure you want to play #b" + music[selection] + "#k? It will cost you #r" + cost + " mesos.#k");
			} else if (isRandom == 1) {
				if (cm.getMeso() >= cost) {
					cm.gainMeso(-cost);
					randomNum = Math.ceil(Math.random() * music.length);
					cm.musicChange(music[randomNum]);
					cm.sendOk("Sounds good buddy, the randomly chosen song was #b" + music[randomNum] + "#k. Enjoy it!");
				} else {
					cm.sendOk("Sorry buddy, looks like you don't have enough mesos.");
				}
				cm.dispose();
			}
		} else if (status == 4) {
			if (cm.getMeso() >= cost) {
				cm.gainMeso(-cost);
				cm.musicChange(music[song]);
				cm.sendOk("Sounds good buddy, the song you chose, #b" + music[song] + "#k is now playing. Enjoy it!");
			} else {
				cm.sendOk("Sorry buddy, looks like you don't have enough mesos.");
			}
			cm.dispose();
		}
    }
}
