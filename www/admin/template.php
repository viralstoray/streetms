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
define('PAGE', 'template');
require_once('global.php');

switch($_REQUEST['do']) {
    // edit a current template
    case 'edit':
        $street->input->clean('g', 't', TYPE_INT);
        $id = $street->input->cleaned['t'];
        if ($street->db->query_count('templates', 'id=' . $id) > 0) {
            $template = $street->db->query_fetch('SELECT name,html FROM templates WHERE id=?', array($id));
            print_header('Template Manager');
            print_content('<strong>Edit</strong>: ' . $template['name']);
            print_form('edit_template', '?do=update');
            print_form_input('Name', 'name', $template['name']);
            print_form_textarea('HTML', 'html', $template['html']);
            print('<input type="hidden" name="id" value="' . $id . '" />');
            print_form_submit('Update');
            print_footer();
        } else {
            print_header();
            print_content('That template doesn\'t exist.');
            print_footer();
        }
    break;
    // insert a new template
    case 'insert':
        $street->input->clean_array('p', array('name' => CLEAN_STR, 'html' => CLEAN_STR));
        $name = $street->input->cleaned['name'];
        $html = $street->input->cleaned['html'];
        if (empty($name) || empty($html)) {
            print_header('', '<meta http-equiv="refresh" content="4;url=template.php" />');
            print_content('You need to fill out <em>all</em> the fields.');
            print_footer();
        } else {
            $street->db->query_write('INSERT INTO templates (name, html) VALUES (?, ?)', array($name, $html));
            print_header('', '<meta http-equiv="refresh" content="3;url=template.php" />');
            print_content($name . ' has been created!');
            print_footer();
        }
    break;
    // make a new one
    case 'new':
        print_header('Template Manager - New Template');
        print_form('new_template', '?do=insert');
        print_form_input('Name', 'name', $template['name']);
        print_form_textarea('HTML', 'html', $template['html']);
        print_form_submit('Create');
        print_footer();
    break;
    // update an existing template
    case 'update':
        $street->input->clean_array('p', array(
            'id'    =>  CLEAN_INT,
            'name'  =>  CLEAN_STR,
            'html'  =>  CLEAN_STR
        ));
        $id = $street->input->cleaned['id'];
        $name = $street->input->cleaned['name'];
        $html = $street->input->cleaned['html'];
        print_header('', '<meta http-equiv="refresh" content="3;url=template.php" />');
        if ($street->db->query_count('templates', 'id=' . $id) == 0) {
            print_content('That template doesn\'t exist.');
        } else {
            $street->db->query_write('UPDATE templates SET name=?, html=? WHERE id=?', array($name, $html, $id));
            print_content($name . ' has been updated.');
        }
        print_footer();
    break;
    // index
    default:
        print_header('Template Manager', '<script type="text/javascript" src="../js/templater.js"></script>');
        print_content('Below you can pick the current templates available to edit or you can create a new template by typing in its name and start creating...');
        print_form('edit_template', '?do=update');
        if ($street->db->query_count('templates') > 0) {
            $q = $street->db->query("SELECT id,name,html FROM templates");
            while ($t = $street->db->fetch_array($q)) {
                if (empty($selected)) {
                    $selected = $t;
                }
                $templates[$t['name']] = $t['id'];
            }
            if (count($templates) == 1) {
                foreach ($templates as $name => $id) {
                    print_form_caption('You can edit your only template, <a href="?do=edit&t=' . $id . '">' . $name . '</a>...<br /><br />' .
                    'OR<br /><br /><a href="?do=new">make a new one!</a>');
                }
            } else {
                print_form_select('Choose a Template', 'chooser', $templates, 'selectTemplate();');
                print_form_caption('OR<br /><br /><a href="?do=new">make a new one!</a>');
            }
        } else {
            header('Location:template.php?do=new');
        }
        print('</form></div>');
        print_footer();
    break;
}

?>