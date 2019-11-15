import React, { Component } from "react";
import { Masonry, SearchField, Box } from "gestalt";
import { Page, Row } from "../Components/Page";
import { AppContext } from "../app";
import { StandaloneItem } from "../Components/ItemGroup";
import Loader from "react-loaders";
import Empty from "../Components/Empty";
const TallItem = props => <StandaloneItem {...props} type="artist" tall skinny />;

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
  search: { width: "100%" },
  row: { justifyContent: "center", alignItems: "center" }
};

class Artists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ""
    };
  }

  getBody = context => {
    let {search} = this.state;
    if(context.Library.Artists && Object.keys(context.Library.Artists).length > 0){

      if(search){
        return <Masonry
                flexible
                comp={TallItem}
                items={Object.keys(context.Library.Artists).filter(name => name.toLowerCase().includes(search.toLowerCase())).map(
                  artistName => {
                    return context.Library.Artists[artistName];
                  }
                )}
                minCols={2}
              />
      }

      return <Masonry
                flexible
                comp={TallItem}
                items={Object.keys(context.Library.Artists).map(
                  artistName => {
                    return context.Library.Artists[artistName];
                  }
                )}
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
          <Page heading="Artists">
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

export default Artists;
