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
    document.querySelector('#delete').addEventListener('click',deleteForEver);
}

function deleteForEver(){
    const tbody = document.querySelector('#task-list');
    tbody.innerHTML = '';
    toDoOperations.removeTask();
    printAllTask();
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

function printAllTask(){
    // todoOperations.tasks.forEach(function(task){
    //     printTask(task);
    // });
     toDoOperations.tasks.forEach(printTask);
     computeTotal();
}

function printTask(task){
    const tbody = document.querySelector('#task-list');  /* alternative for getElementById     ' # ' -> id    ' . ' -> class */
    const tr = tbody.insertRow();
    let index = 0;
    for(let key in task){
        if(key=='isMarked'){
            continue;
        }
        tr.insertCell(index).innerText = task[key];
        index++;
    }

    // let total = document.getElementById('total');
    // total.innerText = parseInt(total.innerText)+1;

    const td = tr.insertCell(index);
    td.appendChild(createIcon(task.id,toggleMarking));
    td.appendChild(createIcon(task.id,edit,'fa-pen'));
}

function computeTotal(){
    document.querySelector('#total').innerText = toDoOperations.getTotal();
    document.querySelector('#unmarked').innerText = toDoOperations.unMarkCount();
    document.querySelector('#marked').innerText = toDoOperations.markCount();
}

function toggleMarking(){
    const currentButton = this;
    const id = currentButton.getAttribute('task-id');
    console.log("Toggle marking call",id);
    toDoOperations.toggleTask(id);
    console.log('All Task',toDoOperations.tasks);
    const tr = currentButton.parentNode.parentNode;
    tr.classList.toggle('red');
    computeTotal();
}

function edit(){
    console.log("edit marking call");
}

function createIcon(id,fn,className='fa-trash'){              //default value for parameter
    const iTag = document.createElement("i");
    iTag.className = `fa-solid ${className} hand`;
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