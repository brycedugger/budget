/**
 * function to render the total expenses of all categories
 * @param {integer} totalExpensesValue the total expense
 */
function appendTotalExpenses(totalExpensesValue, totalExpenseGoal) {
  const newTr = $("<tr>");
  const tdTotalExpenses = $("<td>", { class: "total-expenses-text" }).text("Total Expenses");
  const tdTotalExpenseAmount = $("<td>", { class: "total-expenses-value" }).text(
    totalExpensesValue
  );
  const tdTotalExpenseGoal = $("<td>", { class: "total-expenses-goal" }).text(totalExpenseGoal);

  $("#table").append(newTr);
  newTr.append(tdTotalExpenses, tdTotalExpenseGoal, tdTotalExpenseAmount);
}

/**
 * function to render an expense row
 * @param {object} expenseData the expense object
 * @param {integer} categoryName the name of the category
 */
function renderExpenseRow(expenseData, categoryName) {
  const newTr = $("<tr>");
  const tdExpenseName = $("<td>", { class: "description-" + expenseData.id }).text(
    expenseData.description
  );
  const td = $("<td>").text("-");
  const tdExpenseAmount = $("<td>", { class: "amount-" + expenseData.id }).text(expenseData.amount);
  const editButton = $("<div>", {
    class: "btn btn-primary mx-1 mt-2 float-right text-white edit-button",
    editId: expenseData.id,
    categoryValue: categoryName
  }).text("Edit");
  const deleteButton = $("<div>", {
    class: "btn btn-primary mx-1 mt-2 float-right text-white delete-button",
    deleteId: expenseData.id
  }).text("Delete");

  // append to html
  $("#table").append(newTr);
  newTr.append(tdExpenseName, td, tdExpenseAmount, editButton, deleteButton);
}

/**
 * function to render category rows
 * @param {object} categoryData the category object
 * @param {integer} totalExpenseCat the total expense of the category
 */
function renderCategoryRow(categoryData, totalExpenseCat) {
  const newTBody = $("<tbody>", {
    categoryId: categoryData.id,
    categoryValue: categoryData.name
  });
  const newTr = $("<tr>", {
    class: "bg-primary text-white category-" + categoryData.id,
    categoryId: categoryData.id,
    categoryValue: categoryData.name
  });
  const tdCategoryName = $("<td>", {
    class: "bold",
    name: "expense-category-" + categoryData.name
  }).text(categoryData.name);
  const tdCategoryGoal = $("<td>", { goal: "expense-category-" + categoryData.goal }).text(
    categoryData.goal
  );
  const tdCategoryTotal = $("<td>", { goal: "expense-category-" + categoryData.goal }).text(
    totalExpenseCat
  );
  const categoryEditButton = $("<div>", {
    class: "btn btn-white mx-1 mt-2 float-right edit-category-button",
    editId: categoryData.id,
    categoryValue: categoryData.name,
    goalValue: categoryData.goal
  }).text("Edit");
  const categoryDeleteButton = $("<div>", {
    class: "btn btn-white mx-1 mt-2 float-right delete-category-button",
    deleteId: categoryData.id
  }).text("Delete");

  // append to html
  $("#table").append(newTBody, newTr);
  newTr.append(
    tdCategoryName,
    tdCategoryGoal,
    tdCategoryTotal,
    categoryEditButton,
    categoryDeleteButton
  );
}

$(document).ready(() => {
  getCategoriesAll();
});
