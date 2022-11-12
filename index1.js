$(document).ready(function () {
    var i = 2; 
    $("#btnDK").on("click", function(){ 
        $("#myModal").modal(); 
    });
    function KiemtraMA (){
        var maukt = /^(K16-)+[0-9]{9}$/;
        if($("#txtMa").val()== ""){
            
            $("#tbMa").html("*Bắt buộc nhập !!");
            $("#tbMa").addClass("mauDo");
            return false;
         }
         if(!maukt.test($("#txtMa").val())) {
             $("#tbMa").html("theo mau K16-xxxxxxxxxx");
             $("#tbMa").addClass("mauDo");
             return false;
         }
         $("#tbmA").html("*");
         return true;
     };
     $("#txtMa").blur(KiemtraMA);
     
     function kiemtraHT(){
        var kt = /(^[A-Z]{1})([a-z]+)(\s[A-Z]{1}([a-z]+))*$/;
        if($("#txtHT").val()== ""){
            
           $("#tbTen").html("*Bắt buộc nhập !!");
           $("#tbTen").addClass("mauDo");
           return false;
        }
        if(!kt.test($("#txtHT").val())) {
            $("#tbTen").html("Chu cai dau cua moi tu phai viet hoa !!");
            $("#tbTen").addClass("mauDo");
            return false;
        }
        $("#tbTen").html("*");
        return true;
    };
    $("#txtHT").blur(kiemtraHT);

    function kiemtralop(){
        var kt = /^[A-Z0-9]*$/;
        if($("#txtL").val()== ""){
            
           $("#tbL").html("*Bắt buộc nhập !!");
           $("#tbL").addClass("mauDo");
           return false;
        }
        if(!kt.test($("#txtL").val())) {
            $("#tbL").html("VIET HOA!!");
            $("#tbL").addClass("mauDo");
            return false;
        }
        $("#tbL").html("*");
        return true;
    };
    $("#txtL").blur(kiemtralop);

    function Kiemtrasdt (){
        var maukt = /^(0)[0-9]{3}-[0-9]{3}-[0-9]{3}/;
        if($("#txtSDT").val()== ""){
            alert("BAT BUOC")
            $("#tbSDT").html("*Bắt buộc nhập !!");
            $("#tbSDT").addClass("mauDo");
            return false;
         }
         if(!maukt.test($("#txtSDT").val())) {
             $("#tbSDT").html("theo mau 0xxx-xxx-xxx");
             $("#tbSDT").addClass("mauDo");
             return false;
         }
         $("#tbSDT").html("*");
         return true;
     };
     $("#txtSDT").blur(Kiemtrasdt);

     
    function KiemtraE (){
        var maukt = /^[a-zA-Z.0-9-_]+(@iuh.edu.vn){1}$/;
        if($("#txtE").val()== ""){
            alert("BAT BUOC")
            $("#tbE").html("*Bắt buộc nhập !!");
            $("#tbE").addClass("mauDo");
            return false;
         }
         if(!maukt.test($("#txtE").val())) {
             $("#tbE").html("xxxxx@iuh.edu.vn");
             $("#tbE").addClass("mauDo");
             return false;
         }
         $("#tbE").html("*");
         return true;
     };
     $("#txtE").blur(KiemtraE);

     var txtNgay = $("#txtNKH");
     var tbNgay = $("#tbNKH");
     function KiemtraNgayKH(){ 
         if(txtNgay.val()==""){
             tbNgay.html("* bắt buộc nhập");  
             return false; 
         } 
         var day = new Date(txtNgay.val()); 
         var today= new Date(); today.setDate(today.getDate() + 30); 
         
         if (day < today) { 
             tbNgay.html("* Ngày khởi hành phải sau ngày hiện tại 30 ngày"); 
             return false; 
         } 
         tbNgay.html("*"); 
         return true; 
     } 
     txtNgay.blur (KiemtraNgayKH);
      
        
     $("#btnSave").click(function() {
        if(!KiemtraMA() || !kiemtraHT() || !kiemtralop() || !KiemtraNgayKH() || !Kiemtrasdt() || !KiemtraE()){ 
            $("#thongbao").html("Mời bạn nhập đúng và đẩy đủ thông tin"); 
            return false; 
        } 
        var ma = $("#txtMa").val();
        var HT = $("#txtHT").val();
        var l = $("#txtL").val();
        var nkh = $("#txtNKH").val();
        var sdt = $("#txtSDT").val();
        var e = $("#txtE").val();
        var them=  "<tr><td>"+ (i++) +"</td><td>" + ma +"</td><td>" + HT +"</td><td>" + l +"</td><td>" + nkh +"</td><td>" + sdt +"</td><td>" + e +"</td><td>" ; 
        $("table tbody").append(them); 
        $("#myModal").append("hide");  
        return true; 
    });
})