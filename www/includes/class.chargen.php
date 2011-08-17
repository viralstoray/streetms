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
 * This class was made by HoltHelper and we don't really take any ownership over it... I'm scared to touch the code. But it works, and it's somewhat fast,
 * so we're not going to worry about it. You're warned.
 */

class street_CharGen {
	
	//Image Coord Variables
	const mainX = 44;
	const mainY = 34;
	const neckY = 65;
	
	// Default Varibles
	public $stand = 1;
	public $wepNum  = NULL;
	
	//Default Gender Clothes
	public $default = array(
		0 => array( "coat" => 1040036, "pants" => 1060026),
		1 => array( "coat" => 1041046, "pants" => 1061039)
	);
	
	/*
		Log Errors:
			0 = Off
			1 = On
	*/
	public $log = 0;
    
    private $db;
    private $path;
	
	function __construct() {
        $this->db = new street_PDO();
        $this->path = '/var/ariact/street/chargen/';
	}
    
    public function build($char) {
        $invq = $this->db->query("SELECT itemid,position FROM inventoryitems WHERE characterid=? AND inventorytype='-1' ORDER BY position", array($char['id']));
        while ($inv = $this->db->fetch_array($invq)) {
            switch ($inv['position']) {
                case -1: case -101: $hat = $inv['itemid']; break;
                case -2: case -102: $mask = $inv['itemid']; break;
                case -3: case -103: $eyes = $inv['itemid']; break;
                case -4: case -104: $ears = $inv['itemid']; break;
                case -5: case -105: $coat = $inv['itemid']; break;
                case -6: case -106: $pants = $inv['itemid']; break;
                case -7: case -107: $shoes = $inv['itemid']; break;
                case -8: case -108: $glove = $inv['itemid']; break;
                case -9: case -109: $cape = $inv['itemid']; break;
                case -10: case -110: $shield = $inv['itemid']; break;
                case -11:
                case -111:
                    $weapon = $inv['itemid'];
                    $this->setWepInfo($weapon);
                break;
            }
        }
        $hash = md5($hat + $mask + $eyes + $ears + $coat + $pants + $shoes + $glove + $cape + $shield + $weapon);
        if ($char['displayhash'] !== $hash) {
            $this->image = ImageCreateTrueColor(96, 96);
            ImageSaveAlpha($this->image, true);
            ImageFill($this->image, 0, 0, ImageColorAllocateAlpha($this->image, 0, 0, 0, 127));
            $this->setBasicInfo(array(
                0  => (int) $char['skincolor'],
                1  => (int) $char['gender'],
                2  => (int) $char['hair'],
                3  => (int) $char['face'],
                4  => $hat,
                5  => $mask,
                6  => $eyes,
                7  => $ears,
                8  => $coat,
                9  => $pants,
                10 => $shoes,
                11 => $glove,
                12 => $cape,
                13 => $shield,
                14 => $weapon
            ));
            $this->setWeapon('weaponBelowBody');
		    $this->setHat('defaultAc');
			$this->setCape('cape');
			$this->setShield();
			$this->createBody('body');
			$this->setShoes('Reg');
			$this->setGlove('l', 1);
			$this->setWeapon('weaponOverBody');
			$this->setPants();
			$this->setCoat('mail');
			$this->setShoes('NX');
			$this->setWeapon('armBelowHeadOverMailChest');
			$this->createBody('head');
			$this->setAccessory(7, 'accessory');
			$this->setHair('hairShade');
			$this->setAccessory(5, 'mask', 'accessoryFaceBelowFace');
			$this->setFace();
			$this->setAccessory(5, 'mask', 'accessoryFace');
			$this->setAccessory(6, 'accessory');
			$this->setHair('hair');
			$this->setHat('default');
			$this->setWeapon('weapon');
			$this->createBody('arm');
			$this->setWeapon('weaponBelowArm');
			$this->setCoat('mailArm');
			$this->setCape('capeArm');
			$this->setWeapon('weaponOverArm');
			$this->createBody('hand');
			$this->setGlove('l', 2);
			$this->setGlove('r');
			$this->setWeapon('weaponOverHand');
			$this->setWeapon('weaponOverGlove');
			$this->setWeapon('weaponWristOverGlove');
            $this->db->query_write('UPDATE characters SET displayhash=? WHERE id=?', array($hash, $char['id']));
            $img = $this->path . 'Characters/' . $char['id'] . '.png';
            if (self::exists($img)) {
                fopen($img, 'w');
            }
            ImagePNG($this->image, $img);
        }
    }
	
