import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { MappingContext } from '../context/context';
import WorkProductList from '@/components/InputWorkProduct';

export default function Home() {
  const { tasks, addTask, addWorkProductToTask } = useContext(MappingContext);
  const [taskName, setTaskName] = useState('');

  const handleAddTask = () => {
    if (taskName) {
      addTask({ id: tasks.length + 1, name: taskName, workProducts: [] });
      setTaskName('');
    }
  };

  return (
    <div>
      <h2>Insert Tasks</h2>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>

      <h3>Tasks:</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name}
            <WorkProductList task={task} addWorkProduct={addWorkProductToTask} />
          </li>
        ))}
      </ul>
      <Link href="/input-roles">
        <button>Next</button>
      </Link>
    </div>
  );
}
