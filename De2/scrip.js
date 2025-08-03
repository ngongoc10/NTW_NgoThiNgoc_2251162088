$(document).ready(function () {
  const $tableBody = $('#transaction-table-body');
  const $form = $('#addTransactionForm');
  const $modal = new bootstrap.Modal($('#addTransactionModal')[0]);

  // Xoá lỗi
  function clearErrors() {
    $('#customerNameError, #employeeNameError, #amountError').text('');
  }

  // Tạo dòng HTML
  function createRowHTML(tx) {
    return `
      <tr data-id="${tx.id}">
        <td><input type="checkbox" class="form-check-input"></td>
        <td>
          <button class="btn btn-sm btn-info"><i class="fa fa-eye"></i></button>
          <button class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i></button>
          <button class="btn btn-sm btn-danger btn-delete"><i class="fa fa-trash"></i></button>
        </td>
        <td>${tx.id}</td>
        <td>${tx.customer}</td>
        <td>${tx.employee}</td>
        <td>${tx.amount}</td>
        <td>${tx.date}</td>
      </tr>
    `;
  }

  // Hiển thị bảng
  function renderTable() {
    $tableBody.html('');
    $.each(transactions, function (_, tx) {
      $tableBody.append(createRowHTML(tx));
    });
  }

  // Validate form
  function validateForm() {
    clearErrors();
    const customer = $('#customerName').val().trim();
    const employee = $('#employeeName').val().trim();
    const amount = $('#amount').val().trim();
    let isValid = true;

    if (customer === '') {
      $('#customerNameError').text('Tên khách hàng không được để trống.');
      isValid = false;
    } else if (customer.length > 30) {
      $('#customerNameError').text('Tên khách hàng không được quá 30 ký tự.');
      isValid = false;
    }

    if (employee === '') {
      $('#employeeNameError').text('Tên nhân viên không được để trống.');
      isValid = false;
    } else if (employee.length > 30) {
      $('#employeeNameError').text('Tên nhân viên không được quá 30 ký tự.');
      isValid = false;
    }

    if (amount === '') {
      $('#amountError').text('Số tiền không được để trống.');
      isValid = false;
    }

    return isValid;
  }

  // Thêm giao dịch
  $('#submitBtn').on('click', function () {
    if (!validateForm()) return;

    const newTransaction = {
      id: transactions.length ? Math.max(...transactions.map(t => t.id)) + 1 : 1,
      customer: $('#customerName').val().trim(),
      employee: $('#employeeName').val().trim(),
      amount: $('#amount').val().trim(),
      date: new Date().toLocaleString('vi-VN')
    };

    transactions.unshift(newTransaction);
    renderTable();
    $form[0].reset();
    $modal.hide();
  });

  // Reset form khi đóng modal
  $('#addTransactionModal').on('hidden.bs.modal', function () {
    clearErrors();
    $form[0].reset();
  });

  // Xoá một giao dịch
  $tableBody.on('click', '.btn-delete', function () {
    const $row = $(this).closest('tr');
    const id = parseInt($row.data('id'));

    if (confirm('Bạn có chắc chắn muốn xoá giao dịch này?')) {
      const index = transactions.findIndex(tx => tx.id === id);
      if (index !== -1) {
        transactions.splice(index, 1);
        renderTable();
      }
    }
  });

  // Xoá nhiều giao dịch đã chọn
  $('.btn-danger').first().on('click', function () {
    const $checked = $tableBody.find('input[type="checkbox"]:checked');

    if ($checked.length === 0) {
      alert('Vui lòng chọn ít nhất một dòng để xoá.');
      return;
    }

    if (!confirm('Bạn có chắc chắn muốn xoá các giao dịch đã chọn?')) return;

    $checked.each(function () {
      const $row = $(this).closest('tr');
      const id = parseInt($row.data('id'));
      const index = transactions.findIndex(tx => tx.id === id);
      if (index !== -1) transactions.splice(index, 1);
    });

    renderTable();
  });

  renderTable();
});