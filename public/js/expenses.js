$(document).ready(function() {
  getCategories();

  function appendTotalExpenses(totalExpensesValue) {
    const newTr = $("<tr>");
    const tdTotalExpenses = $("<td>", { class: "total-expenses-text" }).text("Total Expenses");
    const tdTotalExpenseAmount = $("<td>", { class: "total-expenses-value" }).text(
      totalExpensesValue
    );

    $("#table").append(newTr);
    newTr.append(tdTotalExpenses, tdTotalExpenseAmount);
  }

  function createExpenseRow(expenseData, categoryId, categoryName) {
    const newTr = $("<tr>");
    const tdExpenseName = $("<td>", { class: "description-" + expenseData.id }).text(
      expenseData.description
    );
    const tdExpenseAmount = $("<td>", { class: "amount-" + expenseData.id }).text(
      expenseData.amount
    );
    const editButton = $("<div>", {
      class: "btn btn-primary mx-1 mt-2 text-white edit-button",
      editId: expenseData.id,
      categoryValue: categoryName
    }).text("Edit");
    const deleteButton = $("<div>", {
      class: "btn btn-primary mx-1 mt-2 text-white delete-button",
      deleteId: expenseData.id,
      categoryValue: categoryName
    }).text("Delete");
    $("#table").append(newTr);
    newTr.append(tdExpenseName, tdExpenseAmount, editButton, deleteButton);
  }

  function createCategoryRow(categoryData, totalExpenseCat) {
    const newTBody = $("<tbody>", {
      categoryId: categoryData.id,
      categoryValue: categoryData.name
    });
    const newTr = $("<tr>", {
      class: "bg-primary text-white category-" + categoryData.id,
      categoryId: categoryData.id,
      categoryValue: categoryData.name
    });
    const tdCategoryName = $("<td>", { name: "expense-category-" + categoryData.name }).text(
      categoryData.name
    );
    const tdCategoryTotal = $("<td>", { class: "expense-category-" + categoryData.goal }).text(
      totalExpenseCat
    );
    const categoryEditButton = $("<div>", {
      class: "btn btn-white mx-1 mt-2 edit-category-button",
      editId: categoryData.id,
      categoryValue: categoryData.name
    }).text("Edit");
    const categoryDeleteButton = $("<div>", {
      class: "btn btn-white mx-1 mt-2 delete-category-button",
      deleteId: categoryData.id,
      categoryValue: categoryData.name
    }).text("Delete");

    $("#table").append(newTBody, newTr);
    newTr.append(tdCategoryName, tdCategoryTotal, categoryEditButton, categoryDeleteButton);
  }

  function getCategories() {
    $.get("/api/category/all/1", function(data) {
      let grandTotal = 0;
      data.forEach(function(row) {
        let total = 0;
        row.Expenses.forEach(function(expense) {
          total += parseFloat(expense.amount);
        });
        grandTotal += total;
        createCategoryRow(row, total.toFixed(2));
        row.Expenses.forEach(function(expense) {
          total += parseFloat(expense.amount);
          createExpenseRow(expense, row.id, row.name);
        });
      });

      appendTotalExpenses(grandTotal.toFixed(2));
    });
  }
});
