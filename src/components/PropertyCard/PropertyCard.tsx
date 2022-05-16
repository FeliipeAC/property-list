import { Component, ReactNode } from "react";
import "./PropertyCard.css";
import { Star, AttachMoney } from "@mui/icons-material";
import Divider from "@mui/material/Divider";

export class PropertyCard extends Component<any> {
  render(): ReactNode {
    return (
      <div className="card" key={this.props.item.id}>
        <div>
          <div className="image-container">
            <img
              src={
                "https://" +
                this.props.item.images[0].prefix +
                this.props.item.images[0].suffix
              }
              alt=""
            />
            <div className="rating">
              {/* <Star color="primary"></Star> */}
              <span> {this.props.item.overallRating?.overall / 10}</span>
            </div>
          </div>
          <div className="title-container">
            <h1>{this.props.item.name}</h1>
            <span>
              {this.props.item.address1} {this.props.item.address2}
              <br />
              {this.props.item.district?.name}
            </span>
          </div>

          <div className="info-container">
            <p>{this.props.item.overview}</p>
          </div>
        </div>
        <div>
          <Divider />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "24px",
            }}
          >
            <div className="lowest-price-per-night">
              <AttachMoney color="primary"></AttachMoney>
              <span>
                {this.props.item.lowestPricePerNight.value} (per night)
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
