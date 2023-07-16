import React, { useContext } from 'react';
import { MappingContext } from '../context/context';

const CompetencyList = ({ role, competencies }) => {
  const { updateCompetencies } = useContext(MappingContext);

  const handleCompetencyChange = (event) => {
    const competencyId = event.target.value;
    const isChecked = event.target.checked;
    updateCompetencies(role.id, competencyId, isChecked);
  };

  const renderCompetencies = () => {
    return competencies.map((competency) => (
      <label key={competency.id}>
        <input type="checkbox" value={competency.id} onChange={handleCompetencyChange} />
        {competency.name}
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
