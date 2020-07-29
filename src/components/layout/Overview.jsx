import React, { useState, useCallback } from "react";
import { Button, Container } from "react-bootstrap";
import Paper from "components/layout/Paper";
import { useSpring, animated } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";

const queries = {
  project: gql`
    query($id: Int) {
      projects(id: $id) {
        data
      }
    }
  `,
  description: gql`
    query($id: Int) {
      descriptions(id: $id) {
        data
        items {
          itemId
        }
      }
    }
  `,
  item: gql`
    query($id: Int) {
      items(id: $id) {
        itemId
      }
    }
  `
};

export default () => {
  // const [show, setShow] = useState(true);
  const [show, setShow] = useState(false);
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  const marginHeight = 50;
  const hiddenLength = height + marginHeight;
  const paperSpring = useSpring({
    to: {
      position: "relative",
      bottom: show ? 0 : hiddenLength
    },
    from: {
      position: "relative",
      bottom: hiddenLength
    }
    // config: {
    //   friction: 100,
    //   mass: 0.25
    // }
  });

  const buttonHeight = 30;
  const buttonSpring = useSpring({
    to: {
      position: "relative",
      bottom: show ? buttonHeight : -marginHeight + 11
    },
    from: {
      position: "relative",
      bottom: -marginHeight + 11
    }
    // config: {
    //   friction: 100,
    //   mass: 0.25
    // }
  });

  const params = useParams();

  const projectQuery = useQuery(queries.project, {
    variables: {
      id: params.projectId
    }
  });
  const descriptionQuery = useQuery(queries.description, {
    variables: {
      id: params.descriptionId
    }
  });
  const itemQuery = useQuery(queries.item, {
    variables: {
      id: params.itemId
    }
  });

  const MultipleItems = () => {
    if (
      !descriptionQuery.loading &&
      !descriptionQuery.error &&
      descriptionQuery.data &&
      params.unique === "0"
    ) {
      let items = [];

      descriptionQuery.data.descriptions &&
        descriptionQuery.data.descriptions[0] &&
        descriptionQuery.data.descriptions[0].items.forEach(item => {
          items.push(item.itemId);
        });

      let string = items.join(", ");

      return string;
    }
    return null;
  };

  const Info = () => {
    return (
      <div>
        <div>
          <div className="text-muted mb-n2">
            <small>Project:</small>
          </div>
          <div>
            {(projectQuery.data &&
              JSON.parse(projectQuery.data.projects[0].data).projectName) ||
              "N/A"}
          </div>
          <div className="text-muted mb-n2">
            <small>Description:</small>
          </div>
          <div>
            {(descriptionQuery.data &&
              JSON.parse(descriptionQuery.data.descriptions[0].data)
                .description) ||
              "N/A"}
          </div>
          <div className="text-muted mb-n2">
            <small>{MultipleItems() ? "Items:" : "Item:"}</small>
          </div>
          <div>
            {MultipleItems()
              ? MultipleItems()
              : itemQuery.data
              ? itemQuery.data.items[0].itemId
              : "N/A"}
          </div>
        </div>
        {/* <pre>{JSON.stringify(params, null, 2)}</pre> */}
        {/* <pre>
          {JSON.stringify(
            descriptionQuery.data && descriptionQuery.data.descriptions,
            null,
            2
          )}
        </pre> */}
        {/*
        <div>Item:</div>
        <pre>{JSON.stringify(params, null, 2)}</pre>
        <div>
          <pre>{JSON.stringify(projectQuery.data, null, 2)}</pre>
          <pre>{JSON.stringify(descriptionQuery.data, null, 2)}</pre>
        </div> */}
      </div>
    );
  };

  return (
    <Container
      style={{ position: "fixed", zIndex: 1 }}
      className="w-100 d-flex justify-content-center"
    >
      <div
        style={{ height: 0, position: "relative", bottom: 0, zIndex: 1 }}
        className="w-100"
      >
        <animated.div style={paperSpring}>
          <div ref={measuredRef}>
            <Paper>
              <Info></Info>
            </Paper>
          </div>
          <animated.div style={buttonSpring}>
            <div
              className="d-flex justify-content-end"
              style={{ position: "relative", bottom: 0 }}
            >
              <Button
                variant="primary"
                onClick={() => {
                  setShow(!show);
                }}
                style={{ height: buttonHeight, width: buttonHeight }}
                className={`d-flex align-items-center justify-content-center`}
              >
                <FontAwesomeIcon
                  icon={["fas", show ? "times" : "info"]}
                  // className="mr-2"
                  size="sm"
                  style={{}}
                />
                {/* <small>{`${show ? "Hide" : "Show"} overview`}</small> */}
              </Button>
            </div>
          </animated.div>
        </animated.div>
      </div>
    </Container>
  );
};