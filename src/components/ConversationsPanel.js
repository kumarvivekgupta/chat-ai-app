import React , {useState} from 'react';
import { useSelector } from 'react-redux';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import PastConversationDialog from './PastConversationDialog';

const ConversationsPanel = () => {
  const conversations = useSelector(state => state.conversation.conversations);

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenConversation = (conversation) => {
    setSelectedConversation(conversation);
    console.log('seelcted conv',conversation);
    setDialogOpen(true);
  };

  return (
    <Box width="250px" p={2} className="bg-green-300 dark:bg-gray-800">
      <Typography variant="h5" gutterBottom className="text-grey-800 dark:text-green-300">Past Conversations</Typography>
      <List>
        {conversations.map((conv, index) => (
          <ListItem key={index} button>
            <ListItemText onClick={() => handleOpenConversation(conv)}
             primary={`Conversation ${index + 1}`} />
          </ListItem>
        ))}
      </List>
      <PastConversationDialog open={dialogOpen} onClose={() => setDialogOpen(false)} conversation={selectedConversation} />


    </Box>
  );
};

export default ConversationsPanel;
