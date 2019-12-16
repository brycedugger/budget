$(document).ready(function() {

getCategories();

function createExpenseRow(expenseData, categoryId) {
    const newTr = $('<tr>')
    const tdExpenseName = $('<td>', {class: 'description-' + expenseData.id}).text(expenseData.description)
    const tdExpenseAmount = $('<td>', {class: 'amount-' + expenseData.id}).text(expenseData.amount)
    const editButton = $("<a>", {class: "waves-effect waves-light btn edit-button", editId: expenseData.id, expenseId: expenseData.Id,
    expenseValue: expenseData.name }).text("Edit");
    const deleteButton = $("<a>", {class: "waves-effect waves-light btn delete-button", deleteId: expenseData.id, expenseId: expenseData.Id,
    expenseValue: expenseData.name}).text("Delete");
    $('#table').append(newTr);
    newTr.append(tdExpenseName, tdExpenseAmount, editButton, deleteButton);
}

function createCategoryRow(categoryData) {
    const newTBody = $("<tbody>", {categoryId: categoryData.id, categoryValue: categoryData.name});
    const newTr = $("<tr>", {class: 'category-' + categoryData.id, categoryId: categoryData.id, categoryValue: categoryData.name});
    const tdCategoryName = $('<td>', {name: "expense-category-" + categoryData.name}).text(categoryData.name);
    const tdCategoryTotal = $('<td>',{class: "expense-category-" + categoryData.goal}).text(categoryData.goal);
    const editButton = $("<a>", {class: "waves-effect waves-light btn edit-button", editId:categoryData.id, categoryId:categoryData.Id,
    categoryValue:categoryData.name }).text("Edit");
    const deleteButton = $("<a>", {class: "waves-effect waves-light btn delete-button", deleteId: categoryData.id, categoryId:categoryData.Id,
    categoryValue:categoryData.name}).text("Delete");

    $('#table').append(newTBody, newTr);
    newTr.append(tdCategoryName, tdCategoryTotal, editButton, deleteButton);
  }

  function getCategories() {
    $.get("/api/category/all/1", function(data) {
        data.forEach(function(row) {   
            createCategoryRow(row);
            row.Expenses.forEach(function(expense) {
                    createExpenseRow(expense, row.id);
            })
        })
    });
  }
});

