import React, { Component } from "react";
import ReactDOM from "react-dom";
import "gestalt/dist/gestalt.css";
import "loaders.css//loaders.css"
import { SegmentedControl } from "gestalt";
import IconButton from "./Components/IconButton";

import Home from "./Home/Home";
import Page from "./Components/Page";

import Library from "./View Models/Library";

//"./View Models/YouTubeSearch.json"
const Search = {
    "source": "YouTube",
    "items": [
      {
        "kind": "youtube#searchResult",
        "etag": "\"0UM_wBUsFuT6ekiIlwaHvyqc80M/kpai9Xq4rORkGu9WmMJZgwWuX3Y\"",
        "id": {
          "kind": "youtube#video",
          "videoId": "9f5zD7ZSNpQ"
        },
        "snippet": {
          "publishedAt": "2018-01-25T16:00:01.000Z",
          "channelId": "UCul9agDzTZxruNd9wEUWL7w",
          "title": "Kali Uchis - After The Storm ft. Tyler, The Creator, Bootsy Collins (Official Video)",
          "description": "Isolation out now: http://smarturl.it/IsolationKaliUchis Directed by Nadia Lee Cohen Creative Director Kali Uchis Produced by Anonymous content Audio ...",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/9f5zD7ZSNpQ/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/9f5zD7ZSNpQ/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/9f5zD7ZSNpQ/hqdefault.jpg",
              "width": 480,
              "height": 360
            }
          },
          "channelTitle": "KaliUchisVEVO",
          "liveBroadcastContent": "none"
        }
      },
      {
        "kind": "youtube#searchResult",
        "etag": "\"0UM_wBUsFuT6ekiIlwaHvyqc80M/luEpF4Ddd-_U3tazgaJHok34uOU\"",
        "id": {
          "kind": "youtube#channel",
          "channelId": "UCQTuAezPu6MOpcIJ1Tz9dNA"
        },
        "snippet": {
          "publishedAt": "2010-06-04T13:07:19.000Z",
          "channelId": "UCQTuAezPu6MOpcIJ1Tz9dNA",
          "title": "KALI UCHIS",
          "description": "",
          "thumbnails": {
            "default": {
              "url": "https://yt3.ggpht.com/-RJ-Y-HM2iLc/AAAAAAAAAAI/AAAAAAAAAAA/DtJkfIDNf6w/s88-c-k-no-mo-rj-c0xffffff/photo.jpg"
            },
            "medium": {
              "url": "https://yt3.ggpht.com/-RJ-Y-HM2iLc/AAAAAAAAAAI/AAAAAAAAAAA/DtJkfIDNf6w/s240-c-k-no-mo-rj-c0xffffff/photo.jpg"
            },
            "high": {
              "url": "https://yt3.ggpht.com/-RJ-Y-HM2iLc/AAAAAAAAAAI/AAAAAAAAAAA/DtJkfIDNf6w/s800-c-k-no-mo-rj-c0xffffff/photo.jpg"
            }
          },
          "channelTitle": "KALI UCHIS",
          "liveBroadcastContent": "none"
        }
      },
      {
        "kind": "youtube#searchResult",
        "etag": "\"0UM_wBUsFuT6ekiIlwaHvyqc80M/B3ZoOc_GWoOgaFwGQrk3K5cY4dE\"",
        "id": {
          "kind": "youtube#video",
          "videoId": "KDUOLz9ZL2g"
        },
        "snippet": {
          "publishedAt": "2017-06-21T15:00:01.000Z",
          "channelId": "UCul9agDzTZxruNd9wEUWL7w",
          "title": "Kali Uchis - Tyrant (Official Video) ft. Jorja Smith",
          "description": "Tyrant ft Jorja Smith is out now https://KaliUchis.lnk.to/Tyrant DIRECTED BY HELMI PRODUCED BY DIVISION OFFICIAL LYRICS All I hear is sirens In a world ...",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/KDUOLz9ZL2g/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/KDUOLz9ZL2g/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/KDUOLz9ZL2g/hqdefault.jpg",
              "width": 480,
              "height": 360
            }
          },
          "channelTitle": "KaliUchisVEVO",
          "liveBroadcastContent": "none"
        }
      },
      {
        "kind": "youtube#searchResult",
        "etag": "\"0UM_wBUsFuT6ekiIlwaHvyqc80M/lXmlfEW6rPnNpPf74BUNAz0aAVg\"",
        "id": {
          "kind": "youtube#channel",
          "channelId": "UCul9agDzTZxruNd9wEUWL7w"
        },
        "snippet": {
          "publishedAt": "2015-05-04T17:37:54.000Z",
          "channelId": "UCul9agDzTZxruNd9wEUWL7w",
          "title": "KaliUchisVEVO",
          "description": "",
          "thumbnails": {
            "default": {
              "url": "https://yt3.ggpht.com/-A32WhO2ci-8/AAAAAAAAAAI/AAAAAAAAAAA/0yWeUooNrlM/s88-c-k-no-mo-rj-c0xffffff/photo.jpg"
            },
            "medium": {
              "url": "https://yt3.ggpht.com/-A32WhO2ci-8/AAAAAAAAAAI/AAAAAAAAAAA/0yWeUooNrlM/s240-c-k-no-mo-rj-c0xffffff/photo.jpg"
            },
            "high": {
              "url": "https://yt3.ggpht.com/-A32WhO2ci-8/AAAAAAAAAAI/AAAAAAAAAAA/0yWeUooNrlM/s800-c-k-no-mo-rj-c0xffffff/photo.jpg"
            }
          },
          "channelTitle": "KaliUchisVEVO",
          "liveBroadcastContent": "upcoming"
        }
      },
      {
        "kind": "youtube#searchResult",
        "etag": "\"0UM_wBUsFuT6ekiIlwaHvyqc80M/B1RPgYTZg-XUy_QlVePXCF9p3LQ\"",
        "id": {
          "kind": "youtube#channel",
          "channelId": "UCpkgnBLJpbkVLAob1CaPZsw"
        },
        "snippet": {
          "publishedAt": "2015-02-17T06:48:40.000Z",
          "channelId": "UCpkgnBLJpbkVLAob1CaPZsw",
          "title": "Kali Uchis - Topic",
          "description": "Karly-Marina Loaiza, known professionally as Kali Uchis, is a Colombian-American singer and songwriter. She debuted in the music industry with her 2012 ...",
          "thumbnails": {
            "default": {
              "url": "https://yt3.ggpht.com/-5eAPMMUlClQ/AAAAAAAAAAI/AAAAAAAAAAA/ur_LZMHBn7A/s88-c-k-no-mo-rj-c0xffffff/photo.jpg"
            },
            "medium": {
              "url": "https://yt3.ggpht.com/-5eAPMMUlClQ/AAAAAAAAAAI/AAAAAAAAAAA/ur_LZMHBn7A/s240-c-k-no-mo-rj-c0xffffff/photo.jpg"
            },
            "high": {
              "url": "https://yt3.ggpht.com/-5eAPMMUlClQ/AAAAAAAAAAI/AAAAAAAAAAA/ur_LZMHBn7A/s800-c-k-no-mo-rj-c0xffffff/photo.jpg"
            }
          },
          "channelTitle": "Kali Uchis - Topic",
          "liveBroadcastContent": "upcoming"
        }
      }
    ]
  }

