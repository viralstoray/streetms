<?php

/**
 * StreetWWW
 * StreetMS' slave-labored web portal.
 * 
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
 
// init
define('PAGE', 'Your Character');
require_once('global.php');

// if they aren't logged in, we can't find their characters now can we?
if (!$street->session->is_loggedin()) {
    header('Location:index.php');
}

switch ($_REQUEST['do']) {
    default:
        $charcount = $street->db->query_count('characters', 'accountid=' . $user['userid']);
        if ($charcount == 0) {
            $charhtml = 'You don\'t have any characters created yet.';
            eval('print("' . fetch_template('character') . '");');
        } else {
            $jobs = $street->getJobs(true);
            require_once(DIR . 'includes/class.chargen.php');
            $chargen = new street_CharGen();
            $chars = $street->db->query('SELECT 
                id,name,level,skincolor,gender,hair,face,displayhash,
                level,job,`int`,str,dex,luk,hp,maxhp,mp,maxmp
            FROM characters WHERE accountid=?', array($user['userid']));
            $charhtml = '<strong>My Characters</strong><table width="100%" cellspacing="0" cellpadding="0"><tr>';
            while ($char = $street->db->fetch_array($chars)) {
                $chargen->build($char);
                $charhtml .= '<td width="' . (round(100 / $charcount)) . '%"><img src="chargen/Characters/' . $char['id'] . 
                '.png" alt="' . $char['name'] . '" /><br />' . '<strong>' . $char['name'] . '</strong><br />' . $char['level'] . '<br />' . 
                (($char['job'] == 900 || $char['job'] == 910) ? '<img src="images/gm.png">' : '') . $jobs[$char['job']] . 
                '<br /><img src="images/coins.png" />' . number_format($char['meso']) . '<div class="stats">' . 
                '<img src="images/lightning.png">STR: ' . $char['str'] . '<br /><img src="images/star.png">DEX: ' . $char['dex'] . '<br />' . 
                '<img src="images/rainbow.png">LUK: ' . $char['luk'] . '<br /><img src="images/lightbulb.png">INT: ' . $char['int'] . '<br /><br /><img src="images/bullet_red.png">HP: ' . $char['hp'] . '/' . 
                $char['maxhp'] . '<br /><img src="images/bullet_blue.png">MP: ' . $char['mp'] . '/' . $char['maxmp'] . '</div></td>';
            }
            $charhtml .= '</tr></table>';
            eval('print("' . fetch_template('character') . '");');
        }
    break;
}

?>