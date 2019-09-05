import React, { Component } from "react";
import ReactDOM from "react-dom";
import "gestalt/dist/gestalt.css";
import "loaders.css//loaders.css";
import { SegmentedControl } from "gestalt";
import IconButton from "./Components/IconButton";

import Home from "./Home/Home";
import Page from "./Components/Page";

import Library from "./View Models/Library";

//"./View Models/YouTubeSearch.json"
const Search = {
  source: "YouTube",
  items: [
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
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/zSKOkalA2ZnSbTXUXZ1bSGjg00Q"',
      id: {
        kind: "youtube#video",
        videoId: "qxmbn0iyj-M"
      },
      snippet: {
        publishedAt: "2018-06-30T01:38:39.000Z",
        channelId: "UC2eV2nLmJhHzX3DxI5Colkg",
        title: "‘fore you crash",
        description:
          "I am actually really proud how this turned out. I hate it when Amethyst is upset, it makes me sad :( Song: speed-Kali Ucis.",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/qxmbn0iyj-M/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/qxmbn0iyj-M/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/qxmbn0iyj-M/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "SD_K EDITS",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/gmzH9DwREbX190g89sgaKKQ4xhw"',
      id: {
        kind: "youtube#video",
        videoId: "p8tHb3o-Plk"
      },
      snippet: {
        publishedAt: "2018-03-30T02:17:22.000Z",
        channelId: "UCul9agDzTZxruNd9wEUWL7w",
        title:
          "Kali Uchis - After The Storm (Live On The Tonight Show Starring Jimmy Fallon, US / 2018)",
        description:
          "Kali Uchis' debut album “Isolation” available 4/6: http://smarturl.it/IsolationKaliUchis Follow Kali Uchis: https://www.instagram.com/kaliuchis/ ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/p8tHb3o-Plk/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/p8tHb3o-Plk/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/p8tHb3o-Plk/hqdefault.jpg",
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
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/n82fuDL7xMGfnsxy_b2aeYGGQrI"',
      id: {
        kind: "youtube#video",
        videoId: "hgz6UkZ9RRg"
      },
      snippet: {
        publishedAt: "2019-05-21T08:55:02.000Z",
        channelId: "UCXVO7vRudNrEprvapDV4VVQ",
        title: "AM FOST UCIS DE UN HACKER IN FREE FIRE !",
        description:
          "NU MAI AM CUVINTE ! Baieti daca mai vreti episoade si liveuri pe acest canal apasati butonul de like si cel mai important cel de subscribe ( Abonare) Va ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/hgz6UkZ9RRg/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/hgz6UkZ9RRg/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/hgz6UkZ9RRg/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "LUCIAN AR",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/4Ovo1o6gg9M1PZHfGQYlDJpAyYs"',
      id: {
        kind: "youtube#video",
        videoId: "lIGfxg8CxIY"
      },
      snippet: {
        publishedAt: "2013-09-09T09:26:14.000Z",
        channelId: "UCFCLGtpz8OxzHPgErCvGC8w",
        title:
          "Intensive operation  for gangsters and illegal immigrants called  Kimbunga Hurricane)   has begun in",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/lIGfxg8CxIY/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/lIGfxg8CxIY/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/lIGfxg8CxIY/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "Tanzania News",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/aIazHJpxQGe8Yx7OjwTy4_Ct1AE"',
      id: {
        kind: "youtube#video",
        videoId: "A7uuqV0pKF4"
      },
      snippet: {
        publishedAt: "2010-05-24T05:36:24.000Z",
        channelId: "UCNd44C0Oj667Rli42kdee2w",
        title: "kahine raze ulfat na ho jaye zahir",
        description: "gazal qawali.",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/A7uuqV0pKF4/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/A7uuqV0pKF4/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/A7uuqV0pKF4/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "udaysennath",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/F9-d-PgjRhfWjhd6mF75T31avos"',
      id: {
        kind: "youtube#video",
        videoId: "qdp37z8m0xY"
      },
      snippet: {
        publishedAt: "2010-01-19T13:26:04.000Z",
        channelId: "UCIhCCTgc3a4Vp9ZkSeVR1bg",
        title: "Ricky - The Streets",
        description:
          "Ricky - The Streets (2010) Text: ..zivotna skola, il pojam idola, nekom mozda i stvar je kobna, il bolna, al nekad mora probat ja nisam klosar, al ta ulica ti trazi ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/qdp37z8m0xY/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/qdp37z8m0xY/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/qdp37z8m0xY/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "Mirza Duvnjaković",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/MpTZzXy_y_qSM517CRICujDH0nw"',
      id: {
        kind: "youtube#video",
        videoId: "cSUwOT-Ucis"
      },
      snippet: {
        publishedAt: "2018-05-29T05:41:28.000Z",
        channelId: "UC6AUWNlN7bCfdmE_WYkSNeA",
        title: "Mahinam panchayat",
        description: "Mahinam panchayat.",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/cSUwOT-Ucis/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/cSUwOT-Ucis/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/cSUwOT-Ucis/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "Angad Thakur",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/h-wvGLyvd8PBJXNGBZjDm8MHT0c"',
      id: {
        kind: "youtube#video",
        videoId: "jo_ZgXyCNA8"
      },
      snippet: {
        publishedAt: "2017-02-07T06:36:26.000Z",
        channelId: "UCf3XSQo7NIxjFrAYtnm4ldw",
        title: "Video clip rytmus ft braska",
        description: "Kapo.",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/jo_ZgXyCNA8/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/jo_ZgXyCNA8/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/jo_ZgXyCNA8/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "Dydej kapo kapo",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/2YNi2OtHegDl8DoJAr8NnZpfpLU"',
      id: {
        kind: "youtube#video",
        videoId: "lNhcEJxM1tc"
      },
      snippet: {
        publishedAt: "2017-02-04T22:50:38.000Z",
        channelId: "UC4BPJHUF6Ynro4zqSKJJWOA",
        title:
          "Makilala TV Ep 45 - Immigration: A 30-Year Journey [ Out of Status &amp; Deportation ]",
        description:
          "A Family's Immigration Journey - 30 Year Timeline: 1984 Tourist (B1-B2) Visa 1986 Tourist Visa 1986 Investor's Visa (H1-H2) 1991 Amnesty Petition Denied ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/lNhcEJxM1tc/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/lNhcEJxM1tc/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/lNhcEJxM1tc/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "Makilala TV",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/uWrAI6Y1u605wgj_f4xaQ_Z9LX0"',
      id: {
        kind: "youtube#video",
        videoId: "HGk1QEJ7WP0"
      },
      snippet: {
        publishedAt: "2015-05-17T18:42:03.000Z",
        channelId: "UCz4TivjTCyUOqCNZtGZ5sLw",
        title: "Romani anthem &quot;Gelem, Gelem&quot;",
        description:
          'Romani anthem "Gelem, Gelem" ("I Went, I Went") Lyrics and music: Žarko Jovanović Song is performed by Gracanica Roma Children\'s Choir (Serbia) ...',
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/HGk1QEJ7WP0/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/HGk1QEJ7WP0/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/HGk1QEJ7WP0/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "Defonseca",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/5ONjK2rEIbDMoX9vehbjMEkdLqI"',
      id: {
        kind: "youtube#video",
        videoId: "AUjHb4C7b94"
      },
      snippet: {
        publishedAt: "2014-08-14T10:56:45.000Z",
        channelId: "UCZaT_X_mc0BI-djXOlfhqWQ",
        title: "The Islamic State (Full Length)",
        description:
          "WATCH NOW: Embedded with Al-Qaeda in Syria - http://bit.ly/2ynOxnn The Islamic State, a hardline Sunni jihadist group that formerly had ties to al Qaeda, has ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/AUjHb4C7b94/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/AUjHb4C7b94/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/AUjHb4C7b94/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "VICE News",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/Tf5_1tpTqX4HgcHOqB1CHh9aV5g"',
      id: {
        kind: "youtube#video",
        videoId: "lO4g0FkrQ4Y"
      },
      snippet: {
        publishedAt: "2017-03-12T13:39:49.000Z",
        channelId: "UCQaRNhKQWUWbkA02rIjaVaw",
        title: "Minecraft|HorrorMAPS|Putin INFRICOSATOR! Light&#39;s OUT",
        description:
          "Salutare tuturor si bine v-am gasit la un nou episod de o mapa HORROR!- Light's OUT Mapa: ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/lO4g0FkrQ4Y/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/lO4g0FkrQ4Y/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/lO4g0FkrQ4Y/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "KAli46",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/K3fzW2sVXJkBwuifzNnhMdrQ_kw"',
      id: {
        kind: "youtube#video",
        videoId: "5ZOktR6IZD0"
      },
      snippet: {
        publishedAt: "2015-11-05T18:21:20.000Z",
        channelId: "UClN1DP2hFEuRRu-ZkMhweFA",
        title: "On the Road to Citizenship",
        description:
          "What is it like to become a United States Citizen? We follow Chakriya Say, a single mother of three originally from Cambodia, and Miguel Ceballos Medina, ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/5ZOktR6IZD0/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/5ZOktR6IZD0/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/5ZOktR6IZD0/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "IN Close",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/uRpSUcMdfuBcBowIQpPRRrpQKKM"',
      id: {
        kind: "youtube#video",
        videoId: "N4gxz72z2Zk"
      },
      snippet: {
        publishedAt: "2015-12-17T15:46:27.000Z",
        channelId: "UCe3OmUXohXrXnNZSRl5Z9kA",
        title:
          "In search of: Grave of Indian King Raja Raja Chola - Was he murdered?",
        description:
          "Follow Me on: Instagram................ http://instagram.com/praveenET Twitter...................... https://twitter.com/IamPraveenMohan ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/N4gxz72z2Zk/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/N4gxz72z2Zk/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/N4gxz72z2Zk/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "Phenomenal Travel Videos",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/gKTSBntLE-EfXx8J3kwDpg5ny8U"',
      id: {
        kind: "youtube#video",
        videoId: "2qLj235nwZc"
      },
      snippet: {
        publishedAt: "2018-04-15T12:29:31.000Z",
        channelId: "UCiS-kQiurkkCH2rptLMjwoQ",
        title: "Cari Resours[Mcpe Survival #0]",
        description:
          "Halo teman teman kali ini saya akan main mcpe guys oke bagi yg mau intro silakan komen di bawah Skin Skin saya ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/2qLj235nwZc/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/2qLj235nwZc/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/2qLj235nwZc/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "Santos FX",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/RzHuC1gr--ppQ8hGsxfZoPMH7L4"',
      id: {
        kind: "youtube#video",
        videoId: "_4xILhJNiP4"
      },
      snippet: {
        publishedAt: "2019-02-05T15:01:10.000Z",
        channelId: "UCWWUFecKSbBWHyUPIGlysrw",
        title:
          "Esports Immigration - 4 Major Keys to Success for P-1A Petitions",
        description:
          "In the meantime, please reference our new website: www.esportsimmigration.com Esports is an international powerhouse with professional players frequently ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/_4xILhJNiP4/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/_4xILhJNiP4/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/_4xILhJNiP4/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "Queen City Immigration Law",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/btPZCGnjbaCUY_edPf6z8SjgqGM"',
      id: {
        kind: "youtube#video",
        videoId: "941-lj64cg0"
      },
      snippet: {
        publishedAt: "2016-10-14T09:28:34.000Z",
        channelId: "UCMkafeTzIyhPW0l4NLRFvVQ",
        title: "Steven Seagal Movies Best Action Film   Black Dawn 2005 Movie",
        description:
          "Steven Seagal Movies Best Action Film Black Dawn 2005 Movie.",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/941-lj64cg0/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/941-lj64cg0/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/941-lj64cg0/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "Amelia Just",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/5AT-WMED9kWbYfXgucXqBzFYpY4"',
      id: {
        kind: "youtube#video",
        videoId: "SDb9_CqPUTQ"
      },
      snippet: {
        publishedAt: "2010-11-02T15:46:57.000Z",
        channelId: "UChm7CIhH8gLOH3YTP6HM0Hg",
        title: "The Citizenship Interview and Test",
        description:
          "Official government video from USCIS providing an informative description of the naturalization process and featuring a sample interview and test. For more ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/SDb9_CqPUTQ/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/SDb9_CqPUTQ/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/SDb9_CqPUTQ/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "USCIS",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/FqcVZ--Ye3zexxUDxlzPNWkTUEo"',
      id: {
        kind: "youtube#video",
        videoId: "x7J_2ScXRrM"
      },
      snippet: {
        publishedAt: "2017-09-28T21:48:04.000Z",
        channelId: "UCY0YIply-je0EhSWLgpftVw",
        title: "He Enlisted In The Army, But May Be Deported",
        description:
          "The future of DACA is in doubt. The 800000 foreign-born enrollees in the program, so-called DREAMers, thought they were headed toward American citizenship ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/x7J_2ScXRrM/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/x7J_2ScXRrM/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/x7J_2ScXRrM/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "BEME News",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/QM9jON5OMlzrxe0AxAJ6IuftX9Q"',
      id: {
        kind: "youtube#video",
        videoId: "msRhlxipbvo"
      },
      snippet: {
        publishedAt: "2017-11-16T14:28:16.000Z",
        channelId: "UCI2w_kPjK37F0aW9EvDpV6g",
        title:
          "2001-0708 Guru Puja Talk: Introspection, Love &amp; Purity, Cabella, Italy, DP, CC",
        description:
          "Archive video: H.H. Shri Mataji Nirmala Devi at Guru Puja 2001 in Nirmal Temple, Cabella Ligure (Italy). more at: https://www.amruta.org/p/2163 subtitles: ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/msRhlxipbvo/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/msRhlxipbvo/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/msRhlxipbvo/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "Teachings of H.H. Shri Mataji Nirmala Devi",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/RzHuC1gr--ppQ8hGsxfZoPMH7L4"',
      id: {
        kind: "youtube#video",
        videoId: "_4xILhJNiP4"
      },
      snippet: {
        publishedAt: "2019-02-05T15:01:10.000Z",
        channelId: "UCWWUFecKSbBWHyUPIGlysrw",
        title:
          "Esports Immigration - 4 Major Keys to Success for P-1A Petitions",
        description:
          "In the meantime, please reference our new website: www.esportsimmigration.com Esports is an international powerhouse with professional players frequently ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/_4xILhJNiP4/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/_4xILhJNiP4/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/_4xILhJNiP4/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "Queen City Immigration Law",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/APukS_vp9Ly1zNEmHUt7QNcNCfs"',
      id: {
        kind: "youtube#video",
        videoId: "NhB2D_L3W30"
      },
      snippet: {
        publishedAt: "2017-12-29T13:34:10.000Z",
        channelId: "UCZmBIv4EIEyws_YUNN3QSPw",
        title: "Mașină fantoma !😰😱",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/NhB2D_L3W30/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/NhB2D_L3W30/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/NhB2D_L3W30/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "Gaspar Robert",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"0UM_wBUsFuT6ekiIlwaHvyqc80M/2h_HQayRN2mH_A0Tc3vbUrFlXks"',
      id: {
        kind: "youtube#video",
        videoId: "tmrtoEK_AuM"
      },
      snippet: {
        publishedAt: "2017-02-17T13:12:18.000Z",
        channelId: "UCf3XSQo7NIxjFrAYtnm4ldw",
        title:
          "(David santana ft Lucie kamenickova) diki ze me ucis anglictinu video clip",
        description: "David santana.",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/tmrtoEK_AuM/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/tmrtoEK_AuM/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/tmrtoEK_AuM/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "Dydej kapo kapo",
        liveBroadcastContent: "none"
      }
    }
  ]
};

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

  componentDidMount() {
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
