const {listItemModel} = require('../models/mainModel')


const sayHello =  (req, res) => {
  res.json({message: "Hello World"});
};

const pushToDB =async (req, res) => {
    try {
        const { tasks } = req.body;
        console.log(tasks)
        if(tasks.length == 0) return res.json({message:"no tasks"});

        const objTasks = tasks.map((task)=> {return {taskItem:task}})
        console.log(objTasks)

        const response = await listItemModel.insertMany(objTasks);
        // console.log(response); 
        res.json({message:"pushed to db"})
    } catch (e) {
        console.log(e)
        
    }

    // listItemModel.insertOne();
};


const fetchTasksFromDB = async(req, res) =>{
    try {

        const data = await listItemModel.find({});
        // console.log(data.slice(0,2))

        const taskArray = data.map((taskObj) => taskObj.taskItem)
        console.log(taskArray)

        res.json({newTasks:taskArray})
        console.log("fetched from db")
        
    } catch (e) {
        console.log(e)
        
    }
}

const deleteTaskFromDB = async(req, res) =>{
    try {
        const {taskToDel} = req.body;
        console.log(taskToDel);
        if (taskToDel.trim() == "") return res.json({message:"no task to delete"});

        const response = await listItemModel.deleteMany({taskItem:taskToDel});
        console.log(response)
        if (response.deletedCount>0) return res.json({message:"deleted"});

        return res.json({message:"task not found"});

    } catch (e) {
        console.log(e)
        
    }
}


module.exports = { sayHello, pushToDB, fetchTasksFromDB, deleteTaskFromDB };
