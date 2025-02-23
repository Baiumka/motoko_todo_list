import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {  Button, Row, Col} from 'react-bootstrap';
import { UserContext } from "../context/UserConstext";
import getDefaultTasks from "./defaultTasks";
import TaskCard from "./TaskCard";
import {CreateModal} from "./CreateModal";
import useErrorModal from '../hooks/useErrorModal';

function TodoList() {    
  const {userActor,  myUser, isLoading, setIsLoading} = useContext(UserContext); 
  const [showError, ErrorModal] = useErrorModal();
  const [showMode, setShowMode] = useState(0);
  const [editTask, setEditTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const updateTasks = async () => {
      if(userActor)
      {
        if(myUser)
        {
          userActor.getMyTasks().then((newTasks) => {   
            console.log(newTasks);
            setTasks([...newTasks].reverse());
            setIsLoading(false);
          })
          .catch((error) => {      
            showError(error.message);
          });                    
        }
        else
        {
          setTasks(getDefaultTasks());
        }
      }
      else
      {
        setTasks(getDefaultTasks());
      }
    };
    updateTasks();
  }, [myUser]);

  const handleDeleteTask = (id) => {
    const waitTask = tasks.map(task =>
      task.id === id ? { ...task, wait: true } : task
    );
    setTasks(waitTask);
    userActor.deleteTask(id).then(() => {   
      setTasks(tasks.filter(task => task.id !== id));
    })
    .catch((error) => {      
      const waitTask = tasks.map(task =>
        task.id === id ? { ...task, wait: false } : task
      );
      setTasks(waitTask);
      showError(error.message);      
    });
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setShowMode(task.id);    
  };

  const handleCompleteTask = (id) => {    
    const waitTask = tasks.map(task =>
      task.id === id ? { ...task, wait: true } : task
    );
    setTasks(waitTask);
    userActor.completeTask(id).then(() => {   
      const updatedTasks = tasks.map(task =>
        task.id === id ? { ...task, state: !task.state, wait: false } : task
      );
      setTasks(updatedTasks);
    })
    .catch((error) => {      
      const waitTask = tasks.map(task =>
        task.id === id ? { ...task, wait: false } : task
      );
      setTasks(waitTask);
      showError(error.message);
    });
  };

  const handleTaskCreated = async (newTask) =>{           
    userActor.addTask(newTask.title, newTask.descr, newTask.color).then((newID) => {   
      setTasks([{ ...newTask, id: Number(newID) }, ...tasks]);
      console.log(newID);
    })
    .catch((error) => {      
      showError(error.message);
    });
  };

  const handleTaskEdited= (editedTask) =>{
    const waitTask = tasks.map(task =>
      task.id === editedTask.id ? { ...task, wait: true } : task
    );
    setTasks(waitTask);
    setEditTask(null);
    console.log("Try to edit id: ", editedTask.id);
    userActor.editTask(editedTask.id, editedTask.title, editedTask.descr, editedTask.color).then((answerTask) => {   
      console.log(answerTask);
      setTasks(editedTask => 
        editedTask.map(task => 
          task.id === answerTask.id ? {...task, ...answerTask} : task
        )
      );
      const waitTask = tasks.map(task =>
        task.id === editedTask.id ? { ...task, wait: false } : task
      );
      setTasks(waitTask);
    })
    .catch((error) => {      
      const waitTask = tasks.map(task =>
        task.id === editedTask.id ? { ...task, wait: false } : task
      );
      setTasks(waitTask);
      showError(error.message);
    });
  };

  return (
    <div className="container mt-5">
      {!isLoading ? (
        <div>
        {myUser ? (
          <Button className='w-100 mb-4' onClick={() => setShowMode(-1)}>Add new Task</Button>
        ): (
          <div class="container text-center mt-5">
            <h1 class="display-3">
                <span class="text-warning">Notesieve</span>
            </h1>
            <p class="subtext mt-3">
                "Is a particularly valuable tool. It allows one to view the memories, thoughts, or even dreams...’"
            </p>
          </div>
        )}
        <CreateModal 
          showMode={showMode} 
          setShowMode={setShowMode} 
          onCreated={handleTaskCreated}
          onEdited={handleTaskEdited}
          editTask={editTask}
        />
        {ErrorModal}
        <Row>
          {tasks.map(task => (
            <Col md={4} key={task.id} className="task-col">
              <TaskCard 
                task={task} 
                onDelete={() => handleDeleteTask(task.id)} 
                onEdit={() => handleEditTask(task)} 
                onComplete={() => handleCompleteTask(task.id)} 
              />
            </Col>
          ))}
        </Row>
        </div>
      ) : (
        <div class="container d-flex justify-content-center align-items-center">
          <img src="loading.gif" class="img-fluid"/>
        </div>
      )}
    </div>
  );
};


export default TodoList;
