module.exports = function (app, db) {

    // Add new employee
    // http://localhost:4300/api/employee
    // Sending a JSON body:
    // {
    //     "name": "ExampleemployeeName",
    //     "description": "Example employee description",
    //     "price": 2.00,
    //     "currency": "EUR" 
    // }

    // or an array of employees:
    // [
    //     {...},{...}
    // ]

    app.get('/api/editemployee/:id', (req, res) => {
        let sql = "SELECT * FROM employees where id == " + req.params.id;
        db.serialize(function () {
            db.all(sql,
                function (err, rows) {
                    if (err) {
                        console.error(err);
                        //res.status(500).send(err);
                    }
                    else
                        //sendData(res, rows, err);
                        res.render("editemployeeform", { aEmployees: rows });

                });
        });

        //processData(res, "SELECT * FROM employees where id == " + req.params.id);
    });



    app.post('/api/employee/', (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");


        var data = req.body;

        if ((data.constructor === Array))
            processemployees(req, res, db);
        else
            processemployee(req, res, db);
    });
};

function processemployees(req, res, db) {
    for (var prod of req.body) {
        insertemployee(prod, res, db);
    }
}

function processemployee(req, res, db) {
    // validateRequest(req, res);
    insertemployee(req.body, res, db);
}

function insertemployee(employee, res, db) {
    var empid = employee.empid;
    var name = employee.name;
    var certification = employee.certification;
    var status = employee.status;
    var planneddate = employee.planneddate;
    var voucherissued = employee.voucherissued;
    var remarks = employee.remarks;


    var sql = `insert into employees (empid,name, certification, status, planneddate,voucherissued,remarks)
            VALUES 
            (?, ?, ?, ?,?,?,?);`;

    var values = [empid, name, certification, status, planneddate, voucherissued, remarks];

    db.serialize(function () {
        db.run(sql, values, function (err) {
            if (err) {
                console.error(err);
                //res.status(500).send(err);
                res.redirect("/api/employee");
            }

            else
                //res.send();
                res.redirect("/api/employee");

        });
    });
}

function validateRequest(req, res) {
    var fs = require('fs');
    var schema = JSON.parse(fs.readFileSync('app/data/employee-schema.json', 'utf8'));

    var JaySchema = require('jayschema');
    var js = new JaySchema();
    var instance = req.body;

    js.validate(instance, schema, function (errs) {
        if (errs) {
            console.error(errs);
            res.status(400).send(errs);
        }
    });

    if (req.body.id) {
        res.status(400).send("ID cannot be submmited");
    }
}