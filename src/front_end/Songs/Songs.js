import React, { Component } from "react";
import { Masonry, SearchField, Box } from "gestalt";
import { Page, Row } from "../Components/Page";
import { AppContext } from "../app";
import { StandaloneItem } from "../Components/ItemGroup";
import Loader from "react-loaders";
const Item = props => <StandaloneItem {...props} song skinny />;

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
  }
};

class Songs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ""
    };
  }

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <Page heading="Songs">
            <Row>
              <Box
                alignItems="center"
                justifyContent="center"
                display="flex"
                flex="grow"
                paddingY={5}
              >
                <SearchField
                  accessibilityLabel="Search artists"
                  id="searchField"
                  onChange={({ value }) => this.setState({ search: value })}
                  placeholder="Search artists.."
                  value={this.state.search}
                  style={{ width: "100%" }}
                />
              </Box>
            </Row>
            <Row style={{ justifyContent: "center", alignItems: "center" }}>
              {context.loading ? (
                <div style={styles.loaderContainer}>
                  <Loader type="ball-scale" color="black" />
                </div>
              ) : (
                <Masonry
                  flexible
                  comp={Item}
                  items={Object.keys(context.library.Songs).map(
                    songName => {
                      return context.library.Songs[songName];
                    }
                  )}
                  minCols={2}
                />
              )}
            </Row>
          </Page>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Songs;
