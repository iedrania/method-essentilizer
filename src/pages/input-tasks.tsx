import React, { useContext } from 'react';
import Link from 'next/link';
import { MappingContext } from '../context/context';
import Task from '@/components/Task';

const InputTasks = () => {
  const { tasks, addTask } = useContext(MappingContext);

  const handleAddTask = () => {
    addTask({ id: tasks.length + 1, name: '', workProducts: [], areasOfConcern: [], activitySpaces: [] });
  };

  return (
    <div>
      <h2>Insert Tasks</h2>

      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}

      <button onClick={handleAddTask}>Add Task</button>

      <Link href="/input-roles">
        <button>Next</button>
      </Link>
    </div>
  );
}

export default InputTasks;
