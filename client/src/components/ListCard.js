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
import { adaptV4Theme } from '@mui/material';
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [expand, setExpand] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;
    const [isHover, setIsHover] = useState(false);
    const history = useHistory();
    
    const handleMouseEnter = () => {
        setIsHover(true);
     };
     
     const handleMouseLeave = () => {
        setIsHover(false);
     };

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    let handleKeyPress = async (event) => {
        if (event.code === "Enter") {
            if (text === idNamePair.list.name){
                return;
            }
            let r = await store.getApi().getUserAllPlaylistPairs(auth.user.userName)
            let idListPair = r.data.idNamePairs;
            if (text !== store.getUniquePlaylistName(idListPair, text)){
                store.setErrorMessage(`${text} already exists in your playlists, please change a new name`)
            }
            else{
                let id = event.target.id.substring("list-".length);
                store.changeListName(id, text);
                toggleEdit();
            }
            
            

        }
        // history.pushState("/")
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    async function handleExpand(event){
        event.stopPropagation();
        setExpand(true);
        store.updatePlaylistObj(idNamePair.list);
    }

    async function handleExpandLess(event){
        event.stopPropagation();
        setExpand(false);
        store.updatePlaylistObjExpandLess(idNamePair._id);
    }
    
    let updateLiked = async() => {
        let playlist = idNamePair.list;
        if (!playlist.published){
            return;
        }
        if (!playlist.likes){
            store.updateListLike(idNamePair._id, "liked", false)
            return;
        }
        console.log(3123123, playlist.likedUsers)
        let likedUsers = playlist.likedUsers.split(",")
        for (let idx in likedUsers){
            if (auth.user && auth.user.userName === likedUsers[idx]){
                console.log("liked")
                store.updateListLike(idNamePair._id, "liked", true)
                return;
            }
        }
        console.log("did not like")
        store.updateListLike(idNamePair._id, "liked", false);
    }
    let isYouTubeList = ()=> { 
        if (!store.youTubeList){
            console.log("store youTube list",store.youTubeList)
            return false;
        }
        console.log("store youTube list", store.youTubeList)
        return store.youTubeList._id === idNamePair.list._id;
    }
    let handleClick = async () => {
        // store.incListens(idNamePair.list);
        
        await store.updateYouTubeList(idNamePair.list);
        console.log(878970,idNamePair.list);
        
    }

    let updateDisliked = async() => {
        let playlist = idNamePair.list;
        if (!playlist.published){
            return;
        }
        if (!playlist.dislikes){
            store.updateListLike(idNamePair.list, "disliked", false)
            return;
        }

        let dislikedUsers = playlist.dislikedUsers.split(",")
        console.log(3123124, dislikedUsers)
        for (let idx in dislikedUsers){
            if (auth.user && auth.user.userName === dislikedUsers[idx]){
                store.updateListLike(idNamePair.list, "disliked", true)
                return;
            }
        }
        store.updateListLike(idNamePair.list, "disliked", false);

    }
    if (! store.checkListLikeExists(idNamePair.list)){
        updateLiked();
        updateDisliked();   
    }
    
    

    

    let handleLike = async(event) => {
        event.stopPropagation();
        let playlist = idNamePair.list;
        if (!store.getListLike(idNamePair.list, "liked")){
            if (playlist.likes > 0){
                playlist.likedUsers += "," + auth.user.userName;
            }
            else{
                playlist.likedUsers = auth.user.userName;
            }
            playlist.likes += 1
            store.getApi().updatePlaylistById(idNamePair.list._id, idNamePair.list)
            store.updateListLike(idNamePair.list, "liked", true);

        }
        else{
            playlist.likes -= 1;
            store.getApi().updatePlaylistById(idNamePair.list._id, idNamePair.list)
            console.log(32423434,playlist.likedUsers);
            let likedUsers = playlist.likedUsers.split(",");
            let res = "";
            for (let idx in likedUsers){
                if (auth.user.userName !== likedUsers[idx]){
                    res += likedUsers[idx] + ",";
                }
            }
            playlist.likedUsers = res;
            console.log(32423434,playlist.likedUsers);
            store.updateListLike(idNamePair.list, "liked", false);
        }
        if (store.getListLike(idNamePair.list, "disliked")){
            playlist.dislikes -= 1;
            store.getApi().updatePlaylistById(idNamePair.list._id, idNamePair.list)
            let dislikedUsers = playlist.dislikedUsers.split(",");
            let res = "";
            for (let idx in dislikedUsers){
                if (auth.user.userName != dislikedUsers[idx]){
                    res += dislikedUsers[idx] + ",";
                }
            }
            playlist.dislikedUsers = res;

        }
        
        store.updateListLike(idNamePair.list, "disliked", false);

        await store.updateCurrentList(playlist);
        await store.loadIdNamePairs();
        
    }
    let handleDislike = async(event) => {
        event.stopPropagation();
        let playlist = idNamePair.list;
        if (!store.getListLike(idNamePair.list, "disliked")){
            if (playlist.dislikes > 0){
                playlist.dislikedUsers += "," + auth.user.userName;
            }
            else{
                playlist.dislikedUsers = auth.user.userName;
            }
            playlist.dislikes += 1;
            store.getApi().updatePlaylistById(idNamePair.list._id, idNamePair.list)
            store.updateListLike(idNamePair.list, "disliked", true);
        }
        else{

            playlist.dislikes -= 1;
            store.getApi().updatePlaylistById(idNamePair.list._id, idNamePair.list)
            let dislikedUsers = playlist.dislikedUsers.split(",");
            let res = "";
            for (let idx in dislikedUsers){
                if (auth.user.userName != dislikedUsers[idx]){
                    res += dislikedUsers[idx] + ",";
                }
            }
            playlist.dislikedUsers = res;
            store.updateListLike(idNamePair._id, "disliked", false);
        }
        if (store.getListLike(idNamePair._id, "liked")){
            playlist.likes -= 1;
            store.getApi().updatePlaylistById(idNamePair.list._id, idNamePair.list)
            console.log(32423434,playlist.likedUsers);
            let likedUsers = playlist.likedUsers.split(",");
            let res = "";
            for (let idx in likedUsers){
                if (auth.user.userName !== likedUsers[idx]){
                    res += likedUsers[idx] + ",";
                }
            }
            playlist.likedUsers = res;
            console.log(32423434,playlist.likedUsers);
            
        }
        console.log(32423434, playlist)
        store.updateListLike(idNamePair._id, "liked", false);
        
        
        await store.updateCurrentList(playlist);
        await store.loadIdNamePairs();
    }


    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    let cardElement =
        <ListItem
            className="listCard"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ margin: '15px', display: 'flex', p: 1}}
            style={{ minHeight: '70px', width: '95%', fontSize: '20pt', backgroundColor: isHover? "#a19b8c": isYouTubeList()?"#a19b8c":"#ffffff", borderRadius: 10, border: "2px solid black" }}
            button
            onClick={handleClick}
        >   
        <Grid container>
         <Grid item xs={5}>
        <div id="listCardInfoDiv">
            <Box sx={{ p: 1, flexGrow: 1, fontSize:20, fontWeight: "bold", paddingBottom: 0 }}>{idNamePair.list.name}</Box>
            <Box sx={{ p: 1, flexGrow: 1, fontSize:12 }}>{idNamePair.list.published?"by: " + idNamePair.list.userName + "|| published: " + idNamePair.list.publishedDate+ "|| listens: " + idNamePair.list.listens:
            "by: " + idNamePair.list.userName}</Box>
        </div>
        </Grid>


        { idNamePair.list.published?
            <Grid item xs={2}>
            <Box sx={{ p: 1}}>
                
                    <IconButton onClick={handleLike} disabled={store.isGuest()} aria-label='edit'>
                    {
                        
                        !store.getListLike(idNamePair._id, "liked")?
                        <ThumbUpOffAltIcon style={{fontSize:'25pt'}} />
                        :
                        <ThumbUpIcon style={{fontSize:'25pt'}} />
                    }
                    <div style={{fontSize:"20px"}}>{idNamePair.list.likes}</div>
                    
                    </IconButton>
                    
            
                
            </Box>
            </Grid>
            :
            <Grid item xs={2}></Grid>
        }
        { idNamePair.list.published?
            <Grid item xs={2}>
            <Box sx={{ p: 1}}>
                
                    <IconButton onClick={handleDislike} disabled={store.isGuest()} aria-label='edit'>
                    {
                        !store.getListLike(idNamePair._id, "disliked")?
                        <ThumbDownOffAltIcon style={{fontSize:'25pt'}} />
                        :
                        <ThumbDownIcon style={{fontSize:'25pt'}} />
                    }
                    <div style={{fontSize:"20px"}}>{idNamePair.list.dislikes}</div>
                    
                    </IconButton>
                    
            
                
            </Box>
            </Grid>
            :
            <Grid item xs={2}></Grid>
        }
        <Grid item xs={1}>
        <Box sx={{ p: 1}}>
            {
                editActive || !store.isUserOwnList(idNamePair.list) || idNamePair.list.published?
                ""
                :
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                <EditIcon style={{fontSize:'24pt'}} />
                </IconButton>
                
            }
            
        </Box>
        </Grid>

        <Grid item xs={1}>
        <Box sx={{ p: 1}}>
            {
                expand?
                <IconButton onClick={handleExpandLess} aria-label='edit'>
                <ExpandLessIcon style={{fontSize:'24pt'}} />
                </IconButton>
                :
                <IconButton onClick={handleExpand} aria-label='edit'>
                <ExpandMoreIcon style={{fontSize:'24pt'}} />
                </IconButton>
                
            }
            
        </Box>
        </Grid>
        
            {/* <Box sx={{ p: 1 }}>
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                    <EditIcon style={{fontSize:'24pt'}} />
                </IconButton>
            </Box>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                    <DeleteIcon style={{fontSize:'24pt'}} />
                </IconButton>
            </Box> */}
        
        <Grid item xs={12}>
        <Box>{
            <SongComponent
            playlistId = {idNamePair._id}
            playlist = {idNamePair.list}
            />
        }
        </Box>
        </Grid>

        
        </Grid>
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.list.name}
                inputProps={{style: {fontSize: 24}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    console.log(12140, store);
    return (
        cardElement
    );
}

export default ListCard;