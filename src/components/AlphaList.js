import React, { useContext } from 'react';
import { MappingContext } from '../context/context';

const AlphaList = ({ workProduct, alphas, activityId }) => {
  const { subAlphas, updateAlphas, updateSubAlphas } = useContext(MappingContext);

  const handleAlphaChange = (event) => {
    const alphaId = event.target.value;
    const isChecked = event.target.checked;
    updateAlphas(activityId, workProduct.id, alphaId, isChecked);
  };

  const handleSubAlphaChange = (event) => {
    const subAlphaId = event.target.value;
    const isChecked = event.target.checked;
    updateSubAlphas(activityId, workProduct.id, subAlphaId, isChecked);
  };

  const renderAlphas = () => {
    return alphas.map((alpha) => (
      <label key={alpha.id}>
        <input type="checkbox" value={alpha.id} onChange={handleAlphaChange} />
        {alpha.name}
      </label>
    ));
  };

  const renderSubAlphas = () => {
    return subAlphas.map((subAlpha) => (
      <label key={subAlpha.id}>
        <input type="checkbox" value={subAlpha.id} onChange={handleSubAlphaChange} />
        {subAlpha.name}
      </label>
    ));
  };

  return (
    <li>
      <h3>{workProduct.name}</h3>

      <h4>Alphas:</h4>
      {renderAlphas()}
      {renderSubAlphas()}
    </li>
  );
};

export default AlphaList;
