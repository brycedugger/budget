const updateUserIncome = (id, income) => {
  // make put request to update a single category
  axios.put(`/api/user/income/${id}`, { income: parseInt(income) }).then(res => {
    location.reload();
  }),
    err => {
      console.log(err);
    };
};

/**
 * function update a category
 * @param {integer} id the id of the category
 * @param {string} name the description of the category
 * @param {integer} goal the amount of the category
 */
const updateCategory = (id, name, goal) => {
  // make put request to update a single category
  axios.put(`/api/category/`, { id, name, goal }).then(res => {
    location.reload();
  }),
    err => {
      console.log(err);
    };
};

/**
 * function to delete a single category
 * @param {integer} categoryId the id of the expense to be deleted
 */
const deleteCategory = categoryId => {
  // send delete request to delete a single expense
  axios.delete(`/api/category/${categoryId}`).then(res => {
    location.reload();
  }),
    err => {
      console.log(err);
    };
};

/**
 * function to create a new category
 * @param {integer} userId the id of the user
 * @param {string} name the name of the category
 * @param {string} goal the goal of the category
 */
const postCategory = (userId, name, goal) => {
  // send post request to create a single category
  axios.post(`/api/category/${userId}`, { name, goal }).then(res => {
    location.reload();
  }),
    err => {
      console.log(err);
    };
};

/**
 * function to delete a single expense
 * @param {integer} expenseId the id of the expense to be deleted
 */
const deleteExpense = expenseId => {
  // send delete request to delete a single expense
  axios.delete(`/api/expense/${expenseId}`).then(res => {
    location.reload();
  }),
    err => {
      console.log(err);
    };
};

/**
 * function to get all categories and append a dropdown the the parent element
 * @param {integer} userId the id of the user
 * @param {string} parentElement the element to append this to
 * @param {string} defaultValue the default value for the dropdown
 */
const getCategories = (userId, parentElement, defaultValue) => {
  // send get request to retrieve all categories
  axios.get(`/api/category/${userId}`).then(res => {
    // render dropdown button
    const dropdown = renderDropdown("categories");

    // for each category, create a dropdown option
    res.data.forEach(row => {
      dropdown.append(renderDropdownCategories(row.name, row.id));
    });

    // set defaults for the value if one is defined
    if (defaultValue !== undefined) {
      dropdown.val(defaultValue);
    }

    // append it to the modal
    $(parentElement).append(dropdown);
  }),
    err => {
      console.log(err);
    };
};

/**
 * function to update the expense by sending a put request
 * @param {integer} expenseId the id of the expense
 * @param {string} description the description of the expense
 * @param {integer} amount the amount of the expense
 * @param {integer} CategoryId the id of the category
 */
const updateExpense = (expenseId, description, amount, CategoryId) => {
  // make put request to update a single expense
  axios.put(`/api/expense/${expenseId}`, { description, amount, CategoryId }).then(res => {
    location.reload();
  }),
    err => {
      console.log(err);
    };
};

/**
 * function to create a new expense
 * @param {string} amount the expense amount
 * @param {string} description the expense description
 * @param {integer} CategoryId the id of the category
 */
const postExpense = (amount, description, CategoryId) => {
  // send post request to create a single expense
  axios.post(`/api/expense/`, { amount, description, CategoryId }).then(res => {
    location.reload();
  }),
    err => {
      console.log(err);
    };
};

const getCategoriesAll = () => {
  $.get("/api/category/all/1", function(data) {
    // TODO: pass the user's ID in the URL
    let grandTotal = 0;
    let goalTotal = 0;
    data.forEach(function(row) {
      let total = 0;
      goalTotal += parseFloat(row.goal);
      row.Expenses.forEach(function(expense) {
        total += parseFloat(expense.amount);
      });
      grandTotal += total;
      renderCategoryRow(row, total.toFixed(2));
      row.Expenses.forEach(function(expense) {
        total += parseFloat(expense.amount);
        renderExpenseRow(expense, row.name);
      });
    });

    appendTotalExpenses(grandTotal.toFixed(2), goalTotal.toFixed(2));
  });
};
