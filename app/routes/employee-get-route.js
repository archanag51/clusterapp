

module.exports = function (app, db) {


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

  app.get('/api/deleteemployee/:id', (req, res) => {
    var sql = "DELETE FROM employees where id == " + req.params.id;
    db.serialize(function () {
      db.all(sql,
        function (err, rows) {
          if (err) {
            console.error(err);
            res.redirect("/api/employee");

            //res.status(500).send(err);
          }
          else
            //sendData(res, rows, err);
            res.redirect("/api/employee");


        });
    });

    //processData(res, "SELECT * FROM employees where id == " + req.params.id);
  });


  // Load employees by ID: http://localhost:4300/api/employee/id/$id
  // example: http://localhost:4300/api/employee/id/15
  app.get('/api/employee/id/:id', (req, res) => {
    processData(res, "SELECT * FROM employees where id == " + req.params.id);
  });

  // Load employees by attribute: http://localhost:4300/api/employee/$attribute/$name
  // example: http://localhost:4300/api/employee/price/24
  //          http://localhost:4300/api/employee/name/Suntone
  // $attribute = ['name', 'price', 'currency', 'description']*
  // * this is not checked values, wrong parameters will return in a DB error.
  app.get('/api/employee/:attribute/:name', (req, res) => {
    processData(res, "SELECT * FROM employees where " + req.params.attribute + " = '" + req.params.name + "'");
  });

  // Load all employees: http://localhost:4300/api/employee/
  app.get('/api/employee', (req, res) => {
    processData(res, "SELECT * FROM employees");
  });

  // Load employees: http://localhost:4300/api/employee/sort/$attribute
  // example: http://localhost:4300/api/employee/sort/price
  //          http://localhost:4300/api/employee/sort/name
  // $attribute = ['name', 'price', 'currency', 'description']*
  app.get('/api/employee/sort/:way', (req, res) => {
    processData(res, "SELECT * FROM employees order by " + req.params.way);
  });


  // Load employees: http://localhost:4300/api/employee/sort/$direction/$attribute
  // example: http://localhost:4300/api/employee/sort/asc/price
  //          http://localhost:4300/api/employee/sort/desc/price
  // $attribute = ['name', 'price', 'currency', 'description']*
  // $direction [ASC or DESC]C]*
  // * the direction is checked and when wrong will return a 401 business error.
  app.get('/api/employee/sort/:direction/:way', (req, res) => {
    var way = req.params.way;
    var direction = req.params.direction;

    if (direction !== "asc" &&
      direction !== "desc") {
      res.status(404).send("Sorting direction invalid!");
    }

    processData(res, "SELECT * FROM employees order by " + way + " " + direction);
  });

  function processData(res, sql) {
    db.serialize(function () {
      db.all(sql,
        function (err, rows) {
          if (err) {
            console.error(err);
            res.status(500).send(err);
          }
          else
            sendData(res, rows, err);
        });
    });
  }

  function sendData(res, data, err) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (data[0]) {
      //res.send(data);
      res.render("getemployee", { aEmployees: data });

    }
    else {
      res.render("addemployeeform");
    }
  }
};