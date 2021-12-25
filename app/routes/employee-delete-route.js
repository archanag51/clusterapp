module.exports = function (app, db) {

    // Delete a employee
    // http://localhost:4300/api/employee
    // Sending a JSON body: (ID is needed)
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
    app.delete('/api/employee/', (req, res) => {
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
    updateemployee(req.body, res, db);
}

function updateemployee(employee, res, db) {
    var id = employee.id;

    if (!id) {
        res.status(400).send("ID is mandatory");
    }

    else {
        var sql = `delete from  employees where id = ?;`;
        var values = [id];

        db.serialize(function () {
            db.run(sql, values, function (err) {
                if (err) {
                    console.error(err);
                    res.status(500).send(err);
                }
                else
                    res.send();
            });
        });
    }
}

