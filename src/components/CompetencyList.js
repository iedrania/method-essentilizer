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
      <label key={competency.id}>
        <input
          type="checkbox"
          value={competency.id}
          checked={role.competencies.includes(competency.id.toString())}
          onChange={handleCompetencyChange}
        />
        {competency.name}
        {role.competencies.includes(competency.id.toString()) && (
          <div>
            <p>Choose level of {competency.name}</p>
            <select
              value={role.competencyLevels.find((competencyLevel) =>
                competencyLevel.startsWith(`${competency.id}.`)
              ).split(".")[1]}
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
      </label>
    ));
  };

  return (
    <li>
      <h3>{role.name}</h3>

      <h4>Competencies:</h4>
      {renderCompetencies()}
    </li>
  );
};

export default CompetencyList;
