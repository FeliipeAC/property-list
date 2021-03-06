import { Component } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { PropertyCardSkeleton } from "../PropertyCardSkeleton/PropertyCardSkeleton";

import { PropertyCard } from "../PropertyCard/PropertyCard";
export class PropertyList extends Component<
	any,
	{
		list: any[];
		viewList: any[];
		loading: boolean;
		page: number;
		perPage: number;
		totalPages: number;
	}
> {
	constructor(props: any) {
		super(props);
		this.state = {
			list: [],
			viewList: [],
			loading: true,
			page: 1,
			perPage: 24,
			totalPages: 0,
		};
	}

	componentDidMount() {
		this.loadData();
	}

	loadData() {
		// Simple GET request using axios
		axios.get("data.json").then((response: any) => {
			const properties = response.data.properties;

			this.setState({
				list: properties,
				totalPages: Math.ceil(properties.length / this.state.perPage),
				loading: false,
			});

			this.listByPage(1);
		});
	}

	handlePage = (event: object, page: number) => {
		this.setState({
			page: page,
		});

		this.listByPage(page);
	};

	// Display list filtered by page
	listByPage(page: number) {
		let listFilterPage = [];
		if (page === 1) {
			listFilterPage = this.state.list.slice(0, this.state.perPage);
		} else {
			// starting index to cut list
			const startIndex =
				this.state.perPage * page + 1 - this.state.perPage;

			listFilterPage = this.state.list.slice(
				startIndex,
				startIndex + this.state.perPage
			);
		}

		this.setState({
			viewList: listFilterPage,
			page: page,
		});

		window.scrollTo(0, 0);
	}

	render() {
		return (
			<div
				style={{
					padding: "48px 0",
				}}
			>
				{this.state.loading ? (
					<Grid
						container
						spacing={{ xs: 3, md: 6 }}
						justifyContent="flex-start"
						alignItems="stretch"
					>
						{[1, 2, 3].map((item) => {
							return (
								<Grid
									item
									xs={12}
									sm={6}
									md={4}
									lg={4}
									xl={3}
									key={item}
								>
									<PropertyCardSkeleton />
								</Grid>
							);
						})}
					</Grid>
				) : (
					<div>
						<Grid
							container
							spacing={{ xs: 3, md: 6 }}
							justifyContent="flex-start"
							alignItems="stretch"
						>
							{this.state.viewList.map((item) => {
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

						<Stack alignItems="center">
							<Pagination
								style={{
									marginTop: "56px",
								}}
								count={this.state.totalPages}
								color="primary"
								variant="outlined"
								shape="rounded"
								size="large"
								onChange={this.handlePage.bind(this)}
							/>
						</Stack>
					</div>
				)}
			</div>
		);
	}
}
