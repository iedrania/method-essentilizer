import React, { useContext } from 'react'
import Router from 'next/router'
import { MappingContext } from '../context/context'

export default function Home() {
  const { setName, setDescription, setTasks, setRoles } = useContext(MappingContext);

  const validateData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // TODO P1 post essence
    try {
      await fetch('/api/post/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = () => {
    setName('');
    setDescription('');
    setTasks([]);
    setRoles([]);
    Router.push('/input-method');
  };

  return (
    <div>
      <h1>Method Essentilizer</h1>
      <button onClick={handleCreate}>Create New Method</button>
      <button onClick={validateData}>Insert Database</button>
      {/* TODO P1 display existing methods */}
    </div>
  );
}
