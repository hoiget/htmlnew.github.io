<?php

// include model Company

	include_once("Model/mCompany.php") ;

	class controlCompany{

		function getAllCompany() {
// tao abi tuong dai dién cho modelCompany
			$p = new modelCompany();
// goi ham truy van tdt cd Company
			$tblCompany = $p->SelectAllCompany();
// tra di ligéu dé ding trong View
			return $tblCompany;
		}
	}

?>