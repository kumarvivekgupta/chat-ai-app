import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, addFeedback, saveConversationAsync } from '../features/chat/conversationSlice';
import { TextField, Button, Box, Typography, Rating, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Chat = ({ isDialog = false, pastConversations = [] }) => {
    const [input, setInput] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const messages = useSelector(state => state.conversation.currentConversation.messages);
    const dispatch = useDispatch();
    const [endConversation, setEndConversation] = useState(false);

    const handleSendMessage = () => {
        dispatch(addMessage({ text: input, isUser: true }));
        // Simulate AI response
        setTimeout(() => {
            dispatch(addMessage({ text: 'AI Response', isUser: false }));
        }, 1000);
        setInput('');
    };

    //Handle Feedback on AI Response
    const handleFeedback = (type, index) => {
        dispatch(addFeedback({ index, type }));
    };

    //Handle Save Conversation
    const handleSaveConversation = () => {
        dispatch(saveConversationAsync({ messages, feedback: { rating, comment } }));
        setComment('');
        setRating(0);
        setEndConversation(false);
    };

    //Handle Share Conversation feature
    const handleShare = () => {
        const text = messages.map(msg => msg.text).join('\n');
        navigator.clipboard.writeText(text).then(() => {
            alert('Conversation copied to clipboard');
        });
    };

    return (
        <Box display="flex" flexDirection="column" flexGrow={1} p={2} className="bg-white dark:bg-black">
            <Box flexGrow={1} overflow="auto">
                {(isDialog ? pastConversations.messages : messages).map((msg, index) => (
                    <Box key={index} my={1} p={2} borderRadius={4} bgcolor={msg.isUser ? 'primary.main' : 'grey.300'} color={msg.isUser ? 'primary.contrastText' : 'text.primary'} alignSelf={msg.isUser ? 'flex-end' : 'flex-start'}
                        width={'90%'} marginLeft={!msg.isUser ? 'auto' : ''} className="group" position="relative">
                        <Typography variant="body1">{msg.text}</Typography>
                        {!msg.isUser ?
                            <Box display="flex" justifyContent="flex-end" mt={1}

                                className={`flex justify-end space-x-2 mt-1 absolute right-2 top-2 ${!msg.feedback && !isDialog ? 'opacity-0 group-hover:opacity-100 transition-opacity duration-300' : ''}`}>

                                {isDialog ? msg?.feedback === 'like' ? <IconButton disabled="true"
                                    color="success">
                                    <ThumbUpIcon />
                                </IconButton> : '' : (!!msg?.feedback && msg.feedback === 'like' ?
                                    <IconButton
                                        color="success">
                                        <ThumbUpIcon />
                                    </IconButton> :
                                    <IconButton
                                        onClick={() => handleFeedback('like', index)} color="success">
                                        <ThumbUpIcon /></IconButton>)}

                                {isDialog ? msg?.feedback === 'dislike' ?
                                    <IconButton disabled="true"
                                        color="error">
                                        <ThumbDownIcon />
                                    </IconButton>
                                    : '' : (!!msg?.feedback && msg.feedback === 'dislike' ?
                                        <IconButton
                                            color="error">
                                            <ThumbDownIcon />
                                        </IconButton> :
                                        <IconButton
                                            onClick={() => handleFeedback('dislike', index)} color="error">
                                            <ThumbDownIcon />
                                        </IconButton>)
                                }

                            </Box> : ''}

                    </Box>
                ))}
            </Box>
            {!isDialog && !endConversation ?
                <Box display="flex" mt={2} >
                    <TextField className="bg-white"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type a message"
                        fullWidth
                        variant="outlined"
                    />


                    <Button onClick={handleSendMessage} variant="contained" color="primary" style={{ marginLeft: '8px' }}>Send</Button>
                </Box> : ''}


            {!isDialog ?
                <Box alignItems="center" display="flex" justifyContent="center">
                    <Button onClick={() => setEndConversation(!endConversation)} variant="contained" color="secondary" style={{ marginTop: '8px' }}>
                        {!endConversation ? 'End Conversation' : 'Resume Conversation'}
                    </Button>

                </Box> : ''}
            {endConversation ?
                <Box mt={4}>
                    <Typography variant="h6">Rate this conversation:</Typography>
                    <Rating
                        value={rating}
                        onChange={(event, newValue) => setRating(newValue)}
                        max={5}
                        style={{ marginBottom: '8px' }}
                    />
                    <TextField
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder="Your feedback"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={4}
                        style={{ marginBottom: '8px' }}
                    />
                    <Button onClick={handleSaveConversation} variant="contained" color="success">
                        Submit Feedback
                    </Button>
                </Box> : ''}


            {isDialog ?
                <Box display="flex" justifyContent="center">
                    <Button
                        onClick={handleShare} variant="contained" color="secondary" style={{ marginLeft: '8px' }}>Share Conversation</Button>

                </Box>
                : ''}
        </Box>
    );
};

export default Chat;
