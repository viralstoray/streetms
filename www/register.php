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

define('PAGE', 'Register');
require_once('global.php');

if ($street->session->is_loggedin()) {
    header('Location:home.php');
}

// for the future we'll restrict registration to only users with accounts on SSG (API) but as of right now we're skimping on that
switch ($_REQUEST['do']) {
    // insert the user
    case 'register':
        $street->input->clean_array('p', array('username' => CLEAN_STR, 'password' => CLEAN_STR));
        $username = $street->input->cleaned['username'];
        $password = $street->input->cleaned['password'];
        if (empty($username) || empty($password)) {
            header('Location:register.php?error=1');
        } else if ($street->db->query_count('accounts', 'name=\'' . $username . '\'') > 0) {
            header('Location:register.php?error=2');
        } else {
            $password = md5($password);
            $street->db->query_write('INSERT INTO accounts (name, password, gm) VALUES (?, ?, 0)', array($username, $password));
            $userid = $street->db->query_fetch('SELECT id FROM accounts WHERE name=?', array($username));
            $street->session->set_cookie('userid', $userid['id']);
            $street->session->set_cookie('username', $username);
            $street->session->set_cookie('password', $password);
            eval('print("' . fetch_template('register_complete') . '");');
        }
    break;
    // main registration form stuff
    default:
        // before we output the template just make sure we handle errors and stuff
        $street->input->clean('g', 'error', CLEAN_INT);
        switch ($street->input->cleaned['error']) {
            case 1:
                $err = 'You need to fill out all the fields.';
            break;
            case 2:
                $err = 'That username is already in use.';
            break;
        }
        $error = '<br /><br /><span style="color:red;">' . $err . '</span><br />';
        eval('print("' . fetch_template('register') . '");');
    break;
}

?>