import React, { useContext } from 'react';
import { MappingContext } from '../context/context';

const AlphaList = ({ workProduct, alphas, activityId }) => {
  const { updateAlphas } = useContext(MappingContext);

  const handleAlphaChange = (event) => {
    const alphaId = event.target.value;
    const isChecked = event.target.checked;
    updateAlphas(activityId, workProduct.id, alphaId, isChecked);
  };

  const renderAlphas = () => {
    return alphas.map((alpha) => (
      <label key={alpha.id}>
        <input type="checkbox" value={alpha.id} onChange={handleAlphaChange} />
        {alpha.name}
      </label>
    ));
  };

  return (
    <li>
      <h3>{workProduct.name}</h3>

      <h4>Alphas:</h4>
      {renderAlphas()}
    </li>
  );
};

export default AlphaList;
