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
 
define('PAGE', 'Home');
require_once('global.php');

// gotta be logged in to be here
if (!$street->session->is_loggedin()) {
    header('Location:index.php');
}

switch($_REQUEST['do']) {
    // reset password
    case 'resetpass':
        $street->input->clean_array('p', array('oldpass' => CLEAN_STR, 'newpass' => CLEAN_STR));
        $old = $street->input->cleaned['oldpass'];
        $new = $street->input->cleaned['newpass'];
        if (empty($old) || empty($new)) {
            header('Location:account.php?e=1');
        } else {
            $old = md5($old);
            $new = md5($new);
            $p = $street->db->query_fetch('SELECT password FROM accounts WHERE id=?', array($user['userid']));
            if ($p['password'] == $old) {
                $street->db->query_write('UPDATE accounts SET password=? WHERE id=?', array($new, $user['userid']));
                $street->session->set_cookie('password', $new);
                header('Location:account.php?e=3');
            } else {
                header('Location:account.php?e=2');
            }
        }
    break;
    // default status page
    default:
        $street->input->clean('g', 'e', CLEAN_INT);
        $e = $street->input->cleaned['e'];
        switch ($e) {
            case 1:
                $error = '<span style="color:red;">You need to fill in all the required fields.</span><br />';
            break;
            case 2:
                $error = '<span style="color:red;">Your old password doesn\'t match.</span><br />';
            break;
            case 3:
                $error = '<span style="color:green;">Your password has been updated.</span><br />';
            break;
            default: $error = null; break;
        }
        if ($street->db->query_count('banlog', 'cid = ' . $user['userid']) == 0) {
            $banlog = 'N/A';
        } else {
            $q = $street->db->query('SELECT t,duration,reason FROM banlog WHERE cid=? ORDER BY t', array($user['userid']));
            $banlog = '<table width="80%">';
            while ($b = $street->db->fetch_array($q)) {
                $banlog .= '<tr><td>' . date('m-d-y, g:i A', $b['t']) . '</td><td>' . $b['duration'] . '</td><td>' . $b['reason'] . '</td></tr>';
            }
            $banlog .= '</table>';
        }
        $charcount = $street->db->query_count('characters', 'accountid = ' . $user['userid']);
        eval('print("' . fetch_template('account') . '");');
    break;
}

?>