import React, { Component } from "react";
import { Heading, Avatar, SearchField, Box } from "gestalt";
import MusicGroup from "../Components/MusicGroup";
import { Page, Row } from "../Components/Page";
import { AppContext } from "../app";
import ItemGroup from "../Components/ItemGroup";

const ranNum = (low, high) => Math.floor(Math.random() * high + low);

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ""
    };
  }

  getRandomAlbum = context => {
    let album = Object.keys(context.Albums)[ranNum(0, context.Albums.length)];
    return context.Albums[album];
  };

  render() {
    return (
      <AppContext.Consumer>
        {context => (
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
              {false && (
                <MusicGroup
                  label="Now playing"
                  onClick={() => console.log("Go to now playing...")}
                  images={[]}
                />
              )}
            </Row>
            <Row>
              {false && (
                <MusicGroup
                  label="Recently played"
                  textRight={150}
                  onClick={() => console.log("Go to recent...")}
                  images={[]}
                />
              )}
            </Row>
            <Row style={{justifyContent: 'center', flexDirection: 'column'}}>
              <Heading size="xs">Artists</Heading>
              <ItemGroup items={context.library ? context.library.Artists : {}} loading={context.loading} />
            </Row>
            <Row style={{justifyContent: 'center', flexDirection: 'column'}}>
              <Heading size="xs">Albums</Heading>
              <ItemGroup wide items={context.library ? context.library.Albums : {}} loading={context.loading}/>
            </Row><Row style={{justifyContent: 'center', flexDirection: 'column'}}>
              <Heading size="xs">Songs</Heading>
              <ItemGroup songs items={context.library ? context.library.Songs : []} loading={context.loading}/>
            </Row>
          </Page>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Home;
