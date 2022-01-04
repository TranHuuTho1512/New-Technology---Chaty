// ktra Dang ky

function ktraSDT() {

    var sdt= document.getElementById("txtSDT").value.trim();
    var phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; 
    if(phoneNum.test(sdt)){
        document.getElementById("sdtError").innerHTML= "";
        return true;
    }else if(sdt === ""){
        document.getElementById("sdtError").innerHTML= "Vui lòng nhập số điện thoại !!";
        return false;
    }
    else{
        document.getElementById("sdtError").innerHTML= "Số máy quý khách vừa nhập là số không có thực !!";
        return false;
    }
}
function ktraSDTTK() {

    var sdt= document.getElementById("txtSDTTK").value.trim();
    var phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; 
    if(phoneNum.test(sdt)){
        document.getElementById("sdtTKError").innerHTML= "";
        return true;
    }else if(sdt === ""){
        document.getElementById("sdtTKError").innerHTML= "Vui lòng nhập số điện thoại !!";
        return false;
    }
    else{
        document.getElementById("sdtTKError").innerHTML= "Số máy quý khách vừa nhập là số không có thực !!";
        return false;
    }
}
function ktraMK() {
    
    var Regex = new RegExp("^(?=.{6,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    var mk = document.getElementById("txtMatKhau").value;
    if (Regex.test(mk)) {
        document.getElementById("matKhauError").innerHTML= "";
        return true;
    } else if(mk === ""){
        document.getElementById("matKhauError").innerHTML= "Vui lòng nhập mật khẩu !!";
        return false;
    }
    else{
        document.getElementById("matKhauError").innerHTML= "Vui lòng nhập ít nhất 6 kí tự và kết hợp chữ và số !!";
        return false;
    }
    
}



function ktraMKTK() {
    
    var Regex = new RegExp("^(?=.{6,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    var mk = document.getElementById("txtMatKhauTK").value;
    if (Regex.test(mk)) {
        document.getElementById("matKhauTKError").innerHTML= "";
        return true;
    } else if(mk === ""){
        document.getElementById("matKhauTKError").innerHTML= "Vui lòng nhập mật khẩu !!";
        return false;
    }
    else{
        document.getElementById("matKhauTKError").innerHTML= "Vui lòng nhập ít nhất 6 kí tự và kết hợp chữ và số !!";
        return false;
    }
    
}

function ktraMKMoi() {
    
    var Regex = new RegExp("^(?=.{6,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    var mk = document.getElementById("matKhauMoi").value;
    if (Regex.test(mk)) {
        document.getElementById("matKhauMoiError").innerHTML= "";
        return true;
    } else if(mk === ""){
        document.getElementById("matKhauMoiError").innerHTML= "Vui lòng nhập mật khẩu !!";
        return false;
    }
    else{
        document.getElementById("matKhauMoiError").innerHTML= "Vui lòng nhập ít nhất 6 kí tự và kết hợp chữ và số !!";
        return false;
    }
    
}

function ktraNLMK() {
    if(document.getElementById('txtMatKhau').value === document.getElementById('txtNhapLaiMatKhau').value) {
        document.getElementById('nhapLaiMatKhauError').innerHTML = "";
        return true;
    } else if(document.getElementById('txtNhapLaiMatKhau').value === ""){
        document.getElementById("nhapLaiMatKhauError").innerHTML= "Vui lòng nhập lại mật khẩu !!";
        return false;
    }
    else {
        document.getElementById('nhapLaiMatKhauError').innerHTML = "Mật khẩu không trùng khớp !!";
        return false;
    }
}

function ktraNLMKM() {
    if(document.getElementById('matKhauMoi').value === document.getElementById('txtNhapLaiMatKhau').value) {
        document.getElementById('nhapLaiMatKhauError').innerHTML = "";
        return true;
    } else if(document.getElementById('txtNhapLaiMatKhau').value === ""){
        document.getElementById("nhapLaiMatKhauError").innerHTML= "Vui lòng nhập lại mật khẩu !!";
        return false;
    }
    else {
        document.getElementById('nhapLaiMatKhauError').innerHTML = "Mật khẩu không trùng khớp !!";
        return false;
    }
}

function ktraEmail(){
    var email= document.getElementById("email").value.trim();
    var regt = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
    if(regt.test(email)){
        document.getElementById("emailError").innerHTML= "";
        return true;
    }else if(email===""){
        document.getElementById("emailError").innerHTML= "Vui lòng nhập email !!";
        return false;
    }
    else{
        document.getElementById("emailError").innerHTML= "Vui lòng nhập lại email !!";
        return false;
    }
}

function validateDK() {

    let flag = true;

    var sdt= document.getElementById("txtSDT").value.trim();
    if(sdt===""){
        document.getElementById("sdtError").innerHTML= "Vui lòng nhập số điện thoại !!";
        flag= false;
    }

    var email= document.getElementById("email").value.trim();
    if(email===""){
        document.getElementById("emailError").innerHTML= "Vui lòng nhập email !!";
        flag= false;
    }
    
    var mk= document.getElementById("txtMatKhau").value.trim();
    if(mk===""){
        document.getElementById("matKhauError").innerHTML= "Vui lòng nhập mật khẩu !!";
        flag= false;
    }

    var nlmk= document.getElementById("txtNhapLaiMatKhau").value.trim();
    if(nlmk===""){
        document.getElementById("nhapLaiMatKhauError").innerHTML= "Vui lòng nhập lại mật khẩu !!";
        flag= false;
    }
    return flag;
}

function validateQMK() { 

    let flag = true;

    var sdt= document.getElementById("txtSDTTK").value.trim();
    if(sdt===""){
        document.getElementById("resetPasswordKeyError").innerHTML= "Vui lòng nhập số điện thoại !!";
        flag= false;
    }

    var email= document.getElementById("email").value.trim();
    if(email===""){
        document.getElementById("resetPasswordKeyError").innerHTML= "Vui lòng nhập email !!";
        flag= false;
    }
    
    var mk= document.getElementById("txtMatKhauTK").value.trim();
    if(mk===""){
        document.getElementById("resetPasswordKeyError").innerHTML= "Vui lòng nhập mật khẩu !!";
        flag= false;
    }

    var nlmk= document.getElementById("txtNhapLaiMatKhau").value.trim();
    if(nlmk===""){
        document.getElementById("resetPasswordKeyError").innerHTML= "Vui lòng nhập lại mật khẩu !!";
        flag= false;
    }
    var ma=document.getElementById("resetPasswordKey").value.trim();
    if(ma===""){
        document.getElementById("resetPasswordKeyError").innerHTML= "Vui lòng nhập mã xác thực !!";
        flag= false;
    }
    return flag;
}


function validateUpdateMK() {

    let flag = true;

    var mk= document.getElementById("txtMatKhau").value.trim();
    if(mk===""){
        document.getElementById("matKhauError").innerHTML= "Vui lòng nhập mật khẩu !!";
        flag= false;
    }

    var mkm= document.getElementById("matKhauMoi").value.trim();
    if(mkm===""){
        document.getElementById("matKhauMoiError").innerHTML= "Vui lòng nhập mật khẩu !!";
        flag= false;
    }

    var nlmk= document.getElementById("txtNhapLaiMatKhau").value.trim();
    if(nlmk===""){
        document.getElementById("nhapLaiMatKhauError").innerHTML= "Vui lòng nhập lại mật khẩu !!";
        flag= false;
    }
    return flag;
}

// Ktra Thông tin sau dang ky

function ktraTen() {

    var ten= document.getElementById("txtHoTen").value.trim();
    var regt= /^[A-Z]+[A-Za-z]*(\s*[A-Z]+[A-Za-z]*)*$/;
    if(regt.test(ten)){
        document.getElementById("hoTenError").innerHTML= "";
        return true;
    }else if(ten===""){
        document.getElementById("hoTenError").innerHTML= "Vui lòng nhập họ tên !!";
        return false;
    }
    else{
        document.getElementById("hoTenError").innerHTML= "Vui lòng nhập lại họ tên !!";
        return false;
    }
}

function validateTTSDK() {

    let flag = true;
    
    if(ktraTen()===false){
        document.getElementById("hoTenError").innerHTML= "Vui lòng nhập lại họ tên !!";
        flag= false;
    }
    

    var d = parseInt(document.getElementById("ngay").value);
    var m = parseInt(document.getElementById("thang").value);
    var y = parseInt(document.getElementById("nam").value);
    var date = new Date(y,m-1,d);
    if (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d) {
        document.getElementById("ngaySinhError").innerHTML= "";
    } else{
        document.getElementById("ngaySinhError").innerHTML= "Vui lòng chọn lại ngày sinh !";
        flag= false;
    }

    return flag;
}

$(function(){
    //Năm tự động điền vào select
        var seYear = $('#nam');
        var date = new Date();
        var cur = date.getFullYear();
    
        seYear.append('<option value=""> Năm </option>');
        for (i = cur; i >= 1900; i--) {
            seYear.append('<option value="'+i+'">'+i+'</option>');
        };
        
        //Tháng tự động điền vào select
        var seMonth = $('#thang');
        var date = new Date();
        
        var month=new Array();
        month[1]="Tháng 1";
        month[2]="Tháng 2";
        month[3]="Tháng 3";
        month[4]="Tháng 4";
        month[5]="Tháng 5";
        month[6]="Tháng 6";
        month[7]="Tháng 7";
        month[8]="Tháng 8";
        month[9]="Tháng 9";
        month[10]="Tháng 10";
        month[11]="Tháng 11";
        month[12]="Tháng 12";
    
        seMonth.append('<option value=""> Tháng </option>');
        for (i = 12; i > 0; i--) {
            seMonth.append('<option value="'+i+'">'+month[i]+'</option>');
        };
        
        //Ngày tự động điền vào select
        var seDay= $('#ngay');
        seDay.append('<option value=""> Ngày </option>');
        for (i = 31; i > 0; i--) {
            seDay.append('<option value="'+i+'">'+i+'</option>');
        };

        function dayList(month,year) {
            var day = new Date(year, month, 0);
            return day.getDate();
        }   
        
    });

    // Ktra Dang nhap

    function validateDN() {

        let flag = true;

        var sdt= document.getElementById("txtSDT").value.trim();
        if(sdt===""){
            document.getElementById("sdtError").innerHTML= "Vui lòng nhập số điện thoại !!";
            flag= false;
        }
        var mk= document.getElementById("matKhau").value.trim();
        if(mk===""){
            document.getElementById("matKhauError").innerHTML= "Vui lòng nhập mật khẩu !!";
            flag= false;
        }

        return flag;
    }

    // Ktra SMS

    function ktraSMS() {

        var sms= document.getElementById("txtSMS").value.trim();
        if(sms===""){
            document.getElementById("smsError").innerHTML= "Vui lòng nhập mã SMS từ tin nhắn điện thoại !!";
            return false;
        }
        else{
            document.getElementById("smsError").innerHTML= "";
            return true;
        }
    }