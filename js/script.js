const { createApp } = Vue;

createApp({
  data(){
    return {
      search: '',
      newTask: '',
      edit: false,
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
      }
  },
  methods: {
    addTask(){
      this.tasks.push(
        {
          description: this.newTask,
          done: false
        }
      )
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
    editTask(t){
      this.tasks.map((item) => {
        if(item.description == t.description)
          item.edit = (!item.edit) ? true : false;  
      })
    },  
  }
}).mount('#app');