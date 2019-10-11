import React, { Component } from "react";
import { Masonry, SearchField, Box } from "gestalt";
import { Page, Row } from "../Components/Page";
import { AppContext } from "../app";
import { StandaloneItem } from "../Components/ItemGroup";
import Loader from "react-loaders";
import Empty from "../Components/Empty"
const Item = props => <StandaloneItem {...props} type="song" skinny />;

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
  search: {
    width: "100%"
  },
  row: { justifyContent: "center", alignItems: "center" }
};

class Songs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ""
    };
  }

  getBody = context => {
    if(context.Library.Songs && context.Library.Songs.length > 0){
      return <Masonry
                flexible
                comp={Item}
                items={Object.keys(context.Library.Songs).map(songName => {
                  return context.Library.Songs[songName];
                })}
                minCols={2}
              />
    }else{
      return <Empty/>
    }
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
                  accessibilityLabel="Search songs"
                  id="searchField"
                  onChange={({ value }) => this.setState({ search: value })}
                  placeholder="Search songs.."
                  value={this.state.search}
                  style={styles.search}
                />
              </Box>
            </Row>
            <Row style={styles.row}>
              {context.loading ? (
                <div style={styles.loaderContainer}>
                  <Loader type="ball-scale" color="black" />
                </div>
              ) : (
                this.getBody(context)
              )}
            </Row>
          </Page>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Songs;
