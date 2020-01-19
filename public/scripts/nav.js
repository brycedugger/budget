/**
 * function to render nav links
 * @param {string} title the text to show on the link
 * @param {string} page the html page name
 * @param {number} userId the user's id
 * @param {string} parentElement the class or id name to append this to
 */
const renderNavLinks = (title, page, userId, parentElement) => {
  const li = $("<li>", { class: "nav-item" });
  const a = $("<a>", {class: "nav-link", href: `/${page}/${userId}` }).text(title);
  $(parentElement).append(li);
  li.append(a);
};
const renderLogout = (title, parentElement) => {
  const li = $("<li>", { class: "nav-item" });
  const a = $("<a>", {class: "nav-link", href: "/logout"}).text(title);
  $(parentElement).append(li);
  li.append(a);
};

$(document).ready(() => {
  const userId = window.location.href.split("/")[window.location.href.split("/").length - 1];

  // renderNavLinks("Home", "dashboard", userId, ".nav");
  renderNavLinks("Expenses", "expenses", userId, ".nav");
  renderNavLinks("Budget", "budget", userId, ".nav");
  renderNavLinks("Profile", "profile", userId, ".nav");
  renderLogout("Logout", ".nav");
});