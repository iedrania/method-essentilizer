import React, { useContext } from 'react';
import { MappingContext } from '../context/context';

const CompetencyList = ({ role, competencies }) => {
  const { updateCompetencies, updateCompetencyLevel } = useContext(MappingContext);

  const handleCompetencyChange = (event) => {
    const competencyId = event.target.value;
    const isChecked = event.target.checked;
    updateCompetencies(role.id, competencyId, isChecked);
    updateCompetencyLevel(role.id, competencyId, "Applies", isChecked);
  };

  const handleCompetencyLevelChange = (event, competencyId) => {
    const levelName = event.target.value;
    updateCompetencyLevel(role.id, competencyId, levelName, true);
  };

  const renderCompetencies = () => {
    return competencies.map((competency) => (
      <div key={competency.id}>
        <div className="flex items-center mr-4">
          <input
            type="checkbox"
            value={competency.id}
            checked={role.competencies.includes(competency.id.toString())}
            onChange={handleCompetencyChange}
            className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
          />
          <label className="ml-2 text-sm font-medium text-gray-600">
            {competency.name}
          </label>
        </div>

        {role.competencies.includes(competency.id.toString()) && (
          <div>
            <p>Choose level of {competency.name}</p>
            <select
              value={role.competencyLevels.find((competencyLevel) =>
                competencyLevel[0] === competency.id
              )[1]}
              onChange={(e) => handleCompetencyLevelChange(e, competency.id)}
            >
              {competency.levels.map((level) => (
                <option key={`${competency.id}-${level.name}`} value={level.name}>
                  {level.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="px-5 pb-5 bg-white rounded-lg shadow">
      <h3 className="text-black my-4 text-xl">
        {role.name}
      </h3>

      <div className="flex flex-col gap-3">
        <h4>Competencies:</h4>
        {renderCompetencies()}
      </div>
    </div>
  );
};

export default CompetencyList;
