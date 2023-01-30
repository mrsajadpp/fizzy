let MongoClient = require('mongodb').MongoClient;
let state = {
    db: false
}
function connect(done) {
    try {
        let url = 'mongodb://localhost:27017/'
        let dbname = 'fizzy';
        MongoClient.connect(url, (err, data) => {
            if (err) return done(err);
            state.db = data.db(dbname);
        });
        done();
    } catch (err) {
        console.error(err)
    }
}
function get() {
    return state.db;
}
connect((err) => {
    if (err) {
        console.log('Database connection error : ' + err);
    } else {
        console.log('Database connected!');
    }
});
module.exports = {
    get
};