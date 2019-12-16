/**
 * function to render a modal (used for both creating expenses and goals)
 * @param {string} title the title to go in the modal
 * @param {integer} num indicates if this modal is for an expense (1) or a goal (0)
 * @param {integer} id the id of the user
 */
const renderModal = (title, num, id) => {
  // create the elements
  const modalFade = $("<div>", { id: "modal" }).css("z-index", 50);
  const modalDiaglogue = $("<div>", { class: "modal-dialog" });
  const modalContent = $("<div>", { class: "modal-content" });
  const modalHeader = $("<div>", { class: "modal-header" });
  const modalBody = $("<div>", { class: "modal-body" });
  const modalTitle = $("<h5>", { class: "modal-title" }).text(title);
  const modalprefooter = $("<div>", { class: "modal-footer" });
  const button = $("<button>", {
    class: "btn btn-primary",
    id: "modal-button"
  }).text("Cancel");
  const submit = $("<button>", {
    class: "btn btn-primary",
    id: "modal-submit"
  }).text("Submit");

  // switch statement to determine what the modal form looks like
  switch (num) {
    case 0:
      modalBody.append(
        renderModalFormFields("Category Name", "modal-category", ""),
        renderModalFormFields("Goal", "modal-goal", "")
      );
      break;
    case 1:
      // render categories and append it to .modal-body if they're making an expense
      getCategories(id, ".modal-body");
      modalBody.append(
        renderModalFormFields("Description", "modal-description", ""),
        renderModalFormFields("Amount", "modal-amount", "")
      );
      break;
    default:
      break;
  }

  // append and render the elements
  $(".container").prepend(modalFade);
  modalFade.append(modalDiaglogue);
  modalDiaglogue.append(modalContent);
  modalContent.append(modalHeader, modalBody, modalprefooter);
  modalHeader.append(modalTitle);
  modalprefooter.append(button, submit);

  // listen when to close the modal
  listenForModalClick();

  // listen for form submission
  $("#modal-submit").click(() => {
    switch (num) {
      case 0:
        const name = $("#modal-category").val();
        const goal = $("#modal-goal").val();
        postCategory(id, name, goal);
        break;
      case 1:
        const description = $("#modal-description").val();
        const amount = $("#modal-amount").val();
        const category = $("#categories option:selected").attr("categoryId");
        postExpense(amount, description, category);
        break;
      default:
        break;
    }
  });
};

const createCategory = () => {
  renderModal("Create Category", 0, 1);
  // TODO CHANGE ID PARAMETER TO USER'S ID (THIRD PARAMETER) FOR RENDER MODAL
};

const createExpense = () => {
  renderModal("Create Expense", 1, 1);
  // TODO CHANGE ID PARAMETER TO USER'S ID (THIRD PARAMETER) FOR RENDER MODAL
};

/**
 * function to render list of categories
 * @param {string} text the name of each category
 * @param {object} elementId the dom element containing the category
 */
const renderDropdownCategories = (text, elementId) => {
  // create the element
  return $("<option>", {
    class: `text-dark bg-light`,
    categoryId: elementId,
    value: text
  }).text(text);
};

/**
 * function to render the drop down filter
 * @param {string} elementId the id of this element
 * @return {object} the category dropdown
 */
const renderDropdown = elementId => {
  // create the element
  return $("<select>", {
    class: "form-control w-100 mt-3 bg-primary text-white",
    id: elementId
  });
};

/**
 * function to render form input with prefilled text
 * @param {string} type the label for the input
 * @param {string} elementId the id of the input field
 * @param {string} text the text to be displayed in the input
 * @return {object} the form
 */
const renderModalFormFields = (type, elementId, text) => {
  // create the elements
  const form = $("<form>");
  const formGroup = $("<div>", { class: "form-group" });
  const label = $("<label>", { for: type }).text(type);
  const input = $("<input>", { type: "text", class: "form-control", id: elementId }).val(text);
  form.append(formGroup);
  formGroup.append(label, input);

  return form;
};

/**
 * function to render the modal (used to edit expensees or categories)
 * @param {string} title the title to go in the modal
 * @param {integer} num indicates if this modal is for an expense (1) or a goal (0)
 * @param {string} userId the id of the the user
 * @param {object} obj the object containing required fields for expense/category
 */
