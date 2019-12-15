/**
 * function to render list of categories
 * @param {string} optionText the name of each category
 * @param {object} the dom element containing the category
 */
const renderDropDownButton = (optionText, id) => {
  // create the element
  return $("<option>", {
    class: "text-dark bg-light",
    value: optionText,
    id: `category-${id}`
  }).text(optionText);
};

/**
 * function to render the drop down filter
 * @param {string} id the id of this element
 * @return {object} the dom element containing the category dropdown
 */
const renderDropDown = id => {
  // create the element
  return $("<select>", {
    class: "form-control w-100 mt-3 bg-primary text-light",
    id: id
  });
};

/**
 * function to get all categories and append a dropdown the the parent element
 * @param {integer} id the id of this element
 * @param {string} parentElement the element to append this to
 */
const getCategories = (id, parentElement) => {
  // send get request to retrieve all categories
  axios.get(`/api/category/${id}`).then(res => {
    // render dropdown button
    const dropdown = renderDropDown("categories");

    // for each category, create a dropdown option
    res.data.forEach(row => {
      dropdown.append(renderDropDownButton(row.name, row.id));
    });

    // append it to the modal
    $(parentElement).append(dropdown);
  }),
    err => {
      console.log(err);
    };
};

/**
 * function to update the expense sending a put request
 * @param {integer} id the id of the expense
 * @param {string} description the description of the expense
 * @param {integer} amount the amount of the expense
 */
const updateExpense = (id, description, amount) => {
  console.log("id :", id);
  console.log("description :", description);
  console.log("amount :", amount);

  // make put request
  axios.put(`/api/expense/${id}`, { description, amount }).then(res => {
    console.log("Profile successsfully created.");
    // reload page?
  }),
    err => {
      console.log(err);
    };
};

/**
 * function to render form input with prefilled text
 * @param {string} type the label for the input
 * @param {string} id the id of the input field
 * @param {string} text the text to be displayed in the input
 * @return {object} returns the form element
 */
const renderModalFormFields = (type, id, text) => {
  // create the elements
  const form = $("<form>");
  const formGroup = $("<div>", { class: "form-group" });
  const label = $("<label>", { for: type }).text(type);
  const input = $("<input>", { type: "text", class: "form-control", id: id }).val(text);
  form.append(formGroup);
  formGroup.append(label, input);

  return form;
};

/**
 * function to render the modal used to edit expensees
 * @param {string} id the id of the element
 * @param {string} desc the description of the expense
 * @param {integer} amt the amount of the expense
 */
const renderModal = (id, desc, amt) => {
  // create the elements
  const modalFade = $("<div>", { id: "modal" }).css("z-index", 5);
  const modalDiaglogue = $("<div>", { class: "modal-dialog" });
  const modalContent = $("<div>", { class: "modal-content" });
  const modalHeader = $("<div>", { class: "modal-header" });
  const modalBody = $("<div>", { class: "modal-body" });
  const modalTitle = $("<h5>", { class: "modal-title" }).text("Edit Expense and Click Submit");
  const modalprefooter = $("<div>", { class: "modal-footer" });
  const button = $("<button>", {
    class: "btn btn-primary",
    id: "modal-button"
  }).text("Cancel");
  const submit = $("<button>", {
    class: "btn btn-primary",
    id: "modal-submit"
  }).text("Submit");

  //   render categories and append it to .modal-body
  getCategories(1, ".modal-body");

  // append and render the elements
  $(".container").prepend(modalFade);
  modalFade.append(modalDiaglogue);
  modalDiaglogue.append(modalContent);
  modalContent.append(modalHeader, modalBody, modalprefooter);
  modalHeader.append(modalTitle);
  modalBody.append(
    renderModalFormFields("Description", "modal-description", desc),
    renderModalFormFields("Amount", "modal-amount", amt)
  );
  modalprefooter.append(button, submit);

  // listen when to close the modal
  listenForModal();

  // listen for form submission
  $("#modal-submit").click(() => {
    updateExpense(id, `[${desc}]`, amt); // TODO: add category selection and fix passing in descriptions with spaces
  });
};

// function to handle clicks on the modal to show/hide it
const listenForModal = () => {
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
function editClicked() {
  // grab data from the expense
  const editId = parseInt($(this).attr("editId"));
  const description = $(`.description-${editId}`).text();
  const amount = $(`.amount-${editId}`).text();

  // render the modal using the data
  renderModal(editId, description, amount);
}

// function to listen for clicks on the delete button
function deleteClicked() {
  const deleteId = parseInt($(this).attr("deleteId"));
  console.log("deleteId :", deleteId);
}

window.onload = () => {
  // get category/all?

  $(document).on("click", ".edit-button", editClicked);
  $(document).on("click", ".delete-button", deleteClicked);
};
