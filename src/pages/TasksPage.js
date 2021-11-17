import React from 'react';
import { getProjectId, getTasksById, addTask } from '../firebase.js'
import Tasks from '../styles/Tasks.css';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
// import * as React from 'react';


function TasksPage(props) {
    // Task fields
    const [projectId, setProjectId] = useState("");
    const [projectName, setProjectName] = useState("");
    const [taskName, setTaskName] = useState("");
    const [taskPriority, setTaskPriority] = ("");
    const [taskDateCreated, setTaskDateCreated] = ("");
    const [taskDueDate, setTaskDueDate] = ("");
    const [taskDescription, setTaskDescription] = ("");
    const [value, setValue] = React.useState('');

    // change handlers
    const taskDueDateHandle = (event) => {
        setTaskDueDate(event.target.value);
    }
    const taskPriorityHandle = (event) => {
        setTaskPriority(event.target.value);
    }

    const [task, setTask] = useState([]);

    useEffect(async () => {
        await setProjectId(await getProjectId(props.projectName))
        setTask(await getTasksById(projectId));
    }, [])

    const AddTasks = async () => {
        AddTasks(taskName, taskDescription, taskPriority, taskDueDate, projectId);
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Container>
                <h1 className="tasksPage">Tasks Page</h1>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                ></Box>
                <div>
                    <Row>
                        <Col>
                            <TextField
                                required
                                id="outlined-required"
                                label="Required"
                                defaultValue="Enter Task Name"
                            />
                        </Col>
                        <Col>
                            <InputLabel htmlFor="Description">Description</InputLabel>
                            <TextField
                                required
                                id="Description"
                                multiline
                                rows={2}
                            />
                        </Col>
                        <Col>
                            <InputLabel htmlFor="DueDate">Date Created</InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    id="DateCreated"
                                    value={taskDateCreated}
                                    onChange={(newValue) => {
                                        setTaskDateCreated(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Col>
                        <Col>
                            <InputLabel htmlFor="DueDate">Due Date</InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    id="DueDate"
                                    value={taskDueDate}
                                    onChange={(newValue) => {
                                        setTaskDueDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Col>
                        <Col>
                            <InputLabel htmlFor="Priority">Priority</InputLabel>
                            <Select
                                id="taskPriority"
                                displayEmpty
                                value={taskPriority}
                                onChange={taskPriorityHandle}
                            >
                                <MenuItem value="" disabled>
                                    Priority
                                </MenuItem>
                                <MenuItem value={"Low"}>Low</MenuItem>
                                <MenuItem value={"Medium"}>Medium</MenuItem>
                                <MenuItem value={"High"}>High</MenuItem>
                            </Select>
                        </Col>
                    </Row>
                </div>
                <Button>Save Task</Button>
            </Container>
        </>
    );
}
export default TasksPage;