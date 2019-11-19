# Macrobeat

Macrobeat is an all in one cloud streaming interface for YouTube, Soundcloud, Bandcamp, Spotify and more to come soon.
It allows users to search all services inside the interface and add to a global playing queue and the music will play out of the connected speakers (from the server)
It requires minimal setup and has a great interface.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.


### Prerequisites

You must have NodeJS, NPM, MPV and YouTube DL installed for this project to function.

NodeJS and NPM are offered on their [site](https://nodejs.org/en/download/)

MPV can be found in major Linux distributions package managers

Ubuntu/Debian
```
apt-get install mpv youtube-dl
```

Solus
```
eopkg install mpv youtube-dl
```

If it's not found you can use their websites to download and add to your paths [MPV](https://mpv.io), [YoutubeDL](https://ytdl-org.github.io/youtube-dl/index.html)

Test installation by issuing these commands:
```
node -v
npm -v
youtube-dl --version
mpv --version
```
You should have no errors and see all 4 of the respective versions

### Installing

1. Clone the repo
2. Run `npm install` to install the node packages
3. Install MPV and YoutubeDL (Linux users should be able to find them on their package managers)
4. Windows users: Either add MPV and YoutubeDL to your PATH after downloading the binaries or set them in a folder easily accessed and set the `MPV_LOCATION` env variable
5. Run `npm run build`
6. Run `npm run start`

Out of the box, Macrobeat supports YouTube and Bandcamp with no configuration.
If you wish to use Soundcloud and Spotify follow these steps.

Spotify:
1. Make a spotify application at https://developer.spotify.com/dashboard/
2. Add a redirect URI that your clients will be able to hit
3. Set the `SPOTIFY_REDIRECT_URI`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_CLIENT_ID` env variables

Soundcloud:
1. Register a soundcloud application at https://soundcloud.com/you/apps
2. Copy the Client ID and set the `SOUNDCLOUD_CLIENT_ID`

You should now see a print in the terminal saying it's listening on a specific port.
If you point any browsers on your local network to the server's IP and port you should be asked for a display name and icon.


## Built With

* React - Front end framework
* NodeJS & Express - Back end framework
* MPV - Audio playback from the command line
* YoutubeDL - Expose streams for the audio playback


## Authors

* **Evan Burgess** - *Front End UI/UX and Player Logic* - [evanBurg](https://github.com/evanBurg)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
