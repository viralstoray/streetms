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
 
// initialize
define('PAGE', 'server');
require_once('global.php');

$gms = $street->db->query_count('accounts', 'gm > 0 AND loggedin > 0');
$users = $street->db->query_count('accounts', 'loggedin > 0');
$usertotal = $street->db->query_count('accounts');
print_header('Server Statistics');
print_content('<strong>Statistics</strong><br /><br />Current GMs online: ' . $gms . '<br />Current users online: ' . $users . '<br />Current users: ' . $usertotal);
print_footer();

?>