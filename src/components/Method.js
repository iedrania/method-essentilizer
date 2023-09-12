import React, { useContext } from 'react';
import { MappingContext } from '../context/context';
import Router from 'next/router'
import styles from '@/styles/Method.module.css';
import { v4 as uuidv4 } from 'uuid';

const Method = ({ method }) => {
  const { setMethodId, setName, setCreator, setDescription, setTasks, setWorkProducts, setRoles } = useContext(MappingContext);

  const handleMethodClick = () => {
    console.log(method);
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
      return array.map((item) => item.id);
    }

    function nameIdsToArray(array) {
      return array.map((item) => item.nameId);
    }

    function idsToArrayTrim(array) {
      return array.map((item) => getStringIdFromString(item.id));
    }

    function twoIdsToArray(array) {
      return array.map((item) => [getStringIdFromString(item.taskId), getStringIdFromString(item.id)]);
    }

    const alphas = [
      'Stakeholders',
      'Opportunity',
      'Requirements',
      'Software System',
      'Team',
      'Work',
      'Way-of-Working',
    ];

    const workProducts= [];

    method.activities.forEach((task) => {
      task.id = task.nameId;

      const criterion = task.entryCriterions;
      const alph = [];
      criterion.alphas.forEach((alpha) => {
        if (alphas.includes(alpha.split(".")[0])) {
          alph.push([alpha.split(".")[0], alpha.split(".")[1]])
          console.log(alph)
        }
      });
      const wpr = criterion.workProducts.map((wp => [wp.split(".")[0], wp.split(".")[1]]));
      task.entryCriterions = { alphas: alph, workProducts: wpr };

      const ccriterion = task.completionCriterions;
      const calph = [];
      ccriterion.alphas.forEach((alpha) => {
        if (alphas.includes(alpha.split(".")[0])) {
          calph.push([alpha.split(".")[0], alpha.split(".")[1]])
          console.log(calph)
        }
      });
      const cwpr = ccriterion.workProducts.map((wp => [wp.split(".")[0], wp.split(".")[1]]));
      task.completionCriterions = {alphas: calph, workProducts: cwpr};

      task.areasOfConcern = idsToArray(task.areasOfConcern)
      task.activitySpaces = idsToArray(task.activitySpaces)
      task.workProducts.forEach((workProduct) => {
        workProduct.areasOfConcern = idsToArray(workProduct.areasOfConcern)
        workProduct.alphas = idsToArray(workProduct.alphas)
        workProduct.subAlphas = [];
        workProducts.push(workProduct)
      });
      task.workProducts.map((workProduct) => workProduct.nameId);
    });

    workProducts.forEach((workProduct) => {
      workProduct.id = workProduct.nameId;
      workProduct.taskId = workProduct.activityNameId;
    });

    const patterns = []
    const roles = []

    method.patterns.forEach((role) => {
      if (role.role) {
        roles.push(role)
      } else {
        patterns.push(role)
      }
    });

    roles.forEach((role) => {
      role.id = role.nameId;
      role.areasOfConcern = idsToArray(role.areasOfConcern)
      role.competencies = idsToArray(role.competencies)
      role.competencyLevels = role.competencies.map((competency) => {
        return [competency, "Applies"]
      })
      role.performedTasks = nameIdsToArray(role.activities)
      role.assignedWorkProducts = nameIdsToArray(role.assignedWorkProducts)
    });

    console.log("result method", method)
    
    // update ids
    method.activities.forEach((task) => {
      const newId = uuidv4();
      const oldId = task.id
      task.id = newId;

      workProducts.forEach((wp) => {
        wp.taskId === oldId ? wp.taskId = newId : wp.taskId = wp.taskId;
      })

      roles.forEach((role) => {
        role.activities.map((taskId) => taskId === oldId ? newId : taskId)
      })
    });

    workProducts.forEach((wp) => {
      const newId = uuidv4();
      const oldId = wp.id
      wp.id = newId;

      roles.forEach((role) => {
        role.assignedWorkProducts.map((taskId) => taskId === oldId ? newId : taskId)
      })
    })

    roles.forEach((role) => {
      const newId = uuidv4();
      const oldId = role.id
      role.id = newId;
    })

    const tasks = method.activities;

    setMethodId(method.nameId)
    setName(method.name);
    setCreator(method.creator);
    setDescription(method.description);
    setTasks(tasks);
    setWorkProducts(workProducts);
    setRoles(roles);
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
