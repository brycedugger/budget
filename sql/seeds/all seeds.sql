USE bank;

INSERT INTO users (firstName, lastName, username, pwd, email, income, updatedAt, createdAt)
VALUES  ("Michael", "Scott", "mscott", "abc", "a@gmail.com", 0, "2019-12-10T05:22:35.657", "2019-12-10T05:22:35.657"), 
        ("Dwight", "Schrute" , "dschrute", "abc",  "b@gmail.com", 1000, "2019-12-10T05:22:35.657", "2019-12-10T05:22:35.657"),
        ("Pam", "Beesly","pbeesly", "abc", "c@gmail.com", 2500, "2019-12-10T05:22:35.657", "2019-12-10T05:22:35.657"), 
        ("Jim", "Halpert", "jhalpert", "abc", "d@gmail.com", 1600, "2019-12-10T05:22:35.657", "2019-12-10T05:22:35.657");

USE bank;

INSERT INTO categories (name, goal, createdAt, updatedAt, UserId)
VALUES  ("Shopping", "100", "2019-12-10T05:22:35.657", "2019-12-10T05:22:35.657",1),
        ("Bills & Utilities", "200", "2019-12-10T05:22:35.657", "2019-12-10T05:22:35.657",1),
        ("Dining", "300", "2019-12-10T05:22:35.657", "2019-12-10T05:22:35.657",1);

USE bank;

INSERT INTO expenses (description, amount, createdAt, updatedAt, CategoryId)
VALUES  ("Transfer from Checking Account",600,"2019-12-10T05:22:35.657", "2019-12-10T05:22:35.657",1),
        ("Transfer from Checking Account",600,"2019-12-10T05:22:35.657", "2019-12-10T05:22:35.657",1),
        ("Transfer from Checking Account",600,"2019-12-10T05:22:35.657", "2019-12-10T05:22:35.657",2),
        ("Transfer from Checking Account",600,"2019-12-10T05:22:35.657", "2019-12-10T05:22:35.657",2),
        ("Transfer from Checking Account",600,"2019-12-10T05:22:35.657", "2019-12-10T05:22:35.657",1),
        ("Transfer from Checking Account",600,"2019-12-10T05:22:35.657", "2019-12-10T05:22:35.657",3),
        ("Transfer from Checking Account",600,"2019-12-10T05:22:35.657", "2019-12-10T05:22:35.657",3),
        ("Transfer from Checking Account",600,"2019-12-10T05:22:35.657", "2019-12-10T05:22:35.657",1),
        ("Transfer from Checking Account",600,"2019-12-10T05:22:35.657", "2019-12-10T05:22:35.657",2),
        ("Transfer from Checking Account",600,"2019-12-10T05:22:35.657", "2019-12-10T05:22:35.657",3),
        ("Transfer from Checking Account",600,"2019-12-10T05:22:35.657", "2019-12-10T05:22:35.657",1),
        ("Transfer from Checking Account",600,"2019-12-10T05:22:35.657", "2019-12-10T05:22:35.657",1),

        ("Transfer from Checking", 100, "2019-12-10T05:22:35.657", "2019-12-10T05:22:35.657",2),
        ("Transfer from Checking", 100, "2019-12-10T05:22:35.657", "2019-12-10T05:22:35.657",3),
        ("Transfer from Checking", 100, "2019-12-10T05:22:35.657", "2019-12-10T05:22:35.657",1),

        ("Transfer to Savings", -600, "2019-12-10T05:22:35.657", "2019-12-10T05:22:35.657",3),
        ("Transfer to Savings", -100, "2019-12-10T05:22:35.657", "2019-12-10T05:22:35.657",3),
        ("NASB Mortgage", -2300, "2019-12-10T05:22:35.657", "2019-12-10T05:22:35.657",1)