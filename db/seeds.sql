INSERT INTO departments (department_name)
VALUES ('Finance'), ("Human Resources"), ("Sales"), ("Marketing");

INSERT INTO roles (title, salary, department_id)
VALUES ("Financial Manager", 100000, 1),
        ("Senior Accountant", 75000, 1),
        ("Junior Accountant", 45000, 1),
        ("HR Manager", 80000, 2),
        ("Sales Manager", 90000, 3),
        ("Sales Representative", 65000, 3),
        ("Junior Sales Representative", 40000, 3),
        ("Marketing Coordinator", 85000, 4),
        ("Social Media Manager", 55000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Mitch", "Figgers", 1, NULL),
        ("Queen", "Elizabeth", 2, 1),
        ("Lightning", "McQueen", 3, 2),
        ("Savannah", "Banana", 3, 2),
        ("Momma", "Figs", 4, NULL),
        ("Micheal", "Scott", 5, NULL),
        ("Dwight", "Schrute", 6, 6),
        ("Jim", "Halpert", 6, 6),
        ("Ryan", "Howard", 7, 6),
        ("Tanjuro", "Kamado", 8, NULL),
        ("Nezuko", "Kamado", 9, 10);