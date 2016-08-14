import React from 'react';

class Person extends React.Component {
  render() {
    return (
        <div className={this.props.type}>{this.props.children}</div>
    );
  }
};

export default Person;
