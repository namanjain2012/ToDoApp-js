//glue b/w view and model/service 
import { validateName } from "./validation.js";
window.addEventListener('load',bindEvents);

function bindEvents(){
    document.getElementById('add').addEventListener('click',addTask);
}

function addTask(){
    var task = readFields();
    verifyFields(task);
    console.log("Task is : ",task);
}

function verifyFields(task){
    document.getElementById('name-error').innerText = validateName(task.name);
}

function readFields(){
    const FIELDS = ['id','name','desc','date','time','pic'];
    var task = {};
    for(let field of FIELDS){
        task[field] = document.getElementById(field).value
    }
    return task;
}