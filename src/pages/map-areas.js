import React, { useContext } from 'react';
import Link from 'next/link';
import { MappingContext } from '../context/context';
import AreaList from '../components/MapArea';

const MapAreas = () => {
  const { activities, setActivities } = useContext(MappingContext);

  return (
    <div>
      <h2>Choose Area of Concern</h2>

      <ul>
        {activities.map((activity) => (
          <AreaList key={activity.id} activity={activity} />
        ))}
      </ul>

      <Link href="/map-tasks">
        <button>Next</button>
      </Link>
    </div>
  );
};

export default MapAreas;
