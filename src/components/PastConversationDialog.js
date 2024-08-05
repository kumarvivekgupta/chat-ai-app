import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Chat from './Chat';

const PastConversationDialog = ({ open, onClose, conversation }) => {
    if (!conversation) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Past Conversation</DialogTitle>
            <DialogContent>
                <Box>
                    <Chat isDialog={true} pastConversations={conversation} />
                </Box>
                <Box mt={2}>
                    <Typography variant="h6">Feedback:</Typography>
                    <Typography variant="body2">Rating: {conversation.feedback.rating} star</Typography>
                    <Typography variant="body2">Comment: {conversation.feedback.comment}</Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default PastConversationDialog;
