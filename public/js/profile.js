function getUserInfo(userId) {
  axios.get(`/api/user/${userId}`).then(res => {
    console.log("user info:", res.data);
    renderFormField("First name:", "text", "fname", res.data.firstName);
    renderFormField("Last name:", "text", "lname", res.data.lastName);
    renderFormField("Email:", "text", "email", res.data.email);
    renderFormField("Password:", "text", "pwd", res.data.pwd);
  }),
    err => {
      console.log(err);
    };
}

const renderFormField = (text, type, valueType, id) => {
  const formGroup = $("<div>", { class: "form-group" });
  const label = $("<label>", { class: "col-lg-3 control-label" }).text(text);
  const col = $("<div>", { class: "col-lg-8" });
  const input = $("<input>", { class: "form-control value-for-" + valueType, type: type, id });

  $("#form").append(formGroup);
  formGroup.append(label, col);
  col.append(input);
};

$(document).ready(function() {
  const userId = parseInt(
    window.location.href.split("/")[window.location.href.split("/").length - 1]
  );
  getUserInfo(userId);

  renderFormField("First name:", "text", "fname", "John");
});
