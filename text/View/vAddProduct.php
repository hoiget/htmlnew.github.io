<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>THÊM SẢN PHẨM</h2>
    <form action="#" method="post" enctype="multipart/form-data">
        <table style="margin: auto;text-align:left">
            <tr>
                <td>Tên sản phẩm</td>
                <td><input type="text" name="txtTenSP" required></td>
            </tr>
            <tr>
                <td>Gía sản phẩm</td>
                <td><input type="number" name="txtGiaSP" required></td>
            </tr>
            <tr>
                <td>Hình ảnh</td>
                <td><input type="file" name="ffile" required></td>
            </tr>
            <tr>
                <td>Mô tả</td>
                <td><textarea name="txtMota" cols="22" rows="5"></textarea></td>
            </tr>
            <tr>
                <td>Công ty cung cấp</td>
                <td><select name="cboCty">
                    <?php
                    include_once("Controller/cCompany.php");
                    $comp= new controlCompany();
                    $table=$comp->getAllCompany();
                    if(mysql_num_rows($table)){
                        while($row=mysql_fetch_assoc($table)){
                            echo "<option value=".$row["CompID"].">".$row["CompName"]."</option>";
                        }
                    }
                    
                    
                    ?>
                </select></td>
            </tr>
            <tr>
                <td></td>
                <td><input type="submit" name="btnsubmit" value="Thêm">
                    <input type="reset" value="Nhập lại">
            </td>
            </tr>

        </table>
    </form>
</body>
</html>
<?php
include_once("Controller/cProduct.php");
if(isset($_REQUEST['btnsubmit'])){
    $ten=$_REQUEST['txtTenSP'];
    $gia=$_REQUEST['txtGiaSP'];
    $mota=$_REQUEST['txtMota'];
    $cty=$_FILES['ffile']['tmp_name'];
    $type=$_FILES['ffile']['type'];
    $name=$_FILES['ffile']['name'];
    $size=$_FILES['ffile']['size'];
    $p= new controlProduct();

    $kq=$p->AddProduct($ten,$gia,$mota,$cty,$file,$name,$type,$size);
    if($kq==1){
        echo"<script>alert('Thêm dữ liệu thành công')</script>";
        echo header("refresh:0;url='index.php?Prod'");
    }elseif($kq==0){
        echo"<script>alert('ko thể insert')</script>"; 
    }elseif($kq==-1){
        echo"<script>alert('ko thể upload ảnh')</script>";
    }elseif($kq==-2){
        echo"<script>alert('size > 2MB')</script>";
    }elseif ($kq==-3) {
        echo"<script>alert('ko đúng định dạng')</script>";
    }else{
        echo"Lỗi";
    }
}



?>