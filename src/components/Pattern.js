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

  return (
    <div>
      <label htmlFor="title">Name:</label>
      <input type="text" id="title" value={pattern.name} onChange={(e) => setPatternName(e.target.value)} />
      
      <label htmlFor="description">Description:</label>
      <input type="text" id="description" value={pattern.description} onChange={(e) => setPatternDescription(e.target.value)} />

      <h4>Check concerned Alphas</h4>
      <div>
        {alphas.map((alpha) => (
          <label key={alpha.id}>
            <input type="checkbox" value={alpha.id} checked={pattern.alphas.includes(alpha.id.toString())} onChange={handleAlphaChange} />
            {alpha.name}
          </label>
        ))}
        {subAlphas.map((subAlpha) => (
          <label key={subAlpha.id}>
            <input type="checkbox" value={subAlpha.id} checked={pattern.alphas.includes(subAlpha.id.toString())} onChange={handleAlphaChange} />
            {subAlpha.name}
          </label>
        ))}
      </div>

      <h4>Check concerned Activities</h4>
      <div>
        {tasks.map((activity) => (
          <label key={activity.id}>
            <input type="checkbox" value={activity.id} checked={pattern.activities.includes(activity.id.toString())} onChange={handleActivityChange} />
            {activity.name}
          </label>
        ))}
      </div>

      <h4>Check concerned Competencies</h4>
      <div>
        {competencies.map((competency) => (
          <label key={competency.id}>
            <input type="checkbox" value={competency.id} checked={pattern.competencies.includes(competency.id.toString())} onChange={handleCompetencyChange} />
            {competency.name}
          </label>
        ))}
      </div>

      <h4>Check Sub-Patterns</h4>
      <div>
        {patterns.map((subPattern) => (
          <label key={subPattern.id}>
            <input type="checkbox" value={subPattern.id} checked={pattern.subPatterns.includes(subPattern.id.toString())} onChange={handleSubPatternChange} />
            {subPattern.name}
          </label>
        ))}
      </div>

      <button onClick={handleDelete}>Delete Pattern</button>
    </div>
  );
};

export default Pattern;
