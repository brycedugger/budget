const renderNavLinks = (title, userId, parentElement) => {
  const li = $("<li>", { href: `/dashboard/${userId}` }).text(title);
  $(parentElement).append(li);
};
