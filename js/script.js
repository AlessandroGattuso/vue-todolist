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
      let checkDuplicate = this.tasks.filter((task) => {
        return task.description.toLowerCase().split(" ").join("") == this.newTask.toLowerCase().split(" ").join("");
      });

      if(this.newTask.split(" ").join("") != '' &&  checkDuplicate.length == 0){
        this.tasks.push(
          {
            description: this.newTask,
            done: false
          }
        )
      }
      this.newTask = '';
    },
    deleteTask(task, index){
      this.tasks.splice(index, 1);
      this.undo.push(task);
    },
    undoTask(){
      if(this.undo.length != 0)
        this.tasks.push(this.undo.pop());
    },
    taskIsDone(index){
      this.tasks[index].done = (!this.tasks[index].done) ? true : false;
    },
    editTask(task){ 
      this.tasks.map((item) => {
        if(item.description == task.description){
          if(!item.edit){
            this.editDescription = item.description;
            item.edit = true
          }
          else{
            item.description = this.editDescription
            item.edit = false
          }
        }
      })
    },  
  }
}).mount('#app');