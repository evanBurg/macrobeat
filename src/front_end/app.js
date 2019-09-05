import React, { Component } from "react";
import ReactDOM from "react-dom";
import "gestalt/dist/gestalt.css";
import "loaders.css//loaders.css";
import { SegmentedControl, Text } from "gestalt";
import IconButton from "./Components/IconButton";

import Home from "./Home/Home";
import NowPlaying from "./NowPlaying/NowPlaying";
import Page from "./Components/Page";

import Library from "./View Models/Library";
import Queue from "./View Models/Queue";
import Artists from "./Artists/Artists";
import Albums from "./Albums/Albums";
import Songs from "./Songs/Songs";

import MdHome from "react-ionicons/lib/MdHome";
import MdMicrophone from "react-ionicons/lib/MdMicrophone";
import MdDisc from "react-ionicons/lib/MdDisc";
import MdMusicalNote from "react-ionicons/lib/MdMusicalNote";
import MdSearch from "react-ionicons/lib/MdSearch";
import IosArrowUp from "react-ionicons/lib/IosArrowUp";
import { AnimatePresence, motion } from "framer-motion";

//"./View Models/YouTubeSearch.json"

const Search = {
  source: "YouTube",
  items: [
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/kpai9Xq4rORkGu9WmMJZgwWuX3Y"',
      id: {
        kind: "youtube#video",
        videoId: "9f5zD7ZSNpQ"
      },
      snippet: {
        publishedAt: "2018-01-25T16:00:01.000Z",
        channelId: "UCul9agDzTZxruNd9wEUWL7w",
        title:
          "Kali Uchis - After The Storm ft. Tyler, The Creator, Bootsy Collins (Official Video)",
        description:
          "Isolation out now: http://smarturl.it/IsolationKaliUchis Directed by Nadia Lee Cohen Creative Director Kali Uchis Produced by Anonymous content Audio ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/9f5zD7ZSNpQ/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/9f5zD7ZSNpQ/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/9f5zD7ZSNpQ/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "KaliUchisVEVO",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/B3ZoOc_GWoOgaFwGQrk3K5cY4dE"',
      id: {
        kind: "youtube#video",
        videoId: "KDUOLz9ZL2g"
      },
      snippet: {
        publishedAt: "2017-06-21T15:00:01.000Z",
        channelId: "UCul9agDzTZxruNd9wEUWL7w",
        title: "Kali Uchis - Tyrant (Official Video) ft. Jorja Smith",
        description:
          "Tyrant ft Jorja Smith is out now https://KaliUchis.lnk.to/Tyrant DIRECTED BY HELMI PRODUCED BY DIVISION OFFICIAL LYRICS All I hear is sirens In a world ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/KDUOLz9ZL2g/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/KDUOLz9ZL2g/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/KDUOLz9ZL2g/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "KaliUchisVEVO",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/oTfCY8UqIB7YZCoOMGmlEKPbPgc"',
      id: {
        kind: "youtube#video",
        videoId: "IUcByj96dUA"
      },
      snippet: {
        publishedAt: "2018-10-29T19:00:02.000Z",
        channelId: "UCul9agDzTZxruNd9wEUWL7w",
        title: "Kali Uchis - Just A Stranger ft. Steve Lacy",
        description:
          "Isolation out now: http://smarturl.it/IsolationKaliUchis Directed by BRTHR Creative Director Kali Uchis Produced by Strangelove Productions [LYRICS] Dollar bills ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/IUcByj96dUA/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/IUcByj96dUA/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/IUcByj96dUA/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "KaliUchisVEVO",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/GOOxdDKu4RUH9XD4pUvL6yifC80"',
      id: {
        kind: "youtube#video",
        videoId: "ZSViNoqvC6s"
      },
      snippet: {
        publishedAt: "2014-10-14T16:44:39.000Z",
        channelId: "UCQTuAezPu6MOpcIJ1Tz9dNA",
        title: "Kali Uchis - Know What I Want (Official Video)",
        description:
          "Download on iTunes: https://www.hyperurl.co/KWIW Download Por Vida: http://smarturl.it/downloadporvida Dir. Kali Uchis. Song produced by Bunx.",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/ZSViNoqvC6s/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/ZSViNoqvC6s/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/ZSViNoqvC6s/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "KALI UCHIS",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/0CHaqYfjWPL7rG-nRtwHze-kKgQ"',
      id: {
        kind: "youtube#video",
        videoId: "MYESVkUxWxM"
      },
      snippet: {
        publishedAt: "2018-10-08T15:18:49.000Z",
        channelId: "UC2Qw1dzXDBAZPwS7zm37g8g",
        title: "Kali Uchis - Killer | A COLORS SHOW",
        description:
          "Genre-defying Colombian star Kali Uchis stuns with a timeless performance of “Killer”, of her debut LP Isolation. Follow Kali: ▷ Stream: https://colors.lnk.to/Killer ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/MYESVkUxWxM/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/MYESVkUxWxM/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/MYESVkUxWxM/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "COLORS",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/AF_PeYAGw9PW-TibYhkIouyEsYI"',
      id: {
        kind: "youtube#video",
        videoId: "e9aqYvzqrnI"
      },
      snippet: {
        publishedAt: "2014-05-14T07:28:58.000Z",
        channelId: "UCsNMZpZsyShyvgwR7jt405Q",
        title: "KALI UCHIS - NEVER BE YOURS",
        description:
          'Kali Uchis performs "Never Be Yours" after a long conversation with Intuition on the Kinda Neat podcast. HELP SUPPORT KINDA NEAT: ...',
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/e9aqYvzqrnI/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/e9aqYvzqrnI/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/e9aqYvzqrnI/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "Kinda Neat",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/JFgsn88u20ODCe9elH9WSShf8Rs"',
      id: {
        kind: "youtube#video",
        videoId: "mbwUs1rnuQg"
      },
      snippet: {
        publishedAt: "2018-07-26T19:00:09.000Z",
        channelId: "UCul9agDzTZxruNd9wEUWL7w",
        title: "Kali Uchis - Dead To Me (Official Acoustic)",
        description:
          "Kali Uchis –Dead To ME (Acoustic) is out now http://smarturl.it/IsolationKaliUchis Music video by Kali Uchis performing Dead To Me. © 2018 Universal Music ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/mbwUs1rnuQg/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/mbwUs1rnuQg/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/mbwUs1rnuQg/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "KaliUchisVEVO",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/j9aCZXLlacg65_NNWS8XRy7F-sY"',
      id: {
        kind: "youtube#video",
        videoId: "bUANL9WoB90"
      },
      snippet: {
        publishedAt: "2015-11-03T17:27:44.000Z",
        channelId: "UCQTuAezPu6MOpcIJ1Tz9dNA",
        title: "Kali Uchis - Ridin Round (Official Video)",
        description:
          'Download: http://po.st/RidinRoundiT Stream: http://po.st/RidinRoundsp (Spotify) http://po.st/RidinRoundam (Apple Music) Rinse presents "Ridin Round" the new ...',
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/bUANL9WoB90/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/bUANL9WoB90/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/bUANL9WoB90/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "KALI UCHIS",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/qCthlbGQoLHiNV1VPwu-Y50FdHI"',
      id: {
        kind: "youtube#video",
        videoId: "evfM1QDfleM"
      },
      snippet: {
        publishedAt: "2018-04-25T15:09:34.000Z",
        channelId: "UCul9agDzTZxruNd9wEUWL7w",
        title: "Kali Uchis - Get Up (Official Video)",
        description:
          "Isolation out now: http://smarturl.it/IsolationKaliUchis Directed by Kali Uchis Produced by all day every day Follow Kali Uchis: http://www.instagram.com/kaliuchis ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/evfM1QDfleM/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/evfM1QDfleM/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/evfM1QDfleM/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "KaliUchisVEVO",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/ZncRa7TEqbPwELfhkkz1026gbp8"',
      id: {
        kind: "youtube#video",
        videoId: "Srfe453YePI"
      },
      snippet: {
        publishedAt: "2015-05-05T15:25:37.000Z",
        channelId: "UCQTuAezPu6MOpcIJ1Tz9dNA",
        title: "Kali Uchis - Rush (Official Video)",
        description:
          "Download Por Vida: http://po.st/downloadporvida Dir. Kali Uchis & WIISSA. Video prod. Nouvelle Vague LA. Song prod. Kaytranada & BBNG.",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/Srfe453YePI/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/Srfe453YePI/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/Srfe453YePI/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "KALI UCHIS",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/T8eCWJIPE5qfF5_earM1Drq7hfg"',
      id: {
        kind: "youtube#video",
        videoId: "kl_jxVID3PE"
      },
      snippet: {
        publishedAt: "2018-02-16T18:22:38.000Z",
        channelId: "UCyFZMEnm1il5Wv3a6tPscbA",
        title:
          "Kali Uchis &quot;After The Storm&quot; Official Lyrics &amp; Meaning | Verified",
        description:
          "Kali Uchis first captivated the industry with her music video production skills and 2013 mixtape 'Drunken Babble.' With a fresh sound that mixes old-school soul ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/kl_jxVID3PE/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/kl_jxVID3PE/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/kl_jxVID3PE/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "Genius",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/Ss-C3C3SpUwwyzs5rfmX99NAwwk"',
      id: {
        kind: "youtube#video",
        videoId: "2i8UvopEDp4"
      },
      snippet: {
        publishedAt: "2016-04-20T14:00:00.000Z",
        channelId: "UCul9agDzTZxruNd9wEUWL7w",
        title: "Kali Uchis - Only Girl ft. Steve Lacy, Vince Staples",
        description:
          'The imagery speaks on how disposable/replaceable "lovers" are treated and the things we will say/do out of loneliness. Kali was inspired by fake love, Edie ...',
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/2i8UvopEDp4/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/2i8UvopEDp4/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/2i8UvopEDp4/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "KaliUchisVEVO",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/uZN2qr6dZtrzCeB-_AwneK0KurY"',
      id: {
        kind: "youtube#video",
        videoId: "hNFfsXue8fk"
      },
      snippet: {
        publishedAt: "2018-09-07T16:33:48.000Z",
        channelId: "UC5RwNJQSINkzIazWaM-lM3Q",
        title:
          "Kali Uchis On Her Journey, Giving Back, Tyler, The Creator, &amp; The N-Word",
        description:
          "Kali Uchis sits down with Ebro in the Morning to discuss her journey to success, working with Tyler, the Creator, giving back to her home country of Colombia ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/hNFfsXue8fk/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/hNFfsXue8fk/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/hNFfsXue8fk/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "HOT 97",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/JttLoegvWxj6zWniyeHFIRNamX4"',
      id: {
        kind: "youtube#video",
        videoId: "TvYbR0mr0mk"
      },
      snippet: {
        publishedAt: "2017-09-14T19:30:01.000Z",
        channelId: "UCul9agDzTZxruNd9wEUWL7w",
        title: "Kali Uchis - Nuestro Planeta ft. Reykon",
        description:
          "Kali Uchis – Nuestro Planeta is available now! - https://KaliUchis.lnk.to/Nuestro Directed by Daniel Sannwald Lyrics: Teniéndote cerca Se me daña la cabeza Me ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/TvYbR0mr0mk/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/TvYbR0mr0mk/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/TvYbR0mr0mk/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "KaliUchisVEVO",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/p6lOCw31pTEUicb3l0k1HSU0Ttg"',
      id: {
        kind: "youtube#video",
        videoId: "dUzPbFjuvOg"
      },
      snippet: {
        publishedAt: "2013-11-27T21:23:33.000Z",
        channelId: "UCQTuAezPu6MOpcIJ1Tz9dNA",
        title: "Kali Uchis - Honey Baby",
        description:
          "Directed/Edited by @KALIUCHIS WWW.KALIUCHIS.COM soundcloud.com/kaliuchis Full versions of all song's included will be available for download in the ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/dUzPbFjuvOg/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/dUzPbFjuvOg/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/dUzPbFjuvOg/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "KALI UCHIS",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/kS9Jg9YyZqZfKDZcjslRJwMt8Jk"',
      id: {
        kind: "youtube#video",
        videoId: "8Hz1QGvPROM"
      },
      snippet: {
        publishedAt: "2018-04-07T12:12:51.000Z",
        channelId: "UCNYJOAz1J80HEJy2HSM772Q",
        title: "Kali Uchis - Tomorrow (ft. Tame Impala)",
        description:
          '"Tomorrow" by Kali Uchis (produced by Kevin Parker of Tame Impala). From the new album "Isolation," out now: https://kaliuchis.lnk.to/Isolation Follow Kali ...',
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/8Hz1QGvPROM/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/8Hz1QGvPROM/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/8Hz1QGvPROM/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "David Dean Burkhart",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/4hn_h5A2DLFnafhnPjYCWkprZlU"',
      id: {
        kind: "youtube#video",
        videoId: "OEx17196WPE"
      },
      snippet: {
        publishedAt: "2015-03-31T14:59:26.000Z",
        channelId: "UC8h8NJG9gacZ5lAJJvhD0fQ",
        title: "Nardwuar vs. Kali Uchis",
        description:
          "Nardwuar interviews Kali Uchis at SXSW 2015 in Austin, Texas ! http://www.twitter.com/nardwuar Thanks to John Collins & Jazz One for the Filming!",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/OEx17196WPE/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/OEx17196WPE/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/OEx17196WPE/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "NardwuarServiette",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/_R5C8PDP7MmbuItcxWhORG7jtlY"',
      id: {
        kind: "youtube#video",
        videoId: "jrtIJK1SfcY"
      },
      snippet: {
        publishedAt: "2015-11-10T23:24:31.000Z",
        channelId: "UC1B0nJylidKyVssQ2EnaCew",
        title: "Kali Uchis - Lottery",
        description:
          "Kali Uchis always had a different sound from other upcoming artists... She always had a vision and she's sticking to it... Look at the all of the success she is ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/jrtIJK1SfcY/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/jrtIJK1SfcY/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/jrtIJK1SfcY/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "MASSHENDRIX",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/Hmia_CbiJfQa2tWswP_SMeNgjNI"',
      id: {
        kind: "youtube#video",
        videoId: "HY0W_HMAwwA"
      },
      snippet: {
        publishedAt: "2017-11-17T15:30:00.000Z",
        channelId: "UC0iwHRFpv2_fpojZgQhElEQ",
        title: "How Kali Uchis Found Her Voice: Noisey Next",
        description:
          "Colombia-born 23-year-old singer-songwriter Kali Uchis has been everywhere in the last 12 months. She's added vocals to Gorillaz's Humanz cut, “She's My ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/HY0W_HMAwwA/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/HY0W_HMAwwA/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/HY0W_HMAwwA/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "Noisey",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/dCWZPnzkycPPMyIefwgBIPKMKFs"',
      id: {
        kind: "youtube#video",
        videoId: "x9e_8zRuuO8"
      },
      snippet: {
        publishedAt: "2018-04-13T19:34:51.000Z",
        channelId: "UCt7fwAhXDy3oNFTAzF2o8Pw",
        title: "Kali Uchis - Isolation ALBUM REVIEW",
        description:
          "Listen: https://www.youtube.com/watch?v=9f5zD7ZSNpQ&ab_channel=KaliUchisVEVO Thanks to its strong melodies and aesthetic, Isolation is a great and ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/x9e_8zRuuO8/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/x9e_8zRuuO8/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/x9e_8zRuuO8/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "theneedledrop",
        liveBroadcastContent: "none"
      }
    }
  ]
};

const styles = {
  tabbar: {
    position: "fixed",
    background: "#efefef",
    zIndex: 21,
    paddingBottom: 2.5,
    bottom: 0,
    left: 0,
    right: 0,
    WebkitBoxShadow: "9px 10px 18px -14px rgba(0,0,0,0.75)",
    MozBoxShadow: "9px 10px 18px -14px rgba(0,0,0,0.75)",
    boxShadow: "9px 10px 18px -14px rgba(0,0,0,0.75)"
  }
};

const AppContext = React.createContext({
  Library: null,
  User: {
    name: undefined,
    User: undefined,
    img: undefined
  }
});

const variants = {
  hidden: {
    opacity: 0,
    scaleX: 0
  },
  visible: {
    opacity: 1,
    scaleX: 1
  },
  exit: {
    opacity: 0,
    scaleX: 1
  }
};

const AnimateTabChange = props => (
  <motion.div
    onAnimationStart={props.animating}
    variants={variants}
    initial="hidden"
    animate="visible"
    exit="exit"
    transition={{
      duration: 0.2
    }}
  >
    {props.children}
  </motion.div>
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 0,
      User: {
        name: undefined,
        user: undefined,
        img: undefined
      },
      Queue: null,
      Library: null,
      loading: false,
      animating: false,
      nowPlayingOpen: false
    };
  }

  getData = async () => {
    this.setState({ loading: true });

    //Replace with actual fetch
    setTimeout(() => {
      const library = new Library(Search);
      this.setState({
        Library: library,
        User: {
          name: "Evan Burgess",
          user: "Burgy",
          img: "https://i.imgur.com/nKuE1ep.jpg"
        },
        Queue: new Queue(library.Songs, 0)
      });

      this.setState({ loading: false });
    }, 2000);
  };

  componentDidMount() {
    this.getData();
  }

  setTab = tab => this.setState({ tab });

  setAnimating = () => {
    document.body.style.overflow = "hidden";

    setTimeout(() => (document.body.style.overflow = "unset"), 500);
  };

  toggleNowPlaying = () => this.setState(s => ({nowPlayingOpen: !s.nowPlayingOpen}))

  getTab = () => {
    switch (this.state.tab) {
      case 0:
        return (
          <AnimateTabChange animating={this.setAnimating} key="home">
            <Home toggleNowPlaying={this.toggleNowPlaying} />
          </AnimateTabChange>
        );
      case 1:
        return (
          <AnimateTabChange animating={this.setAnimating} key="artists">
            <Artists />
          </AnimateTabChange>
        );
      case 2:
        return (
          <AnimateTabChange animating={this.setAnimating} key="albums">
            <Albums />
          </AnimateTabChange>
        );
      case 3:
        return (
          <AnimateTabChange animating={this.setAnimating} key="songs">
            <Songs />
          </AnimateTabChange>
        );
      case 4:
        return (
          <AnimateTabChange animating={this.setAnimating} key="search">
            <Page heading="Search" />
          </AnimateTabChange>
        );
    }
  };

  navbarItems = () => [
    <IconButton
      label="Home"
      id="home"
      icon={MdHome}
      color={this.state.tab === 0 ? "black" : "#7d7d7d"}
      onClick={() => this.setTab(0)}
    />,
    <IconButton
      label="Artists"
      id="artists"
      icon={MdMicrophone}
      color={this.state.tab === 1 ? "black" : "#7d7d7d"}
      onClick={() => this.setTab(1)}
    />,
    <IconButton
      label="Albums"
      id="albums"
      icon={MdDisc}
      color={this.state.tab === 2 ? "black" : "#7d7d7d"}
      onClick={() => this.setTab(2)}
    />,
    <IconButton
      label="Songs"
      id="songs"
      icon={MdMusicalNote}
      color={this.state.tab === 3 ? "black" : "#7d7d7d"}
      onClick={() => this.setTab(3)}
    />,
    <IconButton
      label="Search"
      id="search"
      icon={MdSearch}
      color={this.state.tab === 4 ? "black" : "#7d7d7d"}
      onClick={() => this.setTab(4)}
    />
  ];

  render() {
    let { tab, User, Library, loading, Queue, nowPlayingOpen } = this.state;

    return (
      <AppContext.Provider value={{ User, Library, Queue, loading }}>
        {!nowPlayingOpen && (
          <AnimatePresence exitBeforeEnter>{this.getTab()}</AnimatePresence>
        )}
        <motion.div
          style={{
            ...styles.tabbar,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: nowPlayingOpen ? 0 : 10,
            zIndex: nowPlayingOpen ? 22 : 20,
            height: "4.55em"
          }}
          animate={{
            height: nowPlayingOpen ? "100%" : "4.55em",
            backgroundColor: nowPlayingOpen ? "#fff" : "#efefef"
          }}
        >
          {nowPlayingOpen ? (
            <NowPlaying toggleNowPlaying={this.toggleNowPlaying} />
          ) : (
            <React.Fragment>
              <h5
                className="lH1 dyH iFc SMy kON pBj IZT"
                style={{ fontSize: "1em", fontWeight: "100" }}
              >
                Now Playing
              </h5>
              <IosArrowUp fontSize={"1em"} color={"black"} onClick={this.toggleNowPlaying} />
            </React.Fragment>
          )}
        </motion.div>
        <div style={styles.tabbar}>
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{
              scaleY: nowPlayingOpen ? 0 : 1,
              opacity: nowPlayingOpen ? 0 : 1
            }}
          >
            <SegmentedControl
              items={this.navbarItems()}
              selectedItemIndex={tab}
              onChange={({ activeIndex }) => this.setTab(activeIndex)}
            />
          </motion.div>
        </div>
      </AppContext.Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("react-root"));
export { AppContext };
