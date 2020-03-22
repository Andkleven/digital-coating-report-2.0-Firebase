import objectPath from "object-path";
import { Fragment } from "react";

export const stringToDictionary = data => {
  if (typeof data === "string") {
    return JSON.parse(data.replace(/'/g, '"'));
  }
};

export const emptyField = field => [null, undefined, ""].includes(field);

export const getDataFromQuery = (data, path, field) => {
  if (!data) {
    return null;
  }

  let stringFields = objectPath.get(data, path, null);
  if (stringFields === null) {
    return null;
  }
  let fields = stringToDictionary(stringFields.data);
  if (!fields) {
    return null;
  }
  return fields[field];
};

export const createPath = (
  pathList,
  repeatStepList,
  editRepeatStepList = {}
) => {
  let mergePath;
  pathList.forEach((path, index) => {
    let getIndex = null;
    mergePath += path.toString();
    getIndex = repeatStepList[index] + editRepeatStepList[index];
    if (!emptyField(getIndex)) {
      mergePath += "." + getIndex.toString();
    }
  });
  return mergePath;
};

export const findValue = (
  data,
  oldPath,
  repeatStepList = [],
  editRepeatStepList = {}
) => {
  let path;
  if (Array.isArray(oldPath)) {
    path = createPath(oldPath, repeatStepList, editRepeatStepList);
  } else {
    path = oldPath;
  }
  if (emptyField(path)) {
    return null;
  }
  return objectPath.get(data, path, null);
};

export const sumFieldInObject = (object, key) => {
  let total = 0;
  Object.values(object).forEach(value => {
    total += Number(value[key]);
  });
  return total;
};

export const getValue = (value, queryName, indexNumber, fieldName) => {
  let test;

  if (
    value[queryName] &&
    value[queryName][indexNumber] !== undefined &&
    value[queryName][indexNumber][fieldName] !== undefined
  ) {
    test = value[queryName][indexNumber][fieldName];
  }

  return test;
};
export const isStringInstance = string =>
  typeof string === "string" || string instanceof String;

export const getLastObjectValue = (object, key) =>
  object[Object.values(object).length - 1][key];

export const allFalse = element => !element;

export const allTrue = element => element;

export const allZeroOrNaN = element => element === 0 || isNaN(element);

export const removeSpace = string => string.replace(/\s/g, "");

export const notDataInField = (getDataFromGroupWithLookUpBy, lookUpBy) => {
  return (
    !getDataFromGroupWithLookUpBy ||
    !getDataFromGroupWithLookUpBy.data ||
    !getDataFromGroupWithLookUpBy.data[lookUpBy]
  );
};

export const emptyObject = objectToCheck => {
  if (Object.entries(objectToCheck).length === 0) {
    return true;
  }
  return false;
};

export const removeEmptyValueFromObject = object => {
  Object.keys(object).forEach(key => {
    if ([null, undefined, ""].includes(object[key])) {
      delete object[key];
    }
  });
};

export const variableString = (variable, string) => {
  let newString;
  if ([undefined, null, ""].includes(variable)) {
    newString = string.replace("{", "");
    newString = newString.replace("}", "");
  } else {
    let firstName = string.split("{")[0];
    let lastName = string.split("}")[string.split("}").length - 1];

    newString = firstName + variable + lastName;
  }
  return newString;
};

export const variableLabel = (
  label,
  value,
  queryVariableLabel = undefined,
  repeatStepList = [],
  editRepeatStepListVariableLabel = {},
  index = undefined
) => {
  if (!label) {
    return "";
  }
  let variableLabel = undefined;

  if (index === undefined) {
    variableLabel = findValue(
      value,
      queryVariableLabel,
      repeatStepList,
      editRepeatStepListVariableLabel
    );
  } else {
    variableLabel = index + 1;
  }
  return variableString(variableLabel, label);
};

export const getSubtext = (
  subtext,
  SpeckSubtext,
  max,
  min,
  maxInput,
  minInput,
  unit,
  required
) => {
  if (subtext) {
    if (SpeckSubtext) {
      return variableString(SpeckSubtext, subtext);
    }
    return variableString("", subtext);
  }
  let minLocal = min ? min : minInput ? minInput : "";
  let maxLocal = max ? max : maxInput ? maxInput : "";

  let minString = minLocal === "" ? "" : `Min: ${minLocal}`;
  let maxString = maxLocal === "" ? "" : `Max: ${maxLocal}`;

  let unitString = unit ? `${unit} ` : " ";

  minString = minString ? minString + unitString : "";
  maxString = maxString ? maxString + unitString : "";

  let requiredString = required ? "Required" : "";

  return minString + maxString + requiredString;
};

export const objectifyQuery = query => {
  if (query) {
    let newObject = { ...query };

    const objectifyEntries = (query, oldPath = null) => {
      let path;
      Object.keys(query).forEach(key => {
        path = oldPath === null ? key : oldPath + "." + key;
        if (Array.isArray(query[key])) {
          query[key].forEach((value, index) => {
            objectifyEntries(value, path + "." + index.toString());
          });
        } else if (key === "data") {
          if (typeof query[key] === "string") {
            let isData = stringToDictionary(query[key]);
            if (isData) {
              objectPath.set(newObject, path, isData);
            }
          }
        }
      });
    };

    objectifyEntries(query);
    return newObject;
  }
};

export const validaFieldWithValue = validation => {
  Object.keys(validation).forEach(key => {
    if (!validation[key]) {
      return false;
    }
  });
  return true;
};

export const calculateMaxMin = (
  min,
  routToSpeckMin,
  editRepeatStepListMin,
  max,
  routToSpeckMax,
  editRepeatStepListMax,
  repeatStepList,
  data
) => {
  let newMin;
  let newMax;
  if (routToSpeckMin) {
    newMin = findValue(
      data,
      routToSpeckMin,
      repeatStepList,
      editRepeatStepListMin
    );
  } else {
    newMin = min;
  }
  if (routToSpeckMax) {
    newMax = findValue(
      data,
      routToSpeckMax,
      repeatStepList,
      editRepeatStepListMax
    );
  } else {
    newMax = max;
  }
  return { min: newMin, max: newMax };
};

export const chapterPages = (
  props,
  view,
  firstIndex,
  stopLoop,
  editField,
  pageInfo,
  lastChapter
) => {
  return pageInfo.pages.map((info, index) => {
    let showEditButton = !props.notEditButton && !index ? true : false;
    let showSaveButton =
      index === pageInfo.pages.length - 1 &&
      !editField &&
      !props.notSubmitButton
        ? true
        : false;
    let page = view(
      info,
      index,
      firstIndex + 1,
      stopLoop,
      showEditButton,
      lastChapter,
      showSaveButton
    );
    return <Fragment key={`${index}-${firstIndex}-cancas`}>{page}</Fragment>;
  });
};

// Get data to Group or test if group have data in database
export const getData = (info, arrayIndex, documentDate, isItData = false) => {
  let data;
  if (!documentDate) {
    return null;
  } else if (info.firstQueryPath) {
    data = objectPath.get(
      objectPath.get(documentDate, `${info.firstQueryPath}.${arrayIndex}`),
      info.secondQueryPath
    );
  } else if (documentDate) {
    data = objectPath.get(documentDate, info.queryPath);
  } else {
    console.error("custom error: 12345675");
  }
  if (isItData) {
    return data[info.findByIndex ? arrayIndex : data.length - 1];
  } else if (info.findByIndex) {
    return data[arrayIndex];
  } else {
    return data;
  }
};

export const mergePath = (info, arrayIndex, oldPath = null) => {
  let path = oldPath === null ? "" : `${oldPath}.`;
  if (info.firstQueryPath) {
    path = `${path}${info.firstQueryPath}.${arrayIndex}.${
      info.secondQueryPath
    }`;
  } else if (info.findByIndex) {
    path = `${path}${info.queryPath}.${arrayIndex}`;
  } else if (info.queryPath) {
    path = `${path}${info.queryPath}`;
  } else {
    return null;
  }
  return path;
};

export const stringifyQuery = query => {
  let newObject = { ...query };
  const loopThroughQuery = (query, oldPath = null) => {
    let path;
    Object.keys(query).forEach(key => {
      path = oldPath === null ? key : oldPath + "." + key;
      if (Array.isArray(query[key])) {
        query[key].forEach((value, index) => {
          loopThroughQuery(value, path + "." + index.toString());
        });
      } else if (key === "data") {
        let isData = JSON.stringify(query[key]);
        if (isData) {
          objectPath.set(newObject, path, isData);
        }
      }
    });
  };
  loopThroughQuery(query);
  return newObject;
};

export const getDataToBatching = (fixedData, batchingListIds, json) => {
  let splitWordInJson = json.split(/[.]+/);
  let key = splitWordInJson[splitWordInJson.length - 1];
  if (fixedData && batchingListIds[0]) {
    let newData = fixedData["descriptions"][0]["items"].find(
      item => item.id == batchingListIds[0]
    )[json];
    return { [key]: newData };
  }
  return { [key]: [] };
};

export const allRequiredFinished = (data, fields) => {
  let requiredApproved = true;
  fields.forEach(field => {
    if (field.required && emptyField(data[field.fieldName])) {
      requiredApproved = false;
    }
  });
  return requiredApproved;
};