	public function setBasicInfo($array) {
		$this->v = $array;
		self::setBackHair();
	}
	
	public function setBackHair() {
		if(self::exists($this->path . "Hair/000{$this->v[2]}.img/index.txt")) {
			$this->hairArray = self::txt_parse($this->path . "Hair/000{$this->v[2]}.img/index.txt");
			$this->overHairX = self::mainX + ((-$this->hairArray[default_hairOverHead_origin_x]) - $this->hairArray[default_hairOverHead_map_brow_x]);
			$this->overHairY = self::mainY + ((-$this->hairArray[default_hairOverHead_origin_y]) - $this->hairArray[default_hairOverHead_map_brow_y]);
			$this->backHairX = self::mainX + ((-$this->hairArray[default_hairBelowBody_origin_x]) - $this->hairArray[default_hairBelowBody_map_brow_x]);
			$this->backHairY = self::mainY + ((-$this->hairArray[default_hairBelowBody_origin_y]) - $this->hairArray[default_hairBelowBody_map_brow_y]);
		}
	}
	
	public function setWepInfo($weapon) {
		if(self::exists($this->path . "Weapon/0{$weapon}.img/index.txt")) {
			$this->weaponArray = self::txt_parse($this->path . "Weapon/0{$weapon}.img/index.txt");
			switch($weapon) {
				case ($weapon <  1700000):
				$this->stand = $this->weaponArray[info_stand];
				break;
				case ($weapon >= 1700000):
					for($int=29; $int<=49; $int++) {
						if(self::exists($this->path . "Weapon/0{$weapon}.img/{$int}.stand{$this->stand}.0.weapon.png")) {
						$this->wepNum = array( "ray" => "{$int}_", "image" => "{$int}." );
							break;
						}
					}
				break;
			}
		}
	}
	
	public function setFace() {
		if(self::exists($this->path . "Face/000{$this->v[3]}.img/index.txt")) {
			$faceArray = self::txt_parse($this->path . "Face/000{$this->v[3]}.img/index.txt");
			$faceX = self::mainX + ((-$faceArray[default_face_origin_x]) - $faceArray[default_face_map_brow_x]);
			$faceY = self::mainY + ((-$faceArray[default_face_origin_y]) - $faceArray[default_face_map_brow_y]);
			
			self::useImage($this->path . "Face/000{$this->v[3]}.img/default.face.png", $faceX, $faceY);
		}
    }
	
	public function setHair($type) {
		if($this->hairArray) {
			
			switch($type) {
				case "hair":
					$hairX = self::mainX + ((-$this->hairArray[default_hair_origin_x]) - $this->hairArray[default_hair_map_brow_x]);
					$hairY = self::mainY + ((-$this->hairArray[default_hair_origin_y]) - $this->hairArray[default_hair_map_brow_y]);
					if(substr_count($this->vSlot, 'H1H2H3H4H5H6') == 1)
						return NULL;
					else
						self::useImage($this->path . "Hair/000{$this->v[2]}.img/default.hair.png", $hairX, $hairY);
				break;
				case "hairShade":
					$shadeHairX = self::mainX + ((-$this->hairArray[default_hairShade_0_origin_x]) - $this->hairArray[default_hairShade_0_map_brow_x]);
					$shadeHairY = self::mainY + ((-$this->hairArray[default_hairShade_0_origin_y]) - $this->hairArray[default_hairShade_0_map_brow_y]);
					if(substr_count($this->vSlot, 'H1H2H3H4H5H6') == 1)
						return NULL;
					else
						self::useImage($this->path . "Hair/000{$this->v[2]}.img/default.hairShade.{$this->v[0]}.png", $shadeHairX, $shadeHairY);
				break;
			}
		}
	}
	
