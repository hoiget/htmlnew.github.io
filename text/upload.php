<form action="<?php echo $_SERVER["PHP_SELF"]; ?>" enctype="multipart/form-data" method="POST">
<input type="file" name="file_upload"><br> 
<input type="submit" name="submit" value="Upload">
</form>
<?php
$host = 'localhost'; // 127.0.0.1
$user = 'usertest'; // User đăng nhập MySQL
$password = '123456'; // Password đăng nhập MySQL
$database = 'dbtest'; // Tên cơ sở dữ liệu
$connect = mysqli_connect($host, $user, $password, $database) or die('Not connect');

if (isset($_POST['submit'])) {

// Điều kiện kiểm tra định dạng ảnh, nếu không phải ảnh không cho upload
if ($_FILES['file_upload']['type'] == "image/jpeg" || $_FILES['uploadFile']['type'] == "image/png" || $_FILES['uploadFile']['type'] == "image/jpg" || $_FILES['file_upload']['type'] == "image/gif") {

$path = "images/"; // Thư mục images để lưu ảnh
$tmp_name = $_FILES['file_upload']['tmp_name'];
$name = $_FILES['file_upload']['name'];
// Upload ảnh vào thư mục images

$slug = $path . $name; // Đường dẫn ảnh lưu vào cơ sở dữ liệu

// Thêm ảnh vào Database
$sql = "INSERT INTO `sanpham (`image`) VALUES ('$slug')";
$result = mysqli_query($connect, $sql);

if ($result) {
echo '<script language="javascript">alert("Đã upload thành công!");</script>';
}else{
echo '<script language="javascript">alert("Đã upload thất bại!");</script>';
}
} else {
// Không phải file ảnh
echo "File khong cho phep";
}
}
?>
<?php
$r = mysqli_query($connect, "SELECT * FROM product");
while ($row = mysqli_fetch_array($r)) {
    
    echo '<img src=" '.$row['ProdImage'].'">';
}
?>