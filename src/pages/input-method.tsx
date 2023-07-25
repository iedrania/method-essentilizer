import React, { useContext } from 'react';
import Link from 'next/link';
import { MappingContext } from '../context/context';

const InputMethod = () => {
  const { name, setName, author, setAuthor, description, setDescription } = useContext(MappingContext);

  return (
    <div>
      <label htmlFor="title">Name:</label>
      <input
        type="text"
        id="title"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <label htmlFor="author">Author:</label>
      <input
        type="text"
        id="author"
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
      />

      <label htmlFor="description">Description:</label>
      <textarea
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