$(document).ready(function () {
    let url="https://www.chaty.site/";
    const account = JSON.parse(localStorage.getItem("account"));
    let params = (new URL(location.href)).searchParams;
    const n1=params.get('email');
    const id=params.get('id');
    $("#mail").html(n1);
    $("#xacthuc").click(function (e) {
        e.preventDefault();
        const otp = $("#txtSMS").val().trim();
        // const account = JSON.parse(localStorage.getItem("account"));
        
        if (otp != "") {
            $.ajax({
                url: url+"site/auth",
                type: "post",
                data: { _id: id, key: otp },
                success: function (response) {
                    // alert(response.data);
                    if(response.data === "Account was actived"){
                        alert("Xác thực thành công !")
                        location.replace("/");
                    //     localStorage.setItem(
                    //     "account",
                    //     JSON.stringify(response.data)
                    // );
                    }else{
                        $("#smsError").html("Mã OTP không chính xác !!");
                        $("txtSMS").val("");
                    }
                },
                
            });
        }else{
            $("#smsError").html("Vui lòng nhập mã OTP !!");
        }
    });

    $("#guiLaiMa").click(function (e) {
        e.preventDefault();
        // const account = JSON.parse(localStorage.getItem("account"));
        
        if (account._id != "") {
            $.ajax({
                url: url+"site/active",
                type: "post",
                data: { _id: id},
                success: function (response) {
                    // localStorage.setItem(
                    //     "account",
                    //     JSON.stringify(response.data)
                    // );
                },
                
            });
        }
    });

    $("#dangky").click(function (e) {
        e.preventDefault();
        location.replace("/signup");
    });
});

