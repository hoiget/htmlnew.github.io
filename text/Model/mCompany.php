<?php

	include_once("ketnoi.php") ;

	class modelCompany{
	function SelectAllCompany(){
// khai báo biến tao kết nối
	$con;
// tạo mới đối tượng clsketnoi từ file ketnoi.php
	$p = new clsketnoi();
// gọi ham ketnoiDB; thực hiện kết nối đến CSDL va kiểm tra kết nối được không
	if($p->ketnoiDB($con)){
// lệnh truy vấn toàn bộ dữ liệu bảng company
		$string = "SELECT * FROM company";
		
	// thực thi lệnh truy vấn, kết quả trả về là 01 table chứa toàn bộ dữ liệu bing company
		$table = mysql_query($string);
	// đóng kết nối
		//$p->dongketnot($con);
	// trả đữ liệu vừa thực thi được (để controller nhận và thực thi)
		return $table;
	}else{
	return false;
	}
	}
}
?>