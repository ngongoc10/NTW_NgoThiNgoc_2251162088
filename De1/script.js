function createRow(emp) {
  return `
    <tr>
      <td><input type="checkbox" /></td>
      <td>${emp.name}</td>
      <td>${emp.email}</td>
      <td>${emp.address}</td>
      <td>${emp.phone}</td>
      <td>
        <button class="btn btn-sm btn-primary me-1"><i class="bi bi-pencil-square"></i></button>
        <button class="btn btn-sm btn-danger"><i class="bi bi-trash"></i></button>
      </td>
    </tr>
  `;
}

  // Hiển thị bảng
  function renderTable() {
    const $tbody = $("#employeeTable tbody");
    $tbody.empty(); // Xóa nội dung cũ
    $.each(employees, function (index, emp) {
      $tbody.append(createRow(emp));
    });
  }

// Xử lý khi submit form
$(document).ready(function () {
  renderTable();

  $("#addEmployeeForm").on("submit", function (e) {
    e.preventDefault();

    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const address = $("#address").val().trim();
    const phone = $("#phone").val().trim();

    if (!name || !email || !address || !phone) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const newEmployee = { name, email, address, phone };
    employees.push(newEmployee);
    renderTable();

    // Reset form và đóng modal
    this.reset();
    const modal = bootstrap.Modal.getInstance($("#addEmployeeModal")[0]);
    modal.hide();

    // Hiển thị alert
    $("#alertBox").removeClass("d-none");
    setTimeout(() => {
      $("#alertBox").addClass("d-none");
    }, 2000);
  });

  // Xoá một nhân viên khi bấm nút xoá (dùng event delegation vì nút được render sau)
  $("#employeeTable").on("click", ".btn-danger", function () {
    const row = $(this).closest("tr");
    const name = row.find("td:eq(1)").text().trim();

    // Tìm vị trí trong mảng và xoá
    const index = employees.findIndex(emp => emp.name === name);
    if (index !== -1) {
      employees.splice(index, 1); // xoá khỏi mảng
      renderTable(); // cập nhật lại bảng
    }
  });

  // Xoá các dòng được chọn (checkbox)
  $(".btn-danger").first().on("click", function () {
    // Duyệt tất cả checkbox đã check trong bảng
    $("#employeeTable tbody input[type='checkbox']:checked").each(function () {
      const row = $(this).closest("tr");
      const name = row.find("td:eq(1)").text().trim();
      const index = employees.findIndex(emp => emp.name === name);
      if (index !== -1) {
        employees.splice(index, 1);
      }
    });

    renderTable();
  });
});