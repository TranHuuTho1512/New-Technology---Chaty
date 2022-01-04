$(document).ready(function () {
    let BASE_URL = "https://www.chaty.site";
    $("#login").click(function (e) {
        e.preventDefault();
        const adminCode = $("#txtSDT").val().trim();
        const password = $("#matKhau").val().trim();

        if (adminCode != "" && password != "") {
            $.ajax({
                url: BASE_URL + "/site/admin/signin",
                type: "post",
                data: { adminCode: adminCode, password: password },
                success: function (response) {
                    if (response.data != "Code or password wrong") {
                        $("#matKhauError").html("Đăng nhập thành công !");
                        alert("Đăng nhập thành công !");
                        if (response.data.status != 0) {
                            localStorage.setItem(
                                "account",
                                JSON.stringify(response.data)
                            );
                            location.replace("/manage/list-user");
                        }
                    }
                    $("#matKhauError").html(
                        "Tài khoản hoặc mật khẩu không chính xác !!"
                    );
                },

                // statusCode: {
                //     400: function () {
                //         $("#matKhauError").html(
                //             "Tài khoản hoặc mật khẩu không chính xác !!"
                //         );
                //     },
                // },
            });
        } else {
            $("#matKhauError").html("Vui lòng nhập tài khoản !!");
        }
    });

    $("#dangky").click(function (e) {
        e.preventDefault();
        location.replace("/signup");
    });
});