const renderUpdateExpenseModal = (title, num, userId, obj) => {
  console.log("obj :", obj);
  // create the elements
  const modalFade = $("<div>", { id: "modal" }).css("z-index", 50);
  const modalDiaglogue = $("<div>", { class: "modal-dialog" });
  const modalContent = $("<div>", { class: "modal-content" });
  const modalHeader = $("<div>", { class: "modal-header" });
  const modalBody = $("<div>", { class: "modal-body" });
  const modalTitle = $("<h5>", { class: "modal-title text-primary" }).text(title);
  const modalprefooter = $("<div>", { class: "modal-footer" });
  const button = $("<button>", {
    class: "btn btn-primary",
    id: "modal-button"
  }).text("Cancel");
  const submit = $("<button>", {
    class: "btn btn-primary",
    id: "modal-submit"
  }).text("Submit");

  switch (num) {
    case 0:
      // render categories and append it to .modal-body
      getCategories(userId, ".modal-body", obj.categoryValue);
      modalBody.append(
        renderModalFormFields("Description", "modal-description", obj.description),
        renderModalFormFields("Amount", "modal-amount", obj.amount)
      ); // render form fields with prefilled text
      break;
    case 1:
      modalBody.append(
        renderModalFormFields("Category Name", "modal-name", obj.categoryValue),
        renderModalFormFields("Goal", "modal-goal", obj.goalValue)
      ); // render form fields with prefilled text
      break;
    default:
      break;
  }

  // append and render the elements
  $("#main").prepend(modalFade);
  modalFade.append(modalDiaglogue);
  modalDiaglogue.append(modalContent);
  modalContent.append(modalHeader, modalBody, modalprefooter);
  modalHeader.append(modalTitle);

  modalprefooter.append(button, submit);

  // listen when to close the modal
  listenForModalClick();

  switch (num) {
    case 0:
      // listen for form submission
      $("#modal-submit").click(() => {
        // grab the form fields from the modal
        const description = $("#modal-description").val();
        const amount = parseFloat($("#modal-amount").val());
        const category = $("#categories option:selected").attr("categoryId");

        updateExpense(obj.editId, description, amount, category);
      });
    case 1:
      // listen for form submission
      $("#modal-submit").click(() => {
        // grab the form fields from the modal
        const name = $("#modal-name").val();
        const goal = $("#modal-goal").val();

        updateCategory(obj.editId, name, goal);
      });
  }
};

// function to close the modal
const listenForModalClick = () => {
  // Get the modal
  const modal = document.getElementById("modal");

  // when the user clicks the close button in the modal, close modal
  $("#modal-button").click(() => {
    $("#modal").remove();
  });

  // when the user clicks anywhere outside of the modal, close modal
  window.onclick = e => {
    if (e.target == modal) {
      $("#modal").remove();
    }
  };
};

// function to listen for clicks on the edit button
function editExpenseClicked() {
  // grab data from the expense
  const editId = parseInt($(this).attr("editId")); // get the edit button id
  const description = $(`.description-${editId}`).text(); // get the description
  const amount = $(`.amount-${editId}`).text(); // get the amount
  const userId = parseInt($(this).attr("......")); // TODO: dynamically get the correct ID
  const categoryValue = $(this).attr("categoryValue"); // get the category text

  // render the modal using the data
  renderUpdateExpenseModal("Edit Expense", 0, 1, { description, amount, categoryValue, editId }); // TODO: set third parameter to userId
}

// function to listen for clicks on the delete button
function deleteExpenseClicked() {
  const deleteId = parseInt($(this).attr("deleteId"));
  deleteExpense(deleteId);
}

// function to listen for clicks on the edit button
function editCategoryClicked() {
  const editId = parseInt($(this).attr("editId")); // get the edit button id
  const categoryValue = $(this).attr("categoryValue"); // get the category text
  const goalValue = $(this).attr("goalValue"); // get the goal value
  renderUpdateExpenseModal("Edit Expense", 1, 1, { categoryValue, goalValue, editId });
}

// function to listen for clicks on the delete button
function deleteCategoryClicked() {
  const deleteId = parseInt($(this).attr("deleteId"));
  deleteCategory(deleteId);
}

$(document).ready(() => {
  $(document).on("click", ".edit-category-button", editCategoryClicked);
  $(document).on("click", ".delete-category-button", deleteCategoryClicked);
  $(document).on("click", ".edit-button", editExpenseClicked);
  $(document).on("click", ".delete-button", deleteExpenseClicked);
  $(document).on("click", ".create-category", createCategory);
  $(document).on("click", ".create-expense", createExpense);
});
