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

// grab the core class 
require_once('class.core.php');
$street = new street_Core();
 
/**
 * Contains all of our general functions to perform misc. actions.
 */

/**
 * fetch_template
 * Retrieves our template from the database.
 * @param string    template name
 * @return string   template html
 */
function fetch_template($name) {
    global $street;
    if ($street->db->query_count('templates', "name='" . $name . "'") == 0) {
        $street->error->msg($name . ' doesn\'t exist');
    } else {
        $t = $street->db->query_fetch('SELECT html FROM templates WHERE name=?', array($name));
        $t = html_entity_decode($t['html']);
        $t = addcslashes($t, '"');
        return $t;
    }
}

/**
 * fetch_user
 * Returns an array of useful information and rainbows and happiness
 * @return array    userinfo
 */
function fetch_user() {
    global $street;
    if ($street->session->is_loggedin()) {
        return $street->db->query_fetch('SELECT id AS userid,name AS username,gm,banned,banreason FROM accounts WHERE id=?', array($street->session->get_cookie('userid')));
    } else {
        return false;
    }
}

?>