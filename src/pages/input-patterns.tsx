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
  const { patterns, addPattern, subAlphas } = useContext(MappingContext);

  const handleAddPattern = () => {
    addPattern({
      id: patterns.length + 1,
      name: '',
      description: '',
      alphas: [],
      activities: [],
      competencies: [],
      subPatterns: [],
    });
  };

  return (
    <div className="bg-gray-100 h-screen py-4">
      <div className=" flex flex-col items-center justify-center gap-5 bg-gray-100 m-auto">
        <div className="m-auto my-3 w-11/12">
          <div>
            <div className="grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-2">
              {patterns.map((pattern) => (
                <Pattern key={pattern.id} pattern={pattern} alphas={alphas} competencies={competencies} subAlphas={subAlphas} />
              ))}
            </div>
            <div className="mt-5 bg-white rounded-lg shadow">
              <div className="flex">
                <div className="flex-1 py-5 overflow-hidden">
                  <h1 className="text-3xl px-5 text-center font-semibold leading-none">
                    Input Patterns
                  </h1>
                </div>
              </div>

              <div className="flex flex-col gap-3 items-center pt-3 px-4 pb-3">
                <button
                  onClick={handleAddPattern} type="button"
                  className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-700  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out"
                >
                  <span className="pl-2 mx-1">Add Pattern</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
                <Link href="/map-result" className="w-full">
                  <button
                    type="button"
                    className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-700  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out"
                  >
                    <span className="pl-2 mx-1">Next</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPatterns;
