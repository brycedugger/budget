/**
 * function to render the total expenses of all categories
 * @param {integer} totalExpensesValue the total expense
 */
function appendTotalExpenses(totalExpensesValue, totalExpenseGoal) {
  const tr = $("<tr>");
  const tdTotalExpenses = $("<td>").text("Total of Goals & Expenses:");
  const tdTotalExpenseAmount = $("<td>").text(totalExpensesValue);
  const tdTotalExpenseGoal = $("<td>").text(totalExpenseGoal);

  $("#table").append(tr);
  tr.append(tdTotalExpenses, tdTotalExpenseGoal, tdTotalExpenseAmount);
}

/**
 * function to render an expense row
 * @param {object} expenseData the expense object
 * @param {integer} categoryName the name of the category
 */
function renderExpenseRow(expenseData, categoryName) {
  const tr = $("<tr>");
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
  }).text("Del.");

  // append to html
  $("#table").append(tr);
  tr.append(tdExpenseName, td, tdExpenseAmount, deleteButton, editButton);
}

/**
 * function to render category rows
 * @param {object} categoryData an object that contains the category data from the response
 * @param {integer} totalExpenseCat the total expense of the category
 */
function renderCategoryRow(categoryData, totalExpenseCat) {
  const tBody = $("<tbody>");
  const tr = $("<tr>", { class: "bg-primary text-white" });
  const tdCategoryName = $("<td>", { class: "bold" }).text(categoryData.name);
  const tdCategoryGoal = $("<td>").text(categoryData.goal);
  const tdCategoryTotal = $("<td>").text(totalExpenseCat);
  const categoryEditButton = $("<div>", {
    class: "btn btn-white mx-1 mt-2 float-right edit-category-button",
    editId: categoryData.id,
    categoryValue: categoryData.name,
    goalValue: categoryData.goal
  }).text("Edit");
  const categoryDeleteButton = $("<div>", {
    class: "btn btn-white mx-1 mt-2 float-right delete-category-button",
    deleteId: categoryData.id
  }).text("Del.");

  // append to html
  $("#table").append(tBody, tr);
  tr.append(
    tdCategoryName,
    tdCategoryGoal,
    tdCategoryTotal,
    categoryDeleteButton,
    categoryEditButton
  );
}

$(document).ready(() => {
  const userId = parseInt(
    window.location.href.split("/")[window.location.href.split("/").length - 1]
  );
  getCategoriesAll(userId);
});
