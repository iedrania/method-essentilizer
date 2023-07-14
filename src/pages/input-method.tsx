import prisma from '../lib/prisma';
import React, { useContext } from 'react';
import Router from 'next/router';
import { GetStaticProps } from "next"
import { MappingContext } from '../context/context';

export const getStaticProps: GetStaticProps = async () => {
  const latestMethod = await prisma.method.findFirst({
    orderBy: {
      id: 'desc',
    },
    select: {
      id: true,
    },
  });

  const nextId = latestMethod ? latestMethod.id + 1 : 1;
  return {
    props: { nextId },
    revalidate: 10,
  };
};

const InputMethod = ({nextId}) => {
  const { setMethodId, name, setName, description, setDescription } = useContext(MappingContext);

  const handleClick = () => {
    setMethodId(nextId)
    Router.push('/input-tasks');
  };

  return (
    <div>
      <label htmlFor="title">Name:</label>
      <input
        type="text"
        id="title"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <button onClick={handleClick}>Next</button>
    </div>
  );
}

export default InputMethod;