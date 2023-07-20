import React, { useState } from 'react';

const WorkProductList = ({ task, addWorkProduct }) => {
  const [workProductName, setWorkProductName] = useState('');

  const handleAddWorkProduct = () => {
    if (workProductName) {
      addWorkProduct(task.id, [{ id: task.id + "-wp-" + (task.workProducts.length + 1), name: workProductName, alphas: [] }]);
      setWorkProductName('');
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default WorkProductList;
