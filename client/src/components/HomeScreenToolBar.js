import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import TextField from '@mui/material/TextField';
import SortIcon from '@mui/icons-material/Sort';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { Menu, MenuItem, Link } from '@mui/material';

export default function HomeScreenToolBar(){
    const { store } = useContext(GlobalStoreContext);
    const {menuOpen, setMenuOpen} = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    let handleHome = () => {
        store.changeHomeScreenButtonActive(1);
    }
    let handlePublic = () => {
        store.changeHomeScreenButtonActive(2);
    }
    
    let handlePrivate = () => {
        store.changeHomeScreenButtonActive(3);
    }
    
    let handleSortButtonClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    let handleSort = (option) => {
        store.handleSort(option);
        setAnchorEl(null);
    }

let searchContent = "";
  let keyPress = async (event) => {
    if (event.code === "Enter"){
        if (store.homeScreenButtonActive === 1){
            store.changeHomeScreenButtonActive(2);
        }
    }
    await setTimeout(()=>{
        searchContent = event.target.value;
        console.log(event);
        console.log(event.target.value)
        console.log(searchContent);
        store.getSearchedListPairs(event.target.value)
    }, 100)
  }

    

    const sortMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={()=>store.setSortOption("Name")}>Name (A-Z)</MenuItem>
            <MenuItem onClick={()=>store.setSortOption("Date")}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={()=>store.setSortOption("Listens")}>Listens (High - Low)</MenuItem>
            <MenuItem onClick={()=>store.setSortOption("Likes")}>Likes (High - Low)</MenuItem>
            <MenuItem onClick={()=>store.setSortOption("Dislikes")}>Dislikes (High - Low)</MenuItem>
        </Menu>
    )
    

    return(
        <div style={{paddingLeft: "30px"}}>
            
            <IconButton onClick={handleHome} aria-label='home'sx={{bgcolor: store.homeScreenButtonActive === 1 ? "#99ad9a" : ""}}>
                    <HomeIcon sx={{
                        fontSize: 42, 
                        color: "#736e62",
                        marginLeft: "15px",
                        marginRight: "15px"
                    }}/>
            </IconButton>

            <IconButton onClick={handlePublic} aria-label='public' sx={{bgcolor: store.homeScreenButtonActive === 2 ? "#99ad9a" : ""}}>
                    <PeopleIcon sx={{
                        fontSize: 42, 
                        color: "#736e62",
                        marginLeft: "15px",
                        marginRight: "15px"
                    }}/>
            </IconButton>

            <IconButton onClick={handlePrivate} aria-label='public' sx={{bgcolor: store.homeScreenButtonActive === 3 ? "#99ad9a" : ""}}>
                    <PersonIcon sx={{
                        fontSize: 42, 
                        color: "#736e62",
                        marginLeft: "15px",
                        marginRight: "15px"
                    }}/>
            </IconButton>
            

            <input id="searchbar" type="text" name="search" placeholder="Search" onKeyPress={keyPress} style={{
                verticalAlign: "top",
                marginTop: "10px",
                width: "400px"
            }}/>

            <span style={{
                verticalAlign: "top",
                float: "right"
            }}>
                <span style={{
                    // verticalAlign: "5%",
                    paddingRight: "10px"
                }}>
                    SORT BY
                </span>
                

                <IconButton onClick={handleSortButtonClick} aria-label='public'>
                    <SortIcon sx={{
                        fontSize: 40, 
                        color: "#736e62",
                        paddingRight: "15px"
                    }}/>
                </IconButton>
                {
                    sortMenu
                }       
                
            </span>
               
           
            
            


        </div>
    )  
}
