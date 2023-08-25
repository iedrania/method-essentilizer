import React, { useContext, useState } from 'react';
import { MappingContext } from '../context/context';

const Pattern = ({ pattern, alphas, competencies, subAlphas }) => {
  const {
    changePatternName,
    changePatternDescription,
    deletePattern,
    updatePatternAlphas,
    updatePatternActivities,
    updatePatternCompetencies,
    updatePatternSubPatterns,
    tasks,
    patterns,
  } = useContext(MappingContext);

  const [showDescription, setShowDescription] = useState(false);

  const setPatternName = (newName) => {
    changePatternName(pattern.id, newName);
  };

  const setPatternDescription = (newDescription) => {
    changePatternDescription(pattern.id, newDescription);
  };

  const handleDelete = () => {
    deletePattern(pattern.id);
  };

  const handleAlphaChange = (event) => {
    const alphaId = event.target.value;
    const isChecked = event.target.checked;
    updatePatternAlphas(pattern.id, alphaId, isChecked);
  };

  const handleActivityChange = (event) => {
    const activityId = event.target.value;
    const isChecked = event.target.checked;
    updatePatternActivities(pattern.id, activityId, isChecked);
  };

  const handleCompetencyChange = (event) => {
    const competencyId = event.target.value;
    const isChecked = event.target.checked;
    updatePatternCompetencies(pattern.id, competencyId, isChecked);
  };

  const handleSubPatternChange = (event) => {
    const subPatternId = event.target.value;
    const isChecked = event.target.checked;
    console.log(pattern.id, subPatternId)
    updatePatternSubPatterns(pattern.id, subPatternId, isChecked);
  };

  const toggleDescriptionVisibility = () => {
    setShowDescription((prev) => !prev);
  };

  return (
    <div className="px-5 pb-5 bg-white rounded-lg shadow">
      <input
        className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-4 text-base   transition duration-200 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-1 ring-gray-200"
        type="text"
        placeholder="Pattern Name"
        value={pattern.name}
        onChange={(e) => setPatternName(e.target.value)}
      />

      {showDescription && (
        <div>
          <input
            className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-4 text-base   transition duration-200 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-1 ring-gray-200"
            type="text"
            placeholder="Pattern Description"
            value={pattern.description}
            onChange={(e) => setPatternDescription(e.target.value)}
          />
        </div>
      )}

      <div className="flex flex-col gap-2 mt-4 mb-4">
        <button
          className="relative w-full flex justify-center items-center py-2 text-sm  tracking-wide capitalize  rounded-md hover:bg-gray-100 text-black outline-1 border-2 border-gray-800 outline-black  transition duration-300 transform active:scale-95 ease-in-out"
          onClick={toggleDescriptionVisibility}
        >
          {showDescription ? 'Hide Description' : 'Show Description'}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <h4>Check concerned Alphas:</h4>
        <div>
          {alphas.map((alpha) => (
            <div key={alpha.id} className="flex items-center mr-4">
              <input
                className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
                type="checkbox"
                value={alpha.id}
                checked={pattern.alphas.includes(alpha.id.toString())}
                onChange={handleAlphaChange}
              />
              <label className="ml-2 text-sm font-medium text-gray-600">
                {alpha.name}
              </label>
            </div>
          ))}
          {subAlphas.map((subAlpha) => (
            <div key={subAlpha.id} className="flex items-center mr-4">
              <input
                className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
                type="checkbox"
                value={subAlpha.id}
                checked={pattern.alphas.includes(subAlpha.id.toString())}
                onChange={handleAlphaChange}
              />
              <label className="ml-2 text-sm font-medium text-gray-600">
                {subAlpha.name}
              </label>
            </div>
          ))}
        </div>
      
        <h4>Check concerned Activities:</h4>
        <div>
          {tasks.map((activity) => (
            <div key={activity.id} className="flex items-center mr-4">
              <input
                className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
                type="checkbox"
                value={activity.id}
                checked={pattern.activities.includes(activity.id.toString())}
                onChange={handleActivityChange}
              />
              <label className="ml-2 text-sm font-medium text-gray-600">
                {activity.name}
              </label>
            </div>
          ))}
        </div>

        <h4>Check concerned Competencies:</h4>
        <div>
          {competencies.map((competency) => (
            <div key={competency.id} className="flex items-center mr-4">
              <input
                className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
                type="checkbox"
                value={competency.id}
                checked={pattern.competencies.includes(competency.id.toString())}
                onChange={handleCompetencyChange}
              />
              <label className="ml-2 text-sm font-medium text-gray-600">
                {competency.name}
              </label>
            </div>
          ))}
        </div>

        <h4>Check Sub-Patterns:</h4>
        <div>
          {patterns.map((subPattern) => {
            if (pattern.id !== subPattern.id) {
              return (
                <div key={subPattern.id} className="flex items-center mr-4">
                  <input
                    className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
                    type="checkbox"
                    value={subPattern.id}
                    checked={pattern.subPatterns.includes(subPattern.id.toString())}
                    onChange={handleSubPatternChange}
                  />
                  <label className="ml-2 text-sm font-medium text-gray-600">
                    {subPattern.name}
                  </label>
                </div>
              );
            }
            return null;
          })}
        </div>

        <button
          className="mt-2 relative w-full flex justify-center items-center py-2 text-sm  tracking-wide capitalize  rounded-md hover:bg-gray-100 text-black outline-1 border-2 border-gray-800 outline-black  transition duration-300 transform active:scale-95 ease-in-out"
          onClick={handleDelete}
        >
          Delete Pattern
        </button>
      </div>
    </div>
  );
};

export default Pattern;
