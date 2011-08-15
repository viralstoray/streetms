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
require_once('class.input.php');
require_once('class.pdo.php');
require_once('class.template.php');

/**
 * street_Core
 * Contains our core classes for page handling and other important variables. (template, error, db)
 */
class street_Core {

    /**
     * Contains our database connection
     * @var object
     */
    public $db;
    
    /**
     * Contains our error handler
     * @var object
     */
    public $error;
    
    /**
     * Contains our input handler
     * @var object
     */
    public $input;
    
    /**
     * Contains our templater
     * @var object
     */
    public $template;
    
    /**
     * Version tag
     */
    public $version = '1.0';
    
    /**
     * street_Core
     * Initialize all of our core classes
     */
    public function __construct() {
        $this->db = new street_PDO();
        $this->error = new street_Error();
        $this->input = new street_Input();
        $this->template = new street_Template();
    }
    
    /**
     * getJobs
     * Returns $config['jobs']
     */
    public function getJobs() {
        global $config;
        return $config['jobs'];
    }
 
}

?>