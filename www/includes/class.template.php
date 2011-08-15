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
 
require_once('class.error.php');
require_once('class.pdo.php');
 
/**
 * street_Template
 * Manages all of our PHP-HTML templates and output of said templates.
 */
class street_Template {

    /**
     * Contains street_PDO
     * @var object
     */
    private $db;
    
    /**
     * Contains street_Error
     * @var object
     */
    private $error;
    
    /**
     * street_Template
     * Initialize our classes
     */
    public function __construct() {
        $this->db = new street_PDO();
        $this->error = new street_Error();
    }

    /**
     * fetch
     * Returns a template from the database.
     * @param string    template name
     * @return string   template
     */
    public function fetch($name) {
        $template = $this->db->query_fetch('SELECT html FROM templates WHERE name=?', $name);
        if (!empty($template)) {
            return $template['html'];
        } else {
            $this->error->msg($name . ' doesn\'t exist');
        }
    }

    /**
     * output
     * Prints text to the page, then ends output.
     * @param string    HTML output
     * @param boolean   should we end output? default is true
     */
    public function output($html, $end = true) {
        print($html);
        if ($end) {
            exit();
        }
    }

}

?>