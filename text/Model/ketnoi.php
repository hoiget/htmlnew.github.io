<?php
class clsketnoi{
//hàm két nối CSDL

	function ketnoiDB(& $conn) {
	// kết nối CSDL trên localhost với tài khoản id = usertes; pass = 123456

	$conn = mysql_connect("localhost","usertest","123456");
// set utf8 để doc chữ tiếng Việt có dấu
	mysql_set_charset("utf8");
// kiềm tra nếu kết nối thành công
	if($conn) {

// chon database cần thao tác

		return mysql_select_db("dbtest");
	}else{

		return false;
	}
}
//ham đóng kết nối
	function dongketnoi($conn) {
	mysql_close($conn);
	}
}
?>

