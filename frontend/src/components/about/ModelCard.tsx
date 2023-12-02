import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import "./modelCardStyle.css";

interface ModelCardProps {
  image?: any;
  height?: string;
  imageHeight?: string;
  fitImage?: boolean;
  width?: string;
}

function ModelCard(props: React.PropsWithChildren<ModelCardProps>) {
  return (
    <Card
      className="modelCard"
      sx={{
        width: props.width ?? "368px",
        height: props.height ?? "",
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
          width: props.width ?? "368px",
          height: props.height,
        }}
      >
        {props.image != null && (
          <CardMedia
            className={
              "modelImage" + (props.fitImage ?? false ? " modelImageFit" : "")
            }
            sx={{
              height: props.imageHeight ?? "auto",
              flexGrow: 1,
            }}
            component="img"
            image={props.image}
          />
        )}
        {props.children}
      </CardActionArea>
    </Card>
  );
}

export default ModelCard;
