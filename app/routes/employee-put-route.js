module.exports = function (app, db) {

    // Update a employee
    // http://localhost:4300/api/employee
    // Sending a JSON body:
    // {
    //     "id": "12",            
    //     "name": "ExampleemployeeName",
    //     "description": "Example employee description",
    //     "price": 2.00,
    //     "currency": "EUR" 
    // }

    // or an array of employees:
    // [
    //     {...},{...}
    // ]
    app.put('/api/employee/', (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        var data = req.body;

        if ((data.constructor === Array))
            processemployees(req, res, db);
        else
            processemployee(req, res, db);
    });

    app.post('/api/editemployee/:id', (req, res) => {
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
        updateemployee(prod, res, db);
    }
}

function processemployee(req, res, db) {
    //validateRequest(req, res);
    updateemployee(req, res, db);
}

function checkIfExist() {
    // TODO: check business
}

function updateemployee(employee, res, db) {
    checkIfExist();

    var empid = employee.body.empid;
    var name = employee.body.name;
    var certification = employee.body.certification;
    var status = employee.body.status;
    var planneddate = employee.body.planneddate;
    var voucherissued = employee.body.voucherissued;
    var remarks = employee.body.remarks;
    var id = employee.params.id;

    var sql = `update employees
            set empid = ?, name = ?, certification  = ?, status = ?,planneddate  = ?, voucherissued  = ?, remarks = ?
            where id = ?;`;

    var values = [empid, name, certification, status, planneddate, voucherissued, remarks, id];

    db.serialize(function () {
        db.run(sql, values, function (err) {
            if (err) {
                console.error(err);
                res.redirect("/api/employee");
                //res.status(500).send(err);
            }
            else
                res.redirect("/api/employee");
            //res.send();
        });
    });
}

function validateRequest(req, res) {
    var fs = require('fs');
    var schema = JSON.parse(fs.readFileSync('app/data/employee-schema-update.json', 'utf8'));

    var JaySchema = require('jayschema');
    var js = new JaySchema();
    var instance = req.body;

    js.validate(instance, schema, function (errs) {
        if (errs) {
            console.error(errs);
            res.status(400).send(errs);
        }
    });
}