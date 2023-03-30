<?php

//include controller Product

	include_once("Controller/cProduct.php");

// khai báo biến đại diện cho Controller Product
		$p = new controlProduct();
		if(isset($_REQUEST["Comp"])){
			$cty = $_REQUEST["Comp"];
			$tblProduct = $p->getAllProductByCompany($cty);
		}else{

// gọi hàm getAllProduct
			if(isset($_REQUEST["Comp"])){
				$cty=$_REQUEST["Comp"];
				$tblProduct = $p->getAllProductByCompany($cty);
			}else{
				$page=$_REQUEST["page"];
				$count=$p->countProduct();
				$prodperpage=8;
				$tblProduct = $p->getAllProductPage($page,$prodperpage);
			}

		}
		if($tblProduct) {
// kiểm tra kết quả trả có di liệu
			if(mysql_num_rows($tblProduct) > 0){
// tạo biến đểm để kiểm tra hiển thi đữ liệu
				$dem = 0;
//tạo table hiển thi đỡ liệu
				echo "<table style='width:100%'>";
//duyét từng dòng dữ liệu trong kết quả nhận được sau khi truy vấn
				while ($row = mysql_fetch_assoc($tblProduct)){
					if($dem==0) {
						echo "<tr>";

					}
					echo "<td style='width:25%; height:100px'>";

					echo "<image width=100px height=150px src='image/".$row['ProdImage']."'/>"."<br>";

					echo "<br>".$row['ProdName']."<br>".$row['ProdPrice'];
					
					echo "</td>";
					$dem++;
					if($dem%4==0) {

						echo "</tr>";

						$dem = 0;

					}
				}

				echo "</table>";
			}else{
				echo "0 result";

			}
		}else{
			echo "Khong co gia tri";
		}
?>

