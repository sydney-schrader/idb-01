import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';




const Developer: React.FC<{}> = (card: any, index:any) => {
    return(
        <Card sx={{ maxWidth: 320, maxHeight: 1200}}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="400"
          image={card.imagePath}
        />
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
          <Typography gutterBottom variant="h6" component="div">
            Number of Commits: {card.commits} 
            </Typography>
        <Typography gutterBottom variant="h6" component="div">
            Number of Issues: {card.issues}
          </Typography>
        </CardContent>

      </Card>
    )
}








export default Developer;