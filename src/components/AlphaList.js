import React, { useContext } from 'react';
import { MappingContext } from '../context/context';

const AlphaList = ({ workProduct, alphas, subAlphas }) => {
  const { updateAlphas, updateSubAlphas } = useContext(MappingContext);

  const handleAlphaChange = (event) => {
    const alphaId = event.target.value;
    const isChecked = event.target.checked;
    updateAlphas(workProduct.id, alphaId, isChecked);
  };

  const handleSubAlphaChange = (event) => {
    const subAlphaId = event.target.value;
    const isChecked = event.target.checked;
    updateSubAlphas(workProduct.id, subAlphaId, isChecked);
  };

  const renderAlphas = () => {
    return alphas.map((alpha) => {
      return (
        <div key={alpha.id} className="flex items-center mr-4">
          <input
            type="checkbox"
            value={alpha.id}
            checked={workProduct.alphas.includes(alpha.id.toString())}
            onChange={handleAlphaChange}
            className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            className="ml-2 text-sm font-medium text-gray-600"
          >
            {alpha.name}
          </label>
        </div>
      );
    });
  };

  const renderSubAlphas = () => {
    return subAlphas.map((subAlpha) => {
      return (
        <div key={subAlpha.id} className="flex items-center mr-4">
          <input
            type="checkbox"
            value={subAlpha.id}
            checked={workProduct.subAlphas.includes(subAlpha.id.toString())}
            onChange={handleSubAlphaChange}
            className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            className="ml-2 text-sm font-medium text-gray-600"
          >
            {subAlpha.name}
          </label>
        </div>
      );
    });
  };

  return (
    <div className="px-5 pb-5 bg-white rounded-lg shadow">
      <h3 className="text-black my-4 text-xl">
        {workProduct.name}
      </h3>

      <div className="flex flex-col gap-3">
        <h4>Alphas:</h4>
        {renderAlphas()}
        {renderSubAlphas()}
      </div>
    </div>
  );
};

export default AlphaList;
