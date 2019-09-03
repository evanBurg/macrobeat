import React, { Component } from "react";
import { Heading, Avatar, SearchField, Box } from "gestalt";
import MusicGroup from "../Components/MusicGroup";
import { Page, Row } from "../Components/Page";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ""
    };
  }

  render() {
    return (
      <Page heading="Home">
        <Row>
          <Box
            alignItems="center"
            justifyContent="center"
            display="flex"
            flex="grow"
            paddingY={5}
          >
            <SearchField
              accessibilityLabel="Search library"
              id="searchField"
              onChange={({ value }) => this.setState({ search: value })}
              placeholder="Search your library.."
              value={this.state.search}
              style={{ width: "100%" }}
            />
          </Box>
        </Row>
        <Row>
          <MusicGroup
            label="Now playing"
            onClick={() => console.log("Go to now playing...")}
            images={[
              {
                color: "rgb(111, 91, 77)",
                naturalHeight: 751,
                naturalWidth: 564,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock1.291c62ad.jpg"
              },
              {
                color: "rgb(231, 186, 176)",
                naturalHeight: 200,
                naturalWidth: 98,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock2.c03f525f.jpg"
              },
              {
                color: "#000",
                naturalHeight: 300,
                naturalWidth: 200,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock3.2e15a8c4.jpg"
              },
              {
                color: "#000",
                naturalHeight: 517,
                naturalWidth: 564,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock4.0a629ab7.jpg"
              },
              {
                color: "#000",
                naturalHeight: 806,
                naturalWidth: 564,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock5.bfa01fba.jpg"
              },
              {
                color: "#000",
                naturalHeight: 200,
                naturalWidth: 200,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock6.e014b01c.jpg"
              }
            ]}
          />
        </Row>
        <Row>
          <MusicGroup
            label="Recently played"
            textRight={150}
            onClick={() => console.log("Go to recent...")}
            images={[
              {
                color: "rgb(111, 91, 77)",
                naturalHeight: 751,
                naturalWidth: 564,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock1.291c62ad.jpg"
              },
              {
                color: "rgb(231, 186, 176)",
                naturalHeight: 200,
                naturalWidth: 98,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock2.c03f525f.jpg"
              },
              {
                color: "#000",
                naturalHeight: 300,
                naturalWidth: 200,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock3.2e15a8c4.jpg"
              },
              {
                color: "#000",
                naturalHeight: 517,
                naturalWidth: 564,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock4.0a629ab7.jpg"
              },
              {
                color: "#000",
                naturalHeight: 806,
                naturalWidth: 564,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock5.bfa01fba.jpg"
              },
              {
                color: "#000",
                naturalHeight: 200,
                naturalWidth: 200,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock6.e014b01c.jpg"
              }
            ]}
          />
        </Row>
        <Row>
          <MusicGroup
            label="Albums"
            textRight={164}
            onClick={() => console.log("Go to albums...")}
            images={[
              {
                color: "rgb(111, 91, 77)",
                naturalHeight: 751,
                naturalWidth: 564,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock1.291c62ad.jpg"
              },
              {
                color: "rgb(231, 186, 176)",
                naturalHeight: 200,
                naturalWidth: 98,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock2.c03f525f.jpg"
              },
              {
                color: "#000",
                naturalHeight: 300,
                naturalWidth: 200,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock3.2e15a8c4.jpg"
              },
              {
                color: "#000",
                naturalHeight: 517,
                naturalWidth: 564,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock4.0a629ab7.jpg"
              },
              {
                color: "#000",
                naturalHeight: 806,
                naturalWidth: 564,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock5.bfa01fba.jpg"
              },
              {
                color: "#000",
                naturalHeight: 200,
                naturalWidth: 200,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock6.e014b01c.jpg"
              }
            ]}
          />
        </Row>
        <Row>
          <MusicGroup
            label="Artists"
            textRight={180}
            onClick={() => console.log("Go to artists...")}
            images={[
              {
                color: "rgb(111, 91, 77)",
                naturalHeight: 751,
                naturalWidth: 564,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock1.291c62ad.jpg"
              },
              {
                color: "rgb(231, 186, 176)",
                naturalHeight: 200,
                naturalWidth: 98,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock2.c03f525f.jpg"
              },
              {
                color: "#000",
                naturalHeight: 300,
                naturalWidth: 200,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock3.2e15a8c4.jpg"
              },
              {
                color: "#000",
                naturalHeight: 517,
                naturalWidth: 564,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock4.0a629ab7.jpg"
              },
              {
                color: "#000",
                naturalHeight: 806,
                naturalWidth: 564,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock5.bfa01fba.jpg"
              },
              {
                color: "#000",
                naturalHeight: 200,
                naturalWidth: 200,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock6.e014b01c.jpg"
              }
            ]}
          />
        </Row>
        <Row>
          <MusicGroup
            label="Songs"
            textRight={187}
            onClick={() => console.log("Go to songs...")}
            images={[
              {
                color: "rgb(111, 91, 77)",
                naturalHeight: 751,
                naturalWidth: 564,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock1.291c62ad.jpg"
              },
              {
                color: "rgb(231, 186, 176)",
                naturalHeight: 200,
                naturalWidth: 98,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock2.c03f525f.jpg"
              },
              {
                color: "#000",
                naturalHeight: 300,
                naturalWidth: 200,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock3.2e15a8c4.jpg"
              },
              {
                color: "#000",
                naturalHeight: 517,
                naturalWidth: 564,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock4.0a629ab7.jpg"
              },
              {
                color: "#000",
                naturalHeight: 806,
                naturalWidth: 564,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock5.bfa01fba.jpg"
              },
              {
                color: "#000",
                naturalHeight: 200,
                naturalWidth: 200,
                src:
                  "https://pinterest.github.io/gestalt/static/media/stock6.e014b01c.jpg"
              }
            ]}
          />
        </Row>
      </Page>
    );
  }
}

export default Home;
