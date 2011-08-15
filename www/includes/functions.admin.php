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
 * Apart from our normal class-based system, we also implement a few general functions we use for page output and misc. activities that didn't really require
 * the traditional class structure. These functions handle most of the page output and UI of the CP.
 */
 
/**
 * print_content
 * Prints a content div.
 * @param string    content to include in the div
 */
function print_content($text, $skip = false) {
    print('<div class="content">' . $text . "</div>\r\n    ");
}

/** 
 * print_footer
 * Prints our footer bar and ends page output.
 * @param boolean   should we end with an exit()?
 */
function print_footer($end = true) {
    $html = '<div class="footer">&copy;2011, www.streetsidegaming.com</div>
</body>
</html>';
    print($html);
    if ($end) { 
        exit();
    }
}

/**
 * print_form
 * Prints a <form> header and a content block.
 * @param string    name of the form
 * @param string    php script to submit the form to
 */
function print_form($name, $php) {
    print('<form id="' . $name . '" name="' . $name . '" method="POST" action="' . $php . '">' . "\r\n    " . '<div class="content">' . "\r\n      ");
}

/**
 * print_form_caption
 * Prints some standard text (normally above all the inputs)
 * @param string    text to print
 */
function print_form_caption($text) {
    print($text . "\r\n      ");
}

/**
 * print_form_checkbox
 * Prints an <input> checkbox.
 * @param string    display name
 * @param string    name
 * @param boolean   checked?
 * @param string    value (default is 1)
 */
function print_form_checkbox($display, $name, $checked, $value = '1') {
    print('<div class="input"><span>' . $display . '</span><input id="' . $name . '" type="checkbox" name="' . $name . '" value="' . $value . '"' . (($checked) ?
    ' checked="checked"' : '') . " /></div>\r\n      ");
}

/**
 * print_form_input
 * Prints an <input> box.
 * @param string    display box name
 * @param string    input box name
 * @param string    input box value
 * @param string    input box type (normal is "text")
 */
function print_form_input($display, $name, $value = false, $type = 'text') {
    print('<div class="input"><span>' . $display . '</span><input id="' . $name . '" type="' . $type . '" name="' . $name . '" ' . (($value) ? 'value="' . 
    $value . '" ' : '') . "/></div>\r\n      ");
}

/**
 * print_form_select
 * Prints a <select> box.
 * @param string    select name
 * @param array     array of select <option>s (name => value)
 * @param string    onchange
 * @param array     value of selected element
 */
function print_form_select($display, $name, $options, $onchange = false, $selected = false) {
    print('<div class="input"><span>' . $display . '</span><select id="' . $name . '" name="' . $name . (($onchange) ? '" onchange="' . 
    $onchange . '">' : '">') . "\r\n        ");
    foreach ($options as $name => $value) {
        if ($selected !== false && $selected == $value) {
            print("\r\n        " . '<option value="' . $value . '" selected>' . $name . '</option>');
        } else {
            print("\r\n        " . '<option value="' . $value . '">' . $name . '</option>');
        }
    }
    print("</select></div>\r\n      ");
}

/**
 * print_form_submit
 * Prints a submit button and ends a form.
 * @param string    value of submit (normally Save)
 */
function print_form_submit($value = 'Save') {
    print('<input type="submit" value="' . $value . '" /><input type="reset" value="Reset" />' . "\r\n    </form>\r\n    </div>\r\n    ");
}

/**
 * print_form_textarea
 * Prints a <textarea>.
 * @param string    textarea name
 * @param string    text
 * @param int       rows
 * @param int       cols
 */
function print_form_textarea($display, $name, $text = '', $rows = 10, $cols = 60) {
    print('<div class="input"><span>' . $display . '</span><textarea id="' . $name . '" name="' . $name . '" rows="' . 
    $rows . '" cols="' . $cols . '">' . $text . "</textarea></div>\r\n      ");
}

/**
 * print_header
 * Prints our header.
 * @param string    title of the page (default is sWWW Admin)
 * @param string    extra content to include into the header (<script>, <link>, etc)
 */
function print_header($title = false, $extra = false) {
    $html = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>' . (($title) ? 'sWWW Admin - ' . $title : 'sWWW Admin') . '</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" type="text/css" href="../css/admin.css" />
    <script type="text/javascript" src="../js/jquery.js"></script>' . (($extra) ? "\r\n    " . $extra : '') . '
    <link rel="shortcut icon" href="../images/adminfavicon.ico" />
    <link rel="shortcut" href="../images/adminfavicon.ico" />
</head>
<body>
    <img src="../images/logo.png" alt="sWWW" width="600" height="200" />
    <div class="navbar">
        <a href="index.php" title="Home">Home</a>
        <a href="template.php" title="Template Management">Templates</a>
        <a href="player.php" title="StreetMS Player Management">Players</a>
        <a href="server.php" title="Server control/statistics">Server</a>
        <a href="/" title="Main">CMS Home</a>
    </div>
    ';
    print($html);
}

?>