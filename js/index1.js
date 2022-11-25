$(document).ready(function () {
    var i = 2; 
    $("#btnDK").on("click", function(){ 
        $("#myModal").modal(); 
    });
    $("#btnDN").on("click", function(){ 
        $("#myModal1").modal(); 
    });
    $(window).on('load', function(event) {
        $('body').removeClass('preloading');
        // $('.load').delay(1000).fadeOut('fast');
        $('.loader').delay(1000).fadeOut('fast');
    });
    var modal = document.getElementById("myModal2");
    var btn = document.getElementById("cart");
    var close = document.getElementsByClassName("close")[0];
    // tại sao lại có [0] như  thế này bởi vì mỗi close là một html colection nên khi mình muốn lấy giá trị html thì phải thêm [0]. 
    
    var close_footer = document.getElementsByClassName("close-footer")[0];
    var order = document.getElementsByClassName("order")[0];
    btn.onclick = function () {
    modal.style.display = "block";
    }
    close.onclick = function () {
    modal.style.display = "none";
    }
    close_footer.onclick = function () {
    modal.style.display = "none";
    }
    order.onclick = function () {
    alert("Cảm ơn bạn đã thanh toán đơn hàng")
    }
    window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
    var remove_cart = document.getElementsByClassName("btn-danger");
    for (var i = 0; i < remove_cart.length; i++) {
    var button = remove_cart[i]
    button.addEventListener("click", function () {
        var button_remove = event.target
        button_remove.parentElement.parentElement.remove()
  })
}
    function updatecart() {
        var cart_item = document.getElementsByClassName("cart-items")[0];
        var cart_rows = cart_item.getElementsByClassName("cart-row");
        var total = 0;
        for (var i = 0; i < cart_rows.length; i++) {
        var cart_row = cart_rows[i]
        var price_item = cart_row.getElementsByClassName("cart-price ")[0]
        var quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0]
        var price = parseFloat(price_item.innerText)// chuyển một chuổi string sang number để tính tổng tiền.
        var quantity = quantity_item.value // lấy giá trị trong thẻ input
        total = total + (price * quantity)
        }
        document.getElementsByClassName("cart-total-price")[0].innerText = total + 'VNĐ'
        // Thay đổi text = total trong .cart-total-price. Chỉ có một .cart-total-price nên mình sử dụng [0].
    }
    var quantity_input = document.getElementsByClassName("cart-quantity-input");
    for (var i = 0; i < quantity_input.length; i++) {
    var input = quantity_input[i];
    input.addEventListener("change", function (event) {
        var input = event.target
        if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
        }
        updatecart()
    })
    }
    var add_cart = document.getElementsByClassName("btn-cart");
for (var i = 0; i < add_cart.length; i++) {
  var add = add_cart[i];
  add.addEventListener("click", function (event) {

    var button = event.target;
    var product = button.parentElement.parentElement;
    var img = product.parentElement.getElementsByClassName("img-prd")[0].src
    var title = product.getElementsByClassName("content-product-h3")[0].innerText
    var price = product.getElementsByClassName("price")[0].innerText
    addItemToCart(title, price, img)
    // Khi thêm sản phẩm vào giỏ hàng thì sẽ hiển thị modal
    modal.style.display = "block";
    
    updatecart()
  })
}

    function addItemToCart(title, price, img) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cart_title = cartItems.getElementsByClassName('cart-item-title')
   
    for (var i = 0; i < cart_title.length; i++) {
        if (cart_title[i].innerText == title) {
        alert('Sản Phẩm Đã Có Trong Giỏ Hàng')
        return
        }
    }

    var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${img}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">Xóa</button>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', function () {
        var button_remove = event.target
        button_remove.parentElement.parentElement.remove()
        updatecart()
    })
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', function (event) {
        var input = event.target
        if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
        }
        updatecart()
    })
    }
    function KiemtraMA (){
        var maukt = /^(K16)-[0-9]{9}/;
        if($("#txtMa").val()== ""){
            $("#tbMa").html("*Bắt buộc nhập !!");
            $("#tbMa").addClass("mauDo");
            return false;
         }
         if(!maukt.test($("#txtMa").val())) {
             $("#tbMa").html("theo mau K16-xxxxxxxxx");
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
    
    $("#btnSave1").click(function() {
        var ma = $("#Tk").val();
        var HT = $("#MK").val();
       
        var them =  "<tr><td>" + ma +"</td><td>" + HT +"</td><td>" ; 
        $("#table1 tbody").append(them); 
        
        return true; 
    });
})