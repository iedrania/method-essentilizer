import React, { useContext } from 'react';
import Link from 'next/link';
import { MappingContext } from '../context/context';
import ActivitySpaceList from '@/components/MapActivitySpace';

const MapTasks = () => {
  const { activities, setActivities } = useContext(MappingContext);

  return (
    <div>
      <h2>Map Tasks</h2>

      <ul>
        {activities.map((activity) => (
          <ActivitySpaceList key={activity.id} activity={activity} />
        ))}
      </ul>

      <Link href="/map-work-products">
        <button>Next</button>
      </Link>
    </div>
  );
};

export default MapTasks;
