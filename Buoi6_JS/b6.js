document.getElementById("btnThem").addEventListener("click", function () {
    const maSV = document.getElementById("maSV").value.trim();
    const hoTen = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const birthRaw = document.getElementById("birth").value;
    const gtinh = document.querySelector('input[name="gtinh"]:checked')?.value || "";
    const tb = document.getElementById("thongBao");

    if (!maSV || !hoTen || !email || !birthRaw || !gtinh) {
    tb.innerText = "Vui lòng nhập đầy đủ thông tin!";
    return;
    }

    const [year, month, day] = birthRaw.split("-");
    const birth = `${day}-${month}-${year}`;

    const table = document.getElementById("bangSinhVien").getElementsByTagName("tbody")[0];
    const row = table.insertRow();
    const stt = table.rows.length;
    row.insertCell(0).innerText = stt;
    row.insertCell(1).innerText = maSV;
    row.insertCell(2).innerText = hoTen;
    row.insertCell(3).innerText = email;
    row.insertCell(4).innerText = gtinh;
    row.insertCell(5).innerText = birth;
    row.insertCell(6).innerHTML = '<a href="#">Sửa</a> | <a href="#">Xoá</a>';

    tb.style.color = "green";
    tb.innerText = "Thêm sinh viên thành công!";
    setTimeout(() => tb.innerText = "", 3000);

    document.getElementById("formSV").reset();
});