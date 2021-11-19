import React from 'react';
import { getProjects, getTaskByProjectID, GetTaskIDByTaskName, AddTask, UpdateTaskCollection, DeleteTask } from '../firebase.js';
import { useHistory } from "react-router-dom";
import '../styles/Main.css';
import MainPg from './Mainpage.js';
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
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import * as React from 'react';

const TasksPage = () => {
    // Task fields
    const [projectId, setProjectId] = useState("");
    const [taskId, setTaskId] = useState("");
    const [taskName, setTaskName] = useState("");
    const [taskPriority, setTaskPriority] = useState("");
    const [taskDueDate, setTaskDueDate] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskStatus, setTaskStatus] = useState('');
    const [value, setValue] = React.useState('');
    const [projTasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')));
    const [project, setProject] = useState([]);

    // loading
    const [taskLoading, setTaskLoading] = React.useState(true);

    // Task updates
    const [isTaskUpdate, setIsTaskUpdate] = React.useState(false);

    const history = useHistory();
    // change handlers
    const taskDueDateHandle = (event) => {
        console.log(taskDueDate);
        //setTaskDueDate(event.target.date);
    }
    const taskPriorityHandle = (event) => {
        console.log(event.target.value);
        setTaskPriority(event.target.value);
    }
    const taskDescriptionText = (event => {
        console.log(event.target.value);
        setTaskDescription(event.target.value);
    })
    const taskStatusHandle = (event) => {
        console.log(event.target.value);
        setTaskStatus(event.target.value);
    }
    const taskTitleHandle = (event) => {
        console.log(event.target.value);
        setTaskName(event.target.value);
    }
    const addTaskHandle = (event) => {
        setProjectId(localStorage.getItem('projectId', projectId));
        setTasks([]);
        let tsk = getTaskByProjectID('');
        setTasks(tsk);
        setIsTaskUpdate(false);
        handleOpen();
    }
    const SelectTaskProjectHandle = (task) => {
        console.log(task);
        setIsTaskUpdate(true);
        setTaskId(task.TaskId);
        setTaskName(task.Task);
        setTaskDescription(task.TaskDescription);
        setTaskPriority(task.TaskPriority);
        setTaskDueDate(task.TaskDueDate);
        handleOpen();
    }

    const nameChange = (event) => {
        console.log("Name Change", event.target.value);
        setTaskName(event.target.value);
        console.log("Name Change1", taskName);
    }

    useEffect(async () => {
        setProjectId(localStorage.getItem('projectId', projectId));
        //if (localStorage.getItem("projectId") != null) {
            let tsk = getTaskByProjectID(projectId);
            setTasks(tsk);
        //}
        setTimeout(() => {
            setTaskLoading(false);
        }, 2000);
        
    }, [])

    // const [taskArr, setTaskArr] = useState([]);
    const addTasks = (event) => {
        event.preventDefault()
        console.log('PROJECT ID --> ', projectId);
        console.log('PROJECT NAME --> ', taskName);
        console.log('DESCRIPTION ---->', taskDescription);
        console.log('DueDate --> ', taskDueDate);
        console.log('PRIORITY --> ', taskPriority);
        console.log('STATUS --->', taskStatus);
        const taskData = {
            ProjectID: projectId,
            Task: taskName,
            TaskDescription: taskDescription,
            TaskPriority: taskPriority,
            TaskDueDate: taskDueDate,
            TaskStatus: taskStatus
        };
        AddTask(taskData);
        setTasks([]);
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

    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );
    return (
        <>
        {/* <Col><Col> */}
            <h1 className="projDashTitle">Tasks Page</h1>
            <Container>
                <Button onClick={addTaskHandle} className="button">Add Tasks</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" component={'span'} variant={'body2'}>
                            <Button className="deleteProjBtn">Delete Task</Button>

                        </Typography>
                        <Typography id="modal-modal-description" component={'span'} variant={'body2'} sx={{ mt: 2 }}>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >

                                <div>
                                    <Row>
                                        <Col>
                                            <InputLabel htmlFor="Task">Task</InputLabel>
                                            <TextField
                                                required
                                                id="Task"
                                                name="Task"
                                                multiline
                                                maxRows={4}
                                                onChange={nameChange}
                                                value={taskName}
                                            />
                                        </Col>
                                        <Col>
                                            <InputLabel htmlFor="TaskDescription">Description</InputLabel>
                                            <TextField
                                                required
                                                id="TaskDescription"
                                                multiline
                                                rows={4}
                                                onChange={taskDescriptionText}
                                                value={taskDescription}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <InputLabel htmlFor="TaskDueDate">Due Date</InputLabel>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    id="TaskDueDate"
                                                    onChange={(newValue) => {
                                                        setTaskDueDate(newValue);
                                                        taskDueDateHandle();
                                                    }}
                                                    value={taskDueDate}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <InputLabel htmlFor="TaskStatus">Status</InputLabel>
                                            <Select
                                                id="TaskStatus"
                                                displayEmpty
                                                onChange={taskStatusHandle}
                                                value={taskStatus}
                                            >
                                                <MenuItem value="" disabled>
                                                    Status
                                                </MenuItem>
                                                <MenuItem value={"Assigned"}>Assigned</MenuItem>
                                                <MenuItem value={"In Progress"}>In Progress</MenuItem>
                                                <MenuItem value={"Completed"}>Completed</MenuItem>
                                            </Select>

                                            <InputLabel htmlFor="TaskPriority">Priority</InputLabel>
                                            <Select
                                                id="TaskPriority"
                                                displayEmpty
                                                onChange={taskPriorityHandle}
                                                value={taskPriority}
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
                                <div>

                                </div>

                                <Button className="saveChanges">Update Tasks</Button>
                                <Button className="saveChanges" onClick={addTasks}>Add To Task List</Button>

                                <Button onClick={() => history.push("./Mainpage.js")}>Go back to Dashboard</Button>

                                <Button>Save Changes</Button>
                            </Box>
                        </Typography>
                    </Box>
                </Modal>
                
                <div className="columns" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
                    <Col className="col-md-6 border-right">
                        <div className="colTitles">Assigned</div>
                        {taskLoading || projTasks.length === 0 ? "Loading" : projTasks.map((task, index) => {
                            // const timestamp = new Date().valueOf(project.DueDate);
                            // let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(timestamp);
                            return (
                                <>
                                    {(() => {
                                        if (task.TaskStatus === 'Assigned') {
                                            return (
                                                <Card sx={{ minWidth: 275 }} className="projectCards" key={index}>
                                                    <CardContent key={index}>
                                                        <Typography variant="h5" component="div"><b>Tasks For Project: Blah Blah</b>
                                                            {task.Task}
                                                        </Typography>
                                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                            <b>Priority: </b> {task.TaskPriority}
                                                            <br />
                                                            <b>Status: </b> {task.TaskStatus}

                                                        </Typography>
                                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                            <b>Due Date:</b>

                                                        </Typography>
                                                        <Typography variant="body2">
                                                            Description:
                                                            <br />
                                                            {task.TaskDescription}
                                                        </Typography>
                                                    </CardContent>
                                                    <Button className="openProjBtn"

                                                        onClick={async (task) => {
                                                            SelectTaskProjectHandle(task);
                                                        }}
                                                    >Open Tasks</Button>
                                                </Card>
                                            )
                                        }
                                    })()}
                                </>
                            );
                        })}

                    </Col>
                    <Col className="col-md-6 border-right">
                        <div className="colTitles">In Progress</div>
                        {taskLoading || projTasks.length === 0 ? "Loading" : projTasks.map((task, index) => {
                            // const timestamp = new Date().valueOf(project.DueDate);
                            // let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(timestamp);
                            return (
                                <>
                                    {(() => {
                                        if (task.taskStatus === 'In Progress') {
                                            return (
                                                <Card sx={{ minWidth: 275 }} className="projectCards" key={index}>
                                                    <CardContent key={index}>
                                                        <Typography variant="h5" component="div"><b>Tasks For Project: Blah Blah</b>
                                                            {task.Task}
                                                        </Typography>
                                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                            <b>Priority: </b> {task.TaskPriority}
                                                            <br />
                                                            <b>Status: </b> {task.TaskStatus}

                                                        </Typography>
                                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                            <b>Due Date:</b>

                                                        </Typography>
                                                        <Typography variant="body2">
                                                            Description:
                                                            <br />
                                                            {task.TaskDescription}
                                                        </Typography>
                                                    </CardContent>
                                                    <Button className="openProjBtn"

                                                        onClick={async (task) => {
                                                            SelectTaskProjectHandle(task);
                                                        }}
                                                    >Open Tasks</Button>
                                                </Card>
                                            )
                                        }
                                    })()}
                                </>
                            );
                        })}
                    </Col>
                    <Col className="col-md-6 border-right">
                        <div className="colTitles">Completed</div>
                        {taskLoading || projTasks.length === 0 ? "Loading" : projTasks.map((task, index) => {
                            // const timestamp = new Date().valueOf(project.DueDate);
                            // let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(timestamp);
                            return (
                                <>
                                    {(() => {
                                        if (task.TaskStatus === 'Completed') {
                                            return (
                                                <Card sx={{ minWidth: 275 }} className="projectCards" key={index}>
                                                    <CardContent key={index}>
                                                        <Typography variant="h5" component="div"><b>Tasks For Project: Blah Blah</b>
                                                            {task.Task}
                                                        </Typography>
                                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                            <b>Priority: </b> {task.TaskPriority}
                                                            <br />
                                                            <b>Status: </b> {task.TaskStatus}

                                                        </Typography>
                                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                            <b>Due Date:</b>

                                                        </Typography>
                                                        <Typography variant="body2">
                                                            Description:
                                                            <br />
                                                            {task.TaskDescription}
                                                        </Typography>
                                                    </CardContent>
                                                    <Button className="openProjBtn"

                                                        onClick={async (task) => {
                                                            SelectTaskProjectHandle(task);
                                                        }}
                                                    >Open Tasks</Button>
                                                </Card>
                                            )
                                        }
                                    })()}
                                </>
                            );
                        })}
                    </Col>

                </div>
            </Container>

        </>
    );
}
export default TasksPage;