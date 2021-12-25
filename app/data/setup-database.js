var fs = require('fs');
var sqlSchema = fs.readFileSync('app/data/employee-schema.sql').toString();

module.exports = function (db) {
    db.serialize(function () {
        db.run(sqlSchema);
    });
};


