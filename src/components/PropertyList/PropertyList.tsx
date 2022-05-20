import { Component } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { PropertyCard } from "../PropertyCard/PropertyCard";
import { FilterBar } from "../FilterBar/FilterBar";

export class PropertyList extends Component<
	any,
	{ list: any[]; filtredList: any[] }
> {
	constructor(props: any) {
		super(props);
		this.state = {
			list: [],
			filtredList: [],
		};
	}

	componentDidMount() {
		// Simple GET request using axios
		axios.get("data.json").then((response: any) => {
			console.log("data: ", response.data);
			this.setState({
				list: response.data.properties,
				filtredList: response.data.properties,
			});

			this.sort({
				key: "price",
				name: "Lowest price per night",
			});
		});
	}

	filter = (value: any) => {
		if (value) {
			let filtredList = this.state.list.filter((el) =>
				el.name.toLowerCase().includes(value.toLowerCase())
			);
			this.setState({ filtredList: filtredList });
		} else {
			this.setState({ filtredList: this.state.list });
		}
	};

	sort = (value: { key: string; name: string }) => {
		switch (value.key) {
			case "rating":
				this.setState({
					filtredList: this.state.list.sort(
						(a, b) =>
							b.overallRating?.overall - a.overallRating?.overall
					),
				});
				break;
			case "name":
				this.setState({
					filtredList: this.state.list.sort((a, b) =>
						a.name.localeCompare(b.name, "en", {
							numeric: true,
						})
					),
				});
				break;
			case "price":
				this.setState({
					filtredList: this.state.list.sort(
						(a, b) =>
							a.lowestPricePerNight.value -
							b.lowestPricePerNight.value
					),
				});
				break;
			default:
				break;
		}
	};

	render() {
		return (
			<div
				style={{
					padding: "48px 0",
				}}
			>
				<FilterBar
					onSearchChange={this.filter}
					onSortChange={this.sort}
				/>
				<Grid
					container
					spacing={{ xs: 3, md: 6 }}
					justifyContent="flex-start"
					alignItems="stretch"
				>
					{this.state.filtredList.map((item) => {
						return (
							<Grid
								item
								xs={12}
								sm={6}
								md={4}
								lg={4}
								xl={3}
								key={item.id}
							>
								<PropertyCard item={item} />
							</Grid>
						);
					})}
				</Grid>
			</div>
		);
	}
}
