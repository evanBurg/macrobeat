import React from "react";
import { Label } from "gestalt";

export default props => {
  return (
    <div
      onClick={props.onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly"
      }}
    >
      <i
        className={props.icon}
        id={props.id}
        style={{
          fontSize: props.size || "2em",
          color: props.color || "black"
        }}
      />
      {props.label && <Label htmlFor={props.id}>{props.label}</Label>}
    </div>
  );
};
