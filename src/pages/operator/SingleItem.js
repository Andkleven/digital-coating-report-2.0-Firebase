import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import query from "graphql/query";
import operatorCoatedItemJson from "templates/operatorCoatedItem.json";
import operatorMouldJson from "templates/operatorMould.json";
import Form from "components/form/Form";
import Paper from "components/layout/Paper";
import PaperStack from "components/layout/PaperStack";
import {
  objectifyQuery,
  formDataStructure,
  coatedItemOrMould
} from "functions/general";

export default pageInfo => {
  const { itemId, geometry } = pageInfo.match.params;
  const [reRender, setReRender] = useState(false);
  const [fixedData, setFixedData] = useState(null);
  let operatorJson = coatedItemOrMould(
    geometry,
    operatorCoatedItemJson,
    operatorMouldJson
  );

  const { loading, error, data, refetch } = useQuery(query[operatorJson.query], {
    variables: { id: itemId }
  });
  useEffect(() => {
    refetch()
  }, [refetch, itemId, geometry]);

  useEffect(() => {
    setFixedData(objectifyQuery(data));
  }, [loading, error, data, reRender]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <PaperStack>
      <Paper>
        <Form
          componentsId={"SingleItem"}
          document={operatorJson}
          reRender={() => setReRender(!reRender)}
          data={fixedData && formDataStructure(fixedData, "items.0.operators")}
          specData={
            fixedData && formDataStructure(fixedData, "items.0.leadEngineers")
          }
          stage={fixedData && fixedData.items[0].stage}
          geometry={geometry}
          getQueryBy={itemId}
          itemId={itemId}
          sendItemId={true}
          saveButton={true}
        />
      </Paper>
    </PaperStack>
  );
};
