import React from "react";
import Header from "components/layout/Header";
import Container from "react-bootstrap/Container";
import Footer from "components/layout/Footer";
import Overview from "components/layout/Overview";

export default props => {
  return (
    <div className="content">
      <Header />
      <Overview />
      <Container className="p-0 mt-n3 mt-sm-0">{props.children}</Container>
      <Footer className="d-none d-sm-inline" />
    </div>
  );
};
