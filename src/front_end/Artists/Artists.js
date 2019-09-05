import React, { Component } from "react";
import { Masonry, SearchField, Box } from "gestalt";
import { Page, Row } from "../Components/Page";
import { AppContext } from "../app";
import { StandaloneItem } from "../Components/ItemGroup";
const TallItem = props => <StandaloneItem {...props} tall/>


class Artists extends Component {
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
                  style={{ width: "100%" }}
                />
              </Box>
            </Row>
            <Row style={{justifyContent: 'center', alignItems: 'center'}}>
              <Masonry
                comp={TallItem}
                items={Object.keys(context.library.Artists).map(artistName => {
                    return context.library.Artists[artistName];
                })}
                minCols={1}
              />
            </Row>
          </Page>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Artists;
