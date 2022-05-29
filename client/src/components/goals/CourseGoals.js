import React from 'react';

import './CourseGoals.css';
import Card from '../UI/Card';
import GoalItem from './GoalItem';

function CourseGoals(props) {
  const hasNoGoals = !props.goals || props.goals.length === 0;

  return (
    <section id='course-goals'>
      <Card>
        {hasNoGoals && <h2>No goals found. Start adding some!</h2>}
        <ul>
          {props.goals.map((goal) => (
            <GoalItem
              key={goal._id}
              id={goal._id}
              text={goal.title}
              onDelete={props.onDeleteGoal}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
}

export default CourseGoals;