	public function setAccessory($num, $aType, $z = NULL) {
		if(self::exists($this->path . "Accessory/0{$this->v[$num]}.img/index.txt")) {
			$accArray = self::txt_parse($this->path . "Accessory/0{$this->v[$num]}.img/index.txt");
			$accX = self::mainX + ((-$accArray['default_'.$accArray[type].'_origin_x']) - $accArray['default_'.$accArray[type].'_map_brow_x']);
			$accY = self::mainY + ((-$accArray['default_'.$accArray[type].'_origin_y']) - $accArray['default_'.$accArray[type].'_map_brow_y']);
			
			switch($aType) {
				case "accessory":
					self::useImage($this->path . "Accessory/0{$this->v[$num]}.img/default.{$accArray[type]}.png", $accX, $accY);
				break;
				case "mask":
					if($accArray['default_'.$accArray[type].'_z'] == $z)
						self::useImage($this->path . "Accessory/0{$this->v[$num]}.img/default.{$accArray[type]}.png", $accX, $accY);
				break;
			}
		}
	}
	
	public function setHat($type) {
		if(!isset($this->v[4]) && self::exists($this->path . "Hair/000{$this->v[2]}.img/default.hairOverHead.png")) {
			self::useImage($this->path . "Hair/000{$this->v[2]}.img/default.hairOverHead.png", $this->overHairX, $this->overHairY);
		} elseif(self::exists($this->path . "Cap/0{$this->v[4]}.img/index.txt")) {
			$hatArray = self::txt_parse($this->path . "Cap/0{$this->v[4]}.img/index.txt");
			$this->vSlot = $hatArray[info_vslot];
			
			switch($type) {
				case "default":
					$hatX = self::mainX + ((-$hatArray[default_default_origin_x]) - $hatArray[default_default_map_brow_x]);
					$hatY = self::mainY + ((-$hatArray[default_default_origin_y]) - $hatArray[default_default_map_brow_y]);
					
					if($this->vSlot == "Cp" || $this->vSlot == "CpH5")
						self::useImage($this->path . "Hair/000{$this->v[2]}.img/default.hairOverHead.png", $this->overHairX, $this->overHairY);
					self::useImage($this->path . "Cap/0{$this->v[4]}.img/default.default.png", $hatX, $hatY);
				break;
				case "defaultAc":
					if($hatArray[type]) {
						$acHatX = self::mainX + ((-$hatArray['default_'.$hatArray[type].'_origin_x']) - $hatArray['default_'.$hatArray[type].'_map_brow_x']);
						$acHatY = self::mainY + ((-$hatArray['default_'.$hatArray[type].'_origin_y']) - $hatArray['default_'.$hatArray[type].'_map_brow_y']);
						
						self::useImage($this->path . "Cap/0{$this->v[4]}.img/default.{$hatArray[type]}.png", $acHatX, $acHatY);
					}
				break;
			}
		}
	}
	
