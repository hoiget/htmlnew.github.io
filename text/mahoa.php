
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        form{
            border: 1px solid black;
            width:640px ;
        }
    </style>
</head>
<body>
    <center>
    <form action="#" method="post">
        <h2>Chương trình mã hóa và giải mã</h2>
        <table>
            <tr>
                <td>nhập nội dung: <br>
                    <textarea name="t" cols="80" rows="5"></textarea> </td>
                <td></td>
            </tr>
            <tr>
                <td><input type="submit" name="submit" value="Mã hóa">
        <input type="submit" name="submit1" value="Giải mã"></td>
                <td></td>
            </tr>
            <tr>
                <td>Mã hóa: <br>
                    <textarea cols="80" rows="5" ><?php
                    if(isset($_REQUEST['submit'])){
                        $str = $_REQUEST['t'];
                        $encoded_str = base64_encode($str);
                        echo  $encoded_str ;
                    }
                    ?></textarea></input>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>Giải mã: <br>
                    <textarea cols="80" rows="5"><?php
                    if(isset($_REQUEST['submit1'])){
                        $str = $_REQUEST['t'];
                        $decoded_str = base64_decode($str,$encoded_str);
                        echo  $decoded_str;
                    }
                    ?></textarea>
                </td>
                <td></td>
            </tr>
            
        </table> 
        <?php echo "<a href='index.php'>Quay lại</a>" ?>
        
    

    </form>
    </center>
</body>
</html>
