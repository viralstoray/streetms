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
 
require_once('class.pdo.php');

/**
 * street_Session
 * Handles all of our cookies and login sessions.
 */
class street_Session {

    /**
     * Contains PDO
     * @var object
     */
    private $db;
    
    /**
     * street_Session
     * Initialize our PDO
     */
    public function __construct() {
        $this->db = new street_PDO();
    }

    /**
     * get_cookie
     * Returns a $_COOKIE
     * @param string    cookie name
     * @return string   cookie value
     */
    public function get_cookie($name) {
        $name = 'street_' . $name;
        if (isset($_COOKIE[$name])) {
            return $_COOKIE[$name];
        } else {
            return false;
        }
    }
    
    /**
     * is_loggedin
     * Is the current user logged in?
     * @return boolean  yes/no
     */
    public function is_loggedin() {
        if ($this->get_cookie('username') && $this->get_cookie('password') && $this->get_cookie('userid')) {
            $p = $this->db->query_fetch('SELECT id,password FROM accounts WHERE name=?', array($this->get_cookie('username')));
            if ($this->get_cookie('password') == $p['password'] && $this->get_cookie('userid') == $p['id']) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    
    /**
     * set_cookie
     * Sets a cookie.
     * @param string    cookie name
     * @param string    cookie value
     * @param integer   expiry (default is false, or no expiry and it's just a session cookie)
     */
    public function set_cookie($name, $value, $expire = false) {
        $name = 'street_' . $name;
        if (!$expire) {
            setcookie($name, $value);
        } else {
            setcookie($name, $value, $expire);
        }
    }

}

?>