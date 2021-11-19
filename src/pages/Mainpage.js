import { getProjects, addProject, UpdateProject, DeleteProject, getTaskByProjectID } from '../firebase';
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/Main.css';
import TasksPage from './TasksPage.js';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


const Columns = () => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4
    };

    //project fields
    const [projectId, setProjectId] = useState("");
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");
    const [dueDate, setDueDate] = React.useState(null);
    const [projects, setProjects] = useState([]);

    //Add modal functions
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = React.useState('');

    // updates
    const [isUpdate, setIsUpdate] = useState(false);

    // link to tasks page
    const history = useHistory();
    // loading
    const [loading, setLoading] = React.useState(true);
    //change handlers

    // const handleChange = (event) => {
    //     setValue(event.target.value);
    // };
    const nameChange = (event) => {
        console.log("Name Change", event.target.value);
        setProjectName(event.target.value);
        console.log("Name Change1", projectName);
    }
    const descriptionText = (event => {
        setDescription(event.target.value);
    })
    const dueDateHandle = (event) => {
        setDueDate(event.target.date);
    }
    const priorityHandle = (event) => {
        setPriority(event.target.value);
    }
    const statusHandle = (event) => {
        setStatus(event.target.value);
    }
    
    const goToTasks = (event) => {
        let tasks = getTaskByProjectID(projectId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log(projectId);
        history.push("./TasksPage.js");
    }

    const addProjectHandle = async () => {
        setProjects([]);
        let proj = await getProjects();
        setProjects(proj);
        setIsUpdate(false);
        handleOpen();
    }

    const selectProjectHandle = (proj) => {
        console.log(proj);
        setIsUpdate(true);
        console.log(proj.ProjectID);
        localStorage.setItem('projectId', proj.ProjectID);
        setProjectId(proj.ProjectID);
        setProjectName(proj.Name);
        setDescription(proj.Description);
        setPriority(proj.Priority);
        setDueDate(proj.DueDate);
        handleOpen();
    }

    const deleteProjectHandle = () => {
        DeleteProject(projectId);
        console.log("project deleted")
        setProjects([]);
        handleDeleteClose();
        handleClose();
        // console.log(projectId);
    }

    useEffect(async () => {
        let proj = await getProjects();
        setProjects(proj);
        setLoading(false);
    }, []);

    //add form
    const submitProject = (event) => {
        event.preventDefault()
        console.log('PROJECT ID --> ', projectId);
        console.log('PROJECT NAME --> ', projectName);
        console.log('DESCRIPTION ---->', description);
        console.log('DueDate --> ', dueDate);
        console.log('PRIORITY --> ', priority);
        console.log('STATUS --->', status);
        const projectData = {
            ProjectID: projectId,
            Name: projectName,
            Description: description,
            Priority: priority,
            DueDate: dueDate,
            Status: status
        };
        addProject(projectData);
        setProjects([]);
        handleClose();
    }

    const updateProject = () => {
        UpdateProject(projectId, projectName, description, priority, dueDate, status);
        setProjects([]);
        handleClose();
    }
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const handleDeleteOpen = () => setDeleteOpen(true);
    const handleDeleteClose = () => setDeleteOpen(false);


    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >

        </Box>
    );

    return (
        <>
            <h1 className="projDashTitle">Project Dashboard</h1>
            <Button className="button" onClick={addProjectHandle}>Add Project</Button>
            <div className="columns" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
               
               {/* Delete modal */}
      <Modal
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are You Sure You Want to Delete This Project?
          </Typography>
          <Col>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          </Col>
          <Col>
          <Button onClick={deleteProjectHandle}>Yes Delete</Button>
          </Col>
        </Box>
      </Modal>
                <Col>
                    <div className="colTitles">Assigned</div>

                    {loading ? "Loading" : projects.map((project, index) => {
                        // const timestamp = new Date().valueOf(project.DueDate);
                        // let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(timestamp);
                        return (
                            <>
                                {(() => {
                                    if (project.Status === 'Assigned') {
                                        return (
                                            <Card sx={{ minWidth: 275 }} className="projectCards" key={index}>
                                                <CardContent key={index}>
                                                    <Typography variant="h5" component="div"><b>Project: </b>
                                                        {project.Name}
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        <b>Priority: </b> {project.Priority}
                                                        <br />
                                                        <b>Status: </b> {project.Status}

                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        <b>Due Date:</b>

                                                    </Typography>
                                                    <Typography variant="body2">
                                                        Description:
                                                        <br />
                                                        {project.Description}
                                                    </Typography>
                                                </CardContent>
                                                <Button className="openProjBtn"

                                                    onClick={async (proj) => {
                                                        selectProjectHandle(project);
                                                    }}
                                                >Open Project</Button>
                                            </Card>
                                        )
                                    }
                                })()}
                            </>
                        );
                    })}

                    {/* Add/Update MODAL */}
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" component={'span'} variant={'body2'}>

                                {isUpdate ? (
                                    <Button className="deleteProjBtn" onClick={handleDeleteOpen}>Delete</Button>
                                ) : (
                                    ""
                                )}

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
                                                <InputLabel htmlFor="ProjectName">Project Name</InputLabel>
                                                <TextField
                                                    required
                                                    id="ProjectName"
                                                    name="ProjectName"
                                                    multiline
                                                    maxRows={4}
                                                    onChange={nameChange}
                                                    value={projectName}
                                                />
                                            </Col>
                                            <Col>
                                                <InputLabel htmlFor="Description">Description</InputLabel>
                                                <TextField
                                                    required
                                                    id="Description"
                                                    multiline
                                                    rows={4}
                                                    onChange={descriptionText}
                                                    value={description}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <InputLabel htmlFor="DueDate">Due Date</InputLabel>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        id="DueDate"
                                                        onChange={(newValue) => {
                                                            setDueDate(newValue);
                                                        }}
                                                        value={dueDate}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <InputLabel htmlFor="Status">Status</InputLabel>
                                                <Select
                                                    id="Status"
                                                    displayEmpty
                                                    onChange={statusHandle}
                                                    value={status}
                                                >
                                                    <MenuItem value="" disabled>
                                                        Status
                                                    </MenuItem>
                                                    <MenuItem value={"Assigned"}>Assigned</MenuItem>
                                                    <MenuItem value={"In Progress"}>In Progress</MenuItem>
                                                    <MenuItem value={"Completed"}>Completed</MenuItem>
                                                </Select>

                                                <InputLabel htmlFor="Priority">Priority</InputLabel>
                                                <Select
                                                    id="Priority"
                                                    displayEmpty
                                                    onChange={priorityHandle}
                                                    value={priority}
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
                                    {isUpdate ? (
                                        <Button className="saveChanges" onClick={updateProject}>Update Project</Button>
                                    ) : (
                                        <Button className="saveChanges" onClick={submitProject}>Add Project To Dashboard</Button>
                                    )}


                                    <Button onClick={goToTasks}>Go To Tasks</Button>

                                </Box>
                            </Typography>
                        </Box>
                    </Modal>
                </Col>
                <Col>
                    <div className="colTitles">In Progress</div>
                        {loading ? "Loading" : projects.map((project, index) => {
                            // const timestamp = new Date().valueOf(project.DueDate);
                            // let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(timestamp);
                            return (
                                <>
                                    {(() => {
                                        if (project.Status === 'In Progress') {
                                            return (
                                                <Card sx={{ minWidth: 275 }} className="projectCards" key={index}>
                                                    <CardContent key={index}>
                                                        <Typography variant="h5" component="div"><b>Project: </b>
                                                            {project.Name}
                                                        </Typography>
                                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                            <b>Priority: </b> {project.Priority}
                                                            <br />
                                                            <b>Status: </b> {project.Status}

                                                        </Typography>
                                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                            <b>Due Date:</b>

                                                        </Typography>
                                                        <Typography variant="body2">
                                                            Description:
                                                            <br />
                                                            {project.Description}
                                                        </Typography>
                                                    </CardContent>
                                                    <Button className="openProjBtn"

                                                        onClick={async (proj) => {
                                                            selectProjectHandle(project);
                                                        }}
                                                    >Open Project</Button>
                                                </Card>
                                            )
                                        }
                                    })()}
                                </>
                            );
                        })}
                </Col>
                <Col>
                <div className="colTitles">Completed</div>
                    {loading ? "Loading" : projects.map((project, index) => {
                        // const timestamp = new Date().valueOf(project.DueDate);
                        // let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(timestamp);
                        return (
                            <>
                                {(() => {
                                    if (project.Status === 'Completed') {
                                        return (
                                            <Card sx={{ minWidth: 275 }} className="projectCardC" key={index}>
                                                <CardContent key={index}>
                                                    <Typography variant="h5" component="div"><b>Project: </b>
                                                        {project.Name}
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        <b>Priority: </b> {project.Priority}
                                                        <br />
                                                        <b>Status: </b> {project.Status}

                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        <b>Due Date:</b>

                                                    </Typography>
                                                    <Typography variant="body2">
                                                        Description:
                                                        <br />
                                                        {project.Description}
                                                    </Typography>
                                                </CardContent>
                                                <Button className="openProjBtn"

                                                    onClick={async (proj) => {
                                                        selectProjectHandle(project);
                                                    }}
                                                >Open Project</Button>
                                            </Card>
                                        )
                                    }
                                })()}
                            </>
                        );
                    })}
                </Col>
            </div>
        </>
    );
}

export default Columns;