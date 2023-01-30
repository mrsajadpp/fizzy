const db = require('./config')
const COLLECTIONS = require('./collection');
const ObjectID = require('mongodb').ObjectID;

module.exports = {
    getAllVideos: () => {
        try {
            return new Promise(async (resolve, reject) => {
                resolve(await db.get().collection(COLLECTIONS.VIDEOS).find().toArray());
            })
        } catch (err) {
            console.error(err)
        }
    }
}
