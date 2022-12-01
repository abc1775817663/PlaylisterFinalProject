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

export default function HomeScreenToolBar(){
    const { store } = useContext(GlobalStoreContext);

    let handleHome = () => {

    }
    let handlePublic = () => {

    }
    let handlePrivate = () => {

    }
    

    return(
        <div style={{paddingLeft: "30px"}}>
            
            <IconButton onClick={handleHome} aria-label='home'>
                    <HomeIcon sx={{
                        fontSize: 42, 
                        color: "#736e62",
                        marginLeft: "15px",
                        marginRight: "15px"
                    }}/>
            </IconButton>

            <IconButton onClick={handlePublic} aria-label='public'>
                    <PeopleIcon sx={{
                        fontSize: 42, 
                        color: "#736e62",
                        marginLeft: "15px",
                        marginRight: "15px"
                    }}/>
            </IconButton>

            <IconButton onClick={handlePrivate} aria-label='public'>
                    <PersonIcon sx={{
                        fontSize: 42, 
                        color: "#736e62",
                        marginLeft: "15px",
                        marginRight: "15px"
                    }}/>
            </IconButton>
            

            <input id="searchbar" type="text" name="search" placeholder="Search" style={{
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
                

                <IconButton onClick={(event) => {
                    }} aria-label='public'>
                    <SortIcon sx={{
                        fontSize: 40, 
                        color: "#736e62",
                        paddingRight: "15px"
                    }}/>
                </IconButton>
                
            </span>
               
           
            
            


        </div>
    )  
}
