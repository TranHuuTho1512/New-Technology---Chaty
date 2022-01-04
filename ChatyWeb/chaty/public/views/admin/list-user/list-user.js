$(document).ready(function () {
    let BASE_URL = "https://www.chaty.site";
    const account = JSON.parse(localStorage.getItem("account"));
    let tongtrang = 0;
    let tranght = 1;
    let stt = 1;
    $.ajax({
        url: BASE_URL + "/account?pageNumber=1&pageLimit=10",
        headers: {
            Authorization: account.token,
        },
    }).done(function (res) {
        console.log(res);
        tongtrang = res.data.totalPage;
        res.data.items.forEach((element) => {
            if (element.status == 1) {
                $("#list").append(
                    `<tr>
                        <th>${stt}</th>
                        <th>${element.phone}</th>
                        <th>${element.email}</th>
                        <th><span id="${stt++}" class="badge bg-success">Hoạt động</span></th>
                        <th><input class="btn btn-primary" type="submit" id="${
                            element._id
                        }" value="Khóa tài khoản" /></th>
                    </tr>`
                );
            } else if (element.status == 0) {
                $("#list").append(
                    `<tr>
                        <th>${stt}</th>
                        <th>${element.phone}</th>
                        <th>${element.email}</th>
                        <th><span id="${stt++}" class="badge bg-warning text-dark">Chưa kích hoạt</span></th>
                        <th></th>
                    </tr>`
                );
            } else {
                $("#list").append(
                    `<tr>
                        <th>${stt}</th>
                        <th>${element.phone}</th>
                        <th>${element.email}</th>
                        <th><span id="${stt++}" class="badge bg-success">Hoạt động</span></th>
                        <th><input class="btn btn-primary" type="submit" id="${
                            element._id
                        }" style="background-color: red;border: red" value="Mở tài khoản" /></th>
                    </tr>`
                );
            }
        });
        $("#pagination").append(
            `<li class="page-item">
            <a class="page-link" href="#" id="trangtruoc" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>`
        );
        let dem = 1;
        for (let i = 1; i <= res.data.totalPage; i++) {
            $("#pagination").append(
                `<li class="page-item"><a class="page-link" href="#" id="${i}"  name="trang">${i}</a></li>`
            );
        }
        $("#pagination").append(
            `<li class="page-item">
            <a class="page-link" href="#" id="trangsau" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>`
        );
    });

    $("#list").on("click", "input[type=submit]", function (e) {
        e.preventDefault();
        let id = $(this).attr("id");
        if ($(this).attr("value") === "Khóa tài khoản") {
            // alert($(this).attr("value"));
            $.ajax({
                url: BASE_URL + "/admin/block",
                headers: {
                    Authorization: account.token,
                },
                type: "post",
                data: { _id: id },
                success: function (response) {
                    document.getElementById(id).value = "Mở tài khoản";
                    $("#" + id).css("background-color", "red");
                    $("#" + id).css("border", "red");
                    alert("Khóa tài khoản thành công !!");
                },
            });
        } else if ($(this).attr("value") === "Mở tài khoản") {
            // alert(id);
            $.ajax({
                url: BASE_URL + "/admin/unblock",
                headers: {
                    Authorization: account.token,
                },
                type: "post",
                data: { _id: id },
                success: function (response) {
                    document.getElementById(id).value = "Khóa tài khoản";
                    $("#" + id).css("background-color", "");
                    $("#" + id).css("border", "");
                    alert("Mở khóa tài khoản thành công !!");
                },
            });
        }
    });

    $("#pagination").on("click", "a", function (e) {
        e.preventDefault();
        let sotrang = $(this).attr("id");
        getAccount(sotrang);
    });

    // $("#trangtruoc").click(function () {
    //     alert("fdfdd");
    //     if(tranght != "1"){
    //         getAccount(tranght++);
    //     }else{
    //         alert(tranght);
    //     }
    // });

    // $("#trangsau").click(function () {
    //     if(tranght != tongtrang){
    //         getAccount(parseInt(tranght)+1);
    //     }else{
    //         alert(tranght);
    //     }
    // });

    function getAccount(s) {
        $("#list").html("");
        stt = 1;
        tranght = s;
        $.ajax({
            url: BASE_URL + "/account?pageNumber=" + s + "&pageLimit=10",
            headers: {
                Authorization: account.token,
            },
        }).done(function (res) {
            res.data.items.forEach((element) => {
                if (element.status == 1) {
                    $("#list").append(
                        `<tr>
                            <th>${stt}</th>
                            <th>${element.phone}</th>
                            <th>${element.email}</th>
                            <th><span id="${stt++}" class="badge bg-success">Hoạt động</span></th>
                            <th><input class="btn btn-primary" type="submit" id="${
                                element._id
                            }" value="Khóa tài khoản" /></th>
                        </tr>`
                    );
                } else if (element.status == 0) {
                    $("#list").append(
                        `<tr>
                            <th>${stt}</th>
                            <th>${element.phone}</th>
                            <th>${element.email}</th>
                            <th><span id="${stt++}" class="badge bg-warning text-dark">Chưa kích hoạt</span></th>
                            <th></th>
                        </tr>`
                    );
                } else {
                    $("#list").append(
                        `<tr>
                            <th>${stt}</th>
                            <th>${element.phone}</th>
                            <th>${element.email}</th>
                            <th><span id="${stt++}" class="badge bg-success">Hoạt động</span></th>
                            <th><input class="btn btn-primary" type="submit" id="${
                                element._id
                            }" style="background-color: red;border: red" value="Mở tài khoản" /></th>
                        </tr>`
                    );
                }
            });
        });
    }
});
