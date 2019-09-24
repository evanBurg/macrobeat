import React, { Component } from "react";
import { AppContext } from "../app";
import { Box, SearchField } from "gestalt";
import { Row, Page } from "../Components/Page";
import { Text, Header } from "../Components/WrapperComponents";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      search: ""
    };
  }

  getResults = fakeResults => {
    let { results } = this.state;
    if (fakeResults) results = fakeResults;

    return results.map((result, idx) => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div
            style={{
              display: "inline-block",
              height: "3em",
              minHeight: "3em",
              width: "3em",
              minWidth: "3em",
              borderRadius: 15,
              padding: 10,
              backgroundSize: "cover",
              backgroundBlendMode: "multiply",
              boxShadow: "0px 0px 27px -10px #000000",
              background: `rgba(0, 0, 0, 0.45) center no-repeat url(${result.Image.url})`
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start"
            }}
          >
            <Header>{result.name}</Header>
            <Text>
              Song • {result.Artist} • {result.Album}
            </Text>
          </div>
          <i className="fa fa-youtube" />
        </div>
      );
    });
  };

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <Page heading="Search">
            <Row>
              <Box
                alignItems="center"
                justifyContent="center"
                display="flex"
                flex="grow"
                paddingY={5}
              >
                <SearchField
                  accessibilityLabel="Search services"
                  id="searchField"
                  onChange={({ value }) => this.setState({ search: value })}
                  placeholder="Search services..."
                  value={this.state.search}
                  style={{ width: "100%" }}
                />
              </Box>
            </Row>
            <Row
              style={{ flexDirection: "column", justifyContent: "flex-start" }}
            >
              {context.Library && this.getResults(context.Library.Songs)}
            </Row>
          </Page>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Search;
