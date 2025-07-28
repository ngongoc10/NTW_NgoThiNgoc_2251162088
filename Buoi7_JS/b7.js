let selectedRow = null;
document.getElementById("btnThem").addEventListener("click", function () {
    const maSV = document.getElementById("maSV").value.trim();
    const hoTen = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const birthRaw = document.getElementById("birth").value.trim();
    let gtinh = "";
    const radios = document.getElementsByName("gioitinh");

    for (let r of radios) {
        if (r.checked) {
            gtinh = r.value;
            break;
        }
    }

    const tb = document.getElementById("thongBao");

    // Kiểm tra dữ liệu rỗng
    if (!maSV || !hoTen || !email || !birthRaw || !gtinh) {
        tb.innerText = "Vui lòng nhập đầy đủ thông tin!";
        tb.style.color = "red";
        return;
    }

    // Kiểm tra định dạng email
    const regexEmail = /^\S+@\S+\.\S+$/;
    if (!regexEmail.test(email)) {
        alert("Email không hợp lệ!");
        return;
    }

    // Định dạng lại ngày sinh
    const [year, month, day] = birthRaw.split("-");
    const birth = `${day}-${month}-${year}`;

    const table = document.getElementById("bangSinhVien").getElementsByTagName("tbody")[0];

    if (selectedRow) {
        // Cập nhật hàng đang chọn
        selectedRow.cells[1].innerText = maSV;
        selectedRow.cells[2].innerText = hoTen;
        selectedRow.cells[3].innerText = email;
        selectedRow.cells[4].innerText = gtinh;
        selectedRow.cells[5].innerText = birth;

        tb.innerText = "Cập nhật thành công!";
        selectedRow = null;
    } else {
        // Thêm hàng mới
        const row = table.insertRow();
        const stt = table.rows.length;

        row.insertCell(0).innerText = stt;
        row.insertCell(1).innerText = maSV;
        row.insertCell(2).innerText = hoTen;
        row.insertCell(3).innerText = email;
        row.insertCell(4).innerText = gtinh;
        row.insertCell(5).innerText = birth;
        row.insertCell(6).innerHTML = '<a href="#" class="sua">Sửa</a> | <a href="#" class="xoa">Xoá</a>';

        tb.innerText = "Thêm sinh viên thành công!";
    }

    tb.style.color = "green";
    setTimeout(() => tb.innerText = "", 3000);

    // Reset form
    document.getElementById("formSV").reset();
    document.getElementById("birth").value = ""; // Reset thêm input date
    selectedRow = null;
});

// XỬ LÝ SỬA & XÓA
document.querySelector("tbody").addEventListener("click", function (e) {
    if (e.target.classList.contains("xoa")) {
        if (confirm("Bạn có chắc chắn muốn xoá?")) {
            const row = e.target.parentElement.parentElement;
            row.remove();

            // Cập nhật lại STT
            [...document.querySelectorAll("tbody tr")].forEach((r, i) => {
                r.cells[0].innerText = i + 1;
            });

            document.getElementById("thongBao").innerText = "Xoá thành công!";
        }
    }

    if (e.target.classList.contains("sua")) {
        selectedRow = e.target.parentElement.parentElement;

        document.getElementById("maSV").value = selectedRow.cells[1].innerText;
        document.getElementById("name").value = selectedRow.cells[2].innerText;
        document.getElementById("email").value = selectedRow.cells[3].innerText;

        const gioiTinh = selectedRow.cells[4].innerText;
        document.getElementById("nam").checked = gioiTinh === "Nam";
        document.getElementById("nu").checked = gioiTinh === "Nữ";

        const birthText = selectedRow.cells[5].innerText;
        const [d, m, y] = birthText.split("-");
        document.getElementById("birth").value = `${y}-${m}-${d}`;
    }
});
