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

if ($street->session->is_loggedin()) {
    eval('print("' . fetch_template('userhome') . '");');
} else {
    $error = 'Sorry, you need to be logged in to view this page. <a href="login.php">Login here</a>?';
    eval('print("' . fetch_template('general_error') . '");');
}

?>