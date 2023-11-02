import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'; 
import CardActions from '@mui/material/CardActions';
import Link from '@mui/material/Link';

const ApiTool: React.FC<{}> = (card: any, index:any) => {
    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 320, height: 320 }}>
            <CardMedia
                component="img"
                height="140"
                width="140"
                
                image={card.imagePath}
            />
            <Box sx={{ flexGrow: 1 }}> 
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div" align='center'>
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

export default ApiTool;