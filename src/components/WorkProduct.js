import React, { useContext } from 'react';
import { MappingContext } from '../context/context';

const WorkProduct = ({ taskId, workProduct }) => {
  const { changeWorkProductName, deleteWorkProduct } = useContext(MappingContext);

  const handleDelete = () => {
    deleteWorkProduct(taskId, workProduct.id);
  };

  const setWorkProductName = (newName) => {
    changeWorkProductName(taskId, workProduct.id, newName);
  };

  return (
    <div>
      <input type="text" value={workProduct.name} onChange={(e) => setWorkProductName(e.target.value)} />

      <button onClick={handleDelete}>Delete Work Product</button>
    </div>
  );
};

export default WorkProduct;
