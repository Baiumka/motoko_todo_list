import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import useErrorModal from '../hooks/useErrorModal';
import {colorOptions, colorDictionary} from "../components/ColorDict";


export function CreateModal({ showMode, setShowMode, onCreated, onEdited, editTask}) {
  
    const emptyTask = {
    title: '',
    descr: '',
    color: 1
  };
  const [showError, ErrorModal] = useErrorModal();  
  const [newTask, setNewTask] = useState(emptyTask);

  useEffect(() => {
    if(showMode > 0)
    {
        setNewTask(editTask);
    }
    else if(showMode == -1)
    {
        setNewTask(emptyTask);
    }
    else
    {
        setNewTask(emptyTask);
    }
  }, [showMode]);

  const handleCreateTask = () => {
    if (!newTask.title || !newTask.descr) {
        showError('Both fields are required.');
      return;
    }

    const newTaskObj = {
        id: showMode > 0 ? showMode : 0,
        title: newTask.title,
        descr: newTask.descr,
        created_at: BigInt(Date.now()) * BigInt(1_000_000),
        state: false,
        color: newTask.color
    };

    if(showMode == -1)
    {        
        onCreated(newTaskObj);
    }
    else if(showMode > 0)
    {
        onEdited(newTaskObj);     
    }
    else
    {

    }

    setShowMode(0);
    setNewTask(emptyTask);
  };

  return (
    <div>
        {ErrorModal}
        <Modal show={showMode != 0} onHide={() => setShowMode(0)}>
        <Modal.Header closeButton>
            <Modal.Title>Create New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Group controlId="formTaskTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                type="text"
                placeholder="Enter title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
            </Form.Group>
            <Form.Group controlId="formTaskDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={newTask.descr}
                onChange={(e) => setNewTask({ ...newTask, descr: e.target.value })}
                />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Color</Form.Label>
                <div className='color-options' style={{ display: 'flex', gap: '10px' }}>
                {colorOptions.map(colorID => (
                <div 
                        key={colorID} 
                        className='color-circle' 
                        style={{ 
                            backgroundColor: colorDictionary[colorID], 
                            width: '30px', 
                            height: '30px', 
                            borderRadius: '4px', 
                            cursor: 'pointer', 
                            border: Number(newTask.color) === Number(colorID) ? '2px solid black' : 'none' 
                        }} 
                        onClick={() => setNewTask({ ...newTask, color: Number(colorID) })}
                    >                        
                    </div>
                ))}
                </div>
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowMode(0)}>
            Close
            </Button>
            <Button variant="primary" onClick={handleCreateTask}>
            Save Task
            </Button>
        </Modal.Footer>
        </Modal>
    </div>
  );
}
