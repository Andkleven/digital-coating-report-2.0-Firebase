import React, {
  useEffect,
  useContext,
  useLayoutEffect,
  useMemo,
  useCallback,
  useRef,
  useState
} from "react";
import SelectSetFieldGroupData from "components/form/components/fields/SelectSetFieldGroupData";
import { ChapterContext, DocumentDateContext } from "components/form/Form";
import Title from "components/design/fonts/Title";
import { getRepeatNumber } from "functions/general";
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
  const { documentDateDispatch, documentDate, func } = useContext(
    DocumentDateContext
  );
  const [resetState, setResetState] = useState(false)
  const [addOrRemove, setAddOrRemove] = useState(0)
  const writeChapter = useRef(false);
  console.log(documentDate)
  useEffect(() => {
    if (props.repeat) {
      setAddOrRemove(prevState => prevState + 1)
    }
  }, [props.backendData, props.path, props.repeat])
  
  useLayoutEffect(() => {
    if (
      props.temporaryLastChapter &&
      props.temporaryLastChapter !== lastChapter
    ) {
      setLastChapter(props.temporaryLastChapter);
    }
  }, [props.temporaryLastChapter, setLastChapter, lastChapter]);

  const addData = useCallback(
    pushOnIndex => {
      documentDateDispatch({
        type: "add",
        newState: {},
        fieldName: "data",
        path: `${props.path}.${pushOnIndex}`
      });
      setAddOrRemove(prevState => prevState + 1)
    },
      [props.path, documentDateDispatch, setAddOrRemove]
  );

  const addHandler = useCallback(() => {
    documentDateDispatch({
      type: "add",
      newState: {},
      fieldName: "data",
      path: `${props.path}.${objectPath.get(documentDate, props.path).length}`
    });
      setAddOrRemove(prevState => prevState + 1)
    },[documentDateDispatch, props.path, documentDate, setAddOrRemove]);

  const deleteHandler = useCallback(
    index => {
      documentDateDispatch({ type: "delete", path: `${props.path}.${index}` });
      setAddOrRemove(prevState => prevState + 1)
    },
    [props.path, documentDateDispatch, setAddOrRemove]
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
  } else if (props.thisChapter === props.temporaryLastChapter) {
    writeChapter.current = true;
  } else {
    writeChapter.current = false;
  }
  // }, [props.allWaysShow, editChapter, props.thisChapter, props.temporaryLastChapter, props.componentsId]);

  // If repeat group start with one group set repeatGroup to 1
  if (
    props.repeatStartWithOneGroup &&
    writeChapter.current &&
    (!objectPath.get(props.data, props.path) ||
      objectPath.get(props.data, props.path).length === 0) &&
    Array.isArray(objectPath.get(documentDate, props.path)) &&
    objectPath.get(documentDate, props.path).length === 0
  ) {
    addData(0);
  }

  // If number of repeat group decides by a another field, it's sets repeatGroup
  const autoRepeat = useCallback((data = documentDate) => {
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
  }, [
    documentDate,
    props.repeatGroupWithQuery,
    props.repeatStepList,
    props.editRepeatStepListRepeat,
    props.path,
    addData,
    deleteHandler
  ])

  useEffect(() => {
    if (props.repeatGroupWithQuery && !props.repeatGroupWithQuerySpecData) {
      func[`${props.repeatStepList}-Page`] = autoRepeat
    }
      return () => {
        if (props.repeatGroupWithQuery && !props.repeatGroupWithQuerySpecData) {
          delete func[`${props.repeatStepList}-Page`]
        }
      }
  }, [
    documentDate,
    addData,
    props.repeatGroupWithQuery,
    props.repeatStepList,
    props.editRepeatStepListRepeat,
    deleteHandler,
    props.path,
    props.repeatGroupWithQuerySpecData,
    autoRepeat,
    func
  ]);

  useEffect(() => {
    if (props.repeatGroupWithQuery && !props.repeatGroupWithQuerySpecData) {
    autoRepeat(props.backendData)
    }
  }, [props.backendData, autoRepeat, props.repeatGroupWithQuery, props.repeatGroupWithQuerySpecData])

  // if (
  //   props.repeatGroupWithQuery &&
  //   props.repeatGroupWithQuerySpecData &&
  //   props.queryPath
  // ) {
  //   let newValue = getRepeatNumber(
  //     props.specData,
  //     props.repeatGroupWithQuery,
  //     props.repeatStepList,
  //     props.editRepeatStepListRepeat
  //   );
  //   if (objectPath.get(documentDate, `${props.path}.${0}`, null) === null) {
  //     for (let i = 0; i < newValue; i++) {
  //       addData(i);
  //     }
  //   }
  // }

  const Components = useMemo(() => CustomComponents[props.customComponent], [
    props.customComponent
  ]);

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
    props.submitData(documentDate, false);
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
    documentDateDispatch({ type: "setState", newState: props.backendData });
    setEditChapter(0);
    setResetState(prevState => !prevState)
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
        <SubmitButton />
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

  return (
    <div
      className={`${!props.temporaryLastChapter && "mb-4"} ${props.className}`}
    >
      <div className="d-flex justify-content-between align-items-end">
        {showTitle ? <Title>{props.pageTitle}</Title> : null}
        {showEditAll ? (
          <TabButton
            onClick={() => {
              setEditChapter(props.thisChapter);
              documentDateDispatch({
                type: "setState",
                newState: props.backendData
              });
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
      {Components ? <Components {...props} /> : null}
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
      {props.showSaveButton ? (
        editChapter ? (
          props.thisChapter === editChapter && <SubmitAndCancel />
        ) : props.thisChapter === props.temporaryLastChapter ? (
          <SubmitAndCancel />
        ) : null
      ) : null}
    </div>
  );
}
);

