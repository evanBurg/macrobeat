import React, { Component } from "react";
import {
  Heading,
  Avatar,
  SearchField,
  Box,
  Collage,
  Mask,
  Image,
  IconButton
} from "gestalt";
import MusicGroup from "../Components/MusicGroup";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    paddingBottom: 50
  },
  row: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    verticalAlign: "middle",
    alignItems: "center"
  }
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ""
    };
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.row}>
          <Box
            display="flex"
            flex="grow"
            justifyContent="between"
            paddingY={5}
            paddingX={6}
          >
            <Heading size="sm">Home</Heading>
            <Avatar
              size="md"
              name="User"
              src="https://via.placeholder.com/150"
            />
          </Box>
        </div>
        <div style={styles.row}>
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
        </div>
        <div style={styles.row}>
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
        </div>
        <div style={styles.row}>
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
        </div>
        <div style={styles.row}>
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
        </div>
        <div style={styles.row}>
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
        </div>
        <div style={styles.row}>
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
        </div>
      </div>
    );
  }
}

export default Home;
