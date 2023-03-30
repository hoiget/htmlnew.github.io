<?php
	include_once("Model/mProduct.php");
	class controlProduct{
//lấy toàn bộ sản phẩm
	function countProduct(){
		$p = new modelProduct();
		$tblProduct = $p->SelectAllProduct();
		return mysql_num_rows($tblProduct);
	}
	function getAllProductByCompany($comp){
		$p = new modelProduct();
		$tblProduct = $p->SelectAllProductByCompany($comp) ;
		return $tblProduct;
	}
	function getAllProductPage($page,$count){
		$p = new modelProduct();
		$tblProduct = $p->SelectAllProductPage(($page-1)*$count,$count) ;
		return $tblProduct;
	}
	function AddProduct($ten,$gia,$mota,$cty,$file,$tenanh,$loaianh,$sizeanh){
		if($loaianh=="image/jpg" || $loaianh=="image/png"){
			if($sizeanh <= 2*1024*1024){
				if(move_uploaded_file($file,"image/".$tenanh)){
					$p = new modelProduct();
					$ins= $p->InsertProduct($ten,$gia,$mota,$tenanh,$cty);
					if($ins){
						return 1;
					}else{
						return 0; //ko the insert
					}
				}else{
					return -1; // ko the upload
				}
			}else{
				return -2;// size ko lớn
			}
		}else{
			return -3; // ko dúng loại
		}
			
		}
	}
?>

