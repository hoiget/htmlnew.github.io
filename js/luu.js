if(localStorage) {
	$(document).ready(function() {
		$("#DK4").click(function() {
			// Get input name
			var taikhoan = $("#txtDN").val();
            var sdt=$("#txtSDT").val();
            var email=$("#txte").val();
			
			// Store data
    		localStorage.setItem("txtDN", taikhoan);
            localStorage.setItem("txtSDT", sdt);
            localStorage.setItem("txte", email);
			
		});
		$(".access").click(function() {
			// Retrieve data
    		alert( "Tài khoản: " + localStorage.getItem("txtDN")  + "\n" + "Số điện thoại: " + localStorage.getItem("txtSDT") + "\n" + "Email: " + localStorage.getItem("txte")  );
		});
	});
} else {
    alert("Sorry, your browser do not support local storage.");
}