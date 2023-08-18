import prisma from "../lib/prisma";
import React, { useContext } from "react";
import Router from "next/router";
import { MappingContext } from "../context/context";

export const getStaticProps: GetStaticProps = async () => {
  const methodIds = await prisma.method.findMany({
    select: {
      nameId: true,
    },
  });

  return {
    props: { methodIds },
    revalidate: 10,
  };
};

const InputMethod = ({ methodIds }) => {
  const { methodId, setMethodId, name, setName, creator, setCreator, description, setDescription } =
    useContext(MappingContext);

  const handleClick = () => {
    const methodIdsArray = methodIds.map(item => item.id);
    if (!methodIdsArray.includes(methodId)) {
      Router.push("/input-tasks");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5 bg-gray-100">
      <div className="m-auto my-3">
        <div>
          <div className="mt-5 bg-white rounded-lg shadow">
            <div className="flex">
              <div className="flex-1 py-5 overflow-hidden">
                <h1 className="text-3xl px-5 text-center font-semibold leading-none">
                  Input Method
                </h1>
              </div>
            </div>
            <div className="px-5 pb-5">
              <input
                onChange={(event) => setMethodId(event.target.value)}
                placeholder="Method ID"
                value={methodId}
                className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-4 text-base   transition duration-200 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-1 ring-gray-200"
              />
              <input
                onChange={(event) => setName(event.target.value)}
                placeholder="Name"
                value={name}
                className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-4 text-base   transition duration-200 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-1 ring-gray-200"
              />
              <input
                onChange={(event) => setCreator(event.target.value)}
                placeholder="Creator"
                value={creator}
                className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-4 text-base   transition duration-200 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-1 ring-gray-200"
              />

              <textarea
                onChange={(event) => setDescription(event.target.value)}
                className=" text-black placeholder-gray-600 w-full  px-4 py-2.5 mt-4 text-base   transition duration-200 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-1 ring-gray-200"
                cols={30}
                rows={10}
                placeholder="Description"
                value={description}
              ></textarea>

              <div className="flex flex-col gap-3 items-center pt-3">
                <button
                  className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-700  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out"
                  onClick={handleClick}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputMethod;
