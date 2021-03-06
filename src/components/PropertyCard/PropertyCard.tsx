import { Component, ReactNode } from "react";
import "./PropertyCard.css";
import { EuroSymbol } from "@mui/icons-material";
import Divider from "@mui/material/Divider";

export class PropertyCard extends Component<any> {
	euroValue = 7.55;

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
							<span>
								{this.props.item.overallRating?.overall
									? this.props.item.overallRating?.overall /
									  10
									: 0}
							</span>
						</div>
						{this.props.item.isFeatured && (
							<div className="featured">Featured</div>
						)}
					</div>
					<div className="title-container">
						<h1>{this.props.item.name}</h1>
						<span>
							{this.props.item.address1}{" "}
							{this.props.item.address2}
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
							<div>
								<EuroSymbol color="primary"></EuroSymbol>
								<span>
									{(
										this.props.item.lowestPricePerNight
											.value / this.euroValue
									).toFixed(2)}{" "}
								</span>
							</div>

							<span
								style={{
									fontSize: "11px",
									color: "#58667e",
								}}
							>
								(lowest price per night)
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
