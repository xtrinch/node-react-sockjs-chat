import React from 'react';
import Person from '../atoms/person.jsx';

class PeopleList extends React.Component {
  render() {
    var personNodes = this.props.people.map(function(person) {
        return (
            <Person type={person.type} key={person.id}>
                {person.username}
            </Person>
        );
    });
    return (
        <div className="peopleList">
            <div className="peopleTitle">
                Users online
            </div>
            {personNodes}
        </div>
    );
  }
};

export default PeopleList;
