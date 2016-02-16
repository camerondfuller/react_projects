var React = require('react');
var ReactDOM = require('react-dom');

var Timer = React.createClass({

  getInitialState: function(){
    return {
      secondsElapsed: 0
   };
  },
  resetTimers: function(){
    clearInterval(this.interval);
    this.setState({ secondsElapsed: 0 });
    this.start();

  },
  tick: function(){
    this.setState({secondsElapsed: this.state.secondsElapsed +1});
  },

  start:function (){
  this.interval = setInterval(this.tick, 1000);
  },

  componentDidMount: function(){
    setTimeout(this.start, this.props.timeout);
  },

  render: function(){
    return ( <p> {this.props.name} has { this.state.secondsElapsed }s elapsed <button onClick={this.resetTimers  }>RESET</button> </p>);
  }

});

var Timers = React.createClass({

    render: function(){
      return (
        <div>
          <Timer timeout={0}    name="Timer1" />
          <Timer timeout={200} name="Timer2" />
          <Timer timeout={300} name="Timer3" />
          </div>
      )
    }
 });
ReactDOM.render(<Timers />, document.querySelector('.mount-node'))
