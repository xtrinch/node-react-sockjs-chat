import React from 'react';

class Comment extends React.Component {
  render() {
    return (
        <div className={this.props.type}><span className="author">{this.props.author}</span><span className="separator"></span> {this.props.children}</div>
    );
  }
};

export default Comment;