	public function setCape($type) {
		if(!isset($this->v[12]) && $type != "capeArm" && self::exists($this->path . "Hair/000{$this->v[2]}.img/default.hairBelowBody.png")) {
			self::useImage($this->path . "Hair/000{$this->v[2]}.img/default.hairBelowBody.png", $this->backHairX, $this->backHairY);
		} elseif(self::exists($this->path . "Cape/0{$this->v[12]}.img/index.txt")) {
			$capeArray = self::txt_parse($this->path . "Cape/0{$this->v[12]}.img/index.txt");
		
			switch($type) {
				case "cape":
					$capeX = self::mainX + ((-$capeArray[stand1_0_cape_origin_x]) - $capeArray[stand1_0_cape_map_navel_x]);
					$capeY = self::neckY + ((-$capeArray[stand1_0_cape_origin_y]) - $capeArray[stand1_0_cape_map_navel_y]);
				
					if($capeArray[stand1_0_cape_z] == "capeBelowBody") {
						if(substr_count($this->vSlot, 'H1H2H3H4H5H6') == 1)
							return NULL;
						else
							self::useImage($this->path . "Hair/000{$this->v[2]}.img/default.hairBelowBody.png", $this->backHairX, $this->backHairY);
						self::useImage($this->path . "Cape/0{$this->v[12]}.img/stand1.0.cape.png", $capeX, $capeY);
					} else {
						self::useImage($this->path . "Cape/0{$this->v[12]}.img/stand1.0.cape.png", $capeX, $capeY);
						if(substr_count($this->vSlot, 'H1H2H3H4H5H6') == 1)
							return NULL;
						else
							self::useImage($this->path . "Hair/000{$this->v[2]}.img/default.hairBelowBody.png", $this->backHairX, $this->backHairY);
					}
				break;
				case "capeArm":
					$capeArmX = self::mainX + ((-$capeArray[stand1_0_capeArm_origin_x]) - $capeArray[stand1_0_capeArm_map_navel_x]);
					$capeArmY = self::neckY + ((-$capeArray[stand1_0_capeArm_origin_y]) - $capeArray[stand1_0_capeArm_map_navel_y]);
					
					self::useImage($this->path . "Cape/0{$this->v[12]}.img/stand1.0.capeArm.png", $capeArmX, $capeArmY);
				break;
			}
		}
	}
	
	public function setShield() {
		if(self::exists($this->path . "Shield/0{$this->v[13]}.img/index.txt")) {
			$shieldArray = self::txt_parse($this->path . "Shield/0{$this->v[13]}.img/index.txt");
			$shieldX = self::mainX + ((-$shieldArray[stand1_0_shield_origin_x]) - $shieldArray[stand1_0_shield_map_navel_x]);
			$shieldY = self::neckY + ((-$shieldArray[stand1_0_shield_origin_y]) - $shieldArray[stand1_0_shield_map_navel_y]);
			
			self::useImage($this->path . "Shield/0{$this->v[13]}.img/stand1.0.shield.png", $shieldX, $shieldY);
		}
	}
	
	public function setShoes($type) {
		$zArray = array(
			"Reg" => (array) "shoes",
			"NX"  => array( "shoesTop", "shoesOverPants" )
		);
		if(self::exists($this->path . "Shoes/0{$this->v[10]}.img/index.txt")) {
			$shoesArray = self::txt_parse($this->path . "Shoes/0{$this->v[10]}.img/index.txt");
			if(in_array($shoesArray[stand1_0_shoes_z], $zArray[$type])) {
				$shoesX = self::mainX + ((-$shoesArray[stand1_0_shoes_origin_x]) - $shoesArray[stand1_0_shoes_map_navel_x]);
				$shoesY = self::neckY + ((-$shoesArray[stand1_0_shoes_origin_y]) - $shoesArray[stand1_0_shoes_map_navel_y]);
				
				self::useImage($this->path . "Shoes/0{$this->v[10]}.img/stand1.0.shoes.png", $shoesX, $shoesY);
			}
		}
	}
	
	public function setGlove($pos, $stand = NULL) {
		$canvasArray = array(
			"r" => array( 1 => array( "rGlove", "rWrist", "gloveOverHead" ), 2 => array( "rGlove", "rWrist" ) ),
			"l" => array( 1 => array( "lGlove", "lWrist", "gloveOverBody" ), 2 => array( "lGlove", "lWrist", "gloveOverHand", "lGlove2") )
		);
		if(self::exists($this->path . "Glove/0{$this->v[11]}.img/index.txt")) {
			$gloveArray = self::txt_parse($this->path . "Glove/0{$this->v[11]}.img/index.txt");
			
			if(!($pos == 'l' && $stand == 2 && $this->stand == 1)) {
				if(isset($gloveArray['type_'.$pos.'_stand'.$this->stand])) {
					foreach( $gloveArray['type_'.$pos.'_stand'.$this->stand] as $type ) {
						if(in_array($type, $canvasArray[$pos][$this->stand])) {
							$gloveX = self::mainX + ((-$gloveArray['stand'.$this->stand.'_0_'.$type.'_origin_x']) - $gloveArray['stand'.$this->stand.'_0_'.$type.'_map_navel_x']);
							$gloveY = self::neckY + ((-$gloveArray['stand'.$this->stand.'_0_'.$type.'_origin_y']) - $gloveArray['stand'.$this->stand.'_0_'.$type.'_map_navel_y']);
							
							self::useImage($this->path . "Glove/0{$this->v[11]}.img/stand{$this->stand}.0.{$type}.png", $gloveX, $gloveY);
						}
					}
				}
			}
		}
	}
	
