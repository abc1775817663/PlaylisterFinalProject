import GlobalStoreContext from "../store";
import React, { useContext } from "react";
import YouTube from "react-youtube";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { useState } from "react";


export default function YouTubePlayerExample() {
  // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
  // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
  // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
  // FROM ONE SONG TO THE NEXT
  const {store} = useContext(GlobalStoreContext);
  const {currentSong, setCurrentSong} = useState(0);
  let youTubeList = store.youTubeList;
  if (!youTubeList || youTubeList.songs.length < 1){
    return "";
  }
    
  // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
  let playlist = [];
  for (var songIdx in youTubeList.songs){
    playlist.push(youTubeList.songs[songIdx]);
  }
  console.log("playlist", playlist)

  // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
  

  const playerOptions = {
    height: "210",
    width: "340",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  // THIS FUNCTION LOADS THE CURRENT SONG INTO
  // THE PLAYER AND PLAYS IT
  function loadAndPlayCurrentSong(player) {
    let song = playlist[currentSong?currentSong:0].youTubeId;
    player.loadVideoById(song);
    player.playVideo();
  }

  // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
  function incSong() {
    setCurrentSong(currentSong => (currentSong + 1) % playlist.length);
  }

  function onPlayerReady(event) {
    loadAndPlayCurrentSong(event.target);
    event.target.playVideo();
  }

  // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
  // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
  // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
  // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
  function onPlayerStateChange(event) {
    let playerStatus = event.data;
    let player = event.target;
    if (playerStatus === -1) {
      // VIDEO UNSTARTED
      console.log("-1 Video unstarted");
    } else if (playerStatus === 0) {
      // THE VIDEO HAS COMPLETED PLAYING
      console.log("0 Video ended");
      incSong();
      loadAndPlayCurrentSong(player);
    } else if (playerStatus === 1) {
      // THE VIDEO IS PLAYED
      console.log("1 Video played");
    } else if (playerStatus === 2) {
      // THE VIDEO IS PAUSED
      console.log("2 Video paused");
    } else if (playerStatus === 3) {
      // THE VIDEO IS BUFFERING
      console.log("3 Video buffering");
    } else if (playerStatus === 5) {
      // THE VIDEO HAS BEEN CUED
      console.log("5 Video cued");
    }
  }

  let handleChangeView = () => {
       store.changeYouTubeView();
       console.log("current view", store.currentYouTubeVideoView);
  }

  return (
    <div>
        <span>
        <Button
            sx={{
            backgroundColor: store.currentYouTubeVideoView? "#91908a": "#dbdad9",
            color: "black",
            ":hover": {
                bgcolor: "#4d4a4a",
            },
            ":disabled":{
                color: "black"
            },
            border: "1px solid black"
            }}
            onClick={handleChangeView}
            disabled={store.currentYouTubeVideoView}
        >
            Player
        </Button>
        <Button
            sx={{
            backgroundColor: !store.currentYouTubeVideoView? "#91908a": "#dbdad9",
            color: "black",
            ":hover": {
                bgcolor: "#4d4a4a",
            },
            ":disabled":{
                color: "black"
            },
            border: "1px solid black"
            }}
            onClick={handleChangeView}
            disabled={!store.currentYouTubeVideoView}
        >
            Comments
        </Button>
        </span>
        <YouTube
        videoId={currentSong?playlist[currentSong].youTubeId:playlist[0].youTubeId}
        opts={playerOptions}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange}
        />


        <Box>
          <Grid container rowGap="5px">
            <Grid item xs={12} sx={{size: 30,paddingLeft:"28%"}}>
              
              Now Playing
              
            </Grid>
            <Grid item xs={3}>
              
              Playlist:
              
            </Grid>
            <Grid item xs={9}>
              
              {store.youTubeList.name}
              
            </Grid>
            <Grid item xs={3}>
              
              Song #: 
              
            </Grid>
            <Grid item xs={9}>
              
              {currentSong?currentSong+1:1}
              
            </Grid>
            <Grid item xs={3}>
              
              Title:
              
            </Grid>
            <Grid item xs={9}>
              
            {playlist[currentSong?currentSong:0].title}
              
            </Grid>
            <Grid item xs={3}>
              
              Artist: 
              
            </Grid>
            <Grid item xs={9}>
              
            {playlist[currentSong?currentSong:0].artist}
              
            </Grid>
          </Grid>
        </Box>
    </div>
  )
}
