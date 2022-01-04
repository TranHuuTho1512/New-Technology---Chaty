
$(document).ready(function () {
    let url="https://www.chaty.site/";
    $("#login").click(function (e) {
        e.preventDefault();
        const phone = $("#txtSDT").val().trim();
        const password = $("#matKhau").val().trim();
        
        if (phone != "" && password != "") {
            $.ajax({
                url: url+"site/signin",
                type: "post",
                data: { phone: phone, password: password },
                success: function (response) {
                    $("#matKhauError").html("Đăng nhập thành công !");
			        // alert("Đăng nhập thành công !");
                    // alert(response.data);
                    if(response.data == "Your account was blocked by admin"){
                        $("#matKhauError").html("Tài khoản đã bị khóa !!");
                    }
                    else if(response.data.status == 1) {
                        if (response.data.profileId != null) {
                            localStorage.setItem(
                                "account",
                                JSON.stringify(response.data)
                            );
                            location.replace("/chat?profileId="+response.data.profileId);
                        } else {
                            localStorage.setItem(
                                "account",
                                JSON.stringify(response.data)
                            );
                            location.replace("/thongtin");
                        }
                    }else if(response.data.status == 0){
                        localStorage.setItem(
                            "account",
                            JSON.stringify(response.data)
                        );
                        location.replace("/otp?email="+response.data.email+"&id="+response.data._id);
                    }      
                },
            
                statusCode: {
                    400: function() {
                        $("#matKhauError").html("Tài khoản hoặc mật khẩu không chính xác !!");
                    }
                  }
            });
        }
        
    });

    $("#dangky").click(function (e) {
        e.preventDefault();
        location.replace("/signup");
    });
    $("#quenMK").click(function (e) {
        e.preventDefault();
        $("#formDN").css("display","none");
        $("#formQMK").css("display","inline");
        $("#tuade").html("Lấy lại mật khẩu");
    });
    $("#guiMaResetMK").click(function (e) {
        e.preventDefault();
        const phone = $("#txtSDTTK").val().trim();
        const email= $("#email").val().trim();
        if (phone != "" && email != "") {
            $.ajax({
                url: url+"site/forgot",
                type: "post",
                data: { phone: phone, email: email },
                success: function (response) {
                    alert("Đã gửi mã xác thực !");
                },
            });
        }else{
            $("#resetPasswordKeyError").html("Vui lòng nhập số điện thoại và email tài khoản !!");
        }
    });

    $("#resetMK").click(function (e) { 
        e.preventDefault();
        const phone = $("#txtSDTTK").val().trim();
        const email= $("#email").val().trim();
        const ma=$("#resetPasswordKey").val().trim();
        const mk=$("#txtNhapLaiMatKhau").val().trim();
        if (phone != "" && email != "") {
            $.ajax({
                url: url+"site/recovery",
                type: "post",
                data: { phone: phone, email: email, resetPasswordKey:ma, newPassword:mk },
                success: function (response) {
                    if(response.data=="Your reset code expired"){
                        $("#resetPasswordKeyError").html("Mã xác thực không chính xác !!");
                    }
                    else if(response.data=="Your password has changed"){
			alert("Thiết lập mật khẩu mới thành công !!");
                        $("#resetPasswordKeyError").html("Thành công !!");
                        location.replace("/");
                    }else{
			$("#resetPasswordKeyError").html("Tài khoản không chính xác !!");
		    }
                },
            });
        }else{
            $("#resetPasswordKeyError").html("Vui lòng nhập đầy đủ !!");
        }
    });
	
});

