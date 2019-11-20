import React, { Component } from "react";
import { AppContext } from "../app";
import { Box, SearchField, TextField } from "gestalt";
import { Row, Page } from "../Components/Page";
import Modal from "../Components/Modal";
import { Text, Header, Button } from "../Components/WrapperComponents";
import Song from "../View Models/Song";
import Empty from "../Components/Empty";
import IosAddCircle from "react-ionicons/lib/IosAddCircle";

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
  },
  serviceBubble: {
    padding: "0.4rem",
    paddingRight: "1rem",
    paddingLeft: "1rem",
    backgroundColor: "white",
    borderRadius: 100,
    minWidth: "fit-content",
    border: "2px solid #333333",
    color: "#333333",
    fontSize: "0.8rem",
    margin: "0.3rem"
  },
  serviceBubbleSelected: {
    padding: "0.4rem",
    paddingRight: "1rem",
    minWidth: "fit-content",
    paddingLeft: "1rem",
    backgroundColor: "#333333",
    borderRadius: 100,
    border: "2px solid #333333",
    color: "white",
    fontSize: "0.8rem",
    margin: "0.3rem"
  }
};

class CustomSong extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: ""
    };
  }

  urlChange = event => {
    this.setState({
      url: event.value
    });
  };

  render() {
    return (
      <Modal
        lg
        toggleOpen={this.props.toggleOpen}
        open={this.props.open}
        title="Custom Song"
      >
        <div style={{padding: '1rem'}}>
          <TextField
            id="url"
            onChange={this.urlChange}
            placeholder="Enter a custom URL..."
            value={this.state.url}
          />
          <Box
            display="flex"
            flex="grow"
            alignItems="center"
            justifyContent="around"
            padding={2}
          >
            <Button style={{margin: 7}} onClick={() => this.props.submit(false, this.state.url)}>
              Add to Queue
            </Button>
            <Button style={{margin: 7}} onClick={() => this.props.submit(true, this.state.url)}>
              Play Next
            </Button>
          </Box>
        </div>
      </Modal>
    );
  }
}

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      resultItems: [],
      search: "",
      debounceTimer: null,
      customOpen: false,
      selectedServices: ["youtube", "soundcloud", "bandcamp", "spotify"]
    };
  }

  getResults = async context => {
    let { results, search, selectedServices } = this.state;

    let filter = encodeURIComponent(JSON.stringify(selectedServices));

    if (!search) {
      return this.setState({
        results: [],
        resultItems: [],
        loading: false
      });
    }

    // TODO new search endpoint, data struct different
    let response = await fetch(`/api/search/${search}?services=${filter}`);
    if (response.ok) {
      results = (await response.json()).map(
        song => new Song(song, song.source)
      );
    }

    this.setState({
      results,
      resultItems: results.map((result, idx) => {
        const backgroundStyles = {
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          backgroundImage: `url(${result.Image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        };

        return (
          <div
            key={`search-${idx}`}
            style={styles.resultRow}
            onClick={() => context.openContextMenu(result, "searchSong")}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{
                  ...styles.resultImage,
                  ...backgroundStyles
                }}
                key={result.Image}
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
      }),
      loading: false
    });
  };

  debounce = ctx => {
    let { debounceTimer } = this.state;

    clearTimeout(debounceTimer);

    this.setState({
      debounceTimer: setTimeout(() => this.getResults(ctx), 1500),
      loading: true
    });
  };

  handleSearchChange = ({ value }, ctx) => {
    this.setState({ search: value }, () => this.debounce(ctx));
  };

  services = [
    {
      label: "YouTube",
      value: "youtube"
    },
    {
      label: "Soundcloud",
      value: "soundcloud"
    },
    {
      label: "Bandcamp",
      value: "bandcamp"
    },
    {
      label: "Spotify",
      value: "spotify"
    }
  ];

  selectService = (service, ctx) => {
    let { selectedServices } = this.state;
    selectedServices = JSON.parse(JSON.stringify(selectedServices));

    if (selectedServices.includes(service)) {
      selectedServices = selectedServices.filter(srv => srv !== service);
    } else {
      selectedServices.push(service);
    }

    this.setState({ selectedServices, resultItems: [], loading: true }, () => this.getResults(ctx));
  };

  addCustom = (playNext, url, ctx) => {
    const song = new Song(url, "custom");
    if (playNext) {
      ctx.Queue.PlayNext(song);
    } else {
      ctx.Queue.AddToQueue(song);
    }

    this.setState({ customOpen: false });
  };

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <Page heading="Search">
            <div>
              <Box
                alignItems="center"
                display="flex"
                flex="grow"
                overflow="scrollX"
              >
                {this.services.map(srv => {
                  let selected = this.state.selectedServices.includes(
                    srv.value
                  );

                  return (
                    <Text
                      key={srv.value}
                      onClick={() => this.selectService(srv.value, context)}
                      style={
                        !selected
                          ? styles.serviceBubble
                          : styles.serviceBubbleSelected
                      }
                    >
                      {srv.label}
                      <i
                        style={{ paddingLeft: 6, paddingTop: 3 }}
                        className={`fab fa-${srv.value}`}
                      />
                    </Text>
                  );
                })}
              </Box>
              <div style={{paddingBottom: 10}}>
              <Box
                alignItems="center"
                justifyContent="center"
                display="flex"
                flex="grow"
              >
                <Row style={{ justifyContent: "center" }}>
                  <div style={{ margin: 10 }}>
                    <IosAddCircle
                      onClick={() => this.setState({ customOpen: true })}
                      color="#333333"
                      fontSize="2rem"
                    />
                  </div>
                  <SearchField
                    accessibilityLabel="Search services"
                    id="searchField"
                    onChange={e => this.handleSearchChange(e, context)}
                    placeholder="Search services..."
                    value={this.state.search}
                    style={{ width: "100%" }}
                  />
                </Row>
              </Box>
              </div>
            </div>
            {this.state.resultItems.length > 0 &&
            !!this.state.search &&
            !this.state.loading ? (
              <Row style={styles.resultsContainer}>
                {this.state.resultItems}
              </Row>
            ) : (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Empty loading={this.state.loading} />
              </div>
            )}
            <CustomSong
              open={this.state.customOpen}
              toggleOpen={() =>
                this.setState({ customOpen: !this.state.customOpen })
              }
              submit={(playNext, url) => this.addCustom(playNext, url, context)}
            />
          </Page>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Search;
