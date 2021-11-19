// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, addDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEN2CwUZblnPBelM2Jl7Ojxtjei9uPlw8",
  authDomain: "taskmanagerapp-ea.firebaseapp.com",
  projectId: "taskmanagerapp-ea",
  storageBucket: "taskmanagerapp-ea.appspot.com",
  messagingSenderId: "553185396872",
  appId: "1:553185396872:web:ecb62413b887c79724b73d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

let projects = [];
let projectsId = [];
let projId = "";
let tasks = [];

// let tasksId = [];
// let task = "";

// let deleteDoc = [];
// let DeleteTask = "";


async function getProjects() {
  projects.length = 0;
  const querySnapshot = await getDocs(collection(db, "Projects"));
  await querySnapshot.forEach((doc) => {
    projects.push(doc.data());
    projectsId.push(doc.id);

    console.log(doc.id);
    console.log(doc.data());
  });
  return projects;
}

async function getProjectId(selectedProject){
  const querySnapshot = await getDocs(collection(db, "Projects"));
  querySnapshot.forEach((doc) => {
    if(selectedProject === doc.data().Name){

      projId = doc.id;
    }
  });
  return projId;
}

async function addProject(projectData){
  try{
    const docRef = await addDoc(collection(db, "Projects"), {
      Name: projectData.Name,
      Description: projectData.Description,
      Priority: projectData.Priority,
      DueDate: projectData.DueDate,
      DateCreate: new Date().toLocaleString(),
      Status: projectData.Status,
      ProjectID: ''
    });
    console.log("Doc ID: ", docRef.id);
    await UpdateProject(docRef.id, projectData.Name, projectData.Description, projectData.Priority, projectData.DueDate, projectData.DateCreated, projectData.Status);
  }

 catch (e) {
    console.error("Error adding doc: ", e)
  }
}


async function UpdateProject(ProjectID, Name, Description, Priority, DueDate, Status){
  console.log(ProjectID)
  const docRef = doc(db, "Projects", ProjectID);
  await updateDoc(docRef, {
    ProjectID: ProjectID,
    Name: Name,
    Description: Description,
    Priority: Priority,
    DueDate: DueDate,
    Status: Status
  });
  return await getProjects();
}

async function DeleteProject(ProjectId) {
  await deleteDoc(doc(db, "Projects", ProjectId));
}

// async function DeleteProject(projectId) {
//   let Tasks = [];
//   await deleteDoc(doc(db, "Projects", projectId));
//   Tasks = await GetTasksByProjectId(projectId);
//   Tasks.map(Task => {
//     let taskId = GetTasksByProjectId(Task)
//      deleteDoc(doc(db, "Tasks", taskId));
//   })
//   return null;
// }

// const getTaskByProjectID = async (projectId) => {
//   tasks.length = 0;
//   const querySnapshot = await getDocs(collection(db, "Tasks"));
//   querySnapshot.forEach((doc) => {
//     //if(doc.data().ProjectID === projId) {
//       tasks.push(doc.data());
//     //}
//     console.log(doc.data());
//   });
//   return tasks;
// }

async function getTaskByProjectID(projId) {
  tasks.length = 0;
  const querySnapshot = await getDocs(collection(db, "Tasks"));
  querySnapshot.forEach((doc) => {
    //if(doc.data().ProjectID === projId) {
      tasks.push(doc.data());
    //}
    console.log(doc.data());
  });
  return tasks;
}

async function GetTaskIDByTaskName(TaskName)
{
  let TaskId = "";
  const querySnapshot = await getDocs(collection(db, "Tasks"));
  querySnapshot.forEach((doc) => {
    if(TaskName === doc.data().TaskName)
    {
      TaskId = doc.id;
    }
  });
  console.log(TaskId)
  return TaskId;
}

async function AddTask(taskData){
  try{
    const docRef = await addDoc(collection(db, "Tasks"), {
      ProjectID: taskData.ProjectID,
      TaskStatus: taskData.TaskStatus,
      TaskDueDate: taskData.TaskDueDate,
      DateCreated: new Date().toLocaleString(),
      TaskPriority: taskData.TaskPriority,
      Task: taskData.Task,
      TaskDescription: taskData.TaskDescription,
      TaskID: ''
    })
    console.log("Doc ID: ", docRef.id);
    UpdateTaskCollection(docRef.id, taskData.ProjectID, taskData.Task, taskData.TaskDescription, taskData.TaskPriority, taskData.TaskStatus, taskData.TaskDueDate);
  }

 catch (e) {
    console.error("Error adding doc: ", e)
  }
}

async function UpdateTaskCollection(TaskID, ProjectID, Task, TaskDescription, TaskPriority, TaskStatus, TaskDueDate){
  console.log(TaskID)
  const docRef = doc(db, "Tasks", TaskID);
  await updateDoc(docRef, {
    TaskID: TaskID,
    Task: Task,
     TaskDescription: TaskDescription,
     TaskPriority: TaskPriority,
     TaskStatus:TaskStatus,
     TaskDueDate: TaskDueDate
  }) 
  return await getTaskByProjectID(ProjectID);
}  

async  function DeleteTask(task){
  console.log(task);
  let taskId = await GetTaskIDByTaskName(task.Task)
  await deleteDoc(doc(db, "Tasks", taskId));
}
export{ app, db, getProjects, getProjectId, addProject, UpdateProject, DeleteProject, getTaskByProjectID, GetTaskIDByTaskName, AddTask, UpdateTaskCollection, DeleteTask };

// const querySnapshot = await getDocs(collection(db, "Projects"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });
// getProjectId by the project name
// make project clickable
// keep track of the project name using text content
// from there, I need to call my getProjectId by the porject name
// get all my projects 
// async function getTasks(ProjectId)


// async function getProjects() {
//   ProjectId.length = 0;
//   const querySnapshot = await getDocs(collection(db, "Projects"));

// The "forEach" is passing through each project 
//   await querySnapshot.forEach((doc) => {
//     ProjectId.push(doc.data());
//   });
// create a for loop to loop through each project and an...
// if to set if the project is equal to the ...
// ProjectId that is function is calling
//   return ProjectId;
// }