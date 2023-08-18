import React, { useContext, useRef } from "react";
import Router from "next/router";
import { MappingContext } from "../context/context";
import { read, utils } from "xlsx";

const FileUploadButton = () => {
  const { setInputExcel, setMethodId, setName, setCreator, setDescription, setTasks, setRoles, setSubAlphas } = useContext(MappingContext);

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
        const sheetName = workbook.SheetNames[0]; // Assuming first sheet
        const sheet = workbook.Sheets[sheetName];
        const dataArray = utils.sheet_to_json(sheet, { header: 1 });
        console.log("excel array", dataArray);

        if (dataArray) {
          convertExcelToContext(dataArray);

          setInputExcel(true);
          Router.push("/input-sub-alphas");
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

    const restructuredTasks = restructureTasks(tasks);
    setTasks(restructuredTasks); // BUG P1 cek todo

    const restructuredRoles = restructureRoles(roles, restructuredTasks);
    setRoles(restructuredRoles); // BUG P0 cek todo change all stored ids in checkboxes to names?

    console.log("restructured tasks", restructuredTasks);
    console.log("restructured roles", restructuredRoles);
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
          console.log('new task')
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

    for (const task of tasks) {
      const extractedWorkProducts = extractColumnContents(task, 3, 'Work products', 'Conditions');
      console.log('Extracted Work Products:', extractedWorkProducts);

      const extractedConditionsInput = extractColumnContents(task, 0, 'Conditions', undefined);
      console.log('Extracted Conditions:', extractedConditionsInput);

      const extractedConditionsOutput = extractColumnContents(task, 3, 'Conditions', undefined);
      console.log('Extracted Conditions:', extractedConditionsOutput);

      result.push({
        id: result.length + 1,
        name: task[0][1],
        description: task[1][1] || "No description",
        workProducts: extractedWorkProducts.map((line, index) => ({
          id: index + 1,
          name: line[0],
          description: line[1] || "No description",
          alphas: [],
          subAlphas: [],
          levelOfDetails: [], // TODO P1 cek semua condition di kolom 0 dan 3 apakah ada nama yang sama, ambil state
        })),
        entryCriterions: { // TODO P0 ambil semua yang tidak ada di work product semua task jadi alpha atau sub alpha
          alphas: extractedConditionsInput.map((line) => (`${line[0]}.${line[2]}`)), // TODO P1 pisahkan berdasarkan keberadaan di daftar semua work product
          workProducts: [], // TODO P1 ganti semua nameId jadi literally name?
        },
        completionCriterions: {
          alphas: extractedConditionsOutput.map((line) => (`${line[0]}.${line[2]}`)),
          workProducts: [],
        },
        areasOfConcern: [],
        activitySpaces: [],
      })
    }

    return result;
  };

  function restructureRoles(roles, tasks) {
    const result = [];

    for (const role of roles) {
      const extractedTasks = extractColumnContents(role, 0, 'Performed Tasks', undefined);
      const performedTasks = extractedTasks.map((line) => (line[0]));
      const performedTaskIds = performedTasks.map((taskName) => tasks.find((task) => task.name === taskName).id);
      console.log('Extracted Tasks:', performedTaskIds);

      const extractedWorkProducts = extractColumnContents(role, 3, 'Assigned Work Products', undefined);
      const assignedWorkProducts = extractedWorkProducts.map((line) => (line[0]));
      const assignedWorkProductIds = assignedWorkProducts.map((workProductName) =>
        [
          tasks.find((task) => task.workProducts.find((workProduct) => workProduct.name = workProductName)).id,
          tasks.find((task) => task.workProducts.find((workProduct) => workProduct.name = workProductName)).workProducts
            .find((workProduct) => workProduct.name === workProductName).id
        ]
      );
      console.log('Extracted Work Products:', assignedWorkProductIds);

      result.push({
        id: result.length + 1,
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
