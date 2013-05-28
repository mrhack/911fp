<?php

class Connection  {

   var $dbh;

	function Connection() {
		$this->getHander();
	}

   function getHander(){
		if(!$this->dbh) {
     		$this->dbh = mysql_connect(DB_SERVER, DB_USER,DB_PASSWORD) or die("Unable to connect to MySQL");          
     		if(!($selected = mysql_select_db(DB_NAME,$this->dbh) or die("Could not select db"))) {
				$this->dbh = "";
			}
		}
   }

   function escape($str){
	   if($this->dbh) {
		   return trim(mysql_real_escape_string($str,$this->dbh));
	   } else {
			return false;   
	   }
   }

	function master_insert($sql){
		if($this->dbh) {
			mysql_query("SET CHARACTER SET UTF8");     
			mysql_query($sql);
			$id = mysql_insert_id();
			return $id;
		} else {
			return false;	
		}
	}


	function master_update($sql){
		if($this->dbh) {
			mysql_query("SET CHARACTER SET UTF8");
			mysql_query($sql);
	   	} else {
			return false;	
		}
	}


	function master_query($sql){
		if($this->dbh) {		 
			mysql_query("SET CHARACTER SET UTF8");          
			$result = mysql_query($sql);
			$arr = array();
			
			if(!mysql_error()) {
			
				while ($row = mysql_fetch_assoc($result)) {
					array_push($arr, $row);
				}
						
				mysql_free_result($result);
			} else {
				echo mysql_error();
			}
			
			return $arr;
		} else {
			return false;	
		}
	}
}
?>