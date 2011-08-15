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
 
/**
 * street_Input
 * Cleans all of our input we get from $_POST or $_GET.
 */
class street_Input {

    /**
     * Contains an array of all of our "cleaned" input
     * @var array
     */
    public $cleaned;
    
    /**
     * street_Input
     * Initialize our cleaning type constants
     */
    public function __construct() {
        define('CLEAN_STR', 0);
        define('CLEAN_INT', 1);
        define('CLEAN_HTML', 2);
    }
    
    /**
     * clean
     * Cleans a single variable from $_POST or $_GET.
     * @param string    get the variable from P or G?
     * @param string    variable name
     * @param string    type of cleaning/input we're expecting
     */
    public function clean($resource, $name, $type) {
        switch ($resource) {
            case 'p':
                switch ($type) {
                    case CLEAN_STR:
                        $this->cleaned[$name] = strval($_POST[$name]);
                    case CLEAN_HTML:
                        $data = strval($_POST[$name]);
                        $data = htmlentities($data);
                        $this->cleaned[$name] = $data;
                    break;
                    case CLEAN_INT:
                        $data = intval($_POST[$name]);
                        if (preg_match('/^\d+$/', $data)) {
                            $this->cleaned[$name] = $data;
                        } else {
                            $this->error->msg($name . ' is not a valid #');
                        }
                    break;
                    default:
                        $this->error->msg($resource . ' is not a valid cleaning resource...');
                    break;
                }
            break;
            case 'g':
                switch ($type) {
                    case CLEAN_STR:
                        $this->cleaned[$name] = strval($_GET[$name]);
                    case CLEAN_HTML:
                        $data = strval($_GET[$name]);
                        $data = htmlentities($data);
                        $this->cleaned[$name] = $data;
                    break;
                    case CLEAN_INT:
                        $data = intval($_GET[$name]);
                        if (preg_match('/^\d+$/', $data)) {
                            $this->cleaned[$name] = $data;
                        } else {
                            $this->error->msg($name . ' is not a valid #');
                        }
                    break;
                    default:
                        $this->error->msg($resource . ' is not a valid cleaning resource...');
                    break;
                }
            break;
        }  
    }
    
    /**
     * clean_array
     * Cleans an array of values.
     * @param string    resource (p, g)
     * @param array     name => type
     */
    public function clean_array($r, $pairs) {
        foreach ($pairs as $name => $type) {
            $this->clean($r, $name, $type);
        }
    }

}

?>