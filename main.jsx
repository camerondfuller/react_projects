var React = require('react');
var ReactDOM = require('react-dom');

var TodoList = React.createClass({

   getInitialState: function(){
      return{
         todos:[]
      }
   },

   toggleComplete: function(todoItem) {
      var todos = this.state.todos.map(function(todo){
         if(todoItem === todo) {
            todo.complete = !todo.complete;
         }
         return todo;
      });
      this.setState({todos:todos});
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

   renderTodos: function(todo, index){
      return  (<Todo key={index} id={index} toggleComplete={this.toggleComplete} item={todo}/>);
   },

   render: function() {
      var number = this.state.todos.length;
      return (
         <div className='todo-list'>
            <h1>Todo List!</h1>
            <div className="add-todo">
               <form name="addTodoForm" onSubmit={this.addTodo}>
                  <input type="text" ref="addTodo"/>
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
      this.props.toggleComplete(this.props.item);
   },

   render: function(value, index) {
      return (
         <li> {this.props.item.title}
            <input type="checkbox" id={this.props.id} checked={this.props.complete} onClick={this.toggleComplete}></input>
            <label htmlFor={this.props.id} id={this.props.key}></label>
            <button><i className="fa fa-trash"></i></button>
         </li>
      )
   }
});



ReactDOM.render(<TodoList />, document.querySelector('#todo-app'));
