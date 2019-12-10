USE bank;


INSERT INTO bank_account 
(account_number, funds_available, account_owner,account_name, account_type)
VALUES 
(2508376450,7200,1,"Ring Money","savings" ), --Michael Ring Savings
(2508376449, 300,1,"Savings", "savings"),      --Michael Reg Savings
(5358305849, 500, 1,"Checking", "checking"),   --Michael Checking
(2540958639,4000,2,"Savings", "savings"),      --Dwight Savings
(5348591027, 8000,2,"Checking", "checking"),   --Dwight Checking
(25586730183,2500,3,"Savings", "savings"),     --Pam Savings
(5337602764, 1500,3,"Checking", "checking"),   --Pam Checking
(2548506749,3000,4,"Savings", "savings"),      -- Jim Savings
(2548506750,800,4,"Honeymoon Fund", "savings"),--Jim  Honeymoon Savings
(5384571204, 1600,4,"Checking", "checking");   --Jim Checking


-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);
