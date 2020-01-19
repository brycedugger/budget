/**
 * function to update the user's information
 * @param {number} userId the user's id
 * @param {string} firstName the user's first name
 * @param {string} lastName the user's last name
 * @param {string} email the user's email
 */
const updateUser = (userId, username,
  //  password, 
   email, firstName, lastName) => {
  axios.put(`/api/user/${userId}`, { username, 
    // password, 
    email, firstName, lastName }).then(res => {
    location.reload();
  }),
    err => {
      console.log(err);
    };
};

/**
 * function to get the user's information
 * @param {number} userId the user's id
 */
const getUserInfo = userId => {
  axios.get(`/api/user/${userId}`).then(res => {
    renderFormField("Username:", "text", "uname", res.data.userName);
    // renderFormField("Password:", "text", "password", res.data.pwd);
    renderFormField("Email:", "text", "email", res.data.email);
    renderFormField("First name:", "text", "fname", res.data.firstName);
    renderFormField("Last name:", "text", "lname", res.data.lastName);
    renderSubmitButton();
  }),
    err => {
      console.log(err);
    };
};

/**
 * function to parse the form and update the uesr's information
 */
const parseFormData = () => {
  const userId = parseInt(
    window.location.href.split("/")[window.location.href.split("/").length - 1]
  );
  const username = $(".value-for-uname").val();
  // const password = $(".value-for-password").val();
  const email = $(".value-for-email").val();
  const firstName = $(".value-for-fname").val();
  const lastName = $(".value-for-lname").val();

  renderConfirmationModal('Click "Confirm" to Update', () => {
    updateUser(userId, username, 
      // password, 
      email, firstName, lastName);
  });
};

// function to render the submit button
const renderSubmitButton = () => {
  // create html elements
  const formGroup = $("<div>", { class: "form-group" });
  const col = $("<div>");
  const input = $("<input>", {
    type: "button",
    class: "btn btn-primary w-100",
    value: "Submit",
    id: "submit-button"
  });

  // append and render html elements
  $("#form").append(formGroup);
  formGroup.append(col);
  col.append(input);
};

const renderFormField = (text, type, valueType, value) => {
  // create html elements
  const formGroup = $("<div>", { class: "form-group" });
  const label = $("<label>").text(text);
  const col = $("<div>");
  const input = $("<input>", { class: "form-control value-for-" + valueType, type: type }).val(
    value
  );

  // append and render html elements
  $("#form").append(formGroup);
  formGroup.append(label, col);
  col.append(input);
};

$(document).ready(function() {
  const userId = parseInt(
    window.location.href.split("/")[window.location.href.split("/").length - 1]
  );

  // get the user's information from the url
  getUserInfo(userId);

  //  listen for form submission
  $(document).on("click", "#submit-button", parseFormData);
});
