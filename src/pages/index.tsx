import prisma from "../lib/prisma";
import React, { useContext } from "react";
import Router from "next/router";
import { MappingContext } from "../context/context";
import Method from "@/components/Method";
import styles from "@/styles/Home.module.css";

export const getStaticProps: GetStaticProps = async () => {
  const latestMethod = await prisma.method.findFirst({
    orderBy: {
      id: "desc",
    },
    select: {
      id: true,
    },
  });

  const nextId = latestMethod ? latestMethod.id + 1 : 1;

  const methods = await prisma.method.findMany({
    select: {
      id: true,
      name: true,
      creator: true,
      description: true,
      activities: {
        include: {
          areasOfConcern: {
            select: {
              id: true,
            },
          },
          activitySpaces: {
            select: {
              id: true,
            },
          },
          workProducts: {
            include: {
              alphas: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
      roles: {
        include: {
          areasOfConcern: {
            select: {
              id: true,
            },
          },
          competencies: {
            select: {
              id: true,
            },
          },
          performedTasks: {
            select: {
              nameId: true,
            },
          },
          assignedWorkProducts: {
            select: {
              nameId: true,
              activityNameId: true,
            },
          },
        },
      },
    },
  });

  return {
    props: { nextId, methods },
    revalidate: 10,
  };
};

export default function Home({ nextId, methods }) {
  const { setMethodId, setName, setCreator, setDescription, setTasks, setRoles } =
    useContext(MappingContext);

  const resetDatabase = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/delete/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const insertDatabase = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/post/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = () => {
    setMethodId(nextId);
    setName("");
    setCreator("");
    setDescription("");
    setTasks([]);
    setRoles([]);
    Router.push("/input-method");
  };

  const renderMethods = () => {
    if (methods.length) {
      return methods.map((method) => (
        <Method key={method.id} method={method} nextId={nextId} />
      ));
    } else {
      return <p>No methods available.</p>;
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
                  Method Essentializer
                </h1>
              </div>
            </div>
            <div className="px-5 pb-5">
              {/* <input
              placeholder="Name"
              className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-200"
            /> */}

              <div className="flex flex-col gap-3 items-center pt-3">
                <button
                  onClick={handleCreate}
                  type="button"
                  className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-700  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 24 24"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#FFFFFF"
                  >
                    <g>
                      <rect fill="none" height={24} width={24} />
                    </g>
                    <g>
                      <g>
                        <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z" />
                      </g>
                    </g>
                  </svg>
                  <span className="pl-2 mx-1">Create new method</span>
                </button>
                <button
                  onClick={handleDelete}
                  type="button"
                  className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-700  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out"
                >
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
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>

                  <span className="pl-2 mx-1">Clear User Data</span>
                </button>
                <button
                  onClick={insertDatabase}
                  type="button"
                  className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-700  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out"
                >
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
                      d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                    />
                  </svg>

                  <span className="pl-2 mx-1">Insert Database</span>
                </button>
                <button
                  onClick={resetDatabase}
                  type="button"
                  className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-700  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out"
                >
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
                      d="M15 13.5H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                    />
                  </svg>

                  <span className="pl-2 mx-1">Reset Database</span>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-5 bg-white shadow cursor-pointer rounded-xl">
            <div className="flex p-3">
              {renderMethods()}
              {/* <div className="flex-1 py-5 pl-5 overflow-hidden">
                <ul>
                  <li className="text-xs text-gray-600 uppercase ">Receiver</li>
                  <li>Max Mustermann</li>
                  <li>Musterstrasse 1</li>
                  <li>4020 Linz</li>
                </ul>
              </div>
              <div className="flex-1 py-5 pl-1 overflow-hidden">
                <ul>
                  <li className="text-xs text-gray-600 uppercase">Sender</li>
                  <li>Rick Astley</li>
                  <li>Rickrolled 11</li>
                  <li>1000 Vienna</li>
                </ul>
              </div> */}
              <div className="flex-none pt-2.5 pr-2.5 pl-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
