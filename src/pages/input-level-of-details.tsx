import React, { useContext } from 'react';
import Link from 'next/link';
import { MappingContext } from '../context/context';
import LevelOfDetails from '@/components/LevelOfDetails';

const InputLevelOfDetails: React.FC = () => {
  const { tasks } = useContext(MappingContext);

  return (
    <div>
      <h2>Input Level Of Details</h2>

      <ul>
        {tasks.map((activity) => (
          <div key={activity.id}>
            <h3>{activity.name}</h3>

            {activity.workProducts.map((workProduct) => (
              <LevelOfDetails
                key={workProduct.id}
                activityId={activity.id}
                workProduct={workProduct}
              />
            ))}
          </div>
        ))}
      </ul>

      <Link href="/map-criterions">
        <button>Next</button>
      </Link>
    </div>
  );
};

export default InputLevelOfDetails;
