<?php
// include controller Company
	include_once("Controller/cCompany.php");
// tạo mới đối tượng controller company
	$p = new controlCompany();
// gọi hàm lấy toàn bộ di liệu company
	$tblCompany = $p->getAllCompany();
	if($tblCompany){
// kiểm tra kết quả nhận được có di liệu (bảng company có di liệu)
		if(mysql_num_rows($tblCompany) > 0){
//quyệt từng déng di liệu trong kết quả nhận được
			while($row = mysql_fetch_assoc($tblCompany)){
//hiển thị kết quả nhận được
			echo "<a href='index.php?Comp=".$row["CompID"]."'>".$row["CompName"]."</a>"."<br>";
			}
		}else{
			echo "0 result";
		}
	}else{
		echo "Error";
	}
?>

