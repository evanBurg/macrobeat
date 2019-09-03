import React, { Component } from "react";
import ReactDOM from "react-dom";
import 'gestalt/dist/gestalt.css';
import { SegmentedControl } from "gestalt";
import IconButton from "./Components/IconButton";

import Home from './Home/Home'
import Page from "./Components/Page"

const styles = {
  tabbar: {
    position: "fixed",
    bottom: 4,
    left: 0,
    right: 0,
    background: "white",
    borderRadius: 5,
    margin: 5,
    padding: 5,
    WebkitBoxShadow: "9px 10px 18px -14px rgba(0,0,0,0.75)",
    MozBoxShadow: "9px 10px 18px -14px rgba(0,0,0,0.75)",
    boxShadow: "9px 10px 18px -14px rgba(0,0,0,0.75)"
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 0,
      user: null
    };
  }

  setTab = tab => this.setState({ tab });

  getTab = () => {
    switch (this.state.tab) {
      case 0:
        return <Home/>;
      case 1:
        return <Page heading="Artists" />;
      case 2:
        return <Page heading="Albums" />;
      case 3:
        return <Page heading="Songs" />;
      case 4:
        return <Page heading="Search" />;
    }
  };

  navbarItems = () => [
    <IconButton
      label="Home"
      id="home"
      icon="fa fa-home"
      color={this.state.tab === 0 ? "black" : "#7d7d7d"}
      onClick={() => this.setTab(0)}
    />,
    <IconButton
      label="Artists"
      id="artists"
      icon="fa fa-guitar"
      color={this.state.tab === 1 ? "black" : "#7d7d7d"}
      onClick={() => this.setTab(1)}
    />,
    <IconButton
      label="Albums"
      id="albums"
      icon="fa fa-compact-disc"
      color={this.state.tab === 2 ? "black" : "#7d7d7d"}
      onClick={() => this.setTab(2)}
    />,
    <IconButton
      label="Songs"
      id="songs"
      icon="fa fa-music"
      color={this.state.tab === 3 ? "black" : "#7d7d7d"}
      onClick={() => this.setTab(3)}
    />,
    <IconButton
      label="Search"
      id="search"
      icon="fa fa-search"
      color={this.state.tab === 4 ? "black" : "#7d7d7d"}
      onClick={() => this.setTab(4)}
    />
  ];

  render() {
    let { tab } = this.state;

    return (
      <React.Fragment>
        {this.getTab()}
        <div style={styles.tabbar}>
          <SegmentedControl
            items={this.navbarItems()}
            selectedItemIndex={tab}
            onChange={({ activeIndex }) => this.setTab(activeIndex)}
          />
        </div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("react-root"));
