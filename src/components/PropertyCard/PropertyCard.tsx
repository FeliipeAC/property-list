import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Component, ReactNode } from "react";

export class PropertyCard extends Component<any> {
  render(): ReactNode {
    return (
      <Card
        sx={{ maxWidth: 345 }}
        key={this.props.item.id}
        style={{
          height: "100%",
        }}
      >
        <CardActionArea
          style={{
            height: "100%",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {this.props.item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {this.props.item.address1}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}
