import React, { useContext, useRef } from "react";
import Router from "next/router";
import { MappingContext } from "../context/context";
import { read, utils } from "xlsx";
import { v4 as uuidv4 } from 'uuid';

const FileUploadButton = () => {
  const {
    setInputExcel,
    setMethodId,
    setName,
    setCreator,
    setDescription,
    setTasks,
    setWorkProducts,
    setRoles,
    setSubAlphas
  } = useContext(MappingContext);

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0]; // First sheet
        const sheet = workbook.Sheets[sheetName];
        const dataArray = utils.sheet_to_json(sheet, { header: 1 });
        console.log("excel array", dataArray);

        if (dataArray) {
          convertExcelToContext(dataArray);

          setInputExcel(true);
          Router.push("/input-result");
        };
      };
      fileReader.readAsArrayBuffer(file);
    }
  };

  const convertExcelToContext = (excelArray) => {
    const tasks = extractTasksFromExcel(excelArray);
    const roles = extractRolesFromExcel(excelArray);

    setMethodId(excelArray[0][0]);
    setName(excelArray[1][0]);
    setCreator(excelArray[2][1]);
    setDescription(excelArray[4][0]);

    const tasksResult = restructureTasks(tasks);
    const restructuredTasks = tasksResult[0];
    const workProducts = tasksResult[1];
    const subAlphas = tasksResult[2];
    setTasks(restructuredTasks);
    setWorkProducts(workProducts);
    setSubAlphas(subAlphas);

    const restructuredRoles = restructureRoles(roles, restructuredTasks, workProducts);
    setRoles(restructuredRoles);

    console.log("tasks", restructuredTasks);
    console.log("workProducts", workProducts);
    console.log("roles", restructuredRoles);
    console.log("subAlphas", subAlphas)
  };

  const extractTasksFromExcel = (array) => {
    const tasks = [];
    let inTasksSection = false;
    let currentTask = [];

    for (const line of array) {
      if (line[0] === 'Tasks') {
        inTasksSection = true;
      } else if (line[0] === 'Roles') {
        if (currentTask.length > 0) {
          tasks.push(currentTask);
        }

        inTasksSection = false;
      } else if (inTasksSection) {
        if (line[0] === 'Task') {
          if (currentTask.length > 0) {
            tasks.push(currentTask);
            currentTask = [];
          }
        }
        currentTask.push(line);
      }
    }

    console.log("tasks", tasks);
    return tasks;
  };

  function restructureTasks(tasks) {
    const result = [];
    const workProducts = [];
    const subAlphas = [];
    const allExtractedWorkProducts = [];

    for (const task of tasks) {
      const extractedWorkProducts = extractColumnContents(task, 3, 'Work products', 'Conditions');
      allExtractedWorkProducts.push(...extractedWorkProducts);
      console.log("All Extracted Work Products", allExtractedWorkProducts)

      const extractedConditionsInput = extractColumnContents(task, 0, 'Conditions', undefined);
      console.log('Extracted Input Conditions:', extractedConditionsInput);

      const extractedConditionsOutput = extractColumnContents(task, 3, 'Conditions', undefined);
      console.log('Extracted Output Conditions:', extractedConditionsOutput);

      result.push({
        id: uuidv4(),
        name: task[0][1],
        description: task[1][1] || "No description",
        entryCriterions: extractedConditionsInput,
        completionCriterions: extractedConditionsOutput,
        areasOfConcern: [],
        activitySpaces: [],
      })

      extractedWorkProducts.map((line) => {
        workProducts.push({
          id: uuidv4(),
          name: line[0],
          description: line[1] || "No description",
          alphas: [],
          subAlphas: [],
          levelOfDetails: [],
          taskId: result.find((item) => item.name === task[0][1])?.id,
          areasOfConcern: [],
        });
      })
    }

    const workProductLevels = workProducts.map((item) => {
      const levels = [];
      result.forEach((item2) => {
        console.log(item2)
        item2.entryCriterions.forEach((line2) => {
          if (line2[0] === item.name && !(levels.includes(line2[2]))) {
            levels.push(line2[2])
          }
        })
        item2.completionCriterions.forEach((line2) => {
          if (line2[0] === item.name && !(levels.includes(line2[2]))) {
            levels.push(line2[2])
          }
        })
      })

      return ({
        ...item,
        levelOfDetails: levels,
      })
    })

    const resultCrits = result.map((item) => {
      const inputCriterions = divideCriterions(item.entryCriterions, allExtractedWorkProducts);
      const outputCriterions =  divideCriterions(item.completionCriterions, allExtractedWorkProducts);
      const alphasInput = inputCriterions[0];
      const workProductsInput = inputCriterions[1];
      const alphasOutput = outputCriterions[0];
      const workProductsOutput = outputCriterions[1];
      const resInput = generateSubAlphas(alphasInput, subAlphas);
      const resOutput = generateSubAlphas(alphasOutput, subAlphas);

      return ({
        ...item,
        entryCriterions: {
          alphas: resInput, 
          workProducts: changeWorkProductNameToId(workProductsInput, workProducts),
        },
        completionCriterions: {
          alphas: resOutput,
          workProducts: changeWorkProductNameToId(workProductsOutput, workProducts),
        },
      })
    })

    return [resultCrits, workProductLevels, subAlphas];
  };

  function changeWorkProductNameToId(workProducts, allWorkProducts) {
    return workProducts.map((item) => [
      allWorkProducts.find(workProduct => workProduct.name === item[0]).id,
      item[1],
    ]);
  }

  function generateSubAlphas(alphasInput, subAlphas) {
    const alphas = [
      'Stakeholders',
      'Opportunity',
      'Requirements',
      'Software System',
      'Team',
      'Work',
      'Way-of-Working',
    ];

    return alphasInput.map((criterion) => {
      if (alphas.includes(criterion[0])) {
        // BUG cek state alpha valid
        return criterion;
      } else {
        const subAlpha = subAlphas.find(item => item.name === criterion[0]);
        if (subAlpha) {
          const state = subAlpha.states.find(item => item.name === criterion[1]);
          if (!state) {
            const stateId = uuidv4();
            subAlphas.find(item => item.name === criterion[0]).states
              .push({
                id: stateId,
                name: criterion[1],
                description: "",
                checklist: [],
              });
            return [subAlpha.id, stateId];
          } else {
            return [subAlpha.id, state.id];
          }
        } else {
          const subAlphaId = uuidv4();
          const stateId = uuidv4();
          subAlphas.push({
            id: subAlphaId,
            name: criterion[0],
            description: "",
            states: [{
              id: stateId,
              name: criterion[1],
              description: "",
              checklist: [],
            }],
            workProducts: [],
            alpha: "Stakeholders", // TODO P0 default, voluntary from alpha states
            areaOfConcernId: "Customer", // TODO P0 default, voluntary from alpha
          });
          return [subAlphaId, stateId];
        }
      }
    });
  }

  function divideCriterions(criterions, workProducts) {
    const alphaCrits = [];
    const workProductCrits = [];

    const wpArray = workProducts.map((line) => line[0]);

    criterions.forEach((line) => {
      if (wpArray.includes(line[0])) {
        workProductCrits.push([line[0], line[2]]);
      } else {
        alphaCrits.push([line[0], line[2]]);
      };
    });

    return [alphaCrits, workProductCrits];
  };

  function restructureRoles(roles, tasks, workProducts) {
    const result = [];

    for (const role of roles) {
      const extractedTasks = extractColumnContents(role, 0, 'Performed Tasks', undefined);
      const performedTasks = extractedTasks.map((line) => (line[0]));
      const performedTaskIds = performedTasks.map((taskName) =>
        tasks.find((task) => task.name === taskName).id
      );
      console.log('Performed Tasks:', performedTaskIds);

      const extractedWorkProducts = extractColumnContents(role, 3, 'Assigned Work Products', undefined);
      const assignedWorkProducts = extractedWorkProducts.map((line) => (line[0]));
      const assignedWorkProductIds = assignedWorkProducts.map((workProductName) =>
        workProducts.find((workProduct) => workProduct.name = workProductName).id
      );
      console.log('Assigned Work Products:', assignedWorkProductIds);

      result.push({
        id: uuidv4(),
        name: role[0][1],
        description: role[1][1] || "No description",
        performedTasks: performedTaskIds,
        assignedWorkProducts: assignedWorkProductIds,
        areasOfConcern: [],
        competencies: [],
        competencyLevels: [],
      })
    }

    return result;
  };

  function extractRolesFromExcel(array) {
    const result = [];
    let currentRole = [];

    for (const line of array) {
      if (line[0] === 'Role') {
        if (currentRole.length > 0) {
          result.push(currentRole);
          currentRole = [];
        }
      }
      currentRole.push(line);
    }

    if (currentRole.length > 0) {
      result.push(currentRole);
    }

    result.shift();
    console.log("roles", result);
    return result;
  }

  const extractColumnContents = (array, columnIndex, startLine, endLine) => {
    const result = [];
    let inSection = false;
  
    for (const line of array) {
      if (!line[columnIndex]) {
        continue;
      }

      if (line[columnIndex] === startLine) {
        console.log('start')
        inSection = true;
        continue;
      }
      
      if (line[columnIndex] === endLine) {
        console.log('end')
        inSection = false;
        break;
      }
      
      if (inSection) {
        console.log('line', line);
        if (columnIndex === 0) {
          result.push([line[0], line[1], line[2]]);
        } else if (columnIndex === 3) {
          result.push([line[3], line[4], line[5]]);
        }
      }
    }
  
    return result;
  };

  return (
    <div>
      <button
        className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-700  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out"
        onClick={handleButtonClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 24 24"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#FFFFFF"
        >
          <g>
            <rect fill="none" height={24} width={24} />
          </g>
          <g>
            <g>
              <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z" />
            </g>
          </g>
        </svg>
        <span className="pl-2 mx-1">Upload method file</span>
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUploadButton;
