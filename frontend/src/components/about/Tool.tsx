import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'; 
import CardActions from '@mui/material/CardActions';
import Link from '@mui/material/Link';

const Tool: React.FC<{}> = (card: any, index:any) => {
    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 200, height: 350 }}>
            <CardMedia
                component="img"
                height="200"
                width="100"
                
                image={card.imagePath}
            />
            <Box > 
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" align='center'>
                        {card.name}
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        {card.description}
                    </Typography>
                </CardContent>
            </Box>
            <CardActions>
                <Link href={card.url} target="_blank" rel="noopener">
                    Go to {card.name}
                </Link>
            </CardActions>
        </Card>
    )
}

export default Tool;