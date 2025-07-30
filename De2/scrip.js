// scrip.js - xử lý logic quản lý giao dịch
document.addEventListener('DOMContentLoaded', function () {
  const tableBody = document.getElementById('transaction-table-body');
  const form = document.getElementById('addTransactionForm');
  const modal = new bootstrap.Modal(document.getElementById('addTransactionModal'));
  const submitBtn = document.getElementById('submitBtn');
  const deleteSelectedBtn = document.querySelector('.btn-danger');

  // Xóa các lỗi đang hiển thị
  function clearErrors() {
    ['customerName', 'employeeName', 'amount'].forEach(id => {
      document.getElementById(id + 'Error').textContent = '';
    });
  }

  // Tạo 1 hàng giao dịch HTML từ object
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
      </tr>`;
  }

  // Hiển thị toàn bộ giao dịch trong bảng
  function renderTable() {
    tableBody.innerHTML = transactions.map(tx => createRowHTML(tx)).join('');
    attachDeleteEvents();
  }

  // Gắn sự kiện xóa cho từng nút 🗑️
  function attachDeleteEvents() {
    const deleteButtons = tableBody.querySelectorAll('.btn-delete');
    deleteButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const row = btn.closest('tr');
        const id = parseInt(row.dataset.id);
        if (confirm('Bạn có chắc chắn muốn xoá giao dịch này?')) {
          const index = transactions.findIndex(tx => tx.id === id);
          if (index !== -1) {
            transactions.splice(index, 1);
            renderTable();
          }
        }
      });
    });
  }

  // Xoá các dòng được chọn bằng checkbox
  deleteSelectedBtn.addEventListener('click', function () {
    const checkedRows = tableBody.querySelectorAll('input[type="checkbox"]:checked');
    if (checkedRows.length === 0) {
      alert('Vui lòng chọn ít nhất một dòng để xoá.');
      return;
    }

    if (!confirm('Bạn có chắc chắn muốn xoá các giao dịch đã chọn?')) return;
    checkedRows.forEach(checkbox => {
      const row = checkbox.closest('tr');
      const id = parseInt(row.dataset.id);
      const index = transactions.findIndex(tx => tx.id === id);
      if (index !== -1) transactions.splice(index, 1);
    });

    renderTable();
  });

  // Kiểm tra dữ liệu trong form trước khi thêm
  function validateForm() {
    clearErrors();

    const customer = document.getElementById('customerName');
    const employee = document.getElementById('employeeName');
    const amount = document.getElementById('amount');
    let isValid = true;
    if (customer.value.trim() === '') {
      document.getElementById('customerNameError').textContent = 'Tên khách hàng không được để trống.';
      isValid = false;
    } else if (customer.value.length > 30) {
      document.getElementById('customerNameError').textContent = 'Tên khách hàng không được quá 30 ký tự.';
      isValid = false;
    }

    if (employee.value.trim() === '') {
      document.getElementById('employeeNameError').textContent = 'Tên nhân viên không được để trống.';
      isValid = false;
    } else if (employee.value.length > 30) {
      document.getElementById('employeeNameError').textContent = 'Tên nhân viên không được quá 30 ký tự.';
      isValid = false;
    }

    if (amount.value.trim() === '') {
      document.getElementById('amountError').textContent = 'Số tiền không được để trống.';
      isValid = false;
    }
    return isValid;
  }

  // Sự kiện khi bấm nút "Thêm"
  submitBtn.addEventListener('click', function () {
    if (!validateForm()) return;
    const customer = document.getElementById('customerName').value.trim();
    const employee = document.getElementById('employeeName').value.trim();
    const amount = document.getElementById('amount').value.trim();
    const newId = transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1;
    const newTransaction = {
      id: newId,
      customer,
      employee,
      amount,
      date: new Date().toLocaleString('vi-VN')
    };

    transactions.unshift(newTransaction);
    renderTable();
    form.reset();
    modal.hide();
  });

  // Reset khi đóng modal
  document.getElementById('addTransactionModal').addEventListener('hidden.bs.modal', function () {
    clearErrors();
    form.reset();
  });

  // Khởi tạo bảng ngay khi tải trang
  renderTable();
});
