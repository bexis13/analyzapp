var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username : String,
    password : String,
    results     : { score : Number, comparative : Number,
        tokens : Array, words : Array, postive : Array,
        negative : Array
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);