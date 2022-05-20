import { Component, ReactNode } from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import { styled, alpha } from "@mui/material/styles";

import "./FilterBar.css";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: theme.spacing(1),
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(2),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "16ch",
			"&:focus": {
				width: "40ch",
			},
		},
	},
}));

export class FilterBar extends Component<
	any,
	{
		anchorEl: null | HTMLElement;
		onSearchChange: any;
		onSortChange: any;
		selectedFilter: {
			key: string;
			name: string;
		};
	}
> {
	listSortOptions = [
		{
			key: "price",
			name: "Lowest price per night",
		},
		{
			key: "rating",
			name: "Rating",
		},
		{
			key: "name",
			name: "Name",
		},
	];

	constructor(props: any) {
		super(props);
		this.state = {
			anchorEl: null,
			onSearchChange: null,
			onSortChange: null,
			selectedFilter: {
				key: "price",
				name: "Lowest price per night",
			},
		};
	}

	handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	filterSearch = (value: any) => {
		console.log(value.target.value);
		this.props.onSearchChange(value.target.value);
	};

	sort = (value: { key: string; name: string }) => {
		this.setState({
			selectedFilter: value,
		});
		this.props.onSortChange(value);
		this.handleClose();
	};

	render(): ReactNode {
		return (
			<div className="search-container">
				<Box sx={{ flexGrow: 1 }}>
					<AppBar position="static">
						<Toolbar>
							<div>
								<IconButton
									id="basic-button"
									aria-controls={
										!!this.state.anchorEl
											? "basic-menu"
											: undefined
									}
									aria-haspopup="true"
									aria-expanded={
										!!this.state.anchorEl
											? "true"
											: undefined
									}
									onClick={this.handleClick}
								>
									<FilterListIcon />
								</IconButton>
								<Menu
									id="basic-menu"
									MenuListProps={{
										"aria-labelledby": "basic-button",
									}}
									open={!!this.state.anchorEl}
									anchorEl={this.state.anchorEl}
									onClose={this.handleClose}
								>
									{this.listSortOptions.map(
										(option, index) => (
											<MenuItem
												key={option.key}
												selected={
													option.key ===
													this.state.selectedFilter
														.key
												}
												onClick={(event) =>
													this.sort(option)
												}
											>
												{option.name}
											</MenuItem>
										)
									)}
								</Menu>
							</div>
							<Search>
								<SearchIconWrapper>
									<SearchIcon />
								</SearchIconWrapper>
								<StyledInputBase
									placeholder="Search…"
									inputProps={{ "aria-label": "search" }}
									onChange={this.filterSearch}
								/>
							</Search>
						</Toolbar>
					</AppBar>
				</Box>
			</div>
		);
	}
}
