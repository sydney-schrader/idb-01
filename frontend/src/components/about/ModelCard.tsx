import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import "./modelCardStyle.css";

interface ModelCardProps {
  image?: any;
  href?: string;
  height?: string;
  imageMaxHeight?: string;
  imageMinHeight?: string;
  imageHeight?: string;
  fitImage?: boolean;
  width?: string;
  center?: boolean;
  target?: string;
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
          alignItems: props.center ? "center" : "start",
          width: props.width ?? "368px",
          height: props.height,
        }}
        href={props.href ?? ""}
        target={props.target ?? ""}
      >
        {props.image != null && (
          <CardMedia
            className={
              "modelImage" + (props.fitImage ?? false ? " modelImageFit" : "")
            }
            sx={{
              height: props.imageHeight ?? "auto",
              flexGrow: 1,
              maxHeight: props.imageMaxHeight ?? props.imageHeight ?? "none",
              minHeight: props.imageMinHeight ?? "none",
              width: props.fitImage ? "-webkit-fill-available" : "100%",
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
