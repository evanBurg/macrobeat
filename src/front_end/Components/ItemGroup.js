import React, { Component } from "react";
import { Heading } from "gestalt";
import Loader from 'react-loaders'

const styles = {
  container: {
    width: "100%",
    overflowY: "hidden",
    overflowX: "auto",
    margin: 0,
    padding: 0
  },
  loaderContainer: {
    width: "100%",
    margin: 25,
    height: "10em",
    textAlign: "center",
    display: 'flex',
    flexDirection: 'column',
    verticalAlign: 'middle',
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerContainer: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "stretch",
    alignItems: "center"
  },
  item: {
    display: "inline-block",
    height: "10em",
    minHeight: "10em",
    width: "10em",
    minWidth: "10em",
    borderRadius: 15,
    margin: 30,
    padding: 25,
    backgroundSize: "cover",
    backgroundBlendMode: "multiply",
    boxShadow: "0px 0px 27px -10px #000000",
    backgroundPosition: 'center'
  },
  text: {
    fontSize: "1em",
    color: "white"
  }
};

const Item = props => {
  let style = JSON.parse(JSON.stringify(styles.item));
  style.background = `rgba(0, 0, 0, 0.45) url(${props.song ? props.item.Image.url : props.item.Image}`;
  style.backgroundPosition = "center";
  style.backgroundPositionX = "center";
  style.backgroundPositionY = "center";

  if(props.wide){
    style.width = "20em"
  }

  return (
    <div style={style}>
      <h5 className="lH1 dyH iFc SMy kON pBj IZT" style={styles.text}>
        {props.item.Name}
      </h5>
    </div>
  );
};

const Song = props => {
  let style = JSON.parse(JSON.stringify(styles.item));
  style.background = `rgba(0, 0, 0, 0.45) url(${props.item.Image.url}`;
  style.backgroundPositionX = "center";
  style.backgroundPositionY = "center";

  if(props.wide){
    style.width = "15em"
  }

  return (
    <div style={style}>
      <h5 className="lH1 dyH iFc SMy kON pBj IZT" style={styles.text}>
        {props.item.Name}
      </h5>
    </div>
  );
};

class ItemGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { items, songs, loading, wide } = this.props;

    if(loading){
      return <div style={styles.loaderContainer}>
        <Loader type="ball-scale" color='black' />
        </div>
    }

    if (!items) items = songs ? [] : {};

    if (songs) {
      return (
        <div style={styles.container}>
          <div style={styles.innerContainer}>
            {items.map((item, index) => (
              <Song key={index} item={item} song wide={wide} />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div style={styles.container}>
        <div style={styles.innerContainer}>
          {Object.keys(items).map(key => (
            <Item key={key} item={items[key]} wide={wide} />
          ))}
        </div>
      </div>
    );
  }
}

export default ItemGroup;
