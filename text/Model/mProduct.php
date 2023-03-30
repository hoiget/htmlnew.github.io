<?php
	include_once("ketnoi.php") ;
	class modelProduct{
//hèm lấy tất cả sản phẩm
	function SelectAllProduct() {	
	$con;
	$p = new clsketnoi();
		if ($p->ketnoiDB($con)) {
			$string = "SELECT * FROM product ";
			
			$table = mysql_query($string);
			$p->dongketnoi($con) ;
			return $table;
		}else{
			return false;
		}
	}
	function SelectAllProductByCompany($comp) {	
		$con;
		$p = new clsketnoi();
			if ($p->ketnoiDB($con)) {
				$string = "SELECT * FROM product where CompID= ".$comp;
		
				$table = mysql_query($string);
				$p->dongketnoi($con) ;
				return $table;
			}else{
				return false;
			}
		}
	function SelectAllProductPage($limit,$count) {	
	$con;
	$p = new clsketnoi();
		if ($p->ketnoiDB($con)) {
			$string = "SELECT * FROM product  order by ProdID desc limit $limit,$count";
			
			$table = mysql_query($string);
			$p->dongketnoi($con) ;
			return $table;
		}else{
			return false;
		}
	}
	function InsertProduct($ten,$gia,$mota,$hinh,$cty){
		$con;
		$p= new clsketnoi();
		if($p->ketnoiDB($con)){
			$string = "INSERT INTO product(ProdName,ProdPrice,PronDescription,ProdImage,CompID) values";
			$string .= "(N'".$ten."',".$gia.",N'".$mota."',N'".$hinh."',".$ten.")";	
			$kq = mysql_query($string);
			$p->dongketnoi($con) ;
			return $kq;
		}else{
			return false;
		}
	}
	}	

?>