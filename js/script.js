const { createApp } = Vue;

createApp({
  data(){
    return {
      search: '',
      newTask: '',
      editDescription: '',
      undo: [],
      tasks: [
        {
          description: 'Fare la spesa',
          done: false,
          edit: false
        },
        {
          description: 'Fare le faccende',
          done: false,
          edit: false
        },
        {
          description: 'Fare l\'esercizio di boolean',
          done: false,
          edit: false
        },
      ]
    }
  },
  computed: {
      searchTasks(){
        let searchedTasks;

        if(this.search != ''){
          searchedTasks = this.tasks.filter((task) => 
            task.description.toLowerCase().split(" ").join("").includes(this.search.toLowerCase().split(" ").join(""))
          )
        }
        else
          searchedTasks = this.tasks;

        return searchedTasks;
      },
  },
  methods: {
    addTask(){
      this.tasks.push(
        {
          description: this.newTask,
          done: false
        }
      )
      this.newTask = '';
    },
    deleteTask(task, index){
      this.tasks.splice(index, 1);
      this.undo.push(task);
    },
    undoTask(){
      this.tasks.push(this.undo.pop());
    },
    taskIsDone(index){
      this.tasks[index].done = (!this.tasks[index].done) ? true : false;
    },
    editTask(index){ 
        if(!this.tasks[index].edit){
          this.editDescription = this.tasks[index].description;
          this.tasks[index].edit = true
        }
        else{
          this.tasks[index].description = this.editDescription
          this.tasks[index].edit = false
        }
    },  
  }
}).mount('#app');