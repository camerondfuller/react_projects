var React = require('react');
var ReactDOM = require('react-dom');

var TodoList = React.createClass({

   getInitialState: function(){
      return{
         todos:[]
      }
   },

   render: function() {
      return (
         <div className='todo-list'>
            <p>Hello from React!</p>
         </div>
      )
   }
});




ReactDOM.render(<TodoList />, document.querySelector('#todo-app'));