	public function setPants() {
		if(!isset($this->v[9])) {
			self::useImage($this->path . "Pants/0{$this->default[$this->v[1]]['pants']}.img/stand1.0.pants.png", self::mainX - 3, self::neckY + 1);
		} elseif(substr($this->v[8], 0, 3) == 105) {
			return NULL;
		} elseif(self::exists($this->path . "Pants/0{$this->v[9]}.img/index.txt")) {
			$pantsArray = self::txt_parse($this->path . "Pants/0{$this->v[9]}.img/index.txt");
			$pantsX = self::mainX + ((-$pantsArray['stand'.$this->stand.'_0_pants_origin_x']) - $pantsArray['stand'.$this->stand.'_0_pants_map_navel_x']);
			$pantsY = self::neckY + ((-$pantsArray['stand'.$this->stand.'_0_pants_origin_y']) - $pantsArray['stand'.$this->stand.'_0_pants_map_navel_y']);
			
			if(self::exists($this->path . "Pants/0{$this->v[9]}.img/stand2.0.pants.png") && $this->stand == 2)
				self::useImage($this->path . "Pants/0{$this->v[9]}.img/stand2.0.pants.png", $pantsX, $pantsY);
			else
				self::useImage($this->path . "Pants/0{$this->v[9]}.img/stand1.0.pants.png", $pantsX, $pantsY);
		}
	}
	
	public function setCoat($type) {
		$style = ($this->v[8] >= 1050000?"Longcoat":"Coat");
		if(!isset($this->v[8])) {
			self::useImage($this->path . "Coat/0{$this->default[$this->v[1]]['coat']}.img/stand1.0.mail.png", self::mainX - 3, self::neckY - 9);
		} elseif(self::exists($this->path . "{$style}/0{$this->v[8]}.img/index.txt")) {
			$mailArray = self::txt_parse($this->path . "{$style}/0{$this->v[8]}.img/index.txt");
			
			switch($type) {
				case "mail":
					$mailX = self::mainX + ((-$mailArray['stand'.$this->stand.'_0_mail_origin_x']) - $mailArray['stand'.$this->stand.'_0_mail_map_navel_x']);
					$mailY = self::neckY + ((-$mailArray['stand'.$this->stand.'_0_mail_origin_y']) - $mailArray['stand'.$this->stand.'_0_mail_map_navel_y']);
					
					if(self::exists($this->path . "{$style}/0{$this->v[8]}.img/stand2.0.mail.png") && $this->stand == 2)
						self::useImage($this->path . "{$style}/0{$this->v[8]}.img/stand2.0.mail.png", $mailX, $mailY);
					else
						self::useImage($this->path . "{$style}/0{$this->v[8]}.img/stand1.0.mail.png", $mailX, $mailY);
				break;
				case "mailArm":
					$mailArmX = self::mainX + ((-$mailArray['stand'.$this->stand.'_0_mailArm_origin_x']) - $mailArray['stand'.$this->stand.'_0_mailArm_map_navel_x']);
					$mailArmY = self::neckY + ((-$mailArray['stand'.$this->stand.'_0_mailArm_origin_y']) - $mailArray['stand'.$this->stand.'_0_mailArm_map_navel_y']);
					
					self::useImage($this->path . "{$style}/0{$this->v[8]}.img/stand{$this->stand}.0.mailArm.png", $mailArmX, $mailArmY);
				break;
			}
		}
	}
	
