import Parse from 'parse';
import _ from 'lodash';

let WatchItem = Parse.Object.extend("WatchItem");
let Anime = Parse.Object.extend("Anime");

export const getAnimeList = (callback) => {
    let query = new Parse.Query(Anime);

    query.find().then((results) => {
        if (results) {
            return results.map((item) => {
                return item.toJSON();
            })
        }
    }).then((results) => {
        return callback && callback(null, results);
    });
}

export const watchListAddItem = (animeId, callback) => {
    if (Parse.User.current()) {
        let query = new Parse.Query(WatchItem);
        query.equalTo("animeId", animeId);
        query.find({
            success: function(results) {
                if (results.length > 0) {
                    return callback && callback(animeId + ' already exist in watchList');
                } else {
                    let item = new WatchItem();
                    item.save({
                        animeId: animeId,
                        createdBy: Parse.User.current().id,
                        ACL: new Parse.ACL(Parse.User.current())
                    });
                }
            },
            error: function(error) {
                console.log("Error: " + error.code + " " + error.message);
                return callback && callback(error);
            }
        });
    }
    return callback && callback('User is not logged in.');
};

export const watchListRemoveItem = (animeId, callback) => {
    if (Parse.User.current()) {
        let query = new Parse.Query(WatchItem);
        query.equalTo("animeId", animeId);
        query.first({
            success: function(result) {
                if (result) {
                    result.destroy({
                        success: function(myObject) {
                            // The object was deleted from the Parse Cloud.
                        },
                        error: function(myObject, error) {
                            // The delete failed.
                            // error is a Parse.Error with an error code and message.
                        }
                    });
                }
            },
            error: function(error) {
                console.log("Error: " + error.code + " " + error.message);
                return callback && callback(error);
            }
        });
    }
    return callback && callback('User is not logged in.');
};

export const getUserWatchList = (callback) => {
    if (Parse.User.current()) {
        let query = new Parse.Query(WatchItem);
        // query.equalTo("userId", Parse.User.current().id);
        query.find({
            success: function(results) {
                return callback && callback(null, _.map(results, (item) => {
                    let itemJSON = item.toJSON();
                    return itemJSON.animeId;
                }));
            },
            error: function(error) {
                console.log("Error: " + error.code + " " + error.message);
                return callback && callback(error);
            }
        }); 
    }
    return callback && callback('User is not logged in.');
};