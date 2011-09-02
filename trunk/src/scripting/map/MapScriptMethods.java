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
package scripting.map;

import client.MapleClient;
import client.MapleQuestStatus;
import client.SkillFactory;
import scripting.AbstractPlayerInteraction;
import server.TimerManager;
import server.quest.MapleQuest;
import tools.MaplePacketCreator;

public class MapScriptMethods extends AbstractPlayerInteraction {

    public MapScriptMethods(MapleClient c) {
        super(c);
    }
    String rewardstring = " title has been rewarded. Please see NPC Dalair to receive your Medal.";

    public void displayAranIntro() {
        switch (c.getPlayer().getMapId()) {
            case 914090010:
                lockUI();
                c.announce(MaplePacketCreator.showIntro("Effect/Direction1.img/aranTutorial/Scene0"));
                break;
            case 914090011:
                lockUI();
                c.announce(MaplePacketCreator.showIntro("Effect/Direction1.img/aranTutorial/Scene1" + c.getPlayer().getGender()));
                break;
            case 914090012:
                lockUI();
                c.announce(MaplePacketCreator.showIntro("Effect/Direction1.img/aranTutorial/Scene2" + c.getPlayer().getGender()));
                break;
            case 914090013:
                lockUI();
                c.announce(MaplePacketCreator.showIntro("Effect/Direction1.img/aranTutorial/Scene3"));
                break;
            case 914090100:
                lockUI();
                c.announce(MaplePacketCreator.showIntro("Effect/Direction1.img/aranTutorial/HandedPoleArm" + c.getPlayer().getGender()));
                break;
            case 914090200:
                lockUI();
                c.announce(MaplePacketCreator.showIntro("Effect/Direction1.img/aranTutorial/Maha"));
                break;
            case 914090201:
                lockUI();
                c.announce(MaplePacketCreator.showIntro("Effect/Direction1.img/aranTutorial/PoleArm"));
                break;
        }
    }

