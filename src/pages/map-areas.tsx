import prisma from '../lib/prisma';
import React, { useContext } from "react"
import { GetStaticProps } from "next"
import Link from 'next/link';
import { MappingContext } from '../context/context';
import AreaList from '../components/AreaList';

export const getStaticProps: GetStaticProps = async () => {
  const areas = await prisma.areaOfConcern.findMany();
  return {
    props: { areas },
    revalidate: 10,
  };
};

const MapAreas: React.FC = ({ areas }) => {
  const { activities, setActivities } = useContext(MappingContext);

  return (
    <div>
      <h2>Choose Area of Concern</h2>

      <ul>
        {activities.map((activity) => (
          <AreaList key={activity.id} activity={activity} setActivities={setActivities} areasOfConcern={areas} />
        ))}
      </ul>

      {/* TODO for roles with no related task/work product */}

      <Link href="/map-tasks">
        <button>Next</button>
      </Link>
    </div>
  );
};

export default MapAreas
