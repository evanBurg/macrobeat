import React, { Component } from "react";
import { SegmentedControl } from "gestalt";
import IconButton from "../Components/IconButton"

const styles = {
  navbar: {
    position: "fixed",
    bottom: 4,
    left: 0,
    right: 0,
    background: "white",
    borderRadius: 5,
    margin: 5,
    padding: 5,
    "-webkit-box-shadow": "9px 10px 18px -14px rgba(0,0,0,0.75)",
    "-moz-box-shadow": "9px 10px 18px -14px rgba(0,0,0,0.75)",
    boxShadow: "9px 10px 18px -14px rgba(0,0,0,0.75)"
  }
};




class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 0,
      user: null
    };
  }

  setTab = tab => this.setState({ tab });

  navbarItems = () => [
    <IconButton
      label="Home"
      icon="fa fa-home"
      color={this.state.tab === 0 ?  "black" : "#7d7d7d"} 
      onClick={() => this.setTab(0)}
    />,
    <IconButton
      label="Artists"
      icon="fa fa-guitar"
      color={this.state.tab === 1 ?  "black" : "#7d7d7d"} 
      onClick={() => this.setTab(1)}
    />,
    <IconButton
      label="Albums"
      icon="fa fa-compact-disc"
      color={this.state.tab === 2 ?  "black" : "#7d7d7d"} 
      onClick={() => this.setTab(2)}
    />,
    <IconButton
      label="Songs"
      icon="fa fa-music"
      color={this.state.tab === 3 ?  "black" : "#7d7d7d"} 
      onClick={() => this.setTab(3)}
    />,
    <IconButton
      label="Search"
      icon="fa fa-search"
      color={this.state.tab === 4 ?  "black" : "#7d7d7d"} 
      onClick={() => this.setTab(4)}
    />
  ];

  render() {
    let { tab } = this.state;

    return (
      <React.Fragment>
        <div style={styles.navbar}>
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

export default Home;
