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
 
require_once('config.php');
require_once('class.error.php');

/**
 * street_PDO
 * Handles all of our communication to the MySQL database.
 */

class street_PDO {

    /**
     * Contains the PDO instance we'll act on for transactions
     * @var object
     */
    private $db;
    
    /**
     * street_Error
     * @var object
     */
    private $error;
    
    /**
     * street_PDO
     * On initialization, connect to the database and populate the $db object.
     * @param array   db config array
     */
    public function __construct() {
        global $config;
        $this->error = new street_Error();
        try {
            if (empty($this->db)) {
                $this->db = new PDO('mysql:dbname=' . $config['db']['dbname'] . ';host=' . $config['db']['host'], $config['db']['username'], $config['db']['password']);
            }
        } catch (PDOException $e) {
            $this->error->msg($e->getMessage());
        }
    }
    
    /**
     * fetch_array
     * Returns an associative array of results from a PDOStatement.
     * @param object    PDOStatement
     * @return array     result array
     */
    public function fetch_array($s) {
        return $s->fetch(PDO::FETCH_ASSOC);
    }
    
    /**
     * query
     * Sends a standard prepared statement to the database and returns the results. (PDOStatement)
     * @param string    query string
     * @param array     paramater values
     * @return object   PDOStatement
     */
    public function query($q, $params = false) {
        $s = $this->db->prepare($q);
        if ($params) {
            $r = $s->execute($params);
        } else {
            $r = $s->execute();
        }
        if ($r) {
            return $s;
        } else {
            $this->error->dberror($s);
        }
    }
    
    /**
     * query_count
     * Returns the number of rows from a SELECT COUNT(*) query.
     * @param string    table to count
     * @param string    where clause
     * @return int      rows
     */
    public function query_count($table, $where = '') {
        $count = $this->query('SELECT COUNT(*) FROM ' . $table . (($where) ? ' WHERE ' . $where : ''));
        return intval($count->fetchColumn());
    }
    
    /**
     * query_fetch
     * Returns the first result from a SELECT query. 
     * @param string    query string
     * @param array     paramater values
     * @return array    query result
     */
    public function query_fetch($q, $params = false) {
        return $this->fetch_array($this->query($q, $params));
    }
    
    /**
     * query_write
     * Sends a standard prepared query statement (and we aren't expecting any results) for the database.
     * @param string    query string
     * @param array     paramater values (UPDATE foo SET bar=?), (1)
     */
    public function query_write($q, $params = false) {
        $s = $this->db->prepare($q);
        if ($params) {
            $s->execute($params);
        } else {
            $s->execute();
        }
    }
    
}

?>