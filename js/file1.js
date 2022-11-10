$(document).ready(function(){
    var i =2;
    $("#btnModal").click(function() {
        $("#myModal").modal();
    
    
    })
    $("#btnDN").click(function() {
        $("#myDN").modal();
    
    
    })


function kiemTraMa(){
    var mauKT = /[0-9]{9}$/;
    if (mauKT.test($("#txtMa").val()) == true){
        alert("Bạn nhập đúng");
    }else{
        alert("Bạn nhập sai");
    }
}
$("#txtMa").blur(kiemTraMa);

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


function kiemtraDC(){
    var mauKT1 = /^[a-z0-9-_]{3,15}$/;
    var mauKT = /(abc)$/;
    if($("#txtDC").val()== ""){
        
       $("#tbDC").html("*Bắt buộc nhập !!");
       $("#tbDC").addClass("mauDo");
       return false;
    }
    if(!mauKT.test($("#txtDC").val())) {
        $("#tbDC").html("Chu cai dau cua moi tu phai viet hoa !!");
        $("#tbDC").addClass("mauDo");
        return false;
    }
    $("#tbTen").html("*");
    return true;
}
$("#txtDC").blur(kiemtraDC)

$("#slGia").change(function () {
    $("#slGia option:selected").each(function() {
        alert($(this).val());
        $("#txtDV").val($(this).val());
        
    });
});
$(".chkDodung").click(function() {
    var tong = 0;
    var n = $(".chkDodung:checked").length;
    if (n > 0) {
        $(".chkDodung:checked").each(function() {
            tong += parseFloat($(this).val());
            $("#txtDD").val(tong);
        });
    }
});
$("input[name='giam']").change(function() {
    var tong= parseFloat($("#txtDD").val()) + parseFloat($("#txtDV").val()) - parseFloat($(this).val());
    $("#txtTong").val(tong);
});
$("#btnSave").click(function() {
    var ma = $("#txtMa").val();
    var ht = $("#txtHT").val();
    var dc = $("#txtDC").val();
    var tdv = $("#txtDV").val();
    var tdd = $("#txtDD").val();
    
    var tong = $("#txtTong").val();
    var them= "<tr><td>"+ (i++) +"</td><td>" + ma +"</td><td>" + ht +"</td><td>" + dc +"</td><td>" + tdv +"</td><td>" + tdd +"</td><td>"  + tong +"</td></tr>"; 
    $("table").append(them); 
    $("#myModal").modal("hide"); 
    return true; 
});
$("#btnLuu").click(function() {
    var HT = $("#txtHTEN").val();
    var tk = $("#txtTK").val();
    var mk = $("#txtMK").val();
    var them=  "<tr><td>"+ (i++) +"</td><td>" + HT +"</td><td>" + tk +"</td><td>" + mk +"</td><td>"  ; 
    $("#TA").append(them); 
    $("#TKK").append("hide");  
    return true; 
});
});