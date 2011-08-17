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
 
define('PAGE', 'Login');
require_once('global.php');

switch ($_REQUEST['do']) {
    // performs the session set/etc
    case 'login':
        // if the user is already logged in.. what are they doing here
        if ($street->session->is_loggedin()) {
            header('Location:home.php');
        }
        $street->input->clean_array('p', array('username' => CLEAN_STR, 'password' => CLEAN_STR));
        $username = $street->input->cleaned['username'];
        $password = $street->input->cleaned['password'];
        if (empty($username) || empty($password)) {
            header('Location:login.php?e=2');
        } else {
            $p = $street->db->query_fetch('SELECT id,password FROM accounts WHERE name=?', array($username));
            $password = md5($password);
            if ($p['password'] == $password) {
                $street->session->set_cookie('userid', $p['id']);
                $street->session->set_cookie('username', $username);
                $street->session->set_cookie('password', $password);
                eval('print("' . fetch_template('login_complete') . '");');
            } else {
                header('Location:login.php?e=1');
            }
        }
    break;
    // logout...
    case 'logout':
        if ($street->session->is_loggedin()) {
            $street->session->set_cookie('userid', null);
            $street->session->set_cookie('username', null);
            $street->session->set_cookie('password', null);
            header('Location:index.php');
        } else {
            header('Location:login.php');
        }
    break;
    // login page
    default:
        // if the user is already logged in.. what are they doing here
        if ($street->session->is_loggedin()) {
            header('Location:home.php');
        }
        // if we have any errors make sure to print them out
        $street->input->clean('g', 'e', CLEAN_INT);
        $e = $street->input->cleaned['e'];
        switch ($e) {
            case 1:
                $error = '<span style="color:red;">That username and password combination doesn\'t work.</span><br /><br />';
            break;
            case 2:
                $error = '<span style="color:red;">You need to fill in all fields.</span><br /><br />';
            break;
            default: 
                $error = ''; 
            break;
        }
        eval('print("' . fetch_template('login') . '");');
    break;
}

?>