$(document).ready(function() {

    getCategories();
    getIncome();
    getRemainder();

function createIncomeRow(userData) {
    const newTr = $("<tr>", {class: 'user-' + userData.id, userId: userData.id, userValue: userData.name});
    const tdIncomeHeader = $('<th>', {name: "user-income-header-" + userData.name}).text("Income");
    const tdIncome = $('<td>', {name: "user-income-" + userData.name}).text(userData.income);
    const editButton = $("<a>", {class: "btn btn-primary edit-button", editId: userData.id, userId: userData.id,
    userValue: userData.name }).text("Edit");
    console.log(userData)

    $('#income').append(newTr);
    newTr.append(tdIncomeHeader, tdIncome, editButton);
};

//-----------------------------------------------

function createCategoryRow(categoryData, totalExpenseCat) {
    var overUnder = categoryData.goal - totalExpenseCat
    const newTr = $("<tr>", {class: 'category-' + categoryData.id, categoryId: categoryData.id, categoryValue: categoryData.name});
    const tdCategoryName = $('<td>', {name: "category-name-" + categoryData.name}).text(categoryData.name);
    const tdCategoryGoal = $('<td>', {name: "category-goal-" + categoryData.name}).text(categoryData.goal);
    const tdCategoryTotal = $('<td>',{name: "category-total-" + categoryData.name}).text(totalExpenseCat);
    const tdOverUnder = $('<td>',{name: "category-over-under-" + categoryData.name}).text(parseFloat(overUnder).toFixed(2));
const editButton = $("<a>", {class: "btn btn-primary edit-button", editId: categoryData.id, categoryId: categoryData.id,
    categoryValue: categoryData.name }).text("Edit");
    $('#main').append(newTr);
    newTr.append(tdCategoryName, tdCategoryGoal, tdCategoryTotal, tdOverUnder, editButton);
};

//--------------------------------------------------

{/* <table class="highlight" class="budget">
<thead>
    <tr>
        <th class="header">Income Left</th>
        <td class="income">4000</td>
    </tr>
</thead>
</table> */}



function getCategories() {

    $.get("/api/category/all/1", function (data) {
        data.forEach(function (row) {
            let total = 0;
            row.Expenses.forEach(function (expense) {
                total += parseFloat(expense.amount);
            })
            createCategoryRow(row, total.toFixed(2));
            row.Expenses.forEach(function (expense) {
                total += parseFloat(expense.amount);
            })
        })
    });
}

    function getIncome() {
        $.get("/api/user/1", function (data) {
            data.forEach(function (user) {
                createIncomeRow(user);
            })
        });
    }

    function getRemainder() {

    }
});