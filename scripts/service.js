//It contains the logic of CRUD
// var obj = {key:value, key:value}
const toDoOperations = {
    tasks:[],
    getTotal(){
        return this.tasks.length;
    },
    addTask(task){
        task.isMarked = false;
        this.tasks.push(task);
    },
    toggleTask(id){
        const taskObject = this.tasks.find(task=>task.id==id);
        taskObject.isMarked = !taskObject.isMarked;
    },
    markCount(){
        return this.tasks.filter(task=>task.isMarked).length;
    },
    unMarkCount(){
        return this.tasks.length - this.markCount();
    },
    removeTask(){
        this.tasks = this.tasks.filter(task=>!task.isMarked);
    },
    searchTask(){
        
    },
    updateTask(id){
        const taskObject = this.tasks.find(task=>task.id==id);
        this.tasks = this.tasks.filter(task=>task.id!=id);
        const FIELDS = ['id','name','desc','date','time','pic'];
        for(let field of FIELDS){
            if(field=='id'){
                document.getElementById(field).innerText = taskObject.id;
                continue;
            }
            document.getElementById(field).value = taskObject[field];
        }
    },
    sortTask(){

    }
}

export default toDoOperations;