	public function setWeapon($z) {
		$wepArray = array(
			"weaponBelowBody"           => array( "weapon", "weaponBelowBody" ),
			"weaponOverBody"            => array( "weapon", "weaponOverBody", "weaponL" ),
			"armBelowHeadOverMailChest" => array( "weapon" ),
			"weaponOverArm"             => array( "weapon", "weaponOverArm", "string" ),
			"weapon"                    => array( "weapon" ),
			"weaponBelowArm"            => array( "weapon", "weaponBelowArm" ),
			"weaponOverHand"            => array( "weapon", "weaponOverHand" ),
			"weaponOverGlove"           => array( "weapon" ),
			"weaponWristOverGlove"      => array( "weapon", "weaponWrist" )
		);
		foreach( $wepArray[$z] as $type ) {
			if($this->weaponArray[$this->wepNum[ray].'stand'.$this->stand.'_0_'.$type.'_z'] == $z) {
				list( $wepX, $wepY, $pos ) = self::getPos($type);
				
				$wepX += (-$this->weaponArray[$this->wepNum[ray].'stand'.$this->stand.'_0_'.$type.'_origin_x']) - $this->weaponArray[$this->wepNum[ray].'stand'.$this->stand.'_0_'.$type.'_map_'.$pos.'_x'];
				$wepY += (-$this->weaponArray[$this->wepNum[ray].'stand'.$this->stand.'_0_'.$type.'_origin_y']) - $this->weaponArray[$this->wepNum[ray].'stand'.$this->stand.'_0_'.$type.'_map_'.$pos.'_y'];
                
				self::useImage($this->path . "Weapon/0{$this->v[14]}.img/{$this->wepNum[image]}stand{$this->stand}.0.{$type}.png", $wepX, $wepY);
			}
		}
	}
	
	private function getPos($type) {
		if($this->weaponArray[$this->wepNum[ray].'stand'.$this->stand.'_0_'.$type.'_map_hand_x'] != NULL) {
			if($this->stand == 2) {
				$x = self::mainX + 5;
				$y = self::neckY - 1;
			} else {
				$x = self::mainX + 12;
				$y = self::neckY + 6;
			}
			return array( $x, $y, "hand" );
		} else {
			return array( self::mainX, self::neckY, "navel" );
		}
	}
	
	public function createBody($type) {
		$skin = $this->v[0]<10?"0{$this->v[0]}":$this->v[0];
		switch($type) {
			case "head":
				self::useImage($this->path . "Skin/000020{$skin}.img/front.head.png", self::mainX - 15, self::mainY - 12);
			break;
			case "body":
				self::useImage($this->path . "Skin/000020{$skin}.img/stand{$this->stand}.0.body.png", (self::mainX + $this->stand) - 9, self::mainY + 21);
			break;
			case "arm":
				self::useImage($this->path . "Skin/000020{$skin}.img/stand{$this->stand}.0.arm.png", self::mainX + ($this->stand==2?4:8), self::mainY + 23);
			break;
			case "hand":
				if($this->stand == 2)
					self::useImage($this->path . "Skin/000020{$skin}.img/stand2.0.hand.png", self::mainX - 10, self::mainY + 26);
			break;
		}
	}
	
	private function useImage($location, $x = 0, $y = 0) {
		if(self::exists($location)) {
			$implace = ImageCreateFromPNG($location);
			ImageCopy($this->image, $implace, $x, $y, 0, 0, imagesx($implace), imagesy($implace));
		}
	}
	
	// Thanks Darkmagic
	private function txt_parse($file) {
		$filehandle = fopen($file,"r");
		$filecontent = @fread($filehandle, filesize($file)) or DIE('File size be greater than 0!');
		fclose($filehandle);
		$filecontent = preg_replace("/ /","=",$filecontent);
		$filecontent = preg_replace("/\./","_",$filecontent);
		$filecontent = preg_replace("/\s/","&",$filecontent);
		parse_str($filecontent,$filearray);
		return $filearray;
	}
	
	public function exists($path) {
		if(file_exists($path)) {
			return true;
		}  else {
            return false;
        }
	}

}

?>