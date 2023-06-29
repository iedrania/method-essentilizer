import React, { useState } from 'react';
import { areasOfConcern as aoc, customerAlphas, solutionAlphas, workAlphas } from './data';

const AlphaList = ({ workProduct, areasOfConcern }) => {
  const [selectedAlphas, setSelectedAlphas] = useState([]);

  const handleAlphaChange = (event) => {
    const alphaId = event.target.value;
    if (selectedAlphas.includes(alphaId)) {
      setSelectedAlphas(selectedAlphas.filter((id) => id !== alphaId));
      workProduct.alphas = workProduct.alphas.filter((id) => id !== alphaId);
    } else {
      setSelectedAlphas([...selectedAlphas, alphaId]);
      workProduct.alphas = [...workProduct.alphas, alphaId];
    }
    // TODO Update the workProduct alphas using a proper state management technique
    // const updatedAlphas = [...workProduct.alphas, alphaId];
    // workProduct.setAlphas(updatedAlphas);
  };

  const renderAlphas = (areaId) => {
    let alphas;
    switch (areaId) {
      case "1":
        alphas = customerAlphas;
        break;
      case "2":
        alphas = solutionAlphas;
        break;
      case "3":
        alphas = workAlphas;
        break;
      default:
        alphas = [];
    }

    return alphas.map((alpha) => (
      <label key={alpha.id}>
        <input type="checkbox" value={alpha.id} onChange={handleAlphaChange} />
        {alpha.name}
      </label>
    ));
  };

  return (
    <li key={workProduct.id}>
      <h3>{workProduct.name}</h3>

      <h4>Alphas:</h4>
      {areasOfConcern.map((area) => (
        <div key={area}>
          <p>{aoc.find(areaObj => areaObj.id.toString() === area)?.name || ''}</p>
          {renderAlphas(area)}
        </div>
      ))}
    </li>
  );
};

export default AlphaList;
