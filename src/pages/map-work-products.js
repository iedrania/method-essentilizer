import React, { useContext } from 'react';
import Link from 'next/link';
import { MappingContext } from '../context/context';
import AlphaList from '@/components/MapWorkProduct';

const MapWorkProducts = () => {
  const { activities } = useContext(MappingContext);

  return (
    <div>
      <h2>Map Alphas</h2>

      <ul>
        {activities.map((activity) => (
          <div key={activity.id}>
            <h3>{activity.name}</h3>

            {activity.workProducts.map((workProduct) => (
              <AlphaList key={workProduct.id} workProduct={workProduct} areasOfConcern={activity.areasOfConcern} />
            ))}
          </div>
        ))}
      </ul>

      <Link href="/map-roles">
        <button>Next</button>
      </Link>
    </div>
  );
};

export default MapWorkProducts;
