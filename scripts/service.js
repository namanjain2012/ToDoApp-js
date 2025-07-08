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
    updateTask(){

    },
    sortTask(){

    }
}

export default toDoOperations;