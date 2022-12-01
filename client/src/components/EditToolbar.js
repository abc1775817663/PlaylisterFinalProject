import { useContext } from "react";
import { GlobalStoreContext } from "../store";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";
import CloseIcon from "@mui/icons-material/HighlightOff";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import PublishIcon from "@mui/icons-material/Publish";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar(props) {
  const { store } = useContext(GlobalStoreContext);
  const { playlistId, playlist } = props;

  function handleAddNewSong() {
    store.addNewSong(playlist);
  }
  function handleUndo() {
    store.undo(playlist);
  }
  function handleRedo() {
    store.redo(playlist);
  }
  // function handleClose() {
  //     //  window.location.href = "/";
  //     store.closeCurrentList();
  // }
  function handleDelete() {
    store.markListForDeletion(playlistId);
  }
  async function handlePublish() {
    playlist.published = true;

    let d = new Date();
    playlist.publishedDate =
      d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

    playlist.likes = 0;
    playlist.dislikes = 0;
    playlist.likedUsers = "";
    playlist.dislikedUsers = "";
    playlist.comments = "";
    playlist.listens = 0;

    await store.updateCurrentList(playlist);
    await store.loadIdNamePairs();
  }
  function handleDuplicate() {
    store.duplicateList(playlistId);
  }

  let modalOpen = store.isModalOpen();
  return (
    <div id="edit-toolbar">
      {store.isUserOwnList(playlist) ? (
        <Button
          disabled={!store.canUndo(playlistId) || modalOpen}
          id="undo-button"
          onClick={handleUndo}
          variant="contained"
        >
          <UndoIcon />
        </Button>
      ) : (
        ""
      )}
      {store.isUserOwnList(playlist) ? (
        <Button
          disabled={!store.canRedo(playlistId) || modalOpen}
          id="redo-button"
          onClick={handleRedo}
          variant="contained"
        >
          <RedoIcon />
        </Button>
      ) : (
        ""
      )}
      {store.isUserOwnList(playlist) ? (
        <Button
          disabled={!store.canAddNewSong() || modalOpen}
          id="add-song-button"
          onClick={handleAddNewSong}
          variant="contained"
        >
          <AddIcon />
        </Button>
      ) : (
        ""
      )}
      {store.isUserOwnList(playlist) ? (
        <Button onClick={handleDelete} variant="contained">
          <DeleteIcon style={{}} />
        </Button>
      ) : (
        ""
      )}
      {!store.isGuest() ? (
        <Button onClick={handleDuplicate} variant="contained">
          <ContentCopyIcon style={{}} />
        </Button>
      ) : (
        ""
      )}

      {store.isUserOwnList(playlist) ? (
        <Button onClick={handlePublish} variant="contained">
          <PublishIcon style={{}} />
          publish
        </Button>
      ) : (
        ""
      )}

      {/* <Button 
                disabled={!store.canClose() || modalOpen}
                id='close-button'
                onClick={handleClose}
                variant="contained">
                    <CloseIcon />
            </Button> */}
    </div>
  );
}

export default EditToolbar;
