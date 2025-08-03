$(document).ready(function () {
  let data = employees; // từ data.js

  function renderTable() {
    const tbody = $("tbody");
    tbody.empty();

    $.each(data, function (index, nv) {
      const row = `
        <tr>
          <td><input type="checkbox" /></td>
          <td>
            <button class="btn btn-sm btn-info view-btn" data-id="${nv.id}"><i class="bi bi-eye"></i></button>
            <button class="btn btn-sm btn-danger delete-btn" data-id="${nv.id}"><i class="bi bi-trash"></i></button>
            <button class="btn btn-sm bg-danger-subtle text-danger delete-btn" data-id="${nv.id}"><i class="bi bi-x-circle-fill"></i></button>
          </td>
          <td>${index + 1}</td>
          <td>${nv.ten}</td>
          <td>${nv.ho}</td>
          <td>${nv.diachi}</td>
          <td><div class="action-box text-success"><i class="bi bi-check-lg"></i></div></td>
        </tr>
      `;
      tbody.append(row);
    });

    $("#transactionCount").text(data.length);
  }

  // Gọi khi load
  renderTable();

  // Thêm mới
  $("#formAddTransaction").submit(function (e) {
    e.preventDefault();

    const ten = $("#inputTen").val().trim();
    const ho = $("#inputHo").val().trim();
    const dc = $("#inputDC").val().trim();

    if (!ten || !ho || !dc) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const newNv = {
      id: Date.now(),
      ten,
      ho,
      diachi: dc
    };

    data.push(newNv);
    renderTable();

    $("#addTransactionModal").modal("hide");
    this.reset();
  });

  // Xem chi tiết
  $(document).on("click", ".view-btn", function () {
    const id = $(this).data("id");
    const nv = data.find(n => n.id == id);

    if (nv) {
      $("#viewTen").text(nv.ten);
      $("#viewHo").text(nv.ho);
      $("#viewDC").text(nv.diachi);
      $("#viewTransactionModal").modal("show");
    }
  });

  // Xóa
  $(document).on("click", ".delete-btn", function () {
    const id = $(this).data("id");
    if (confirm("Bạn có chắc chắn muốn xóa?")) {
      data = data.filter(n => n.id != id);
      renderTable();
    }
  });
});
