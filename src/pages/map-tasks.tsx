import prisma from '../lib/prisma';
import React, { useContext } from 'react';
import { GetStaticProps } from "next"
import Link from 'next/link';
import { MappingContext } from '../context/context';
import ActivitySpaceList from '@/components/ActivitySpaceList';

export const getStaticProps: GetStaticProps = async () => {
  const spaces = await prisma.activitySpace.findMany();
  return {
    props: { spaces },
    revalidate: 10,
  };
};

const MapTasks: React.FC = ({spaces}) => {
  const { activities, setActivities } = useContext(MappingContext);

  return (
    <div>
      <h2>Map Tasks</h2>

      <ul>
        {activities.map((activity) => (
          <ActivitySpaceList key={activity.id} activity={activity} setActivities={setActivities} activitySpaces={ spaces.filter((item) => (activity.areasOfConcern).includes(String(item.areaOfConcernId))) } />
        ))}
      </ul>

      <Link href="/map-work-products">
        <button>Next</button>
      </Link>
    </div>
  );
};

export default MapTasks;
