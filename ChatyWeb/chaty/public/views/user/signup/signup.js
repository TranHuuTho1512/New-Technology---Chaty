$(document).ready(function () {
    let url="https://www.chaty.site/";
    $("#dangky").click(function (e) {
        e.preventDefault();
        const phone = $("#txtSDT").val().trim();
        const email = $("#email").val().trim();
        const password = $("#txtMatKhau").val().trim();
        const repassword= $("#txtNhapLaiMatKhau").val().trim();
        if (phone != "" && password != "" && repassword != "" && password===repassword) {
            $.ajax({
                url: url+"site/signup",
                type: "post",
                data: { phone: phone, email: email, password: password},
                success: function (response) {
                    if(response.data === "Email was exists"){
                        $("#nhapLaiMatKhauError").html("Email đã được sử dụng !!");
                    }else if(response.data === "Account was exists"){
                        $("#nhapLaiMatKhauError").html("Tài khoản đã tồn tại !!");
                    }
                    else{
                        $("#nhapLaiMatKhauError").html("Đăng ký thành công !")
                        localStorage.setItem(
                            "account",
                            JSON.stringify(response.data)
                        );
                        const account = JSON.parse(localStorage.getItem("account"));
                        if (response.data._id != "") {
                            $.ajax({
                                url: url+"site/active",
                                type: "post",
                                data: { _id: response.data._id},
                                success: function (response) {
                                    
                                },        
                            });
                        }
                        location.replace("/otp?email="+email+"&id="+response.data._id);
                    }
                },
                
            });
        }
        else{
            $("#nhapLaiMatKhauError").html("Vui lòng nhập đầy đủ thông tin !!");
        }
    });

    $("#dangnhap").click(function (e) {
        e.preventDefault();
        location.replace("/");
    });
});

