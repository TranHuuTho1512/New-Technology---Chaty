$(document).ready(function () {
    let url = "https://www.chaty.site/";
    // let url = "http://localhost:5000/";
    const account = JSON.parse(localStorage.getItem("account"));
    let params = new URL(location.href).searchParams;
    const profileId = params.get("profileId");
    let idReq = "";
    let idnhom = "";
    let idchat2 = "";
    let namechat2 = "";
    var elmnt = document.getElementById("chat");
    elmnt.scrollIntoView(false);

    $.ajax({
        url: url + "profile/" + profileId,
        type: "get",
        headers: {
            Authorization: account.token,
        },
        data: {},
        success: function (response) {
            $("#avatarMN").attr("src", response.data.avatar);
            $("#profile").click(function () {
                $("#modalXemTT").modal("show");
                $("#emailND").css("display", "block");
                $("#sdtND").css("display", "block");
                $("#chuyenUpdateProfile").css("display", "inline");
                $("#updateMK").css("display", "inline");
                $("#deleteTK").css("display", "inline");

                $("#buttonTTND").css("display", "none");

                $("#avatarTT").attr("src", response.data.avatar);
                $("#hoTen").html(response.data.name);
                $("#ngaySinh").html(response.data.dob);
                const gt = response.data.sex;
                if (gt == true) {
                    $("#gioiTinh").html("Nam");
                } else {
                    $("#gioiTinh").html("Nữ");
                }
                $("#emailX").html(account.email);
                $("#sdtX").html(account.phone);
                localStorage.setItem(
                    "accountTT",
                    JSON.stringify(response.data)
                );
            });
        },
        statusCode: {
            401: function () {
                alert("Vui lòng đăng nhập lại tài khoản !!");
                location.replace("/");
            },
        },
    });
    getTN();

    $("#chuyenUpdateProfile").click(function () {
        const accountTT = JSON.parse(localStorage.getItem("accountTT"));
        $("#modalXemTT").modal("hide");
        $("#modalUpdate").modal("show");
        var ngsinh = accountTT.dob.split("-");
        const d = ngsinh[0];
        const m = ngsinh[1];
        const y = ngsinh[2];
        $("#imagePreview").css(
            "background-image",
            "url(" + accountTT.avatar + ")"
        );
        $("#txtHoTen").val(accountTT.name);
        $("#email").val(account.email);
        $("#sdt").val(account.phone);
        $("#ngay").val(d);
        $("#thang").val(m);
        $("#nam").val(y);
        const gt = accountTT.sex;
        if (gt == false) {
            $("#Nu").change;
        }

        $("#saveUpdateProfile").click(function (e) {
            e.preventDefault();
            var form = new FormData();
            if (document.getElementById("imageUpload").files.length != 0) {
                form.append("avatar", $("#imageUpload")[0].files[0]);
            }
            const name = $("#txtHoTen").val().trim();
            const sex = $('input[name="radioGT"]:checked').val();
            const ngay = $("#ngay").val();
            const thang = $("#thang").val();
            const nam = $("#nam").val();
            const dob = ngay + "-" + thang + "-" + nam;
            form.append("name", name);
            form.append("sex", sex);
            form.append("dob", dob);
            if (name != "" && ngay != "" && thang != "" && nam != "") {
                $.ajax({
                    url: url + "profile/" + profileId,
                    type: "put",
                    headers: {
                        Authorization: account.token,
                    },
                    data: form,
                    contentType: false,
                    cache: false,
                    processData: false,
                    success: function (response) {
                        alert("Lưu hồ sơ thành công !");
                        location.replace("/chat?profileId=" + profileId);
                    },
                });
            } else {
                $("#profileError").html("Vui lòng nhập đầy đủ thông tin !!");
            }
        });
    });

    $("#updateMK").click(function () {
        $("#modalXemTT").modal("hide");
        $("#modalUpdateMK").modal("show");
    });

    $("#deleteTK").click(function () {
        $("#modalXemTT").modal("hide");
        $("#modalDeleteTK").modal("show");
    });

    $("#xoaTK").click(function () {
        const mkxn = $("#txtMatKhauXN").val().trim();
        var result = confirm("Bạn có chắc chắn muốn xóa tài khoản không ?");
        if (result == true) {
            $.ajax({
                url: url + "account/" + account.accountId,
                type: "delete",
                headers: {
                    Authorization: account.token,
                },
                data: { password: mkxn },
                success: function (response) {
                    if (response.data == "Your account was deleted") {
                        alert("Tài khoản đã bị xóa!");
                        localStorage.clear();
                        location.replace("/");
                    } else {
                        alert("Sai mật khẩu");
                        $("#txtMatKhauXN").val("");
                    }
                },
            });
        } else {
        }
    });

    $("#saveUpdateMK").click(function () {
        const mkxn = $("#txtNhapLaiMatKhau").val().trim();
        var Regex = new RegExp("^(?=.{6,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
        var mk = document.getElementById("txtNhapLaiMatKhau").value;
        if(mkxn != "" && Regex.test(mk)){
            var result = confirm("Bạn có chắc chắn muốn đổi mật khẩu không ?");
            if (result == true) {
                $.ajax({
                    url: url + "account/" + account.accountId,
                    type: "put",
                    headers: {
                        Authorization: account.token,
                    },
                    data: { password: mkxn },
                    success: function (response) {
                        localStorage.clear();
                        location.replace("/");
                    },
                });
            } else {
            }
        }else if(mkxn == ""){
            document.getElementById("nhapLaiMatKhauError").innerHTML= "Vui lòng nhập mật khẩu !!";
        }
        
    });

    $("#profileChat").click(function () {
        $("#js-menuDSTV").html("");
        let tennhomcu = $("#txtTenNhomCN").val().trim();
        $.ajax({
            url: url + "conversation/" + idnhom,
            type: "get",
            headers: {
                Authorization: account.token,
            },
            protocolProfileBehavior: {
                disableBodyPruning: true,
            },
            data: {},
            success: function (response) {
                let idAdmin = response.data.admin;
                if (response.data.participant.length > 2) {
                    $("#qlyNhom").css("display", "none");
                    $("#modalXemTTNhom").modal("show");
                    $("#imagePreviewNhomCN").css(
                        "background-image",
                        "url(" + response.data.avatarRoom + ")"
                    );
                    $("#txtTenNhomCN").val(response.data.name);
                    tennhomcu = response.data.name;
                    $("#sltvnhom").html(
                        "Số lượng thành viên: " +
                            response.data.participant.length
                    );
                    if (response.data.admin == account.accountId) {
                        $("#js-menuDSTV").html("");
                        $("#qlyNhom").css("display", "inline");
                        for (
                            var i = 0;
                            i < response.data.participant.length;
                            i++
                        ) {
                            $.ajax({
                                url:
                                    url +
                                    "profile/" +
                                    response.data.participant[i],
                                headers: {
                                    Authorization: account.token,
                                },
                                type: "get",
                                success: function (response) {
                                    console.log(response);
                                    if (response.data._id == idAdmin) {
                                        $("#js-menuDSTV").append(
                                            "<div class='menuDSTV--item' id='" +
                                                response.data._id +
                                                "'> <label class='menu--link1' id='DSTV' >" +
                                                "<img src='" +
                                                response.data.avatar +
                                                "' style='border-radius: 100%; text-align: center; width: 40px;height: 40px; margin-top: 1px; margin-left: 20px; margin-bottom: 30px;'>" +
                                                "<label style='margin-top: 2px; position: absolute; margin-left: 10px;'><b>" +
                                                response.data.name +
                                                "</b></label>" +
                                                "</label><div style='height: 1px; background-color: rgb(201, 197, 197);'></div>" +
                                                "</div>"
                                        );
                                    } else {
                                        $("#js-menuDSTV").append(
                                            "<div class='menuDSTV--item' id='" +
                                                response.data._id +
                                                "'> <label class='menu--link1' id='DSTV' >" +
                                                "<img src='" +
                                                response.data.avatar +
                                                "' style='border-radius: 100%; text-align: center; width: 40px;height: 40px; margin-top: 1px; margin-left: 20px; margin-bottom: 30px;'>" +
                                                "<label style='margin-top: 2px; position: absolute; margin-left: 10px;'><b>" +
                                                response.data.name +
                                                "</b></label>" +
                                                "</label><div style='height: 1px; background-color: rgb(201, 197, 197);'></div>" +
                                                "<input type='button' id='kick' name='" +
                                                response.data._id +
                                                "' value='Xóa' style='background-color:white;border-radius: 10px; position: absolute;top: 2px; right: 10px; bottom: 2px;height: 30px;font-size: 13px;'>" +
                                                "<input type='button' id='chuyenAdmin' name='" +
                                                response.data._id +
                                                "' value='Chuyển trưởng nhóm' style='background-color:white;border-radius: 10px; position: absolute;top: 2px; right: 57px; bottom: 2px;height: 30px;font-size: 13px;'>" +
                                                "</div>"
                                        );
                                    }
                                },
                            });
                        }
                    }
                } else if (
                    response.data.participant.length == 2 &&
                    response.data.admin == account.accountId
                ) {
                    $("#chuyenUpdateProfile").css("display", "none");
                    $("#updateMK").css("display", "none");
                    $("#deleteTK").css("display", "none");
                    $("#emailND").css("display", "none");
                    $("#sdtND").css("display", "none");
                    $("#buttonTTND").css("display", "none");
                    $("#modalXemTT").modal("show");
                    $("#video-call").css("display", "block");
                    $.ajax({
                        url: url + "profile/" + response.data.participant[1],
                        headers: {
                            Authorization: account.token,
                        },
                        type: "get",
                        success: function (response) {
                            $("#avatarTT").attr("src", response.data.avatar);
                            $("#hoTen").html(response.data.name);
                            $("#ngaySinh").html(response.data.dob);
                            const gt = response.data.sex;
                            if (gt == true) {
                                $("#gioiTinh").html("Nam");
                            } else {
                                $("#gioiTinh").html("Nữ");
                            }
                        },
                    });
                } else {
                    $("#chuyenUpdateProfile").css("display", "none");
                    $("#updateMK").css("display", "none");
                    $("#deleteTK").css("display", "none");
                    $("#emailND").css("display", "none");
                    $("#sdtND").css("display", "none");
                    $("#buttonTTND").css("display", "none");
                    $("#modalXemTT").modal("show");
                    $.ajax({
                        url: url + "profile/" + response.data.participant[0],
                        headers: {
                            Authorization: account.token,
                        },
                        type: "get",
                        success: function (response) {
                            $("#avatarTT").attr("src", response.data.avatar);
                            $("#hoTen").html(response.data.name);
                            $("#ngaySinh").html(response.data.dob);
                            const gt = response.data.sex;
                            if (gt == true) {
                                $("#gioiTinh").html("Nam");
                            } else {
                                $("#gioiTinh").html("Nữ");
                            }
                        },
                    });
                }
            },
        });

        $("#capnhatNhomChat").click(function () {
            if (
                $("#txtTenNhomCN").val().trim() != tennhomcu &&
                document.getElementById("imageUploadNhomCN").files.length != 0
            ) {
                var formNhomCN = new FormData();
                const name = $("#txtTenNhomCN").val().trim();
                formNhomCN.append(
                    "avatar",
                    $("#imageUploadNhomCN")[0].files[0]
                );
                formNhomCN.append("name", name);
                $.ajax({
                    url: url + "conversation/" + idnhom,
                    type: "put",
                    headers: {
                        Authorization: account.token,
                    },
                    data: formNhomCN,
                    contentType: false,
                    cache: false,
                    processData: false,
                    success: function (response) {
                        location.replace("/chat?profileId=" + profileId);
                    },
                });
            } else if ($("#txtTenNhomCN").val().trim() != tennhomcu) {
                var formNhomCN = new FormData();
                const name = $("#txtTenNhomCN").val().trim();
                formNhomCN.append("name", name);
                $.ajax({
                    url: url + "conversation/" + idnhom,
                    type: "put",
                    headers: {
                        Authorization: account.token,
                    },
                    data: formNhomCN,
                    contentType: false,
                    cache: false,
                    processData: false,
                    success: function (response) {
                        location.replace("/chat?profileId=" + profileId);
                    },
                });
            } else if (
                document.getElementById("imageUploadNhomCN").files.length != 0
            ) {
                var formNhomCN = new FormData();
                formNhomCN.append(
                    "avatar",
                    $("#imageUploadNhomCN")[0].files[0]
                );
                $.ajax({
                    url: url + "conversation/" + idnhom,
                    type: "put",
                    headers: {
                        Authorization: account.token,
                    },
                    data: formNhomCN,
                    contentType: false,
                    cache: false,
                    processData: false,
                    success: function (response) {
                        location.replace("/chat?profileId=" + profileId);
                    },
                });
            }
        });

        $("#roiNhom").click(function () {
            var result = confirm("Bạn có chắc chắn muốn rời nhóm ?");
            if (result == true) {
                $.ajax({
                    url: url + "conversation/member/" + idnhom,
                    type: "delete",
                    headers: {
                        Authorization: account.token,
                    },
                    data: { accountId: account.accountId },
                    success: function (response) {
                        if (response.data == "Change admin before out room") {
                            alert(
                                "Vui lòng chuyển quyền Admin trước khi out nhóm !!"
                            );
                        } else {
                            alert("Rời nhóm thành công !!");
                            location.replace(
                                "/chat?profileId=" + account.accountId
                            );
                        }
                    },
                });
            }
        });
    });

    $("#deleteTK").click(function () {
        $("#modalXemTT").modal("hide");
        $("#modalXoaTK").modal("show");
    });

    $("#thembb").click(function () {
        $("#modalTimKiem").modal("show");
    });

    $("#searchND").click(function () {
        const tkND = $("#txtTimKiemND").val().trim();
        localStorage.setItem("sdtTKTK", JSON.stringify(tkND));
        $.ajax({
            url: url + "profile/",
            type: "get",
            headers: {
                Authorization: account.token,
            },
            data: { phone: tkND },
            success: function (response) {
                localStorage.setItem("ttNDTK", JSON.stringify(response.data));
                namechat2 = response.data.name;
                idchat2 = response.data._id;
                $("#js-menuDSND").html(
                    "<li class='menuDSND--item' id='TTNguoiDungTKTK'> <label class='menu--link' title=''>" +
                        "<img src='" +
                        response.data.avatar +
                        "' style='text-align: center; width: 40px;height: 40px; margin-top: 1px; margin-left: 40px; margin-bottom: 30px; border-radius: 100%;'>" +
                        "<label style='margin-top: 2px; position: absolute; margin-left: 10px;'><b>" +
                        response.data.name +
                        "</b></label></label>" +
                        "<div style='height: 1px; background-color: rgb(201, 197, 197);'></div>" +
                        "</li>"
                );

                $("#TTNguoiDungTKTK").click(function () {
                    // const nguoiDungTK = JSON.parse(localStorage.getItem("ttNDTK"));
                    let lm = "";
                    const tkND = JSON.parse(localStorage.getItem("sdtTKTK"));
                    $("#nhanTinVoiBan").css("display", "none");
                    $("#chapNhanLMKB").css("display", "none");
                    $("#boLMKB").css("display", "none");
                    $("#guiLMKB").css("display", "none");
                    $("#huyBanBe").css("display", "none");
                    $("#huyLMKB").css("display", "none");
                    $("#boChanLMKB").css("display", "none");
                    $.ajax({
                        url: url + "request/sender/" + account.phone,
                        headers: {
                            Authorization: account.token,
                        },
                        context: document.body,
                    }).done(function (data) {
                        data.data.forEach((element) => {
                            if (element.receiver.phone === tkND) {
                                $("#guiLMKB").css("display", "none");
                                $("#huyLMKB").css("display", "inline");
                                idReq = element._id;
                                lm = element._id;
                            }
                        });
                    });
                    $.ajax({
                        url: url + "request/receiver/" + account.phone,
                        headers: {
                            Authorization: account.token,
                        },
                        context: document.body,
                    }).done(function (data) {
                        data.data.forEach((element) => {
                            if (element.sender.phone === tkND) {
                                $("#guiLMKB").css("display", "none");
                                $("#chapNhanLMKB").css("display", "inline");
                                $("#boLMKB").css("display", "inline");
                                idReq = element._id;
                                lm = element._id;
                            }
                        });
                    });
                    $.ajax({
                        url: url + "account/friend/able/" + account.accountId,
                        headers: {
                            Authorization: account.token,
                        },
                        context: document.body,
                    }).done(function (data) {
                        data.data.forEach((element) => {
                            if (element._id === response.data._id) {
                                $("#guiLMKB").css("display", "none");
                                $("#huyBanBe").css("display", "inline");
                                $("#nhanTinVoiBan").css("display", "inline");
                                lm = element._id;
                            }
                        });
                        if (lm === "") {
                            $("#guiLMKB").css("display", "inline");
                        }
                    });
                    $.ajax({
                        url: url + "account/friend/block/" + account.accountId,
                        headers: {
                            Authorization: account.token,
                        },
                        context: document.body,
                    }).done(function (data) {
                        data.data.forEach((element) => {
                            if (element._id === response.data._id) {
                                $("#guiLMKB").css("display", "none");
                                $("#boChanLMKB").css("display", "inline");
                                lm = element._id;
                            }
                        });
                    });

                    $("#modalTimKiem").modal("hide");
                    $("#modalXemTT").modal("show");

                    $("#emailND").css("display", "none");
                    $("#sdtND").css("display", "none");
                    $("#chuyenUpdateProfile").css("display", "none");
                    $("#updateMK").css("display", "none");
                    $("#deleteTK").css("display", "none");

                    $("#buttonTTND").css("display", "block");
                    $("#chanLMKB").css("display", "inline");

                    if (idchat2 === account.accountId) {
                        $("#buttonTTND").css("display", "none");
                    }

                    $("#avatarTT").attr("src", response.data.avatar);
                    $("#hoTen").html(response.data.name);
                    $("#ngaySinh").html(response.data.dob);
                    const gt = response.data.sex;
                    if (gt == true) {
                        $("#gioiTinh").html("Nam");
                    } else {
                        $("#gioiTinh").html("Nữ");
                    }
                });
            },
        });
    });

    $("#nhanTinVoiBan").click(function () {
        var formNhom2 = new FormData();
        formNhom2.append("name", namechat2);
        formNhom2.append("admin", account.accountId);
        formNhom2.append("participant", account.accountId);
        formNhom2.append("participant", idchat2);
        $.ajax({
            url: url + "conversation/",
            type: "post",
            headers: {
                Authorization: account.token,
            },
            data: formNhom2,
            contentType: false,
            cache: false,
            processData: false,
            success: function (response) {
                location.replace("/chat?profileId=" + account.profileId);
            },
        });
    });

    $("#guiLMKB").click(function () {
        const tkND = JSON.parse(localStorage.getItem("sdtTKTK"));
        const gt = "Xin chào, làm quen nhé";
        $.ajax({
            url: url + "request/",
            type: "post",
            headers: {
                Authorization: account.token,
            },
            data: { sender: account.phone, receiver: tkND, description: gt },
            success: function (response) {
                $("#guiLMKB").css("display", "none");
                $("#huyLMKB").css("display", "inline");
            },
        });
    });
    $("#huyLMKB").click(function () {
        const tkND = JSON.parse(localStorage.getItem("sdtTKTK"));
        $.ajax({
            url: url + "request/sender/" + account.phone,
            headers: {
                Authorization: account.token,
            },
            context: document.body,
        }).done(function (data) {
            data.data.forEach((element) => {
                if (element.receiver.phone === tkND) {
                    $.ajax({
                        url: url + "request/" + element._id,
                        type: "delete",
                        headers: {
                            Authorization: account.token,
                        },
                        data: {},
                        success: function (response) {
                            $("#guiLMKB").css("display", "inline");
                            $("#huyLMKB").css("display", "none");
                        },
                    });
                }
            });
        });
    });
    $("#boLMKB").click(function () {
        $.ajax({
            url: url + "request/" + idReq,
            type: "delete",
            headers: {
                Authorization: account.token,
            },
            data: {},
            success: function (response) {
                $("#boLMKB").css("display", "none");
                $("#chapNhanLMKB").css("display", "none");
                $("#guiLMKB").css("display", "inline");
            },
        });
    });
    $("#chapNhanLMKB").click(function () {
        $.ajax({
            url: url + "request/" + idReq,
            type: "put",
            headers: {
                Authorization: account.token,
            },
            data: {},
            success: function (response) {
                $("#chapNhanLMKB").css("display", "none");
                $("#boLMKB").css("display", "none");
                $("#huyBanBe").css("display", "inline");
                getBanBe();
            },
        });
    });

    $("#huyBanBe").click(function () {
        const tttkND = JSON.parse(localStorage.getItem("ttNDTK"));
        var result = confirm("Bạn có chắc chắn muốn hủy bạn bè ?");
        if (result == true) {
            $.ajax({
                url: url + "account/friend/" + account.accountId,
                type: "delete",
                headers: {
                    Authorization: account.token,
                },
                data: { friendId: idchat2 },
                success: function (response) {
                    alert("Xóa bạn bè thành công !!");
                    $("#huyBanBe").css("display", "none");
                    $("#guiLMKB").css("display", "inline");
                    getBanBe();
                },
            });
        }
    });

    $("#chanLMKB").click(function () {
        // const tttkND= JSON.parse(localStorage.getItem("ttNDTK"));
        $.ajax({
            url: url + "account/friend/block/" + account.accountId,
            type: "post",
            headers: {
                Authorization: account.token,
            },
            data: { blockId: idchat2 },
            success: function (response) {
                $("#chanLMKB").css("display", "none");
                $("#boChanLMKB").css("display", "inline");
            },
        });
    });

    $("#boChanLMKB").click(function () {
        // const tttkND= JSON.parse(localStorage.getItem("ttNDTK"));
        $.ajax({
            url: url + "account/friend/block/" + account.accountId,
            type: "delete",
            headers: {
                Authorization: account.token,
            },
            data: { blockId: idchat2 },
            success: function (response) {
                $("#boChanLMKB").css("display", "none");
                $("#chanLMKB").css("display", "inline");
            },
        });
    });

    $("#themNhom").click(function () {
        $("#taoNhomChatMoi").css("display", "inline");
        $("#editavatarnhom").css("display", "inline");
        $("#modalNhomChat").modal("show");
        $("#js-menuBBVN").html("");
        $("#js-menuTBBVN").html("");
        $.ajax({
            url: url + "account/friend/able/" + account.accountId,
            headers: {
                Authorization: account.token,
            },
            context: document.body,
        }).done(function (data) {
            data.data.forEach((element) => {
                $("#js-menuBBVN").append(
                    "<li class='menuDSND--item'> <label class='menu--link' >" +
                        "<input type='checkbox' value='" +
                        element._id +
                        "' name='checkbox' style='margin-top: 13px;position: absolute;'>" +
                        "<img src='" +
                        element.avatar +
                        "' style='border-radius: 100%; text-align: center; width: 40px;height: 40px; margin-top: 1px; margin-left: 40px; margin-bottom: 30px;'>" +
                        "<label style='margin-top: 2px; position: absolute; margin-left: 10px;'><b>" +
                        element.name +
                        "</b></label>" +
                        "</label><div style='height: 1px; background-color: rgb(201, 197, 197);'></div>" +
                        "</li>"
                );
            });
        });
    });
    $("#taoNhomChatMoi").click(function () {
        var formNhom = new FormData();
        const name = $("#txtTenNhom").val().trim();
        formNhom.append("avatar", $("#imageUploadNhom")[0].files[0]);
        formNhom.append("name", name);
        formNhom.append("admin", account.accountId);
        formNhom.append("participant", account.accountId);
        var arra = new Array();
        $("input:checkbox[name='checkbox']").each(function () {
            if ($(this).is(":checked")) {
                formNhom.append("participant", $(this).val());
                arra.push($(this).val());
            }
        });

        if (name != "" && arra.length > 1) {
            $.ajax({
                url: url + "conversation/",
                type: "post",
                headers: {
                    Authorization: account.token,
                },
                data: formNhom,
                contentType: false,
                cache: false,
                processData: false,
                success: function (response) {
                    $("#modalNhomChat").modal("hide");
                    $("#js-menuBBVN").html("");
                    getTN();
                },
            });
            // location.replace("/chat?profileId="+account.accountId);
        } else if (arra.length <= 1) {
            $("#taoNhomError").html("Nhóm ít nhất 3 thành viên !!");
        } else {
            $("#taoNhomError").html("Vui lòng nhập tên nhóm !!");
        }
    });

    $("#thembbvaonhom").click(function () {
        $("#js-menuTBBVN").html("");
        $("#js-menuBBVN").html("");
        $.ajax({
            url: url + "conversation/" + idnhom,
            type: "get",
            headers: {
                Authorization: account.token,
            },
            protocolProfileBehavior: {
                disableBodyPruning: true,
            },
            data: {},
            success: function (response) {
                $("#js-menuTBBVN").html("");
                $("#avatarNhom").attr("src", response.data.avatarRoom);
                $("#tenNhom").html(response.data.name);
                $.ajax({
                    url: url + "account/friend/able/" + account.accountId,
                    headers: {
                        Authorization: account.token,
                    },
                    context: document.body,
                }).done(function (data) {
                    data.data.forEach((element) => {
                        let l = "";
                        for (
                            var k = 0;
                            k < response.data.participant.length;
                            k++
                        ) {
                            if (element._id == response.data.participant[k]) {
                                l = element._id;
                            }
                        }
                        if (l == "") {
                            $("#js-menuTBBVN").append(
                                "<li class='menuDSND--item'> <label class='menu--link' >" +
                                    "<input type='checkbox' value='" +
                                    element._id +
                                    "' name='checkbox' style='margin-top: 13px;position: absolute;'>" +
                                    "<img src='" +
                                    element.avatar +
                                    "' style='border-radius: 100%; text-align: center; width: 40px;height: 40px; margin-top: 1px; margin-left: 40px; margin-bottom: 30px;'>" +
                                    "<label style='margin-top: 2px; position: absolute; margin-left: 10px;'><b>" +
                                    element.name +
                                    "</b></label>" +
                                    "</label><div style='height: 1px; background-color: rgb(201, 197, 197);'></div>" +
                                    "</li>"
                            );
                        }
                    });
                });
            },
        });
        $("#modalthembbNhomChat").modal("show");
        $("#taoNhomChatMoi").css("display", "none");
        $("#thenbbNhomChat").css("display", "inline");
    });

    $("#thenbbNhomChat").click(function () {
        var arr = new Array();

        $("input:checkbox[name='checkbox']").each(function () {
            if ($(this).is(":checked")) {
                arr.push($(this).val());
            }
        });
        if (arr.length < 1) {
            alert("Vui lòng chọn bạn bè cần thêm !!");
        }
        $.ajax({
            url: url + "conversation/member/" + idnhom,
            type: "post",
            headers: {
                Authorization: account.token,
            },
            traditional: true,
            data: { participant: arr },
            success: function (response) {
                alert("Thêm thành công !!");
                $("#modalthembbNhomChat").modal("hide");
                $("#js-menuTBBVN").html("");
            },
        });
    });

    $("#search").click(function () {
        const search = $("#txtTimKiem").val().trim();
        document.getElementById("listTN").style.display = "none";
        $("#tittle").html("Tất cả bạn bè:");
        document.getElementById("listBB").style.display = "initial";
        if (search != "") {
            $.ajax({
                url: url + "account/friend/able/" + account.accountId,
                headers: {
                    Authorization: account.token,
                },
                context: document.body,
            }).done(function (data) {
                data.data.forEach((element) => {
                    if (element.name.includes(search)) {
                        $("#js-menuBB").html("");
                        $("#js-menuBB").append(
                            "<li class='menuBB--item' id='" +
                                element._id +
                                "'> <label class='menu--link' title='" +
                                element.name +
                                "'>" +
                                "<img src='" +
                                element.avatar +
                                "' style='text-align: center; width: 40px;height: 40px; margin-top: 1px; margin-left: 40px; margin-bottom: 30px;border-radius: 100%;'>" +
                                "<label style='margin-top: 8px; position: absolute; margin-left: 10px;'><b>" +
                                element.name +
                                "</b></label>" +
                                "</label></li>"
                        );
                    }
                });
            });
        } else {
            getBanBe();
        }
    });

    $("#banbe").click(function () {
        document.getElementById("nav3_GT").style.display = "none";
        clearInterval(x);
        document.getElementById("nav3_TN").style.display = "none";
        document.getElementById("listTN").style.display = "none";
        $("#tittle").html("Tất cả bạn bè:");
        document.getElementById("listBB").style.display = "initial";
        document.getElementById("nav3_BB").style.display = "initial";
        getBanBe();

        $.ajax({
            url: url + "request/receiver/" + account.phone,
            headers: {
                Authorization: account.token,
            },
            context: document.body,
        }).done(function (data) {
            $("#LoiMoiKB").html("");
            data.data.forEach((element) => {
                $("#LoiMoiKB").append(
                    "<nav class='showLoiMoi' id='" +
                        element._id +
                        "'>" +
                        "<a href='#' id='profile' name='" +
                        element._id +
                        "'>" +
                        "<img src='" +
                        element.sender.avatar +
                        "' style='text-align: center; width: 50px;height: 50px; margin-top: 15px; margin-left: 30px; margin-bottom: 30px;border-radius: 100%;'></a>" +
                        "<label style='margin-top: 25px; position: absolute; margin-left: 15px;'><b id='tenNguoiGuiLM'>" +
                        element.sender.name +
                        "</b></label>" +
                        "<input type='button' value='Bỏ qua' id='boQua' name='" +
                        element._id +
                        "' style='right: 100px; margin-top: 25px;position: absolute'>" +
                        "<input type='button' value='Đồng ý' id='dongY' name='" +
                        element._id +
                        "' style='right: 20px; margin-top: 25px; background-color: #0d6efd;position: absolute'>" +
                        "</nav>"
                );
            });
        });
    });

    $("#LoiMoiKB").mouseover(function () {
        $("input[type=button]").each(function (index) {
            $(this).click(function () {
                if ($(this).attr("id") === "dongY") {
                    const id = $(this).attr("name");
                    $("#" + id).css("display", "none");

                    $.ajax({
                        url: url + "request/" + id,
                        type: "put",
                        headers: {
                            Authorization: account.token,
                        },
                        data: {},
                        success: function (response) {
                            getBanBe();
                        },
                    });
                    $("#LoiMoiKB").die();
                } else if ($(this).attr("id") === "boQua") {
                    const id = $(this).attr("name");
                    $("#" + id).css("display", "none");

                    $.ajax({
                        url: url + "request/" + id,
                        type: "delete",
                        headers: {
                            Authorization: account.token,
                        },
                        data: {},
                        success: function (response) {},
                    });
                    $("#LoiMoiKB").die();
                }
            });
        });
    });

    $("#js-menuTN").mouseover(function () {
        $("li").each(function (index) {
            $(this).click(function () {
                if ($(this).attr("class") === "menuTN--item") {
                    idnhom = $(this).attr("id");
                    // alert($(this).attr("id"));
                    $("#nav3_GT").css("display", "none");
                    clearInterval(x);
                    $("#nav3_TN").css("display", "inline");
                    $.ajax({
                        url: url + "conversation/" + idnhom,
                        type: "get",
                        headers: {
                            Authorization: account.token,
                        },
                        protocolProfileBehavior: {
                            disableBodyPruning: true,
                        },
                        data: {},
                        success: function (response) {
                            if (
                                response.data.participant.length == 2 &&
                                response.data.admin == account.accountId
                            ) {
                                $("#thembbvaonhom").css("display", "none");
                                $.ajax({
                                    url:
                                        url +
                                        "profile/" +
                                        response.data.participant[1],
                                    headers: {
                                        Authorization: account.token,
                                    },
                                    type: "get",
                                    success: function (response) {
                                        temp = response.data.name;
                                        $("#chatVoii").html(response.data.name);
                                        $("#avatarChatVoi").attr(
                                            "src",
                                            response.data.avatar
                                        );
                                    },
                                });
                            } else if (response.data.participant.length > 2) {
                                $("#chatVoii").html(response.data.name);
                                $("#avatarChatVoi").attr(
                                    "src",
                                    response.data.avatarRoom
                                );
                                $("#thembbvaonhom").css("display", "inline");
                            } else {
                                $("#thembbvaonhom").css("display", "none");
                                $.ajax({
                                    url:
                                        url +
                                        "profile/" +
                                        response.data.participant[0],
                                    headers: {
                                        Authorization: account.token,
                                    },
                                    type: "get",
                                    success: function (response) {
                                        temp = response.data.name;
                                        $("#chatVoii").html(response.data.name);
                                        $("#avatarChatVoi").attr(
                                            "src",
                                            response.data.avatar
                                        );
                                    },
                                });
                            }
                        },
                    });
                    $("#js-menuTN").die();
                }
                // $("#js-menuTN").die();
            });
        });
    });

    $("#js-menuDSTV").on("click", "input[type=button]", function (e) {
        e.preventDefault();
        if ($(this).attr("id") === "kick") {
            const id = $(this).attr("name");
            //alert(id);
            var result = confirm("Bạn có chắc chắn muốn xóa thành viên ?");
            if (result == true) {
                $.ajax({
                    url: url + "conversation/member/" + idnhom,
                    type: "delete",
                    headers: {
                        Authorization: account.token,
                    },
                    data: { accountId: id },
                    success: function (response) {
                        if (response.data != "Change admin before out room") {
                            $("#" + id).css("display", "none");
                            alert("Xóa thành viên thành công !!");
                        }
                    },
                });
            }
        } else if ($(this).attr("id") === "chuyenAdmin") {
            const id = $(this).attr("name");
            var result = confirm("Bạn có chắc chắn muốn chuyển trưởng nhóm ?");
            if (result == true) {
                $.ajax({
                    url: url + "conversation/admin/" + idnhom,
                    type: "put",
                    headers: {
                        Authorization: account.token,
                    },
                    data: { accountId: id },
                    success: function (response) {
                        alert("Chuyển trưởng nhóm thành công !!");
                        $("#modalXemTTNhom").modal("hide");
                    },
                });
            }
        }
    });

    $("#js-menuBB").mouseover(function () {
        $("li").each(function (index) {
            $(this).click(function () {
                if ($(this).attr("class") === "menuBB--item") {
                    $("#chapNhanLMKB").css("display", "none");
                    $("#boLMKB").css("display", "none");
                    $("#guiLMKB").css("display", "none");
                    $("#huyLMKB").css("display", "none");
                    $("#boChanLMKB").css("display", "none");
                    $("#emailND").css("display", "none");
                    $("#sdtND").css("display", "none");
                    $("#chuyenUpdateProfile").css("display", "none");
                    $("#updateMK").css("display", "none");
                    $("#deleteTK").css("display", "none");
                    $("#nhanTinVoiBan").css("display", "inline");
                    $("#huyBanBe").css("display", "inline");
                    $("#buttonTTND").css("display", "block");
                    $("#chanLMKB").css("display", "inline");
                    $("#modalXemTT").modal("show");
                    idchat2 = $(this).attr("id");
                    $.ajax({
                        url: url + "profile/" + idchat2,
                        headers: {
                            Authorization: account.token,
                        },
                        type: "get",
                        success: function (response) {
                            namechat2 = response.data.name;
                            $.ajax({
                                url:
                                    url +
                                    "account/friend/block/" +
                                    account.accountId,
                                headers: {
                                    Authorization: account.token,
                                },
                                context: document.body,
                            }).done(function (data) {
                                data.data.forEach((element) => {
                                    if (element._id === response.data._id) {
                                        $("#chanLMKB").css("display", "none");
                                        $("#boChanLMKB").css(
                                            "display",
                                            "inline"
                                        );
                                    }
                                });
                            });
                            $("#avatarTT").attr("src", response.data.avatar);
                            $("#hoTen").html(response.data.name);
                            $("#ngaySinh").html(response.data.dob);
                            const gt = response.data.sex;
                            if (gt == true) {
                                $("#gioiTinh").html("Nam");
                            } else {
                                $("#gioiTinh").html("Nữ");
                            }
                        },
                    });
                    $("#js-menuBB").die();
                }
            });
        });
    });
    $("#trangchat").click(function () {
        document.getElementById("nav3_GT").style.display = "none";
        clearInterval(x);
        document.getElementById("nav3_BB").style.display = "none";
        document.getElementById("listBB").style.display = "none";
        $("#tittle").html("Tất cả các tin nhắn:");
        document.getElementById("listTN").style.display = "initial";
        document.getElementById("nav3_TN").style.display = "initial";
    });

    $("#dangXuat").click(function () {
        var result = confirm("Bạn có chắc chắn muốn đăng xuất ?");
        if (result == true) {
            localStorage.clear();
            location.replace("/");
        } else {
        }
    });

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $("#imagePreview").css(
                    "background-image",
                    "url(" + e.target.result + ")"
                );
                $("#imagePreview").hide();
                $("#imagePreview").fadeIn(650);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        readURL(this);
    });

    function readURLNhom(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $("#imagePreviewNhom").css(
                    "background-image",
                    "url(" + e.target.result + ")"
                );
                $("#imagePreviewNhom").hide();
                $("#imagePreviewNhom").fadeIn(650);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUploadNhom").change(function () {
        readURLNhom(this);
    });

    function readURLNhomCN(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $("#imagePreviewNhomCN").css(
                    "background-image",
                    "url(" + e.target.result + ")"
                );
                $("#imagePreviewNhomCN").hide();
                $("#imagePreviewNhomCN").fadeIn(650);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUploadNhomCN").change(function () {
        readURLNhomCN(this);
    });

    const img = document.getElementById("carousel");
    const rightBtn = document.getElementById("right-btn");
    const leftBtn = document.getElementById("left-btn");

    // Images are from unsplash
    let pictures = [
        "https://chaty-bucket.s3.ap-southeast-1.amazonaws.com/Messages-amico.png",
        "https://chaty-bucket.s3.ap-southeast-1.amazonaws.com/Messages-bro.png",
        "https://chaty-bucket.s3.ap-southeast-1.amazonaws.com/Messages-cuate.png",
        "https://chaty-bucket.s3.ap-southeast-1.amazonaws.com/Messages-pana.png",
        "https://chaty-bucket.s3.ap-southeast-1.amazonaws.com/Messages-rafiki.png",
    ];

    img.src = pictures[0];
    let position = 0;

    const moveRight = () => {
        if (position >= pictures.length - 1) {
            position = 0;
            img.src = pictures[position];
            return;
        }
        img.src = pictures[position + 1];
        position++;
    };

    const moveLeft = () => {
        if (position < 1) {
            position = pictures.length - 1;
            img.src = pictures[position];
            return;
        }
        img.src = pictures[position - 1];
        position--;
    };

    rightBtn.addEventListener("click", moveRight);
    leftBtn.addEventListener("click", moveLeft);
    var x = setInterval(function () {
        if (position >= pictures.length - 1) {
            position = 0;
            img.src = pictures[position];
            return;
        }
        img.src = pictures[position + 1];
        position++;
    }, 5000);

    function getBanBe() {
        $.ajax({
            url: url + "account/friend/able/" + account.accountId,
            headers: {
                Authorization: account.token,
            },
            context: document.body,
        }).done(function (data) {
            $("#js-menuBB").html("");
            data.data.forEach((element) => {
                $("#js-menuBB").append(
                    "<li class='menuBB--item' id='" +
                        element._id +
                        "'> <label class='menu--link' title='" +
                        element.name +
                        "'>" +
                        "<img src='" +
                        element.avatar +
                        "' style='text-align: center; width: 40px;height: 40px; margin-top: 1px; margin-left: 40px; margin-bottom: 30px;border-radius: 100%;'>" +
                        "<label style='margin-top: 8px; position: absolute; margin-left: 10px;'><b>" +
                        element.name +
                        "</b></label>" +
                        "</label></li>"
                );
            });
        });
    }

    function getTN() {
        $.ajax({
            url: url + "conversation?id=" + account.accountId,
            type: "get",
            headers: {
                Authorization: account.token,
            },
            protocolProfileBehavior: {
                disableBodyPruning: true,
            },
            data: {},
        }).done(function (data) {
            $("#js-menuTN").html("");
            data.data.forEach((element) => {
                if (
                    element.participant.length == 2 &&
                    element.admin == account.accountId
                ) {
                    $.ajax({
                        url: url + "profile/" + element.participant[1],
                        headers: {
                            Authorization: account.token,
                        },
                        type: "get",
                        success: function (response) {
                            temp = response.data.name;
                            $("#js-menuTN").append(
                                "<li class='menuTN--item' id='" +
                                    element._id +
                                    "'> <label class='menu--link' title='Nhắn tin'>" +
                                    "<img src='" +
                                    response.data.avatar +
                                    "' style='border-radius: 100%; text-align: center; width: 50px;height: 50px; margin-top: 15px; margin-left: 40px; margin-bottom: 30px;'>" +
                                    "<label style='margin-top: 8px; position: absolute; margin-left: 10px;'><b>" +
                                    response.data.name +
                                    "</b></label>" +
                                    "<label style='margin-left: 10px;margin-top: 30px; position: absolute;'>" +
                                    response.data.name +
                                    "</li>"
                            );
                        },
                    });
                } else if (element.participant.length > 2) {
                    $("#js-menuTN").append(
                        "<li class='menuTN--item' id='" +
                            element._id +
                            "'> <label class='menu--link' title='Nhắn tin'>" +
                            "<img src='" +
                            element.avatarRoom +
                            "' style='border-radius: 100%; text-align: center; width: 50px;height: 50px; margin-top: 15px; margin-left: 40px; margin-bottom: 30px;'>" +
                            "<label style='margin-top: 8px; position: absolute; margin-left: 10px;'><b>" +
                            element.name +
                            "</b></label>" +
                            "<label style='margin-left: 10px;margin-top: 30px; position: absolute;'>" +
                            element.name +
                            "</label>" +
                            "</li>"
                    );
                } else {
                    $.ajax({
                        url: url + "profile/" + element.participant[0],
                        headers: {
                            Authorization: account.token,
                        },
                        type: "get",
                        success: function (response) {
                            temp = response.data.name;
                            $("#js-menuTN").append(
                                "<li class='menuTN--item' id='" +
                                    element._id +
                                    "'> <label class='menu--link' title='Nhắn tin'>" +
                                    "<img src='" +
                                    response.data.avatar +
                                    "' style='border-radius: 100%; text-align: center; width: 50px;height: 50px; margin-top: 15px; margin-left: 40px; margin-bottom: 30px;'>" +
                                    "<label style='margin-top: 8px; position: absolute; margin-left: 10px;'><b>" +
                                    response.data.name +
                                    "</b></label>" +
                                    "<label style='margin-left: 10px;margin-top: 30px; position: absolute;'>" +
                                    response.data.name +
                                    "</label>" +
                                    "</li>"
                            );
                        },
                    });
                }
            });
        });
    }
    const button = document.querySelector("#emoji-btn");

    const picker = new EmojiButton();
    picker.on("emoji", (emoji) => {
        document.querySelector("#txtChat").value += emoji;
    });
    button.addEventListener("click", () => {
        picker.togglePicker(button);
    });

    let socket;
    const peer = new Peer(undefined);
    peer.on("open", (id) => {
        socket = io({
            query: { accountId: account.accountId, peerId: id },
        });
        socket.on("server-turnoff-call", (data) => {
            location.reload();
            alert("Cuộc gọi đã kết thúc");
        });
        socket.on("server-send-mess", (data) => {
            console.log(data);
            if (data.data.startsWith("https://")) {
                if (
                    data.data.endsWith(".jpg") ||
                    data.data.endsWith(".jpeg") ||
                    data.data.endsWith(".png")
                ) {
                    const urlFile = data.data;
                    if (data.id === account.profileId) {
                        $("#chat").append(
                            "<div class='my-message'>" +
                                "<div class='my-message-image'>" +
                                "<img src='" +
                                urlFile +
                                "' width='20%' height='20%'/>" +
                                "</div>" +
                                "<img style='border-radius: 100%; margin-right: .5rem' width='30px' height='30px' alt='avatar' src='" +
                                data.avatar +
                                "' />" +
                                "</div>"
                        );
                    } else {
                        $("#chat").append(
                            "<div class='another-message'>" +
                                "<img style='border-radius: 100%; margin-left: .5rem' width='30px' height='30px' alt='avatar' src='" +
                                data.avatar +
                                "' />" +
                                "<div class='another-message-image'>" +
                                "<img src='" +
                                urlFile +
                                "' width='20%' height='20%'/>" +
                                "</div>" +
                                "</div>"
                        );
                    }
                } else {
                    if (data.data.endsWith(".mp4")) {
                        if (data.id === account.profileId) {
                            $("#chat").append(
                                "<div class='my-message'>" +
                                    "<div class='my-message-content'>" +
                                    "<video width='320' height='240' controls> <source src='" +
                                    data.data +
                                    "' type='video/mp4'>" +
                                    "</div>" +
                                    "<img style='border-radius: 100%; margin-right: .5rem' width='30px' height='30px' alt='avatar' src='" +
                                    data.avatar +
                                    "' />" +
                                    "</div>"
                            );
                        } else {
                            $("#chat").append(
                                "<div class='another-message'>" +
                                    "<img style='border-radius: 100%; margin-left: .5rem' width='30px' height='30px' alt='avatar' src='" +
                                    data.avatar +
                                    "' />" +
                                    "<div class='another-message-content'>" +
                                    "<video width='320' height='240' controls> <source src='" +
                                    data.data +
                                    "' type='video/mp4'>" +
                                    "</div>" +
                                    "</div>"
                            );
                        }
                    } else {
                        const urlFile = data.data;
                        if (data.id === account.profileId) {
                            $("#chat").append(
                                "<div class='my-message'>" +
                                    "<div class='my-message-file'>" +
                                    "<i class='far fa-file-pdf fa-2x'></i><span> <a href='" +
                                    urlFile +
                                    "'>" +
                                    data.data.split("/").pop() +
                                    "</a> </span>" +
                                    "</div>" +
                                    "<img style='border-radius: 100%; margin-right: .5rem' width='30px' height='30px' alt='avatar' src='" +
                                    data.avatar +
                                    "' />" +
                                    "</div>"
                            );
                        } else {
                            $("#chat").append(
                                "<div class='another-message'>" +
                                    "<img style='border-radius: 100%; margin-left: .5rem' width='30px' height='30px' alt='avatar' src='" +
                                    data.avatar +
                                    "' />" +
                                    "<div class='another-message-file'>" +
                                    "<i class='far fa-file-pdf fa-2x'></i><span> <a href='" +
                                    urlFile +
                                    "'>" +
                                    data.data.split("/").pop() +
                                    "</a> </span>" +
                                    "</div>" +
                                    "</div>"
                            );
                        }
                    }
                }
            } else {
                if (data.id === account.profileId) {
                    $("#chat").append(
                        "<div class='my-message'>" +
                            "<div class='my-message-content'>" +
                            "<p style='padding-left: 0.5rem; margin-top: 0.5rem; padding-right: .5rem' >" +
                            data.data +
                            "</p>" +
                            "</div>" +
                            "<img style='border-radius: 100%; margin-right: .5rem' width='30px' height='30px' alt='avatar' src='" +
                            data.avatar +
                            "' />" +
                            "</div>"
                    );
                } else {
                    $("#chat").append(
                        "<div class='another-message'>" +
                            "<img style='border-radius: 100%; margin-left: .5rem' width='30px' height='30px' alt='avatar' src='" +
                            data.avatar +
                            "' />" +
                            "<div class='another-message-content'>" +
                            "<p style='padding-left: 0.5rem; margin-top: 0.5rem; padding-right: .5rem' >" +
                            data.data +
                            "</p>" +
                            "</div>" +
                            "</div>"
                    );
                }
            }
        });
        socket.on("client-call-video", (data) => {
            $("#body-notify-call").append(`<p>${data.from}</p>`);
        });
    });
    let conversationId;
    let localStream;
    $("#js-menuTN").on("click", ".menuTN--item", function (e) {
        e.preventDefault();
        $("#chat").html("");
        conversationId = $(this).attr("id");
        $("#nameFile").html("");
        $.ajax({
            url: url + `conversation/${$(this).attr("id")}`,
            headers: {
                Authorization: account.token,
            },
            type: "get",
            success: function (response) {
                console.log(response);
                if (response.data.admin == account.accountId) {
                    $("#chatVoii").html(response.data.name);
                } else {
                    $("#chatVoii").html(temp);
                }
            },
        });
        $.ajax({
            url: url + `message?conversationId=${$(this).attr("id")}`,
            headers: {
                Authorization: account.token,
            },
            type: "get",
            success: function (response) {
                const list = response.data;
                console.log(list);
                const listMess = list.reverse();
                listMess.forEach((element) => {
                    if (element.body.startsWith("https://")) {
                        if (
                            element.body.endsWith(".jpg") ||
                            element.body.endsWith(".jpeg") ||
                            element.body.endsWith(".png")
                        ) {
                            const urlFile = element.body;
                            if (element.sender === account.profileId) {
                                $("#chat").append(
                                    "<div class='my-message'>" +
                                        "<div class='my-message-image'>" +
                                        "<img src='" +
                                        urlFile +
                                        "' width='20%' height='20%'/>" +
                                        "</div>" +
                                        "<img style='border-radius: 100%; margin-right: .5rem' width='30px' height='30px' alt='avatar' src='" +
                                        element.avatar +
                                        "' />" +
                                        "</div>"
                                );
                            } else {
                                $("#chat").append(
                                    "<div class='another-message'>" +
                                        "<img style='border-radius: 100%; margin-left: .5rem' width='30px' height='30px' alt='avatar' src='" +
                                        element.avatar +
                                        "' />" +
                                        "<div class='another-message-image'>" +
                                        "<img src='" +
                                        urlFile +
                                        "' width='20%' height='20%'/>" +
                                        "</div>" +
                                        "</div>"
                                );
                            }
                        } else {
                            if (element.body.endsWith(".mp4")) {
                                if (element.sender === account.profileId) {
                                    $("#chat").append(
                                        "<div class='my-message'>" +
                                            "<div class='my-message-content'>" +
                                            "<video width='320' height='240' controls> <source src='" +
                                            element.body +
                                            "' type='video/mp4'>" +
                                            "</div>" +
                                            "<img style='border-radius: 100%; margin-right: .5rem' width='30px' height='30px' alt='avatar' src='" +
                                            element.avatar +
                                            "' />" +
                                            "</div>"
                                    );
                                } else {
                                    $("#chat").append(
                                        "<div class='another-message'>" +
                                            "<img style='border-radius: 100%; margin-left: .5rem' width='30px' height='30px' alt='avatar' src='" +
                                            element.avatar +
                                            "' />" +
                                            "<div class='another-message-content'>" +
                                            "<video width='320' height='240' controls> <source src='" +
                                            element.body +
                                            "' type='video/mp4'>" +
                                            "</div>" +
                                            "</div>"
                                    );
                                }
                            } else {
                                const urlFile = element.body;
                                if (element.sender === account.profileId) {
                                    $("#chat").append(
                                        "<div class='my-message'>" +
                                            "<div class='my-message-file'>" +
                                            "<i class='far fa-file-pdf fa-2x'></i><span> <a href='" +
                                            urlFile +
                                            "'>" +
                                            element.body.split("/").pop() +
                                            "</a> </span>" +
                                            "</div>" +
                                            "<img style='border-radius: 100%; margin-right: .5rem' width='30px' height='30px' alt='avatar' src='" +
                                            element.avatar +
                                            "' />" +
                                            "</div>"
                                    );
                                } else {
                                    $("#chat").append(
                                        "<div class='another-message'>" +
                                            "<img style='border-radius: 100%; margin-left: .5rem' width='30px' height='30px' alt='avatar' src='" +
                                            element.avatar +
                                            "' />" +
                                            "<div class='another-message-file'>" +
                                            "<i class='far fa-file-pdf fa-2x'></i><span> <a href='" +
                                            urlFile +
                                            "'>" +
                                            element.body.split("/").pop() +
                                            "</a> </span>" +
                                            "</div>" +
                                            "</div>"
                                    );
                                }
                            }
                        }
                    } else {
                        if (element.sender === account.profileId) {
                            $("#chat").append(
                                "<div class='my-message'>" +
                                    "<div class='my-message-content'>" +
                                    "<p style='padding-left: 0.5rem; margin-top: 0.5rem; padding-right: .5rem' >" +
                                    element.body +
                                    "</p>" +
                                    "</div>" +
                                    "<img style='border-radius: 100%; margin-right: .5rem' width='30px' height='30px' alt='avatar' src='" +
                                    element.avatar +
                                    "' />" +
                                    "</div>"
                            );
                        } else {
                            $("#chat").append(
                                "<div class='another-message'>" +
                                    "<img style='border-radius: 100%; margin-left: .5rem' width='30px' height='30px' alt='avatar' src='" +
                                    element.avatar +
                                    "' />" +
                                    "<div class='another-message-content'>" +
                                    "<p style='padding-left: 0.5rem; margin-top: 0.5rem; padding-right: .5rem' >" +
                                    element.body +
                                    "</p>" +
                                    "</div>" +
                                    "</div>"
                            );
                        }
                    }
                });
            },
        });
    });
    function openStream() {
        const config = { audio: true, video: true };
        return navigator.mediaDevices.getUserMedia(config);
    }

    function playStream(idVideoTag, stream) {
        const video = document.getElementById(idVideoTag);
        video.srcObject = stream;
        localStream = stream;
        video.play();
    }
    let call;
    $("#video-call").click(function (e) {
        e.preventDefault();
        $("#modalXemTT").modal("hide");
        $("#modal-video-call").modal("show");
        openStream().then((stream) => {
            playStream("localStream", stream);
            const conversation = conversationId;
            socket.emit("client-call-video", {
                _id: account.accountId,
                conversation: conversation,
            });
            socket.on("server-send-peer", (data) => {
                call = peer.call(data.peerId, stream);
                call.on("stream", (remoteStream) =>
                    playStream("remoteStream", remoteStream)
                );
            });
        });
    });
    let audio = document.createElement("audio");
    audio.setAttribute("src", "./notify.mp3");
    audio.addEventListener(
        "load",
        function () {
            audio.play();
        },
        true
    );
    peer.on("call", (call) => {
        $("#notify-call").modal("show");
        audio.play();
        $("#connect-call").click(function (e) {
            e.preventDefault();
            audio.pause();
            $("#notify-call").modal("hide");
            $("#modal-video-call").modal("show");
            openStream()
                .then((stream) => {
                    call.answer(stream);
                    playStream("localStream", stream);

                    call.on("stream", (remoteStream) =>
                        playStream("remoteStream", remoteStream)
                    );
                })
                .catch((err) => console.log(err));
        });
        $("#disconnect-call").click(function (e) {
            e.preventDefault();
            socket.emit("off-video-call", {
                _id: account.accountId,
                conversation: conversationId,
            });
            alert("Cuộc gọi đã kết thúc");
            location.reload();
        });
    });
    function handlePeerDisconnect() {
        // manually close the peer connections
        for (let conns in peer.connections) {
            peer.connections[conns].forEach((conn, index, array) => {
                conn.peerConnection.close();
                // close it using peerjs methods
                if (conn.close) conn.close();
            });
        }
    }
    $("#off-video-call").click(function (e) {
        e.preventDefault();
        handlePeerDisconnect();
        localStream.getTracks().forEach(function (track) {
            track.stop();
        });
        socket.emit("off-video-call", {
            _id: account.accountId,
            conversation: conversationId,
        });
        alert("Cuộc gọi đã kết thúc");
        location.reload();
    });

    $("#send-chat").click(function (e) {
        e.preventDefault();
        const content = $("#txtChat").val().trim();
        const conversation = conversationId;
        if (content !== "") {
            socket.emit("client-send-mess", {
                _id: account.accountId,
                content: content,
                conversation: conversation,
                sendAt: Date.now(),
            });
            $("#txtChat").val("");
            elmnt.scrollIntoView(false);
        } else {
            const file = $("#fileUpload")[0].files[0];
            fileName = file.name;
            const fd = new FormData();
            fd.append("file", file);
            $("#nameFile").html("");
            $.ajax({
                url: url + "file",
                data: fd,
                processData: false,
                contentType: false,
                type: "POST",
                success: function (res) {
                    if (res !== null) {
                        socket.emit("client-send-file", {
                            _id: account.accountId,
                            content: res.data,
                            conversation: conversation,
                            sendAt: Date.now(),
                        });
                    }
                },
            });
        }
    });

    $("#txtChat").keypress(function (event) {
        var keycode = event.keyCode ? event.keyCode : event.which;
        if (keycode == "13") {
            const content = $("#txtChat").val().trim();
            const conversation = conversationId;
            if (content !== "") {
                socket.emit("client-send-mess", {
                    _id: account.accountId,
                    content: content,
                    conversation: conversation,
                    sendAt: Date.now(),
                });
                $("#txtChat").val("");
                elmnt.scrollIntoView(false);
            } else {
                const file = $("#fileUpload")[0].files[0];
                fileName = file.name;
                const fd = new FormData();
                fd.append("file", file);
                $("#nameFile").html("");
                $.ajax({
                    url: url + "file",
                    data: fd,
                    processData: false,
                    contentType: false,
                    type: "POST",
                    success: function (res) {
                        if (res !== null) {
                            socket.emit("client-send-file", {
                                _id: account.accountId,
                                content: res.data,
                                conversation: conversation,
                                sendAt: Date.now(),
                            });
                        }
                    },
                });
            }
        }
    });

    function readURLUploadFile(input) {
        if (input.files && input.files[0]) {
            $("#nameFile").html(input.files[0].name);
        }
    }
    $("#fileUpload").change(function () {
        readURLUploadFile(this);
    });
});
