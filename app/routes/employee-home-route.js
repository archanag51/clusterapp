

module.exports = function (app, db) {

  app.get('/home', (req, res) => {

    res.render("home");
    //processData(res, "SELECT * FROM employees where id == "+req.params.id);
  });


  app.get('/api/employeeform', (req, res) => {

    res.render("addemployeeform");
    //processData(res, "SELECT * FROM employees where id == "+req.params.id);
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
    // console.log(data[1].name)
    if (data[0]) {
      //res.send(data);
      res.render("display", { aEmployees: data });

    }
    else {
      res.status(404).send("Employee not found");
    }
  }
};