import React, { useState, useEffect } from "react";
import Tasks from "./crud";
import "./form.css";

const AddTask = ({ id, setTaskId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Todo");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === "" || description === "") {
      alert("All fields are mandatory!");
      return;
    }

    const newTask = {title, description, status, };

    try {
      if (id !== undefined && id !== "") {
        await Tasks.updateTask(id, newTask);
        setTaskId("");
        alert("Updated successfully!");
      } else {
        await Tasks.addTask(newTask);
        alert("New Task added successfully!");
      }
      //refresh the page
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }

    setTitle("");
    setDescription("");
  };

  const editHandler = async () => {
    try {
      if (id !== undefined) {
        const docSnap = await Tasks.getOneTask(id);
        if (docSnap) {
          console.log("the record is:", docSnap.data());
          const data = docSnap.data();
          if (data) {
            setTitle(data.title);
            setDescription(data.description);
            setStatus(data.status);
            handleStatusChange(data.status);
          }
        }
      }
    } catch (err) {
        alert(err.message);
    }
  };

  useEffect(() => {
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);

    document.getElementById("todo").style.backgroundColor = "rgb(161, 161, 161)";
    document.getElementById("doing").style.backgroundColor = "rgb(161, 161, 161)";
    document.getElementById("done").style.backgroundColor = "rgb(161, 161, 161)";

    document.getElementById(newStatus.toLowerCase()).style.backgroundColor =
      "rgb(151, 255, 139)";
  };

  return (
    <>
      <div className="form-popup" id="myForm">
        <h1>New Task</h1>
        
        <form className="form-container" onSubmit={handleSubmit} method="post">
            <label htmlFor="Title"><b>Title</b></label>
            <input type="text" placeholder="Enter Title" name="Title" id="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />

            <label htmlFor="Desc"><b>Description</b></label>
            <textarea placeholder="Description" name="Desc" id="Desc" style={{ height: '100px' }} value={description} onChange={(e) => setDescription(e.target.value)}required />

            <p>Task Status : </p>
            <div className="status-options">
                <button type="button" className="btn2" id="todo" onClick={(e) => handleStatusChange("Todo")}>Todo</button>
                <button type="button" className="btn2" id="doing" onClick={(e) => handleStatusChange("Doing")}>Doing</button>
                <button type="button" className="btn2" id="done" onClick={(e) => handleStatusChange("Done")}>Done</button>
            </div>

            <button type="submit" className="btn">Add</button>
        </form>
        
      </div>
    </>
  );
};

export default AddTask;
