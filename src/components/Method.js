import React, { useContext } from 'react';
import { MappingContext } from '../context/context';
import Router from 'next/router'
import styles from '@/styles/Method.module.css';

const Method = ({ method, nextId }) => {
  const { setMethodId, setName, setDescription, setTasks, setRoles } = useContext(MappingContext);

  const handleMethodClick = () => {
    function getNumberIdFromString(str) {
      const parts = str.split("-");
      const lastPart = parts[parts.length - 1];
      return Number(lastPart);
    }

    function getStringIdFromString(str) {
      const parts = str.split("-");
      return parts[parts.length - 1];
    }

    function idsToArray(array) {
      return array.map((item) => item.id.toString());
    }

    function idsToArrayTrim(array) {
      return array.map((item) => getStringIdFromString(item.id));
    }

    function twoIdsToArray(array) {
      return array.map((item) => [getStringIdFromString(item.taskId), getStringIdFromString(item.id)]);
    }

    method.activities.forEach((task) => {
      task.id = getNumberIdFromString(task.nameId);
      task.areasOfConcern = idsToArray(task.areasOfConcern)
      task.activitySpaces = idsToArray(task.activitySpaces)
      task.workProducts.forEach((workProduct) => {
        workProduct.id = getNumberIdFromString(workProduct.id);
        workProduct.taskId = getNumberIdFromString(workProduct.taskId)
        workProduct.alphas = idsToArray(workProduct.alphas)
      });
    });

    method.roles.forEach((role) => {
      role.id = getNumberIdFromString(role.id);
      role.areasOfConcern = idsToArray(role.areasOfConcern)
      role.competencies = idsToArray(role.competencies)
      role.performedTasks = idsToArrayTrim(role.performedTasks)
      role.assignedWorkProducts = twoIdsToArray(role.assignedWorkProducts)
    });

    console.log("result method", method)

    setMethodId(nextId)
    setName(method.name);
    setDescription(method.description);
    setTasks(method.activities);
    setRoles(method.roles);
    Router.push('/input-method');
  };

  return (
    <div className={styles.methodBox} onClick={handleMethodClick}>
      <h3 className={styles.methodName}>{method.name}</h3>
      <p className={styles.methodDescription}>{method.description}</p>
    </div>
  );
};

export default Method;
