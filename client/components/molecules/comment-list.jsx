import React from 'react';
import ReactDom from 'react-dom';
import Comment from '../atoms/comment.jsx';

class CommentList extends React.Component {
    // how to keep comment list scroll offset at the bottom,
    // if user is already at the bottom
    componentWillUpdate() {
        var node = ReactDom.findDOMNode(this);
        this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
    }
    componentDidUpdate() {
      if (this.shouldScrollBottom) {
        var node = ReactDom.findDOMNode(this);
        node.scrollTop = node.scrollHeight
      }
    }
    render() {
        var commentNodes = this.props.comments.map(function(comment) {
            return (
                <Comment author={comment.username} type={comment.type} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
};

export default CommentList;
