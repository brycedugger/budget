const updateUserIncome = (id, income) => {
  // make put request to update a single category
  axios.put(`/api/user/income/${id}`, { income }).then(res => {
    location.reload();
  }),
    err => {
      console.log(err);
    };
};

/**
 * function update a category
 * @param {number} id the id of the category
 * @param {string} name the description of the category
 * @param {number} goal the amount of the category
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
 * @param {number} categoryId the id of the expense to be deleted
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
 * @param {number} userId the id of the user
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
 * @param {number} expenseId the id of the expense to be deleted
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
 * @param {number} userId the id of the user
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
 * @param {number} expenseId the id of the expense
 * @param {string} description the description of the expense
 * @param {number} amount the amount of the expense
 * @param {number} CategoryId the id of the category
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
 * @param {number} CategoryId the id of the category
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

// function to render categories and expenses
const getCategoriesAll = userId => {
  axios.get(`/api/category/all/${userId}`).then(res => {
    // TODO: pass the user's ID in the URL
    let grandTotal = 0;
    let goalTotal = 0;
    res.data.forEach(row => {
      let total = 0;
      goalTotal += parseFloat(row.goal);
      row.Expenses.forEach(expense => {
        total += parseFloat(expense.amount);
      });
      grandTotal += total;
      renderCategoryRow(row, total.toFixed(2));
      row.Expenses.forEach(expense => {
        total += parseFloat(expense.amount);
        renderExpenseRow(expense, row.name);
      });
    });

    appendTotalExpenses(grandTotal.toFixed(2), goalTotal.toFixed(2));
  }),
    err => {
      console.log(err);
    };
};

/**
 * function to calculate and render the income
 * @param {number} userId the user's id
 */
const getIncome = userId => {
  axios.get(`/api/user/${userId}`).then(res => {
    renderIncomeRow(res.data);
  });
};

/**
 * function to get all category and expense totals
 * @param {number} userId the user's id
 */
const getBudgetCategories = userId => {
  axios.get(`/api/category/all/${userId}`).then(res => {
    res.data.forEach(category => {
      let categoryTotal = 0;
      // calculate the sum of expenses for each category
      category.Expenses.forEach(expense => {
        categoryTotal += parseFloat(expense.amount);
      });
      renderCategoryRow(category, categoryTotal.toFixed(2));
    });
    getBudgetCategoriesTotals(userId);
  });
};

/**
 * function to get total category goal and total expense
 * @param {number} userId the user's id
 */
const getBudgetCategoriesTotals = userId => {
  let expenseTotal = 0;
  let categoryTotal = 0;
  axios.get(`/api/category/all/${userId}`).then(res => {
    res.data.forEach(category => {
      categoryTotal += parseFloat(category.goal);
      category.Expenses.forEach(expense => {
        expenseTotal += parseFloat(expense.amount);
      });
    });
    renderTotals(categoryTotal, expenseTotal.toFixed(2));
    getRemainder(userId);
  });
};

/**
 * function to calculate and render the remainder
 * @param {number} userId the user's id
 */
const getRemainder = userId => {
  axios.get(`/api/remainder/${userId}`).then(res => {
    res.data.forEach(remainder => {
      renderRemainderRow(remainder);
    });
  });
};
