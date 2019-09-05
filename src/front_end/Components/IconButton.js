import React from "react";
import { Label } from "gestalt";

export default props => {
  const Icon = props.icon;
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
      <Icon
        onClick={props.onClick}
        id={props.id}
        fontSize={props.size || "2em"}
        color={props.color || "black"}
      />
      {props.label && <Label htmlFor={props.id}>{props.label}</Label>}
    </div>
  );
};
