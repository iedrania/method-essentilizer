import React, { useState } from 'react';

const WorkProductList = ({ task, addWorkProduct }) => {
  const [workProductName, setWorkProductName] = useState('');

  const handleAddWorkProduct = () => {
    if (workProductName) {
      addWorkProduct(task.id, [{ id: task.workProducts + 1, name: workProductName }]);
      setWorkProductName('');
    }
  };

  return (
    <>
      <ul>
        {task.workProducts &&
          task.workProducts.map((workProduct) => (
            <li key={workProduct.id}>{workProduct.name}</li>
          ))}
      </ul>
      <input
        type="text"
        value={workProductName}
        onChange={(e) => setWorkProductName(e.target.value)}
      />
      <button onClick={handleAddWorkProduct}>Add Work Product</button>
    </>
  );
};

export default WorkProductList;
