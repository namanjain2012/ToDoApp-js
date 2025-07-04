//glue b/w view and model/service 
import toDoOperations from "./service.js";
import { validateName } from "./validation.js";
import {init} from "./utils.js";

window.addEventListener('load',initialize);
let autoId;

function initialize(){
    bindEvents();
    autoId = init();
    showId();
}

function bindEvents(){
    document.getElementById('add').addEventListener('click',addTask);
}

function showId(){
    document.querySelector('#id').innerText = autoId();
}
function addTask(){
    var task = readFields();
    if(verifyFields(task)){
        toDoOperations.addTask(task);
        printTask(task);
        computeTotal();
        showId();
    }
    // console.log("Task is : ",task);
}

function printTask(task){
    const tbody = document.querySelector('#task-list');  //alternative for getElementById     ' # ' -> id    ' . ' -> class
    const tr = tbody.insertRow();
    let index = 0;
    for(let key in task){
        tr.insertCell(index).innerText = task[key];
        index++;
    }

    // let total = document.getElementById('total');
    // total.innerText = parseInt(total.innerText)+1;

    const td = tr.insertCell(index);
    td.appendChild(createIcon(task.id,toggleMarking,'fa-trash'));
    td.appendChild(createIcon(task.id,edit,'fa-pen'));
}

function computeTotal(){
    document.querySelector('#total').innerText = toDoOperations.getTotal();
    document.querySelector('#unmarked').innerText = 0;
    document.querySelector('#marked').innerText = 0;
}

function toggleMarking(){
    console.log("Toggle marking call");
}

function edit(){
    console.log("edit marking call");
}

function createIcon(id,fn,className='fa-trash'){              //default value for parameter
    const iTag = document.createElement("i");
    iTag.className = `fa-solid ${className}`;
    iTag.addEventListener('click',fn);
    iTag.setAttribute('task-id',id);
    return iTag;
}

function verifyFields(task){
    var errorMessage = "";
    errorMessage = validateName(task.name);
    if(errorMessage){
        document.getElementById('name-error').innerText = errorMessage;
        return false;
    }
    document.getElementById('name-error').innerText = errorMessage;
    return true;
}

function readFields(){
    const FIELDS = ['id','name','desc','date','time','pic'];
    var task = {};
    for(let field of FIELDS){
        if(field=='id'){
            task[field] = document.getElementById(field).innerText;
            continue;
        }
        task[field] = document.getElementById(field).value
    }
    return task;
}