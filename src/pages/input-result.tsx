import React, { useContext } from "react";
import Router from "next/router";
import { MappingContext } from "../context/context";
import { downloadJson } from "@/utils/utils";

const InputResult = () => {
  const { name, creator, description, tasks, roles } =
    useContext(MappingContext);

  const handleClick = () => {
    Router.push("/input-sub-alphas");
  };

  const handleJsonClick = () => {
    downloadJson(
      `${name} by ${creator}`,
      name,
      creator,
      description,
      tasks,
      roles
    );
  };

  const printConsole = () => {
    console.log(tasks, roles);
  };

  return (
    <div className="bg-gray-100 ">
      <div className="flex flex-col items-center justify-center gap-5 ">
        <div className="m-auto my-3 w-11/12">
          <div className="my-5 bg-white rounded-lg shadow p-5">
            <div className="text-center">
              <h1 className="text-3xl">{name}</h1>
              <p>by {creator}</p>
              <p>Description:</p>
              <p>{description}</p>
            </div>

            <h2 className="mt-5 text-center font-semibold">Insert Result</h2>

            <h3 className="text-center font-semibold">Tasks</h3>
            <ul className="text-center">
              <div className="grid grid-cols-3">
                {tasks.map((task, index) => (
                  <div key={index}>
                    <li className="font-semibold">{task.name}</li>

                    {task.workProducts.length > 0 && (
                      <div>
                        <h4>Work Products:</h4>
                        <ul>
                          {task.workProducts.map((workProduct) => (
                            <li key={workProduct.id}>{workProduct.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ul>

            <h3 className="text-center font-semibold mt-3">Roles</h3>
            <ul className="grid grid-cols-3 text-center">
              {roles.map((role, index) => (
                <div key={index}>
                  <li className="font-semibold">{role.name}</li>

                  {role.performedTasks.length > 0 && (
                    <div>
                      <h4>Performed Tasks:</h4>
                      <ul>
                        {role.performedTasks.map((taskId) => (
                          <li key={taskId}>
                            {tasks.find((item) => item.id == taskId).name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {role.assignedWorkProducts.length > 0 && (
                    <div>
                      <h4>Assigned Work Products:</h4>
                      <ul>
                        {role.assignedWorkProducts.map((idTuple) => {
                          const task = tasks.find(
                            (item) => item.id == idTuple[0]
                          );
                          const workProduct = task?.workProducts.find(
                            (item) => item.id == idTuple[1]
                          );
                          return (
                            <li key={`${idTuple[0]}-${idTuple[1]}`}>
                              {workProduct
                                ? workProduct.name
                                : "Work Product Not Found"}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </ul>

            <div className="flex flex-col gap-2 mt-5">
              <button
                className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-700  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out"
                onClick={handleClick}
              >
                Next
              </button>
              <button
                className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-700  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out"
                onClick={handleJsonClick}
              >
                Download JSON
              </button>
              <button
                className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-700  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out"
                onClick={printConsole}
              >
                Log
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputResult;
