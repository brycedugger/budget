const updateUser = (userId, firstName, lastName, email) => {
  axios.put(`/api/user/${userId}`, { firstName, lastName, email }).then(res => {
    console.log("posted");
  }),
    err => {
      console.log(err);
    };
};

const parseFormData = () => {
  const userId = parseInt(
    window.location.href.split("/")[window.location.href.split("/").length - 1]
  );
  const firstName = $(".value-for-fname").val();
  const lastName = $(".value-for-lname").val();
  const email = $(".value-for-email").val();
  const pwd = $(".value-for-pwd").val();

  updateUser(userId, firstName, lastName, email);
};

const getUserInfo = userId => {
  axios.get(`/api/user/${userId}`).then(res => {
    renderFormField("First name:", "text", "fname", res.data.firstName);
    renderFormField("Last name:", "text", "lname", res.data.lastName);
    renderFormField("Email:", "text", "email", res.data.email);
    // renderFormField("Password:", "password", "pwd", res.data.pwd);
  }),
    err => {
      console.log(err);
    };
};

const renderFormField = (text, type, valueType, value) => {
  const formGroup = $("<div>", { class: "form-group" });
  const label = $("<label>", { class: "col-lg-3 control-label" }).text(text);
  const col = $("<div>", { class: "col-lg-8" });
  const input = $("<input>", { class: "form-control value-for-" + valueType, type: type }).val(
    value
  );

  $("#form").append(formGroup);
  formGroup.append(label, col);
  col.append(input);
};

$(document).ready(function() {
  const userId = parseInt(
    window.location.href.split("/")[window.location.href.split("/").length - 1]
  );
  getUserInfo(userId);

  $(document).on("click", "#save-button", parseFormData);
});
