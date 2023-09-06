import React, { useEffect, useState } from "react";
import Tasks from "./crud";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {StrictModeDroppable} from "./strictdrop";
import ModalForm from "./modal";

const TaskList = ({ getTaskId }) => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : { todo: [], doing: [], done: [] };
    });
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const [expandedTasks, setExpandedTasks] = useState(null);

    const toggleTaskExpansion = (taskId) => {
        if (expandedTasks === taskId) {
            setExpandedTasks(null);
        } else {
            setExpandedTasks(taskId);
        }
    };

    function ExpandedTask(task){
      return(
        <div className="expanded-content">
            <div onClick={() => toggleTaskExpansion(task.id)}>
            <p>Title: </p>
            <div id="task">{task.title}</div><br></br>
            <p>Description: </p>
            <div id="task">{task.description}</div><br></br>
            <p>Status: </p>
            <div id="task">{task.status}</div>
            <br></br>
            </div>
            <div>
            <ModalForm buttonName="Edit" tId={task.id} />
            <button className="btn2" onClick={() => deleteHandler(task.id)}>Delete</button>
            </div>
        </div>
      );
    }      

    useEffect(() => {
        getTask();
    }, []);

    const getTask = async () => {
        const data = await Tasks.getAllTask();
        console.log(data.docs);
        const taskArray = data.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        status: doc.data().status,
        }));

        const todoTasks = taskArray.filter((task) => task.status === "Todo");
        const doingTasks = taskArray.filter((task) => task.status === "Doing");
        const doneTasks = taskArray.filter((task) => task.status === "Done");

        setTasks({ todo: todoTasks, doing: doingTasks, done: doneTasks });
    };

    const deleteHandler = async (id) => {
        await Tasks.deleteTask(id);
        getTask();
    };

    const findTaskById = (draggableId) => {
      const allTasks = [...tasks.todo, ...tasks.doing, ...tasks.done];
      return allTasks.find((task) => task.id === draggableId);
    };

    const onDragEnd = (result) => {
      const { destination, source, draggableId } = result;
      const newTask = findTaskById(draggableId);
      console.log(source,destination);

      const sourceIndex = source.index;
      const destinationIndex = destination.index;
      
      if (!destination || (destination.droppableId === source.droppableId && sourceIndex=== destinationIndex)) {
        return;
      }
    
      const sourceColumnId = source.droppableId.toLowerCase();
      const destinationColumnId = destination.droppableId.toLowerCase();
      
      if (!tasks.hasOwnProperty(sourceColumnId) || !Array.isArray(tasks[sourceColumnId])) {
        return;
      }
      if (!tasks.hasOwnProperty(destinationColumnId) || !Array.isArray(tasks[destinationColumnId])) {
        return;
      }

      const sourceColumn = [...tasks[sourceColumnId]];
      const destinationColumn = [...tasks[destinationColumnId]];
      console.log(sourceColumn,destinationColumn);

      const taskIndex = sourceColumn.findIndex((task) => task.id === draggableId);
      const taskIndex2 = destinationColumn.findIndex((task) => task.id === draggableId);
      if (taskIndex === -1)
        return;

      const [removedTask] = sourceColumn.splice(taskIndex, 1);
      if(sourceColumnId===destinationColumnId){
        destinationColumn.splice(taskIndex2, 1);
      }

      destinationColumn.splice(destinationIndex, 0, removedTask);
      const updatedTasks = {
        ...tasks,
        [sourceColumnId]: sourceColumn,
        [destinationColumnId]: destinationColumn,
      };
      console.log(updatedTasks);
    
      setTasks(updatedTasks);
      if(sourceColumnId===destinationColumnId)
      return;
    
      const newStatus = destinationColumnId.charAt(0).toUpperCase() + destinationColumnId.slice(1);
      newTask.status= newStatus;
      Tasks.updateTask(draggableId, newTask);
      console.log("updated",draggableId, newTask);
    };  

  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="plan_board">
      <div className="plan_columns" id="todo_lane">
        <StrictModeDroppable  droppableId="Todo" >
          {(provided) => (
            <div className="task_section" ref={provided.innerRef} {...provided.droppableProps}>
              <h3 className="heading">TODO</h3>
              {tasks.todo.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      key={task.id}
                      id="task2"
                      className={`task ${expandedTasks === task.id ? 'expanded' : ''}`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {expandedTasks === task.id ? (
                        ExpandedTask(task)
                      ) : (
                        <div onClick={() => toggleTaskExpansion(task.id)}>
                        {task.title}
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              <ModalForm buttonName="Add New Task" />
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </div>
  
      <div className="plan_columns" id="doing_lane">
        <StrictModeDroppable droppableId="Doing">
          {(provided) => (
            <div className="task_section" ref={provided.innerRef} {...provided.droppableProps}>
              <h3 className="heading">Doing</h3>
              {tasks.doing.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                    key={task.id}
                    id="task2"
                    className={`task ${expandedTasks === task.id ? 'expanded' : ''}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {expandedTasks === task.id ? (
                      ExpandedTask(task)
                    ) : (
                      <div onClick={() => toggleTaskExpansion(task.id)}>
                        {task.title}
                      </div>
                    )}
                  </div>
                  )}
                </Draggable>
              ))}
              <ModalForm buttonName="Add New Task" />
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </div>
  
      <div className="plan_columns" id="done_lane">
        <StrictModeDroppable droppableId="Done">
          {(provided) => (
            <div className="task_section" ref={provided.innerRef} {...provided.droppableProps}>
              <h3 className="heading">Done</h3>

              {tasks.done.map((task, index) => (
                
                //return(
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div key={task.id} id="task2" className={`task ${expandedTasks === task.id ? 'expanded' : ''}`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                      {expandedTasks === task.id ? (
                        ExpandedTask(task)
                        ) : (
                        <div onClick={() => toggleTaskExpansion(task.id)}>
                          {task.title}
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
                //);

              ))}
              <ModalForm buttonName="Add New Task" />
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable >
      </div>
    </div>
    </DragDropContext>
  );  
};

export default TaskList;