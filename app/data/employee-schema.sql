CREATE TABLE IF NOT EXISTS employees
( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    empid INTEGER NOT NULL, 
    name TEXT NOT NULL, 
    certification TEXT NOT NULL, 
    status TEXT NOT NULL,
    planneddate TEXT , 
    voucherissued TEXT NOT NULL , 
    remarks TEXT NOT NULL
);