const styles = {
  tabbar: {
    position: "fixed",
    bottom: 4,
    left: 0,
    right: 0,
    background: "white",
    borderRadius: 5,
    margin: 5,
    padding: 5,
    WebkitBoxShadow: "9px 10px 18px -14px rgba(0,0,0,0.75)",
    MozBoxShadow: "9px 10px 18px -14px rgba(0,0,0,0.75)",
    boxShadow: "9px 10px 18px -14px rgba(0,0,0,0.75)"
  }
};

const AppContext = React.createContext({
  library: null,
  user: {
    name: undefined,
    user: undefined,
    img: undefined
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 0,
      user: {
        name: undefined,
        user: undefined,
        img: undefined
      },
      library: null,
      loading: false
    };
  }

  getData = async () => {
    this.setState({ loading: true });

    //Replace with actual fetch
    setTimeout(() => {
      this.setState({
        library: new Library(Search),
        user: {
          name: "Evan Burgess",
          user: "Burgy",
          img: "https://i.imgur.com/nKuE1ep.jpg"
        }
      });

      this.setState({ loading: false });
    }, 2000);
  };

  componentDidMount(){
      this.getData();
  }

  setTab = tab => this.setState({ tab });

  getTab = () => {
    switch (this.state.tab) {
      case 0:
        return <Home />;
      case 1:
        return <Page heading="Artists" />;
      case 2:
        return <Page heading="Albums" />;
      case 3:
        return <Page heading="Songs" />;
      case 4:
        return <Page heading="Search" />;
    }
  };

  navbarItems = () => [
    <IconButton
      label="Home"
      id="home"
      icon="fa fa-home"
      color={this.state.tab === 0 ? "black" : "#7d7d7d"}
      onClick={() => this.setTab(0)}
    />,
    <IconButton
      label="Artists"
      id="artists"
      icon="fa fa-guitar"
      color={this.state.tab === 1 ? "black" : "#7d7d7d"}
      onClick={() => this.setTab(1)}
    />,
    <IconButton
      label="Albums"
      id="albums"
      icon="fa fa-compact-disc"
      color={this.state.tab === 2 ? "black" : "#7d7d7d"}
      onClick={() => this.setTab(2)}
    />,
    <IconButton
      label="Songs"
      id="songs"
      icon="fa fa-music"
      color={this.state.tab === 3 ? "black" : "#7d7d7d"}
      onClick={() => this.setTab(3)}
    />,
    <IconButton
      label="Search"
      id="search"
      icon="fa fa-search"
      color={this.state.tab === 4 ? "black" : "#7d7d7d"}
      onClick={() => this.setTab(4)}
    />
  ];

  render() {
    let { tab, user, library, loading } = this.state;

    return (
      <AppContext.Provider value={{ user, library, loading }}>
        {this.getTab()}
        <div style={styles.tabbar}>
          <SegmentedControl
            items={this.navbarItems()}
            selectedItemIndex={tab}
            onChange={({ activeIndex }) => this.setTab(activeIndex)}
          />
        </div>
      </AppContext.Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("react-root"));
export { AppContext };
