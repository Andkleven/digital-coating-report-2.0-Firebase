import React from "react";
import Copyright from "components/layout/design/Copyright";

export default props => {
  return (
    <footer
      {...props}
      className={`text-light py-3 ${props.className}`}
      align="center"
    >
      <Copyright link />
    </footer>
  );
};
