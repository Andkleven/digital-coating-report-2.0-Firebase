import React, {
  useEffect,
  useContext,
  useLayoutEffect,
  useCallback,
  useRef,
  useState
} from "react";
import SelectSetFieldGroupData from "components/form/components/fields/SelectSetFieldGroupData";
import { ChapterContext, documentDataContext } from "components/form/Form";
import Title from "components/design/fonts/Title";
import { getRepeatNumber, isNumber } from "functions/general";
import Input from "components/input/Input";
import objectPath from "object-path";
import CustomComponents from "components/form/components/CustomElement";
import Line from "components/design/Line";
import TabButton from "components/button/TabButton";
import DepthButton from "components/button/DepthButton";
import DepthButtonGroup from "components/button/DepthButtonGroup";

export default React.memo(props => {
  const {
    setLastChapter,
    lastChapter,
    editChapter,
    setEditChapter
  } = useContext(ChapterContext);
  const { documentDataDispatch, documentData, renderFunction } = useContext(
    documentDataContext
  );
  const [resetState, setResetState] = useState(false);
  const [addOrRemove, setAddOrRemove] = useState(0);
  const writeChapter = useRef(false);

  useEffect(() => {
    if (props.repeat) {
      setAddOrRemove(prevState => prevState + 1);
    }
  }, [props.backendData, props.path, props.repeat]);

  useLayoutEffect(() => {
    if (props.finalChapter && props.finalChapter !== lastChapter) {
      setLastChapter(props.finalChapter);
    }
  }, [props.finalChapter, setLastChapter, lastChapter]);

  const addData = useCallback(
    pushOnIndex => {
      documentDataDispatch({
        type: "add",
        newState: {},
        fieldName: "data",
        path: `${props.path}.${pushOnIndex}`
      });
      setAddOrRemove(prevState => prevState + 1);
    },
    [props.path, documentDataDispatch, setAddOrRemove]
  );

  const addHandler = useCallback(() => {
    if (objectPath.get(documentData.current, props.path) === undefined) {
      documentDataDispatch({
        type: "add",
        newState: {},
        fieldName: "data",
        path: `${props.path}.0`
      });
    } else {
      documentDataDispatch({
        type: "add",
        newState: {},
        fieldName: "data",
        path: `${props.path}.${
          objectPath.get(documentData.current, props.path).length
        }`
      });
    }
    setAddOrRemove(prevState => prevState + 1);
  }, [documentDataDispatch, props.path, documentData, setAddOrRemove]);

  const deleteHandler = useCallback(
    index => {
      documentDataDispatch({
        type: "delete",
        path: `${props.path}.${index}`,
        notReRender: true
      });
      setAddOrRemove(prevState => prevState + 1);
    },
    [props.path, documentDataDispatch, setAddOrRemove]
  );

  // set repeatGroup
  // useEffect(() => {
  if (props.allWaysShow) {
    writeChapter.current = true;
  } else if (editChapter) {
    if (props.thisChapter === editChapter) {
      writeChapter.current = true;
    } else {
      writeChapter.current = false;
    }
  } else if (props.thisChapter === props.finalChapter) {
    writeChapter.current = true;
  } else {
    writeChapter.current = false;
  }
  // }, [props.allWaysShow, editChapter, props.thisChapter, props.finalChapter, props.componentsId]);

  // If repeat group start with one group set repeatGroup to 1
  if (
    props.repeatStartWithOneGroup &&
    writeChapter.current &&
    (!objectPath.get(props.data, props.path) ||
      objectPath.get(props.data, props.path).length === 0) &&
    Array.isArray(objectPath.get(documentData.current, props.path)) &&
    objectPath.get(documentData.current, props.path).length === 0
  ) {
    addData(0);
  }

  // If number of repeat group decides by a another field, it's sets repeatGroup
  const autoRepeat = useCallback(
    (data = documentData.current) => {
      let newValue = getRepeatNumber(
        data,
        props.repeatGroupWithQuery,
        props.repeatStepList,
        props.editRepeatStepListRepeat
      );
      let oldValue = objectPath.get(data, props.path, false);
      let oldValueLength = oldValue ? oldValue.length : 0;
      if (oldValueLength < newValue) {
        for (let i = oldValueLength; i < newValue; i++) {
          addData(i);
        }
      } else if (newValue < oldValueLength) {
        for (let i = oldValueLength - 1; i > newValue - 1; i--) {
          deleteHandler(i);
        }
      }
    },
    [
      documentData,
      props.repeatGroupWithQuery,
      props.repeatStepList,
      props.editRepeatStepListRepeat,
      props.path,
      addData,
      deleteHandler
    ]
  );

  useEffect(() => {
    let effectsRenderFunction = renderFunction.current;
    if (props.repeatGroupWithQuery && !props.repeatGroupWithQuerySpecData) {
      effectsRenderFunction[`${props.repeatStepList}-Page`] = autoRepeat;
    }
    return () => {
      if (props.repeatGroupWithQuery && !props.repeatGroupWithQuerySpecData) {
        delete effectsRenderFunction[`${props.repeatStepList}-Page`];
      }
    };
  }, [
    props.repeatGroupWithQuery,
    props.repeatStepList,
    props.editRepeatStepListRepeat,
    props.repeatGroupWithQuerySpecData,
    autoRepeat,
    renderFunction
  ]);

  useEffect(() => {
    if (props.repeatGroupWithQuery && !props.repeatGroupWithQuerySpecData) {
      autoRepeat(props.backendData);
    }
  }, [
    props.backendData,
    autoRepeat,
    props.repeatGroupWithQuery,
    props.repeatGroupWithQuerySpecData
  ]);

  useEffect(() => {
    if (props.repeatGroupWithQuery && props.repeatGroupWithQuerySpecData) {
      autoRepeat(props.specData);
    }
  }, [
    props.specData,
    props.repeatGroupWithQuery,
    autoRepeat,
    props.repeatGroupWithQuerySpecData
  ]);

  if (
    objectPath.get(documentData.current, props.path, null) === null &&
    objectPath.get(props.backendData, props.path, null) === null &&
    !isNumber(Number(props.path.split(".")[props.path.split(".").length - 1]))
  ) {
    documentDataDispatch({
      type: "add",
      newState: [],
      path: props.path
    });
  }

  const Components = CustomComponents[props.customComponent];

  const SubmitButton = () => {
    return (
      <DepthButton
        iconProps={{ icon: ["fas", "check"], className: "text-primary" }}
        short
        type="submit"
      >
        Submit
      </DepthButton>
    );
  };

  const save = e => {
    e.persist();
    e.preventDefault();
    props.submitData(documentData.current, false);
  };

  const SaveButton = () => (
    <DepthButton
      iconProps={{ icon: ["fas", "save"], className: "text-info" }}
      short
      align="center"
      onClick={e => {
        save(e);
      }}
    >
      Save
    </DepthButton>
  );

  const cancel = () => {
    documentDataDispatch({ type: "setState", newState: props.backendData });
    setEditChapter(0);
    setResetState(prevState => !prevState);
  };

  const CancelButton = () => {
    return (
      <DepthButton
        iconProps={{ icon: ["fas", "times"], className: "text-secondary" }}
        short
        onClick={() => cancel()}
      >
        Cancel
      </DepthButton>
    );
  };

  const SubmitAndCancel = () => {
    return (
      <DepthButtonGroup className="w-100 d-flex">
        {!props.notSubmitButton && <SubmitButton />}
        {props.saveButton && <SaveButton />}
        {showCancel && <CancelButton />}
      </DepthButtonGroup>
    );
  };

  // Checks for conditional rendering
  const showEditAll =
    props.showEditButton && !props.stopLoop && !writeChapter.current;
  // && props.thisChapter !== lastChapter;
  const showTitle =
    !props.stopLoop &&
    props.pageTitle &&
    props.indexVariablePageTitle === undefined;
  const showLine =
    showTitle &&
    !props.noLine &&
    !!props.pageTitle &&
    !["", " "].includes(props.pageTitle);
  const showCancel = !!editChapter;
  const showCancelTab =
    showLine &&
    !!editChapter &&
    props.thisChapter !== lastChapter &&
    props.pageTitle;
  const editAllActive =
    props.showSaveButton && editChapter && props.thisChapter === editChapter;
  const finalChapterActive =
    props.showSaveButton &&
    !editChapter &&
    props.thisChapter === props.finalChapter;
  const finalPage = props.showSaveButton;

  return (
    <div
      className={`${finalPage && "mb-4"} ${props.className}`}
      // className={`${!props.finalChapter && ""} ${props.className}`}
    >
      <div className="d-flex justify-content-between align-items-end">
        {showTitle ? <Title>{props.pageTitle}</Title> : null}
        {showEditAll ? (
          <TabButton
            onClick={() => {
              documentDataDispatch({
                type: "setState",
                newState: props.backendData
              });
              setEditChapter(props.thisChapter);
              setResetState(prevState => !prevState);
            }}
          >
            Edit all
          </TabButton>
        ) : (
          showCancelTab && (
            <TabButton
              onClick={() => {
                cancel();
              }}
            >
              Cancel
            </TabButton>
          )
        )}
      </div>
      {showLine && <Line />}
      {props.customComponent ? (
        <Components {...props} writeChapter={writeChapter.current} />
      ) : null}
      {props.fields ? (
        <>
          <SelectSetFieldGroupData
            {...props}
            writeChapter={writeChapter.current}
            deleteHandler={deleteHandler}
            resetState={resetState}
            setResetState={setResetState}
            addOrRemove={addOrRemove}
          />
          {!!props.addButton && props.repeat && writeChapter.current ? (
            <DepthButton
              iconProps={{ icon: ["far", "plus"], className: "text-secondary" }}
              type="button"
              onClick={() => addHandler()}
              className="mb-3 w-100"
            >
              {props.addButton ? props.addButton : "Add"}
            </DepthButton>
          ) : null}
        </>
      ) : props.type === "file" ? (
        <Input {...props} writeChapter={writeChapter.current} />
      ) : null}
      {(editAllActive || finalChapterActive) && <SubmitAndCancel />}
    </div>
  );
});
