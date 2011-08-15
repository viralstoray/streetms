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
 
// initialize the page
define('PAGE', 'player');
require_once('global.php');

switch ($_REQUEST['do']) {
    // edits an account (not a character)
    case 'editaccount':
        $street->input->clean('g', 'u', CLEAN_INT);
        $id = $street->input->cleaned['u'];
        print_header('Edit Account');
        if (empty($id) || $street->db->query_count('accounts', 'id = ' . $id) == 0) {
            print_content('That account doesn\'t exist.');
        } else {
            $u = $street->db->query_fetch('SELECT name,password,loggedin,banned,banreason,gm,nxCredit,nxPrepaid FROM accounts WHERE id = ?', array($id));
            print_form('update_account', '?do=update&t=a');
            print_form_caption('<strong>Edit ' . $u['name'] . '</strong><br /><br />');
            print_form_input('Username', 'name', $u['name']);
            print_form_input('New Password', 'password');
            print_form_checkbox('Logged in?', 'loggedin', ($u['loggedin'] > 0) ? true : false);
            print_form_checkbox('Banned', 'banned', ($u['banned'] == 1) ? true : false);
            print_form_input('Ban reason', 'banreason', ($u['banned'] == 0) ? 'N/A' : $u['banreason']);
            print_form_select('GM', 'gm', array('No' => 0, 'GM' => 1, 'Admin' => 2), false, $u['gm']);
            print('<input type="hidden" name="id" value="' . $id . '" />');
            print_form_submit('Update');
        }
        print_footer();
    break;
    case 'editcharacter':
        $street->input->clean('g', 'c', CLEAN_INT);
        $id = $street->input->cleaned['c'];
        print_header('Edit Character');
        if (empty($id) || $street->db->query_count('characters', 'id = ' . $id) == 0) {
            print_content('That character doesn\'t exist.');
        } else {
            $c = $street->db->query_fetch('SELECT name,accountid,level,exp,str,dex,luk,meso,job,map FROM characters WHERE id = ?', array($id));
            $u = $street->db->query_fetch('SELECT name,loggedin,banned FROM accounts WHERE id = ?', array($c['accountid']));
            print_form('update_character', '?do=update&t=c');
            print_form_caption('<strong>Edit ' . $c['name'] . '</strong>' . (($u['loggedin'] > 0) ? '<br /><span style="color: red;">WARNING: this character' . 
            ' is currently logged in and any changes you make won\'t be applied unless they are logged out first.</span><br /><br />' : '<br /><br />'));
            print_form_input('Character Name', 'name', $c['name']);
            print_form_input('Level', 'level', $c['level']);
            print_form_input('EXP', 'exp', $c['exp']);
            print_form_input('STR', 'str', $c['str']);
            print_form_input('DEX', 'dex', $c['dex']);
            print_form_input('LUK', 'luk', $c['luk']);
            print_form_input('Mesos', 'meso', $c['meso']);
            print_form_select('Job', 'job', $street->getJobs(), false, $c['job']);
            print_form_input('Map', 'map', $c['map']);
            print('<input type="hidden" name="id" value="' . $id . '" />');
            print_form_submit('Update');
        }
        print_footer();
    break;
    // searches through our current players and finds their account and characters
    case 'search':
        $street->input->clean('p', 'name', CLEAN_STR);
        $term = $street->input->cleaned['name'];
        print_header('Search Results');
        $accountcheck = $street->db->query_count('accounts', 'name LIKE "%' . $term . '%"');
        $charcheck = $street->db->query_count('characters', 'name LIKE "%' . $term . '%"');
        if ($accountcheck == 0 && $charcheck == 0) {
            print_content('No accounts or characters found.');
        }
        if ($charcheck > 0) {
            $q = $street->db->query('SELECT id,accountid,name FROM characters WHERE name LIKE ?', array('%' . $term . '%'));
            print('<div class="content users"><strong>Characters Found</strong><br /><br />' . "\r\n      ");
            while ($char = $street->db->fetch_array($q)) {
                $account = $street->db->query_fetch('SELECT id,gm,banned,banreason,loggedin FROM accounts WHERE id = ?', array($char['accountid']));
                print('<div class="user">' . (($account['loggedin'] > 0) ? '<img src="../images/bullet_green.png" alt="Online" />' :
                '<img src="../images/bullet_red.png" alt="Offline" />') . (($account['gm'] > 0) ?
                '<img src="../images/gm.png" alt="GM" />' : '') . $char['name'] . '<a href="?do=editcharacter&c=' . $char['id'] .
                '" title="Edit Character"><img src="../images/user_edit.png" alt="Edit Character" /></a><a href="?do=editaccount&u=' . $account['id'] .
                '" title="Edit Account"><img src="../images/cog_edit.png" alt="Edit Account" /></a>' . 
                '<a href="?do=unstick&u=' . $u['id'] . '" title="Unstick Account"><img src="../images/note.png" alt="Unstick Account" /></a>' . (($account['banned'] == 1) ? 
                '<a href="#" title="Banned: ' . $account['banreason'] . '"><img src="../images/flag_red.png" alt="Banned" /></a>' : '') . '</div>');
            }
            print("\r\n    </div>\r\n    ");
        }
        if ($accountcheck > 0) {
            $q = $street->db->query('SELECT id,name,gm,banned,banreason,loggedin FROM accounts WHERE name LIKE ?', array('%' . $term . '%'));
            print('<div class="content users"><strong>Accounts Found</strong><br /><br />' . "\r\n      ");
            while ($u = $street->db->fetch_array($q)) {
                print('<div class="user">' . (($u['loggedin'] > 0) ? '<img src="../images/bullet_green.png" alt="Online" />' :
                '<img src="../images/bullet_red.png" alt="Offline" />') . (($u['gm'] > 0) ?
                '<img src="../images/gm.png" alt="GM" />' : '') . $u['name'] . '<a href="?do=editaccount&u=' . $u['id'] .
                '" title="Edit Account"><img src="../images/cog_edit.png" alt="Edit Account" /></a>' . 
                '<a href="?do=unstick&u=' . $u['id'] . '" title="Unstick Account"><img src="../images/note.png" alt="Unstick Account" /></a>' . (($u['banned'] == 1) ? 
                '<a href="#" title="Banned: ' . $u['banreason'] . '"><img src="../images/flag_red.png" alt="Banned" /></a>' : '') . '</div>');
            }
            print("\r\n    </div>\r\n    ");
        }
        print_footer();
    break;
    // unstick a character
    case 'unstick':
        $street->input->clean('g', 'u', CLEAN_INT);
        $id = $street->input->cleaned['u'];
        print_header('', '<meta http-equiv="refresh" content="3;url=player.php" />');
        if (empty($id) || $street->db->query_count('accounts', 'id = ' . $id) == 0) {
            print_content('That character doesn\'t exist.');
        } else {
            $street->db->query_write('UPDATE accounts SET loggedin=0 WHERE id=?' , array($id));
            print_content('Unstuck!');
        }
        print_footer();
    break;
    // update either an account or a character
    case 'update':
        $street->input->clean('g', 't', CLEAN_STR);
        $type = $street->input->cleaned['t'];
        switch ($type) {
            // account
            case 'a':
                $street->input->clean_array('p', array(
                    'id'        =>  CLEAN_INT,
                    'name'      =>  CLEAN_STR,
                    'password'  =>  CLEAN_STR,
                    'loggedin'  =>  CLEAN_INT,
                    'banned'    =>  CLEAN_INT,
                    'banreason' =>  CLEAN_STR,
                    'gm'        =>  CLEAN_INT
                ));
                $id = $street->input->cleaned['id'];
                $name = $street->input->cleaned['name'];
                $pass = $street->input->cleaned['password'];
                $login = $street->input->cleaned['loggedin'];
                $banned = $street->input->cleaned['banned'];
                $banreason = $street->input->cleaned['banreason'];
                $gm = $street->input->cleaned['gm'];
                print_header('Updating', '<meta http-equiv="refresh" content="3;url=player.php" />');
                if (empty($id)) {
                    break;
                } else if (empty($name)) {
                    print_content('They need a name, don\'t you think?');
                } else {
                    if (!empty($pass)) {
                        $pass = md5($pass);
                    }
                    $street->db->query_write('UPDATE accounts SET name=?, password=?, loggedin=?, banned=?, banreason=?, gm=? WHERE id=?',
                        array($name, $pass, $login, $banned, $banreason, $gm, $id));
                    print_content($name . ' has been updated.');
                }
                print_footer();
            break;
            // character
            case 'c':
                $street->input->clean_array('p', array(
                    'id'    =>  CLEAN_INT,
                    'name'  =>  CLEAN_STR,
                    'level' =>  CLEAN_INT,
                    'exp'   =>  CLEAN_INT,
                    'dex'   =>  CLEAN_INT,
                    'luk'   =>  CLEAN_INT,
                    'str'   =>  CLEAN_INT,
                    'meso'  =>  CLEAN_INT,
                    'job'   =>  CLEAN_INT,
                    'map'   =>  CLEAN_INT
                ));
                $id = $street->input->cleaned['id'];
                $name = $street->input->cleaned['name'];
                $level = $street->input->cleaned['level'];
                $exp = $street->input->cleaned['exp'];
                $dex = $street->input->cleaned['dex'];
                $luk = $street->input->cleaned['luk'];
                $str = $street->input->cleaned['str'];
                $meso = $street->input->cleaned['meso'];
                $job = $street->input->cleaned['job'];
                $map = $street->input->cleaned['map'];
                print_header('Updating', '<meta http-equiv="refresh" content="3;url=player.php" />');
                if (empty($id)) {
                    break;
                } else if (empty($name)) {
                    print_content('Don\'t you think they deserve a name...');
                    break;
                } else if (empty($job)) {
                    break;
                } else if ($level > 255) {
                    $level = 255;
                }
                $street->db->query_write('UPDATE characters SET name=?, level=?, exp=?, dex=?, luk=?, str=?, meso=?, job=?, map=? WHERE id=?',
                    array($name, $level, $exp, $dek, $luk, $str, $meso, $job, $map, $id));
                print_content($name . ' has been updated.');
                print_footer();
            break;
            default: break;
        }
    break;
    // list all of the online player, then allow a GM to search through them
    default:
        print_header('Player Management');
        print_form('search_user', '?do=search');
        print_form_caption('<strong>Search for a Player</strong><br /><br />');
        print_form_input('IGN', 'name');
        print_form_submit('Search');
        $online = $street->db->query_count('accounts', 'loggedin > 0');
        if ($online > 0) {
            $q = $street->db->query('SELECT id,name,gm FROM accounts WHERE loggedin > 0');
            print('<div class="content users">' . "\r\n      <strong>Online Users</strong> ($online)<br /><br />\r\n      ");
            while($u = $street->db->fetch_array($q)) {
                print('<div class="user">' . (($u['gm'] > 0) ? '<img src="../images/gm.png" alt="GM" /> ' : '') . $u['name'] . '<a href="?do=editaccount&u=' . $u['id'] .
                '"><img src="../images/cog_edit.png" alt="Edit Account" /></a>' . '<a href="?do=listchars&u=' . $u['id'] . 
                '"><img src="../images/user_edit.png" alt="Edit their Characters" /></a><a href="?do=unstick&u=' . $u['id'] . '" title="Unstick a User">' .
                '<img src="../images/note.png" alt="Unstick Account" /></a></div>' . "\r\n      ");
            }
            print("\r\n    </div>\r\n    ");
        } else {
            print_content('No online users.');
        }
        print_footer();
    break;
}

?>