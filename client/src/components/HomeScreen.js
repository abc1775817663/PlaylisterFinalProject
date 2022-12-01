import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import YouTubePlayerExample from './youTubeBox';
import HomeScreenToolBar from './HomeScreenToolBar';
import MUIRemoveSongModal from './MUIRemoveSongModal';
import MUIEditSongModal from './MUIEditSongModal';


/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    
    function handleCreateNewList() {
        store.createNewList();
    }
    let content = (pairs) =>{
        console.log(store.homeScreenButtonActive);
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%'}}>
            {
                pairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <div id="playlist-selector">
            <div id="list-selector-heading">
                
            </div>

            
            <Grid container spacing={1} height={"100%"}>
                <Grid item xs={7}>
                <div id="list-selector-list" style={{
                    width: "50%",
                    overflowX: "auto"
                    }}>
                        {
                            listCard
                        }
                        <MUIDeleteModal />
                </div>
                </Grid>
                <Grid item xs={5}>
                    <Box>
                        
                        <YouTubePlayerExample />
                    </Box>
                </Grid>
            </Grid>

            
            

            <div style={{
                position: "fixed",
                bottom: "10px",
                width: "100%",
                left: "40%"
            }}>
                <span>
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon/>
            </Fab>
                <Typography variant="h2">Your Lists</Typography>
                </span>
            </div>
            
            <MUIRemoveSongModal/>
            {Object.keys(store.currentSong).length !== 0? <MUIEditSongModal/> : ""}
            
        </div>)
    }

   
    return (
        <div>
            <HomeScreenToolBar/>
        {store.homeScreenButtonActive === 1?
        content(store.idNamePairs)
        :
        content(store.searchedListPairs)
        }
        </div>
    )
}

export default HomeScreen;