var React = require('react');
var ReactDOM = require('react-dom');

var TweetBox = React.createClass({

   getInitialState:function() {
      return {
         text:'',
         photoAdded:false
      }
   },
   handleChange: function(event) {
      this.setState({text:event.target.value})
   },
   remainingChars: function() {
      if(this.state.photoAdded) {
         return (140 - 23 - this.state.text.length)
      } else {
         return (140 - this.state.text.length)
      }
   },
   overflowAlert:function() {
      if(this.remainingChars() <0) {
         if (this.state.photoAdded){
         var beforeOverflowText = this.state.text.substring(130 - 23, 140);
         var overflowText = this.state.text.substring(140 - 23);
      } else {
         var beforeOverflowText = this.state.text.substring(130, 140);
         var overflowText = this.state.text.substring(140);
      }
         return (
            <div className="alert alert-warning">
               <strong>Oops! Too many characters!&nbsp;{beforeOverflowText}:&nbsp;<span className="bg-danger">{overflowText}</span></strong>
            </div>
         )
      } else {

      }
   },
   togglePhoto:function() {
      this.setState({photoAdded:!this.state.photoAdded})
   },
   render:function() {
      return (
         <div className="well clearfix">
            {this.overflowAlert()}
            <textarea onChange={this.handleChange} className="form-control"></textarea><br/>
            <span>{this.remainingChars()}</span>
            <button className="btn btn-primary pull-right" disabled={this.state.text.length === 0 && !this.state.photoAdded}>Tweet</button>
            <button className="btn btn-default pull-right" onClick={this.togglePhoto} >{this.state.photoAdded ? "Photo Added!" : "Add Photo"}</button>

         </div>
      )
   }

});

var MultiTweet = React.createClass({
   render:function() {
      return (
         <div>
            <TweetBox />
            <TweetBox />
            <TweetBox />
         </div>
      )
   }

});

ReactDOM.render(<MultiTweet />, document.querySelector('.tweet-box'));
