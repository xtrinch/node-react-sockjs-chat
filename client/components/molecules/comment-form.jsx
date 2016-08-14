import React from 'react';

class CommentForm extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            message: ''
        };
        this.setState = this.setState.bind(this);
    };
    onMessageChange(e) {
        this.setState({message: e.target.value})
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(this);
        this.props.onMessageSubmit(this.state.message);
        this.setState({message: ''})
    }
    render() {
        return (
          <form onSubmit={this.handleSubmit.bind(this)}>
              <input
                  autoComplete="off"
                  onChange={this.onMessageChange.bind(this)}
                  value={this.state.message}></input>
          </form>
        );
    }
};

export default CommentForm;
