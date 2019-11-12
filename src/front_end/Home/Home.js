import React, { Component } from "react";
import { Heading, Avatar, SearchField, Box } from "gestalt";
import SongGroup from "../Components/SongGroup";
import { Page, Row } from "../Components/Page";
import { AppContext } from "../app";
import ItemGroup from "../Components/ItemGroup";
import Empty from "../Components/Empty";

class Home extends Component {
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
              {context.Queue && !context.Queue.Empty && (
                <SongGroup
                  label="Now playing"
                  onClick={this.props.toggleNowPlaying}
                  songs={context.Queue.Array.slice(0, 5)}
                />
              )}
            </Row>
            <Row>
              {context.Library && context.Library.History.length > 0 && (
                <SongGroup
                  label="Recently played"
                  textRight={150}
                  onClick={() => console.log("Go to recent...")}
                  songs={context.Library.History().slice(0, 5)}
                />
              )}
            </Row>
            <Row style={{justifyContent: 'center', flexDirection: 'column'}}>
              <Heading size="xs">Artists</Heading>
              {context.Library && context.Library.Artists && Object.keys(context.Library.Artists).length > 0 ? (
                <ItemGroup type="artist" items={context.Library ? context.Library.Artists : {}} loading={context.loading} />
              ) : (
                <Empty loading={context.loading} />
              )}
            </Row>
            <Row style={{justifyContent: 'center', flexDirection: 'column'}}>
              <Heading size="xs">Albums</Heading>
              {context.Library && context.Library.Albums && Object.keys(context.Library.Albums).length > 0 ? (
                <ItemGroup type="album" wide items={context.Library ? context.Library.Albums : {}} loading={context.loading}/>
              ) : (
                <Empty loading={context.loading} /> 
              )}
            </Row><Row style={{justifyContent: 'center', flexDirection: 'column'}}>
              <Heading size="xs">Songs</Heading>
              {context.Library && context.Library.Songs && context.Library.Songs.length > 0 ? (
                <ItemGroup type="library" items={context.Library ? context.Library.Songs : []} loading={context.loading}/>
              ) : (
                <Empty loading={context.loading} />
              )}
            </Row>
          </Page>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Home;
