import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    p: 4,
    padding: 1
};
export default function MUIRemoveSongModal() {
    const { store } = useContext(GlobalStoreContext);

    function handleConfirmRemoveSong () {
        store.addRemoveSongTransaction();
    }

    function handleCancelRemoveSong () {
        store.hideModals();
    }
    
    let modalClass = "modal";
    if (store.isRemoveSongModalOpen()) {
        modalClass += " is-visible";
    }
    let songTitle = "";
    console.log(12138, store.currentSong);
    if (store.currentSong) {
        songTitle = store.currentSong.title;
    }

    return (
        <Modal
            open={store.isRemoveSongModalOpen()}
        >
            <Box sx={style}>
                <div className="modal-dialog">
                <header className="dialog-header">
                Are you sure you wish to permanently remove {songTitle} from the playlist?
                </header>
                <div id="confirm-cancel-container">
                    <button
                        id="dialog-yes-button"
                        className="modal-button"
                        onClick={handleConfirmRemoveSong}
                        style={{width:100, height:30, fontSize:20}}
                    >Confirm</button>
                    <button
                        id="dialog-no-button"
                        className="modal-button"
                        onClick={handleCancelRemoveSong}
                        style={{width:100, height:30, fontSize:20}}
                    >Cancel</button>
                </div>
            </div>
            </Box>
        </Modal>
    //     <Modal
    //         open={store.currentSong !== null}
    //     >
    //         <Box sx={style}>
    //         <div
    //     id="remove-song-modal"
    //     className={modalClass}
    //     data-animation="slideInOutLeft">
    //     <div className="modal-root" id='verify-remove-song-root'>
    //         <div className="modal-north">
    //             Remove {songTitle}?
    //         </div>
    //         <div className="modal-center">
    //             <div className="modal-center-content">
    //                 Are you sure you wish to permanently remove {songTitle} from the playlist?
    //             </div>
    //         </div>
    //         <div className="modal-south">
    //             <input type="button" 
    //                 id="remove-song-confirm-button" 
    //                 className="modal-button" 
    //                 onClick={handleConfirmRemoveSong} 
    //                 value='Confirm' />
    //             <input 
    //                 type="button" 
    //                 id="remove-song-cancel-button" 
    //                 className="modal-button" 
    //                 onClick={handleCancelRemoveSong} 
    //                 value='Cancel' />
    //         </div>
    //     </div>
    // </div>
    //         </Box>
    //     </Modal>
    );
}