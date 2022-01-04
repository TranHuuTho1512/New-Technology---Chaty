

$(document).ready(function () {
    let url="https://www.chaty.site/";
    const account = localStorage.getItem("account");
    $("#saveProfile").click(function (e) {
        e.preventDefault();
        const name = $("#txtHoTen").val().trim();
        const sex = $('input[name="radioGT"]:checked').val();
        const ngay = $("#ngay").val();
        const thang = $("#thang").val();
        const nam = $("#nam").val();
        const dob = ngay + "-" + thang + "-" + nam;
        const account = JSON.parse(localStorage.getItem("account"));
        // alert(account.accountId+name+sex+dob);

        if (name != "" && ngay != "" && thang != "" && nam != "") {
            $.ajax({
                url: url+"profile/",
                type: "post",
                headers: {
                    authorization: account.token,
                },
                data: { _id: account.accountId, name: name, sex: sex, dob: dob},
                success: function (response) {
                    $("#profileError").html("Hồ sơ lưu thành công !!");
		            // alert("Quá trình đăng ký hoàn tất !!")
                    
                    location.replace("/chat?profileId="+response.data._id);

                },
            });
        }
        else {
            $("#profileError").html("Vui lòng nhập đầy đủ thông tin !!");
        }
    });
});

