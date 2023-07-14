import React, { useState } from 'react';

const CompetencyList = ({ role, competencies }) => {
  const [selectedCompetencies, setSelectedCompetencies] = useState([]);

  const handleCompetencyChange = (event) => {
    const competencyId = event.target.value;
    if (selectedCompetencies.includes(competencyId)) {
      setSelectedCompetencies(selectedCompetencies.filter((id) => id !== competencyId));
      role.competencies = role.competencies.filter((id) => id !== competencyId);
    } else {
      setSelectedCompetencies([...selectedCompetencies, competencyId]);
      role.competencies = [...role.competencies, competencyId];
    }
    // TODO Update the role state using a proper state management technique
    // const updatedCompetencies = [...role.competencies, competencyId];
    // role.setCompetencies(updatedCompetencies);
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
      {/* TODO display concerned areas
      {role.areasOfConcern.map((area) => (
        <div key={area}>
          <p>{area}</p>
          {renderCompetencies(area)}
        </div>
      ))} */}
    </li>
  );
};

export default CompetencyList;
