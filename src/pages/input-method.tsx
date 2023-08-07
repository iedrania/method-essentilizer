import React, { useContext } from 'react';
import Link from 'next/link';
import { MappingContext } from '../context/context';
import styles from '@/styles/all.module.css';

const InputMethod = () => {
  const { name, setName, creator, setCreator, description, setDescription } = useContext(MappingContext);

  return (
    <div className={styles.container}>
      <label htmlFor="title">Name:</label>
      <input
        className={styles.marginBottom}
        type="text"
        id="title"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <label htmlFor="creator">Creator:</label>
      <input
        className={styles.marginBottom}
        type="text"
        id="creator"
        value={creator}
        onChange={(event) => setCreator(event.target.value)}
      />

      <label htmlFor="description">Description:</label>
      <textarea
        className={styles.marginBottom}
        id="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <Link href="/input-tasks">
        <button>Next</button>
      </Link>
    </div>
  );
}

export default InputMethod;