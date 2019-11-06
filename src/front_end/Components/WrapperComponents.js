import React from 'react';

const TextClass = "tBJ dyH iFc SMy yTZ DrD IZT swG";
const HeaderClass = "lH1 dyH iFc SMy kON pBj IZT";
const MaskClass = "Pj7 sLG XiG pJI INd m1e";
const ButtonClass = "RCK Hsu mix Vxj aZc GmH adn a_A gpV hNT iyn BG7 gn8 L4E kVc"
const ButtonTextClass = "tBJ dyH iFc SMy yTZ pBj tg7 mWe"
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

const Button = props => {
  const spreadProps = RemoveProps(props);

  return (
    <button className={`${ButtonClass} ${props.className || ""}`} type="button" style={props.style} {...spreadProps}>
      <div className={`${ButtonTextClass} ${props.className || ""}`} style={props.textStyle}>
        {props.children}
      </div>
    </button>
  )
}

export { Text, Header, Mask, Button };
export default Text;
