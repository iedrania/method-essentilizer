import prisma from '../lib/prisma';
import React, { useContext } from 'react';
import Link from 'next/link';
import { GetStaticProps } from "next"
import { MappingContext } from '../context/context';
import AlphaList from '@/components/AlphaList';

export const getStaticProps: GetStaticProps = async () => {
  const alphas = await prisma.alpha.findMany();
  return {
    props: { alphas },
    revalidate: 10,
  };
};

const MapWorkProducts: React.FC = ({alphas}) => {
  const { tasks } = useContext(MappingContext);

  return (
    <div>
      <h2>Map Alphas</h2>

      <ul>
        {tasks.map((activity) => (
          <div key={activity.id}>
            <h3>{activity.name}</h3>

            {activity.workProducts.map((workProduct) => (
              <AlphaList key={workProduct.id} workProduct={workProduct} alphas={ alphas.filter((item) => (activity.areasOfConcern).includes(String(item.areaOfConcernId))) } activityId={activity.id} />
            ))}
          </div>
        ))}
      </ul>

      <Link href="/map-tasks">
        <button>Next</button>
      </Link>
    </div>
  );
};

export default MapWorkProducts;
