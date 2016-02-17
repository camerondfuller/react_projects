var React = require('react');
var ReactDOM = require('react-dom');

var TodoList = React.createClass({

   getInitialState: function(){
      return{
         todos:[]
      }
   },

   toggleComplete: function(theTodoFromTheInstance) {
      var newTodoArray = this.state.todos.map(function(theTodoToModify){
         if(theTodoFromTheInstance === theTodoToModify) {
            theTodoToModify.complete = !theTodoToModify.complete;
         }
         return theTodoToModify;
      });
      this.setState({todos: newTodoArray});
   },
   // to get the input value, specify a ref on the input and then call it with this.refs
   addTodo: function(event) {

      event.preventDefault();

      if(this.refs.addTodo.value){
         this.state.todos.push({title:this.refs.addTodo.value, complete:false});
         this.setState({todos: this.state.todos});
         this.refs.addTodo.value = '';
      }
   },

   removeTodo: function (todoData) {
      var newTodoArray = this.state.todos.filter(function(theTodoToRemove){
         return todoData === theTodoToRemove ? false : true;
      });
      this.setState({todos:newTodoArray});
   },

   renderTodos: function(todo, index){
      return  (<Todo key={index} id={index} toggleComplete={this.toggleComplete} removeTodo={this.removeTodo} todoData={todo}/>);
   },

   render: function() {
      var number = this.state.todos.length;
      return (
         <div className='todo-list'>
            <h1>Todo List!</h1>
            <div className="add-todo">
               <form name="addTodoForm" onSubmit={this.addTodo}>
                  <input type="text" ref="addTodo"/><span>(Hit Enter)</span>
               </form>
            </div>
            <ul>
               {this.state.todos.map(this.renderTodos)}
               {/*the map method works just like the forEach and the $.each method; they loop over an array*/}
            </ul>
            <div className="todo-admin">
               <div>
                  {number} {number > 1 || number === 0 ? "todos" : "todo"}
               </div>
               <div>
                  <button></button>
               </div>
            </div>
         </div>
      )
   }
});

// ---------------------------------
// ---------------------------------

var Todo = React.createClass({
   getInitialState: function() {
      return {};
   },

   toggleComplete: function() {
      this.props.toggleComplete(this.props.todoData);
   },

   tellParentToRemoveTodo: function() {
      this.props.removeTodo(this.props.todoData);
   },

   render: function(value, index) {
      return (
         <li> {this.props.todoData.title}
            <input type="checkbox" id={this.props.id} checked={this.props.complete} onClick={this.toggleComplete}></input>
            <label htmlFor={this.props.id} id={this.props.key}></label>
            <button onClick={this.tellParentToRemoveTodo}><i className="fa fa-trash"></i></button>
         </li>
      )
   }
});



ReactDOM.render(<TodoList />, document.querySelector('#todo-app'));
