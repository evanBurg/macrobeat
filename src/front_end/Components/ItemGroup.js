import React, { Component } from "react";
import Loader from "react-loaders";
import { AppContext } from "../app";

const styles = {
  loaderContainer: {
    width: "100%",
    margin: 25,
    height: "10em",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    verticalAlign: "middle",
    justifyContent: "center",
    alignItems: "center"
  },
  innerContainer: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "stretch",
    alignItems: "center",
    width: "100vw",
    overflowY: "hidden",
    overflowX: "auto",
    margin: 0,
    padding: 0
  },
  selfContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  item: {
    display: "inline-block",
    height: "10em",
    minHeight: "10em",
    width: "10em",
    minWidth: "10em",
    borderRadius: 15,
    margin: "30px 10px 30px 10px",
    padding: 25,
    backgroundSize: "cover",
    backgroundBlendMode: "multiply",
    boxShadow: "0px 0px 27px -10px #000000"
  },
  text: {
    fontSize: "1em",
    color: "white"
  }
};

const Item = props => {
  let style = JSON.parse(JSON.stringify(styles.item));
  style.background = `rgba(0, 0, 0, 0.45) center no-repeat url(${
    props.type === "song" ? props.item.Image : props.item.Image
  }`;

  if (props.wide) {
    style.width = `20em`;
    style.minWidth = `20em`;
  }

  if (props.skinny) {
    style.width = `8em`;
    style.minWidth = `8em`;
  }

  if (props.tall) {
    style.height = `18em`;
    style.minHeight = `18em`;
  }

  return (
    <AppContext.Consumer>
      {ctx => (
        <div
          style={style}
          onClick={() => props.standalone ? ctx.openCollection(props.item, props.type) : ctx.openContextMenu(props.item, props.type) }
        >
          <h5 className="lH1 dyH iFc SMy kON pBj IZT" style={styles.text}>
            {props.item.Name}
          </h5>
        </div>
      )}
    </AppContext.Consumer>
  );
};

const StandaloneItem = props => {
  return (
    <div style={styles.selfContainer}>
      <Item {...props} item={props.data} standalone={props.type !== "song"} />
    </div>
  );
};

class ItemGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { items, type, loading, wide } = this.props;

    if (loading) {
      return (
        <div style={styles.loaderContainer}>
          <Loader type="ball-scale" color="black" />
        </div>
      );
    }

    return (
      <div style={{marginRight: 10}}>
        <div style={styles.innerContainer}>
          {Object.keys(items).map(key => (
            <Item key={key} item={items[key]} wide={wide} type={type} />
          ))}
        </div>
      </div>
    );
  }
}

export { ItemGroup, Item, StandaloneItem };
export default ItemGroup;
