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

export default function HomeScreenToolBar(){
    const { store } = useContext(GlobalStoreContext);
    
    return(
        <div style={{paddingLeft: "30px"}}>
            
            <HomeIcon sx={{
                fontSize: 42, 
                color: "#736e62",
                paddingRight: "20px"
            }}/>
            <PeopleIcon sx={{
                fontSize: 42, 
                color: "#736e62",
                paddingRight: "20px"
            }}/>
            <PersonIcon sx={{
                fontSize: 42, 
                color: "#736e62",
                paddingRight: "100px"
            }}/>

            <input id="searchbar" type="text" name="search" placeholder="Search" style={{
                verticalAlign: "top",
                marginTop: "3px",
                width: "400px"
            }}/>

            <span style={{
                verticalAlign: "top",
                float: "right"
            }}>
                <span style={{
                    verticalAlign: "60%",
                    paddingRight: "10px"
                }}>
                    SORT BY
                </span>
                
                <SortIcon sx={{
                fontSize: 40, 
                color: "#736e62",
                paddingRight: "20px"
            }}/>
            </span>
               
           
            
            


        </div>
    )  
}
