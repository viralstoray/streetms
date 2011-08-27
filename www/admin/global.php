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
 
// alright, let's define all of our wonderful variables and crap
define('DIR', dirname(getcwd()) . '/');
define('TIME', time());

// and grab our core class
require_once(DIR . 'includes/class.core.php');
$street = new street_Core();

// and the admin functions
require_once(DIR . 'includes/functions.admin.php');

// and our general functions
require_once(DIR . 'includes/functions.php');

// and check to see if the user is logged in - if they aren't, force it, since we don't want anyone to admin this now do we~
if ($street->session->is_loggedin()) {
    $user = fetch_user();
    if ($user['gm'] < 2) {
        header('Location:home.php');
    }
} else {
    header('Location:index.php');
}

?>