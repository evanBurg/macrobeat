import React from 'react';

const TextClass = "tBJ dyH iFc SMy yTZ DrD IZT swG";
const HeaderClass = "lH1 dyH iFc SMy kON pBj IZT";
const MaskClass = "Pj7 sLG XiG pJI INd m1e";

const IgnoreProps = ["className", "children"];

const RemoveProps = props => {
  props = {...props};
  IgnoreProps.forEach(key => {
    if (props.hasOwnProperty(key)) {
      delete props[key];
    }
  });

  return props;
};

const Text = props => {
  const spreadProps = RemoveProps(props);

  return (
    <div className={`${TextClass} ${props.className || ""}`} {...spreadProps}>
      {props.children}
    </div>
  );
};

const Header = props => {
  const spreadProps = RemoveProps(props);

  return (
    <div className={`${HeaderClass} ${props.className || ""}`} {...spreadProps}>
      {props.children}
    </div>
  );
};

const Mask = props => {
  const spreadProps = RemoveProps(props);

  return (
    <div className={`${MaskClass} ${props.className || ""}`} {...spreadProps}>
      {props.children}
    </div>
  );
};

export { Text, Header, Mask };
export default Text;
