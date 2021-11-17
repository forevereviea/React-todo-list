// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, addDoc, getDocs, updateDoc } from 'firebase/firestore';
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

let tasksId = [];
let task = "";

let deleteDoc = "";
let DeleteTask = "";


async function getProjects() {
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
    if(selectedProject == doc.data().Name){

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
      DateCreate: new Date().toLocaleString()
    });
    console.log("Doc ID: ", docRef.id);
    await UpdateProject(docRef.id, projectData.Name, projectData.Description, projectData.Priority, projectData.DueDate);
  }

 catch (e) {
    console.error("Error adding doc: ", e)
  }
}


async function UpdateProject(projectId, Name, Description, Priority, DueDate){
  // console.log(projectId)
  const docRef = doc(db, "Projects", projectId);
  await updateDoc(docRef, {
    ProjectID: projectId,
    Name: Name,
    Description: Description,
    Priority: Priority,
    DueDate: DueDate
  });
  return await getProjects();
}

const myTasks = [];
async function DeleteProject(projectId) {
  await deleteDoc(doc(db, "Projects", projectId));
  myTasks = await getTasksById(projectId);
  myTasks.map(task => {
    DeleteTask(task)
  });
}

async function getTasksById(projId) {
  const querySnapshot = await getDocs(collection(db, "Tasks"));
  await querySnapshot.forEach((doc) => {
    if(doc.data().taskId == projId) {
      myTasks.push(doc.data());
    }
  });
  console.log(myTasks)
  return myTasks;
}

async function addTask(taskData){
  try{
    const docRef = await addDoc(collection(db, "Tasks"), {
      ProjectId: taskData.ProjectId,
      status: taskData.status,
      DueDate: taskData.DueDate,
      DateCreated: new Date().toLocaleString(),
      Priority: taskData.Priority,
      Task: taskData.Task,
      Description: taskData.TaskDescriptions
    })
    console.log("Doc ID: ", docRef.id);
  }

 catch (e) {
    console.error("Error adding doc: ", e)
  }
}

// async function updateTasks(tasksId, myTasks)
// {
//   const docRef= doc(db, "Tasks", tasksId);
//   await updateDoc(docRef, {
//     ProjectId: projectData.ProjectId,
//     status: projectData.status,
//     DueDate: projectData.DueDate,
//     Priority: projectData.Priority,
//     Description: projectData.taskDescription
//   });
//   return getTasksById();
// }


// const querySnapshot = await getDocs(collection(db, "Projects"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });
// getProjectId by the project name
// make project clickable
// keep track of the project name using text content
// from there, I need to call my getProjectId by the porject name
// get all my projects 

export{ app, db, getProjects, getProjectId, addProject, UpdateProject, DeleteProject, getTasksById, addTask };

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