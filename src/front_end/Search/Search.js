import React, { Component } from "react";
import { AppContext } from "../app";
import { Box, SearchField } from "gestalt";
import { Row, Page } from "../Components/Page";
import { Text, Header } from "../Components/WrapperComponents";
import Song from "../View Models/Song";
import Empty from "../Components/Empty";

const styles = {
  resultsContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "unset",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: "3rem"
  },
  resultRow: {
    width: "-webkit-fill-available",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20
  },
  resultImage: {
    display: "inline-block",
    height: "2rem",
    minHeight: "2rem",
    width: "2rem",
    minWidth: "2rem",
    borderRadius: 15,
    padding: 10,
    backgroundSize: "cover",
    backgroundBlendMode: "multiply",
    boxShadow: "0px 0px 27px -10px #000000"
  },
  resultInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingLeft: 10
  }
};

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      resultItems: [],
      search: ""
    };
  }

  getResults = async context => {
    let { results, search } = this.state;

    if (!search) return <React.Fragment />;

    // TODO new search endpoint, data struct different
    let response = await fetch(`/api/search/${search}`);
    if (response.ok) {
      results = (await response.json()).map(song => new Song(song, "YouTube"));
    }

    this.setState({
      results,
      resultItems: results.map((result, idx) => {
        return (
          <div
            key={`search-${idx}`}
            style={styles.resultRow}
            onClick={() => context.openContextMenu(result, "song")}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{
                  ...styles.resultImage,
                  background: `rgba(0, 0, 0, 0.45) center no-repeat url(${result.Image})`
                }}
              />
              <div style={styles.resultInfo}>
                <Header
                  style={{
                    fontSize: "1em",
                    fontWeight: "bold"
                  }}
                >
                  {result.Name}
                </Header>
                <Text
                  style={{
                    fontSize: "0.9em"
                  }}
                >
                  Song • {result.Artist} • {result.Album}
                </Text>
              </div>
            </div>

            <i
              style={{ paddingLeft: 10, paddingTop: 3 }}
              className={`fab fa-${result.Type.toLowerCase()}`}
            />
          </div>
        );
      })
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
                  onChange={({ value }) =>
                    this.setState({ search: value }, () =>
                      this.getResults(context)
                    )
                  }
                  placeholder="Search services..."
                  value={this.state.search}
                  style={{ width: "100%" }}
                />
              </Box>
            </Row>
            {this.state.resultItems.length > 0 && !!this.state.search ? (
              <Row style={styles.resultsContainer}>
                {this.state.resultItems}
              </Row>
            ) : (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Empty />
              </div>
            )}
          </Page>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Search;
