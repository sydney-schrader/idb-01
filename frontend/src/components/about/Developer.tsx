import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'; // Import Box

const Developer: React.FC<{}> = (card: any, index:any) => {
    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxWidth: 320, maxHeight: 1200 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="400"
                image={card.imagePath}
            />
            <Box sx={{ flexGrow: 1 }}> {/* Use Box to make content grow and push the counts to the bottom */}
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div" align='center'>
                        {card.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        {card.devType}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {card.description}
                    </Typography>
                </CardContent>
            </Box>
            {/* Counts will be pushed to the bottom */}
            <CardContent>
                <Typography gutterBottom variant="body1" component="div">
                    Number of Commits: {card.commits}
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                    Number of Issues: {card.issues}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Developer;