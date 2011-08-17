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
 
define('PAGE', 'Leaderboard');
require_once('global.php');
require_once(DIR . 'includes/class.chargen.php');
$img = new street_CharGen();

if ($street->db->query_count('characters') > 0) {
    $error = 'There aren\'t any users to display.';
    eval('print("' . fetch_template('error') . '");');
    exit();
}

// how should we display the ranking
switch ($_REQUEST['do']) {
    // top 10 (levels)
    default:
        $chars = $street->db->query('SELECT id,name,job,level,skincolor,gender,hair,face FROM characters ORDER BY level DESC');
        $count = 0;
        while ($char = $street->db->fetch_array($chars)) {
            $count++;
            $img->build($char);
            $html .= '<tr><td>' . $count . '</td><td><img src="chargen/Characters/' . $char['id'] . '.png" alt="' . $char['name'] . '" /></td><td>' .
            $char['name'] . '</td><td>' . $char['level'] . '</td><td>' . $jobs[$char['job']] . '</td></tr>';
        }
    break;
}

?>