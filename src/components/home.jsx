import "./form.css";
import TaskList from "./task";
import { useState } from "react";

function Home() {
    const [taskId, setTaskId] = useState("");

    const getTaskIdHandler = (id) => {
        console.log("The ID of document to be edited: ", id);
        setTaskId(id);
    };

    return (
        <>
        <div className="header">
            <h1>Canvan Board</h1>
            <p>plan your plans more efficiently</p>
        </div>

        <div className="board" id="myboard">
            <TaskList/>
        </div>
        </>
    );
}

export default Home;