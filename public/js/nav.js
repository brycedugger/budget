const renderNavLinks = (title, page, userId, parentElement) => {
  const li = $("<li>", { class: "tab" });
  const a = $("<a>", { href: `/${page}/${userId}` }).text(title);
  $(parentElement).append(li);
  li.append(a);
};

$(document).ready(() => {
  const userId = window.location.href.split("/")[window.location.href.split("/").length - 1];
  console.log("userId :", userId);
  renderNavLinks("Home", "dashboard", userId, ".tabs");
  renderNavLinks("Expenses", "expenses", userId, ".tabs");
  renderNavLinks("Budget", "budget", userId, ".tabs");
});
