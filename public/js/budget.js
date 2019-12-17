function renderIncomeRow(userData) {
  const newTr = $("<tr>");
  const tdIncomeHeader = $("<th>").text("Income");
  const tdIncome = $("<td>").text("$" + userData.income);
  const editButton = $("<div>", {
    class: "btn btn-white text-white mx-1 mt-2 edit-income-button",
    userId: userData.id,
    userIncome: userData.income
  }).text("Edit");

  $("#income").append(newTr);
  newTr.append(tdIncomeHeader, tdIncome, editButton);
}

function renderCategoryRow(categoryData, totalExpenseCat) {
  var overUnder = categoryData.goal - totalExpenseCat;
  const newTr = $("<tr>");
  const tdCategoryName = $("<td>", { name: "category-name-" + categoryData.name }).text(
    categoryData.name
  );
  const tdCategoryGoal = $("<td>", { name: "category-goal-" + categoryData.name }).text(
    "$" + categoryData.goal
  );
  const tdCategoryTotal = $("<td>", { name: "category-total-" + categoryData.name }).text(
    "$" + totalExpenseCat
  );
  const tdOverUnder = $("<td>", { name: "category-over-under-" + categoryData.name }).text(
    "$" + parseFloat(overUnder).toFixed(2)
  );
  const editButton = $("<div>", {
    class: "btn btn-white mx-1 mt-2 edit-category-button",
    editId: categoryData.id,
    categoryId: categoryData.id,
    categoryValue: categoryData.name,
    goalValue: categoryData.goal
  }).text("Edit");

  $("#main").append(newTr);
  newTr.append(tdCategoryName, tdCategoryGoal, tdCategoryTotal, tdOverUnder, editButton);
}

function createRemainderRow(remainderData) {
  const newTr = $("<tr>");
  const tdIncomeLeft = $("<td>").text("Income Left");
  const blank0 = $("<td>").text("");
  const blank1 = $("<td>").text("");
  const blank2 = $("<td>").text("");
  const tdRemainder = $("<td>").text(
    "$" + (parseFloat(remainderData.income) - parseFloat(remainderData.remainder)).toFixed(2)
  );

  $("#main").append(newTr);
  newTr.append(tdIncomeLeft, blank0, tdRemainder, blank1, blank2);
}

//-----------------------------------------------

$(document).ready(function() {
  getBudgetCategories();
  getIncome();
  getRemainder();
});