    public void arriveIceCave() {
        unlockUI();
        c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000014), (byte) -1, 0, -1);
        c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000015), (byte) -1, 0, -1);
        c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000016), (byte) -1, 0, -1);
        c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000017), (byte) -1, 0, -1);
        c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000018), (byte) -1, 0, -1);
        c.getPlayer().setRemainingSp(0);
        c.announce(MaplePacketCreator.showIntro("Effect/Direction1.img/aranTutorial/ClickLilin"));
    }
    
    public void displayCygnusIntro() {
        switch (c.getPlayer().getMapId()) {
            case 913040000:
                lockUI();
                c.announce(MaplePacketCreator.showIntro("Effect/Direction.img/cygnus/Scene0"));
                break;
            case 913040001:
                lockUI();
                c.announce(MaplePacketCreator.showIntro("Effect/Direction.img/cygnus/Scene1"));
                break;
            case 913040002:
                lockUI();
                c.announce(MaplePacketCreator.showIntro("Effect/Direction.img/cygnus/Scene2"));
                break;
            case 913040003:
                lockUI();
                c.announce(MaplePacketCreator.showIntro("Effect/Direction.img/cygnus/Scene3"));
                break;
            case 913040004:
                lockUI();
                c.announce(MaplePacketCreator.showIntro("Effect/Direction.img/cygnus/Scene4"));
                break;
            case 913040005:
                lockUI();
                c.announce(MaplePacketCreator.showIntro("Effect/Direction.img/cygnus/Scene5"));
                break;
            case 913040006:
                lockUI();
                c.announce(MaplePacketCreator.showIntro("Effect/Direction.img/cygnus/Scene6"));
                break;
        }
    }
    
    public void displayCygnusJobTutorial() {
        switch (c.getPlayer().getMapId()) {
            case 913040100:
                lockUI();
                c.announce(MaplePacketCreator.showIntro("Effect/Direction.img/cygnusJobTutorial/Scene0"));
                break;
            case 913040101:
                lockUI();
                c.announce(MaplePacketCreator.showIntro("Effect/Direction.img/cygnusJobTutorial/Scene1"));
                break;
            case 913040102:
                lockUI();
                c.announce(MaplePacketCreator.showIntro("Effect/Direction.img/cygnusJobTutorial/Scene2"));
                break;
            case 913040103:
                lockUI();
                c.announce(MaplePacketCreator.showIntro("Effect/Direction.img/cygnusJobTutorial/Scene3"));
                break;
            case 913040104:
                lockUI();
                c.announce(MaplePacketCreator.showIntro("Effect/Direction.img/cygnusJobTutorial/Scene4"));
                break;
            case 913040105:
                lockUI();
                c.announce(MaplePacketCreator.showIntro("Effect/Direction.img/cygnusJobTutorial/Scene5"));
                break;
            case 913040106:
                lockUI();
                c.announce(MaplePacketCreator.showIntro("Effect/Direction.img/cygnusJobTutorial/Scene6"));
                break;
        }
    }

    public void startExplorerExperience() {
        if (c.getPlayer().getMapId() == 1020100) //Swordman
        {
            c.announce(MaplePacketCreator.showIntro("Effect/Direction3.img/swordman/Scene" + c.getPlayer().getGender()));
        } else if (c.getPlayer().getMapId() == 1020200) //Magician
        {
            c.announce(MaplePacketCreator.showIntro("Effect/Direction3.img/magician/Scene" + c.getPlayer().getGender()));
        } else if (c.getPlayer().getMapId() == 1020300) //Archer
        {
            c.announce(MaplePacketCreator.showIntro("Effect/Direction3.img/archer/Scene" + c.getPlayer().getGender()));
        } else if (c.getPlayer().getMapId() == 1020400) //Rogue
        {
            c.announce(MaplePacketCreator.showIntro("Effect/Direction3.img/rogue/Scene" + c.getPlayer().getGender()));
        } else if (c.getPlayer().getMapId() == 1020500) //Pirate
        {
            c.announce(MaplePacketCreator.showIntro("Effect/Direction3.img/pirate/Scene" + c.getPlayer().getGender()));
        }
    }

    public void enterRien() {
        if (c.getPlayer().getJob().getId() == 2100 && !c.getPlayer().getAranIntroState("ck=1")) {
            c.getPlayer().addAreaData(21019, "miss=o;arr=o;ck=1;helper=clear");
            c.announce(MaplePacketCreator.updateAreaInfo("miss=o;arr=o;ck=1;helper=clear", 21019));
            unlockUI();
        }
    }

    public void goAdventure() {
        lockUI();
        c.announce(MaplePacketCreator.showIntro("Effect/Direction3.img/goAdventure/Scene" + c.getPlayer().getGender()));
    }

    public void goLith() {
        lockUI();
        c.announce(MaplePacketCreator.showIntro("Effect/Direction3.img/goLith/Scene" + c.getPlayer().getGender()));
    }

    public void explorerQuest(short questid, String questName) {
        MapleQuest quest = MapleQuest.getInstance(questid);
        if (!isQuestStarted(questid)) {
            quest.forceStart(getPlayer(), 9000066);
        }
        MapleQuestStatus q = getPlayer().getQuest(quest);
        if (!q.addMedalMap(getPlayer().getMapId())) {
            return;
        }
        String status = Integer.toString(q.getMedalProgress());
        int infoex = quest.getInfoEx();
        getPlayer().announce(MaplePacketCreator.questProgress(quest.getInfoNumber(), status));
        StringBuilder smp = new StringBuilder();
        StringBuilder etm = new StringBuilder();
        if (q.getMedalProgress() == infoex) {
            etm.append("Earned the ").append(questName).append(" title!");
            smp.append("You have earned the <").append(questName).append(">").append(rewardstring);
            getPlayer().announce(MaplePacketCreator.getShowQuestCompletion(quest.getId()));
        } else {
            getPlayer().announce(MaplePacketCreator.earnTitleMessage(status + "/" + infoex + " regions explored."));
            etm.append("Trying for the ").append(questName).append(" title.");
            smp.append("You made progress on the ").append(questName).append(" title. ").append(status).append("/").append(infoex);
        }
        getPlayer().announce(MaplePacketCreator.earnTitleMessage(etm.toString()));
        showInfoText(smp.toString());
    }

    public void touchTheSky() { //29004
        MapleQuest quest = MapleQuest.getInstance(29004);
        if (!isQuestStarted(29004)) {
            quest.forceStart(getPlayer(), 9000066);
        }
        MapleQuestStatus q = getPlayer().getQuest(quest);
        if (!q.addMedalMap(getPlayer().getMapId())) {
            return;
        }
        String status = Integer.toString(q.getMedalProgress());
        getPlayer().announce(MaplePacketCreator.questProgress(quest.getInfoNumber(), status));
        getPlayer().announce(MaplePacketCreator.earnTitleMessage(status + "/5 Completed"));
        getPlayer().announce(MaplePacketCreator.earnTitleMessage("The One Who's Touched the Sky title in progress."));
        if (q.getMedalProgress() == quest.getInfoEx()) {
            showInfoText("The One Who's Touched the Sky" + rewardstring);
            getPlayer().announce(MaplePacketCreator.getShowQuestCompletion(quest.getId()));
        } else {
            showInfoText("The One Who's Touched the Sky title in progress. " + status + "/5 Completed");
        }
    }
}
