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
 * street_Error
 * Our handy-dandy error class to provide helpful (and not so helpful) error pages.
 */
class street_Error {

    /**
     * dberror
     * Prints out a database error page.
     * @param object    PDO
     */
    public function dberror($pdo) {
        $msg = $pdo->errorInfo();
        exit($msg[1] . ': ' . $msg[2]);
    }
    
    /**
     * msg
     * Prints out a friendly error message.
     * @param string    error message
     */
    public function msg($err) {
        exit($err);
    }
    
}

?>