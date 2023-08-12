import React, { useContext, useState } from 'react';
import { MappingContext } from '../context/context';

const WorkProduct = ({ taskId, workProduct }) => {
  const { changeWorkProductName, changeWorkProductDescription, deleteWorkProduct } = useContext(MappingContext);

  const [showDescription, setShowDescription] = useState(false);

  const handleDelete = () => {
    deleteWorkProduct(taskId, workProduct.id);
  };

  const setWorkProductName = (newName) => {
    changeWorkProductName(taskId, workProduct.id, newName);
  };

  const setWorkProductDescription = (newDescription) => {
    changeWorkProductDescription(taskId, workProduct.id, newDescription);
  };

  const toggleDescriptionVisibility = () => {
    setShowDescription((prev) => !prev);
  };

  return (
    <div>
      <label htmlFor="title">Name:</label>
      <input type="text" id="title" value={workProduct.name} onChange={(e) => setWorkProductName(e.target.value)} />

      {showDescription && (
        <div>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" value={workProduct.description} onChange={(e) => setWorkProductDescription(e.target.value)} />
        </div>
      )}

      <button onClick={toggleDescriptionVisibility}>
        {showDescription ? 'Hide Description' : 'Show Description'}
      </button>

      <button onClick={handleDelete}>Delete Work Product</button>
    </div>
  );
};

export default WorkProduct;
