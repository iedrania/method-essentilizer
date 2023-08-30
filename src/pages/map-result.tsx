import prisma from "../lib/prisma";
import React, { useContext } from "react";
import Router from "next/router";
import { GetStaticProps } from "next";
import { MappingContext } from "../context/context";
import { downloadEssenceJson } from "@/utils/utilsEssence";

export const getStaticProps: GetStaticProps = async () => {
  const spaces = await prisma.activitySpace.findMany();
  const alphas = await prisma.alpha.findMany({
    include: {
      states: true,
    },
  });
  const competencies = await prisma.competency.findMany();
  return {
    props: { spaces, alphas, competencies },
    revalidate: 10,
  };
};

const MapResult: React.FC = ({ spaces, alphas, competencies }) => {
  const { methodId, name, creator, description, tasks, workProducts, roles, subAlphas, patterns } = useContext(MappingContext);

  const handleSaveClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { methodId, name, creator, description, tasks, workProducts, roles, subAlphas, patterns };
      await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
    } catch (error) {
      console.error(error);
    };
  };

  const handleJsonClick = () => {
    downloadEssenceJson(`${methodId} ${name} by ${creator} - Essentialized`, methodId, name, creator, description, tasks, workProducts, roles, subAlphas, patterns, spaces, alphas, competencies);
  };

  const printConsole = () => {
    console.log(methodId, name, creator, description, tasks, workProducts, roles, subAlphas, patterns);
  }

  return (
    <div className="bg-gray-100 ">
      <div className="flex flex-col items-center justify-center gap-5 ">
        <div className="m-auto my-3 w-11/12">
          <div className="my-5 bg-white rounded-lg shadow p-5">
            <div className="text-center">
              <h1 className="text-3xl">{name}</h1>
              <p>{`(${methodId})`}</p>
              <p>by {creator}</p>
              <p>Description:</p>
              <p>{description}</p>
            </div>

            <h2 className="mt-5 text-center font-semibold">Mapping Result</h2>

            {tasks.length > 0 && (
              <div>
                <h3 className="text-center font-semibold">Activities:</h3>
                <ul>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {tasks.map((activity) => (
                      <div key={activity.id} className="px-5 pb-5 bg-white rounded-lg shadow">
                        <li className="font-semibold">{activity.name}</li>

                        <div>
                          <h4>Activity Spaces:</h4>
                          {activity.activitySpaces.length > 0 ? (
                            <ul>
                              {activity.activitySpaces.map((activitySpace, index) => (
                                <li key={index}>{spaces.find(spaceObj => spaceObj.id.toString() === activitySpace)?.name || activitySpace}</li>
                              ))}
                            </ul>
                          ) : <p>No Activity Spaces chosen.</p>}
                        </div>

                        {workProducts.filter((workProduct) => workProduct.taskId === activity.id).length > 0 && (
                          <div>
                            <h4>Work Products:</h4>
                            <ul>
                              {workProducts
                                .filter((workProduct) => workProduct.taskId === activity.id)
                                .map((workProduct, index) => (
                                <div key={index}>
                                  <li>{workProduct.name}</li>

                                  {workProduct.alphas.length > 0 ? (
                                    <div>
                                    <h5>Alphas:</h5>
                                    <ul>
                                      {workProduct.alphas.map((alpha, index) => (
                                        <li key={index}>{alphas.find(alphaObj => alphaObj.id.toString() === alpha)?.name || alpha}</li>
                                      ))}
                                      {workProduct.subAlphas.map((alpha, index) => (
                                        <li key={index}>{subAlphas.find(subAlpha => subAlpha.id.toString() === alpha)?.name || alpha}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  ) : <p>No Alphas chosen.</p>}
                                </div>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div>
                          <h4>Entry Criterions:</h4>
                          {activity.entryCriterions.alphas.length + activity.entryCriterions.workProducts.length > 0 ? (
                            <ul>
                              {activity.entryCriterions.alphas.map((criterion) => (
                                <li key={criterion}>
                                  {alphas.find((alphaObj) => alphaObj.id.toString() === criterion[0])?.name ||
                                    subAlphas.find((alphaObj) => alphaObj.id.toString() === criterion[0])?.name ||
                                    criterion}::
                                  {alphas.find((alphaObj) => alphaObj.id.toString() === criterion[0])
                                    ?.states?.find((state) => state.id.toString() === criterion[1])?.name ||
                                    subAlphas.find((alphaObj) => alphaObj.id.toString() === criterion[0])
                                    ?.states.find((state) => state.id.toString() === criterion[1])?.name ||
                                    "State Not Found"}
                                    {console.log(alphas.find((alphaObj) => alphaObj.id.toString() === criterion[0]))}
                                </li>            
                              ))}
                              {activity.entryCriterions.workProducts.map((criterion) => (
                                <li key={criterion}>
                                  {workProducts.find((workProduct) => workProduct.id.toString() === criterion[0])?.
                                    name || criterion}::
                                  {criterion[1] || "Level Not Found"}
                                </li>            
                              ))}
                            </ul>
                          ) : <p>No Entry Criterions chosen.</p>}
                        </div>

                        <div>
                          <h4>Completion Criterions:</h4>
                          {activity.completionCriterions.alphas.length + activity.completionCriterions.workProducts.length > 0 ? (
                            <ul>
                              {activity.completionCriterions.alphas.map((criterion, index) => (
                                <li key={index}>
                                  {alphas.find((alphaObj) => alphaObj.id.toString() === criterion[0])?.name ||
                                    subAlphas.find((alphaObj) => alphaObj.id.toString() === criterion[0])?.name ||
                                    criterion}::
                                  {alphas.find((alphaObj) => alphaObj.id.toString() === criterion[0])
                                    ?.states?.find((state) => state.id.toString() === criterion[1])?.name ||
                                    subAlphas.find((alphaObj) => alphaObj.id.toString() === criterion[0])
                                    ?.states.find((state) => state.id.toString() === criterion[1])?.name ||
                                    "State Not Found"}
                                    {console.log(alphas.find((alphaObj) => alphaObj.id.toString() === criterion[0]))}
                                </li>            
                              ))}
                              {activity.completionCriterions.workProducts.map((criterion) => (
                                <li key={criterion}>
                                  {workProducts.find((workProduct) => workProduct.id.toString() === criterion[0])?.
                                    name || criterion}::
                                  {criterion[1] || "Level Not Found"}
                                </li>            
                              ))}
                            </ul>
                          ) : <p>No Completion Criterions chosen.</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </ul>
              </div>
            )}

            {roles.length > 0 && (
              <div>
                <h3 className="text-center font-semibold">Role Patterns:</h3>
                <ul>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {roles.map((role) => (
                      <div key={role.id} className="px-5 pb-5 bg-white rounded-lg shadow">
                        <li className="font-semibold">{role.name}</li>
                        
                        <div>
                          <h4>Competencies:</h4>
                          {role.competencies.length > 0 ? (
                            <ul>
                            {role.competencies.map((competency) => (
                              <li key={competency.id}>{competencies.find(compObj => compObj.id.toString() === competency)?.name || competency}</li>
                            ))}
                            </ul>
                          ) : <p>No Competencies chosen.</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </ul>
              </div>
            )}

            {patterns.length > 0 && (
              <div>
                <h3 className="text-center font-semibold">Other Patterns:</h3>
                <ul>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {patterns.map((pattern) => (
                      <div key={pattern.id} className="px-5 pb-5 bg-white rounded-lg shadow">
                        <h4>{pattern.name}</h4>
                        <p>{pattern.description}</p>
                        <h5>Alphas:</h5>
                        <ul>
                          {pattern.alphas.map((alpha) => (
                            <li key={alpha}>
                              {
                                alphas.find((alphaObj) => alphaObj.id.toString() === alpha)?.name ||
                                subAlphas.find((alphaObj) => alphaObj.id.toString() === alpha)?.name ||
                                alpha
                              }
                            </li>
                          ))}
                        </ul>
                        <h5>Activities:</h5>
                        <ul>
                          {pattern.activities.map((activity) => (
                            <li key={activity}>
                              {tasks.find(activityObj => activityObj.id.toString() === activity)?.name || activity}
                            </li>
                          ))}
                        </ul>
                        <h5>Competencies:</h5>
                        <ul>
                          {pattern.competencies.map((competency) => (
                            <li key={competency}>
                              {competencies.find(compObj => compObj.id.toString() === competency)?.name || competency}
                            </li>
                          ))}
                        </ul>
                        <h5>Sub-Patterns:</h5>
                        <ul>
                          {pattern.subPatterns.map((subPattern) => (
                            <li key={subPattern}>
                              {patterns.find(pattern => pattern.id.toString() === subPattern)?.name || subPattern}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </ul>
              </div>
            )}

            {subAlphas.length > 0 && (
              <div>
                <h3 className="text-center font-semibold">Sub-Alphas:</h3>
                <ul>
                  <div className="grid grid-cols-1">
                    {subAlphas.map((subAlpha) => (
                      <div key={subAlpha.id} className="px-5 pb-5 bg-white rounded-lg shadow">
                        <h4>{subAlpha.name}</h4>
                        <p>{subAlpha.description}</p>
                        <p>Alpha: {
                          alphas.find(alpha => alpha.id.toString() === subAlpha.alpha)?.name ||
                          subAlphas.find(alpha => alpha.id.toString() === subAlpha.alpha)?.name ||
                          subAlpha.alpha
                        }</p>

                        <h5>Work Products:</h5>
                        <ul>
                          {subAlpha.workProducts.map((wpId, index) => (
                            <li key={index}>{workProducts.find((workProduct) => workProduct.id === wpId).name}</li>
                          ))}
                        </ul>

                        <h5>States:</h5>
                        <ul>
                          {subAlpha.states.map((state) => (
                            <li key={state.id}>
                              {state.name}
                              <p>{state.description}</p>
                              <ul>
                                {state.checklist.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-2 mt-5">
              <button
                className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-700  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out"
                onClick={handleSaveClick}
              >
                Save to Database
              </button>
              <button
                className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-700  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out"
                onClick={handleJsonClick}
              >
                Download JSON
              </button>
              {/* <button
                className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-700  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out"
                onClick={printConsole}
              >
                Log
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapResult;
