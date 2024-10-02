const mongoose = require("mongoose");
const uri =
  "mongodb+srv://admin:admin@yashcluster.3thsct1.mongodb.net/ex12-todolist";

const connectDb = async () => {
  try {
    const connect = mongoose.connect(uri);
    console.log("connected to db");
  } catch (e) {
    console.log(e);
  }
};

const listItemSchema = new mongoose.Schema({
    taskItem : String
});

const listItemModel = mongoose.model('ListItems', listItemSchema, 'ListItems') 

module.exports = { connectDb, listItemModel };
