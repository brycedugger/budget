const login = () => {
  $("#login-button").click();
};

$(document).ready(() => {
  // listen for demo button click
  $('#demo-button').click(e => {
    e.preventDefault();
    $("#username").val("bdugger");
    $("#password").val("test");
    login();
  });
});