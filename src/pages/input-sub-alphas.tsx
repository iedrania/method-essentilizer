import prisma from '../lib/prisma';
import React, { useContext } from 'react';
import Link from 'next/link';
import { MappingContext } from '../context/context';
import { GetStaticProps } from "next"
import SubAlpha from '@/components/SubAlpha';

export const getStaticProps: GetStaticProps = async () => {
  const alphas = await prisma.alpha.findMany({
    include: {
      states: true,
    },
  });
  return {
    props: { alphas },
    revalidate: 10,
  };
};

const InputSubAlphas = ({alphas}) => {
  const { subAlphas, addSubAlpha } = useContext(MappingContext);

  const handleAddSubAlpha = () => {
    addSubAlpha({
      id: subAlphas.length + 1,
      name: '',
      description: '',
      workProducts: [],
      states: alphas.find((alpha) => alpha.id == '1')?.states,
      alpha: '1',
    });
  };

  return (
    <div>
      <h2>Insert Sub-Alphas</h2>

      {subAlphas.map((subAlpha) => (
        <SubAlpha key={subAlpha.id} subAlpha={subAlpha} alphas={alphas} />
      ))}

      <button onClick={handleAddSubAlpha}>Add Sub-Alpha</button>

      <Link href="/map-areas">
        <button>Next</button>
      </Link>
    </div>
  );
}

export default InputSubAlphas;
