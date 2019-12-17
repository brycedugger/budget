$(document).ready(function() {
    var userId = 1;

$.get("/api/user/:id" + userId, function (data) {
    console.log(data);
    if (data) {
        $("#stats").show();
        $("#firstName").text(data.firstName);
        $("#lastName").text(data.lastName);
        $("#userEmail").text(data.email);
        $("#username").text(data.username);
        $("#userPassword").text(data.pwd);
    }
});
});


getUserInfo();
    
    
function createUserInfoRow(userData) {
    const newTBody = $("<tbody>", {userId: userData.id, categoryValue: userData.name});
    const newTr = $("<tr>", {class: 'category-' + userData.id, userId: userData.id, categoryValue: userData.name});
    const tdCategoryName = $('<td>', {name: "expense-category-" + userData.name}).text(userData.name);

    const editButton = $("<a>", {class: "waves-effect waves-light btn edit-button", editId:userData.id, userId:userData.Id,
    categoryValue:userData.name }).text("Edit");

    const deleteButton = $("<a>", {class: "waves-effect waves-light btn delete-button", deleteId: userData.id, userId:userData.Id,
    categoryValue:userData.name}).text("Delete");

    $('#table').append(newTBody, newTr);
    newTr.append(tdCategoryName, tdCategoryTotal, editButton, deleteButton);
  }

  function getUserInfo() {
    $.get("/api/user/:id" , function(data) {
        data.forEach(function(row) {   
            createUserInfoRow(row);
            row.User.forEach(function(expense) {
                    createExpenseRow(expense, row.id);
            })
        })
    });
  }

    