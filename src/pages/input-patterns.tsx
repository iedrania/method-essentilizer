import prisma from '../lib/prisma';
import React, { useContext } from 'react';
import { GetStaticProps } from "next"
import Link from 'next/link';
import { MappingContext } from '../context/context';
import Pattern from '@/components/Pattern';

export const getStaticProps: GetStaticProps = async () => {
  const alphas = await prisma.alpha.findMany();
  const competencies = await prisma.competency.findMany();
  return {
    props: { alphas, competencies },
    revalidate: 10,
  };
};

const InputPatterns: React.FC = ({alphas, competencies}) => {
  const { patterns, addPattern } = useContext(MappingContext);

  const handleAddPattern = () => {
    addPattern({
      id: patterns.length + 1,
      name: '',
      description: '',
      alphas: [],
      activities: [],
      competencies: [],
      subPatternIds: [],
    });
  };

  return (
    <div>
      <h2>Input Patterns</h2>

      <ul>
        {patterns.map((pattern) => (
          <Pattern key={pattern.id} pattern={pattern} alphas={alphas} competencies={competencies} />
        ))}
      </ul>

      <button onClick={handleAddPattern}>Add Pattern</button>

      <Link href="/map-result">
        <button>Next</button>
      </Link>
    </div>
  );
};

export default InputPatterns;
