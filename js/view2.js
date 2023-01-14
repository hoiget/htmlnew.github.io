$(document).ready(function(){
    

    
    
    
    $('#eye').click(function(){
        $(this).toggleClass('open');
        $(this).children('i').toggleClass('fa-eye-slash fa-eye');
        if($(this).hasClass('open')){
            $(this).prev().attr('type', 'text');
        }else{
            $(this).prev().attr('type', 'password');
        }
    });
    function KiemtraMk (){
        var maukt = /^[A-Za-z0-9]{8}/;
        if($("#txtMK").val()== ""){
            $("#tbMK").html("*Bắt buộc nhập !!");
            $("#tbMK").addClass("mauDo");
            return false;
         }
         if(!maukt.test($("#txtMK").val())) {
             $("#tbMK").html("Bắt buộc");
             $("#tbMK").addClass("mauDo");
             return false;
         }
         $("#tbMK").html("*");
         return true;
     };
     $("#txtMK").blur(KiemtraMk);
     
     

    function kiemtraten(){
        var kt = /^[A-Za-z0-9]*$/;
        if($("#txtDN").val()== ""){
            
           $("#tbDN").html("*Bắt buộc nhập !!");
           $("#tbDN").addClass("mauDo");
           return false;
        }
        if(!kt.test($("#txtDN").val())) {
            $("#tbDN").html("VIET HOA!!");
            $("#tbDN").addClass("mauDo");
            return false;
        }
        $("#tbDN").html("*");
        return true;
    };
    $("#txtDN").blur(kiemtraten);

    function Kiemtrasdt (){
        var maukt = /^(0)[0-9]{3}[0-9]{3}[0-9]{3}$/;
        if($("#txtSDT").val()== ""){
            
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
        var maukt = /^[a-zA-Z.0-9-_]+(@gmail.com){1}$/;
        if($("#txte").val()== ""){
           
            $("#tbe").html("*Bắt buộc nhập !!");
            $("#tbe").addClass("mauDo");
            return false;
         }
         if(!maukt.test($("#txte").val())) {
             $("#tbe").html("Bắt buộc");
             $("#tbe").addClass("mauDo");
             return false;
         }
         $("#tbe").html("*");
         return true;
     };
     $("#txte").blur(KiemtraE);

     $("#DK4").click(function() {
        if(!kiemtraten() || !KiemtraE() || !Kiemtrasdt() || !KiemtraMk()){ 
           
            return false; 
        } 
        alert("Đăng kí thành công!!");
        return true;
    });

    $("#DNN").click(function() {
        if(!kiemtraten()  || !KiemtraMk()){ 
           
            return false; 
        } 
        alert("Đăng nhập thành công!!");
        return true;
    });



      
        
     
});