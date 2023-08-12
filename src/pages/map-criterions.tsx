import prisma from '../lib/prisma';
import React, { useContext } from 'react';
import { GetStaticProps } from "next"
import Link from 'next/link';
import { MappingContext } from '../context/context';
import EntryStateList from '@/components/criterions/EntryStateList';
import CompletionStateList from '@/components/criterions/CompletionStateList';
import EntryWorkProductList from '@/components/criterions/EntryWorkProductList';
import CompletionWorkProductList from '@/components/criterions/CompletionWorkProductList';

export const getStaticProps: GetStaticProps = async () => {
  const alphas = await prisma.alpha.findMany({
    include: {
      states: true,
    }
  });
  return {
    props: { alphas },
    revalidate: 10,
  };
};

const MapTasks: React.FC = ({alphas}) => {
  const { tasks } = useContext(MappingContext);

  return (
    <div>
      <h2>Choose Entry and Completion Criterions</h2>

      {tasks.map((activity) => (
        <div key={activity.id}>
          <h3>Criterions for {activity.name}</h3>

          <EntryStateList activity={activity} alphas={ alphas } />
          <EntryWorkProductList activity={activity} workProducts={activity.workProducts}/>

          <CompletionStateList activity={activity} alphas={ alphas } />
          <CompletionWorkProductList activity={activity} workProducts={activity.workProducts}/>
        </div>
      ))}

      <Link href="/input-patterns">
        <button>Next</button>
      </Link>
    </div>
  );
};

export default MapTasks;
