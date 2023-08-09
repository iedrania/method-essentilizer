import prisma from '../lib/prisma';
import React, { useContext } from 'react';
import { GetStaticProps } from "next"
import Link from 'next/link';
import { MappingContext } from '../context/context';
import AlphaStateList from '@/components/AlphaStateList';

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

      <ul>
        {tasks.map((activity) => (
          <AlphaStateList key={activity.id} activity={activity} alphas={ alphas } />
        ))}
      </ul>

      <Link href="/input-patterns">
        <button>Next</button>
      </Link>
    </div>
  );
};

export default MapTasks;
