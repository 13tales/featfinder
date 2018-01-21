import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faCog from "@fortawesome/fontawesome-free-solid/faCog";
import React from "react";

export const PageSpinner = ({ size }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <FontAwesomeIcon
      style={{ alignSelf: "center", margin: "auto" }}
      icon={faCog}
      size={size}
      spin
    />
  </div>
);
