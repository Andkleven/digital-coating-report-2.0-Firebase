import React, { Fragment } from "react";
import objectPath from "object-path";
import { Form } from "react-bootstrap";
import { findValue } from "functions/general";

export default props => {
  const allFields = (chapter, itemData) => {
    let batchingData = {};
    chapter.pages.forEach(page => {
      page.fields.forEach(field => {
        if (field.specValueList) {
          batchingData[field.fieldName] = findValue(
            itemData,
            field.specValueList,
            props.repeatStepList
          );
        } else if (field.fieldName && !props.partialBatching) {
          batchingData[field.fieldName] = findValue(
            itemData,

            Array.isArray(props.json.batching.dataPath)
              ? [...props.json.batching.dataPath, `data.${field.fieldName}`]
              : [props.json.batching.dataPath, `data.${field.fieldName}`],
            props.repeatStepList
          );
        }
      });
    });
  };

  const add = (item, batchingData) => {
    props.setBatchingListIds(prevState => [...prevState, Number(item.id)]);
    if (!props.batchingData) {
      props.setBatchingData({ ...batchingData });
    }
    if (props.finishedItem) {
      props.setFinishedItem(0);
    }
  };
  const remove = item => {
    if (props.batchingListIds.length === 1) {
      props.setBatchingData(false);
    }
    if (props.finishedItem) {
      props.setFinishedItem(0);
    }
    /** WARNING: Non-strict comparison below
     * For more info on strict vs non-strict comparisons:
     * https://codeburst.io/javascript-double-equals-vs-triple-equals-61d4ce5a121a
     */
    // eslint-disable-next-line
    props.setBatchingListIds(props.batchingListIds.filter(id => id != item.id));
  };
  const handleClick = (e, item, batchingData) => {
    if (e.target.checked) {
      add(item, batchingData);
    } else {
      remove(item);
    }
  };
  return (
    <>
      {props.data &&
        objectPath
          .get(props.data, props.json.batching.itemPath)
          .map((item, index) => {
            let batchingData = allFields(props.json.document.chapters, item);
            if (
              item.stage === props.stage &&
              (!props.batchingData ||
                JSON.stringify(batchingData) ===
                  JSON.stringify(props.batchingData))
            ) {
              return (
                <Fragment key={`${index}-fragment`}>
                  {props.partialBatching ? (
                    <button
                      key={`${index}-button`}
                      onClick={() => {
                        props.setFinishedItem(Number(item.id));
                        props.setBatchingListIds([Number(item.id)]);
                      }}
                    >
                      {" "}
                      Finished
                    </button>
                  ) : null}
                  <Form.Check
                    key={`${index}-check`}
                    className="text-success"
                    onChange={e => handleClick(e, item, batchingData)}
                    id={`custom-${props.type}-${props.fieldName}-${props.indexId}`}
                    checked={
                      /** WARNING: Non-strict comparison below
                       * For more info on strict vs non-strict comparisons:
                       * https://codeburst.io/javascript-double-equals-vs-triple-equals-61d4ce5a121a
                       */
                      // eslint-disable-next-line
                      props.batchingListIds.find(id => id == item.id)
                        ? true
                        : false
                    }
                    label={item.itemId}
                  />
                </Fragment>
              );
            } else {
              //  fade out check box?
              return (
                <div key={`${index}-text`} className="text-danger">
                  {item.itemId}
                </div>
              );
            }
          })}
    </>
  );
};