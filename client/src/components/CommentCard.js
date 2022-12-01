import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SongCard from './SongCard';
import SongComponent from './songComponent';
import Grid from '@mui/material/Grid';
import EditToolbar from './EditToolbar';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import MUIEditSongModal from './MUIEditSongModal';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import AuthContext from '../auth';

export default function CommentCard(props){
    const {comment, user} = props;
    console.log("comment card")
    console.log(comment);
    console.log(user);
    
    return (
        <Box sx={{
            minHeight: "100px",
            borderRadius: "30px",
            bgcolor: "#d9d35d",
            wordWrap: "breakWord",
            margin: "20px"
        }}>
            <div style={{margin: "20px"}}><em><strong>{user}:</strong></em></div>
            <div style={{margin: "20px"}}>{comment}</div>
        </Box>
    )


}