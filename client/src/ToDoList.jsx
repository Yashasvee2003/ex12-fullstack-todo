import { useState } from "react";
import axios from "axios";

const ToDoList = () => {
  const [tasks, setTasks] = useState(["eat breakfast"]);
  const [newTask, setNewTask] = useState("");
  const [delTask, setDelTask] = useState("");

  const handleInputChange = (e) => {
    setNewTask((preTask) => e.target.value);
  };

  const addTask = () => {
    // document.getElementById("input-task-field").value = "";
    if (newTask.trim() == "") return;
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTask("");
  };

  const deleteTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((task, i) => i != index));
  };

  const moveTaskUp = (index) => {
    // console.log(index)
    if (index == 0) return;
    const temp = tasks[index - 1];
    tasks[index - 1] = tasks[index];
    tasks[index] = temp;

    setTasks((prevTasks) => [...prevTasks]);
  };

  const moveTaskDown = (index) => {
    if (index == tasks.length - 1) return;

    [tasks[index], tasks[index + 1]] = [tasks[index + 1], tasks[index]];
    setTasks((prevTasks) => [...prevTasks]);
  };
  const sendTasksToDB = () => {
    axios
      .post("http://localhost:5432/push", { tasks: tasks })
      .catch((err) => console.log(err))
      .then((res) => console.log(res));
    setTasks((prevTasks) => []);
  };

  const fetchTasksFromDB = () => {
    axios
      .get("http://localhost:5432/fetch")
      .then((res) => {
        console.log(res.data.newTasks);
        setTasks((prevTasks) =>res.data.newTasks );
      })
      .catch((err) => console.log(err));
  };


  const handleDelTaskInput = (e) => {
    setDelTask((prevDelTask) => e.target.value);
  }

  const handleDeleteTask = ()=>{
    axios
    .post("http://localhost:5432/delete",{taskToDel:delTask})
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err))
  }

  return (
    <div className="to-do-list">
      <h3>To Do List</h3>
      <input
        id="input-task-field"
        type="text"
        value={newTask}
        onChange={handleInputChange}
      ></input>
      <button className="add-button" onClick={addTask}>
        Add
      </button>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="text">{task}</span>
            <button onClick={() => deleteTask(index)}>Delete</button>
            <button onClick={() => moveTaskUp(index)}>+</button>
            <button onClick={() => moveTaskDown(index)}>-</button>
          </li>
        ))}
      </ol>
      <button onClick={sendTasksToDB}>Push tasks to DB</button>
      <button onClick={fetchTasksFromDB}>Fetch tasks from DB</button>
      <br></br>
      <br></br>
      <input type="text" placeholder="enter task to delete from db" value={delTask} onChange={handleDelTaskInput}/>
      <button onClick={handleDeleteTask}>Delete task from DB</button>
    </div>
  );
};

export default ToDoList;
