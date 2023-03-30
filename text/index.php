<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>
<body>
<table border="1px solid" style="margin: auto;text-align:center;widen:960px">
	<tr class="normal">
		<td colspan="2">Banner</td>
	</tr>
	<tr class="_normal">
		<td id="left" colspan="2">
			<a href="index.php?addProd"> thêm sản phẩm</a>
			<?php
		if(isset($_REQUEST['addProd'])){
			include_once("View/vAddProduct.php");
		}else{
			echo "Trang dành cho ADMIN";
		}
		
		?>
		</td>
		
	</tr>
	<tr class="_normal">
		<td id="left"><?php
		include_once("View/vCompany.php");
		
		?></td>

		<td id="main">
		<?php
		include_once("View/vProduct.php");
		
		?>
		</td>
	</tr>
	<tr class="normal">
		<td colspan="2">
			
			<?php
			echo "Click vào đây qua chương trình <a href='mahoa.php'>Mã hóa</a>";

			
			?>
			
		</td>
	</tr>
</table>
</body>

</html>



