import { Component, ReactNode } from "react";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import "./FilterBar.css";

export class FilterBar extends Component<
  any,
  {
    anchorEl: null | HTMLElement;
    onSearchChange: any;
    selectedFilter: {
      key: string;
      name: string;
    };
  }
> {
  listOrderOptions = [
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
    // console.log(value.target.value);
    this.props.onSearchChange(value.target.value);
  };

  order = (
    event: React.MouseEvent<HTMLElement>,
    value: {
      key: string;
      name: string;
    }
  ) => {
    console.log(value);
    this.setState({
      selectedFilter: value,
    });
    this.handleClose();
  };

  render(): ReactNode {
    return (
      <div className="search-container">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search properties"
            inputProps={{ "aria-label": "search properties" }}
          />
          <SearchIcon />
          <Divider
            sx={{ height: 28, m: 0.5 }}
            orientation="vertical"
            style={{
              margin: "0 24px",
            }}
          />
          <div>
            <Button
              id="basic-button"
              aria-controls={!!this.state.anchorEl ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={!!this.state.anchorEl ? "true" : undefined}
              onClick={this.handleClick}
            >
              Order by: {this.state.selectedFilter.name}
            </Button>
            <Menu
              id="basic-menu"
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              open={!!this.state.anchorEl}
              anchorEl={this.state.anchorEl}
              onClose={this.handleClose}
            >
              {this.listOrderOptions.map((option, index) => (
                <MenuItem
                  key={option.key}
                  selected={option.key === this.state.selectedFilter.key}
                  onClick={(event) => this.order(event, option)}
                >
                  {option.name}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </Paper>
        {/* <Grid container spacing={2}>
          <Grid item xs={9}>
            <div>
              <FormControl
                style={{
                  width: "100%",
                }}
              >
                <OutlinedInput
                  placeholder="Search"
                  onChange={this.filterSearch}
                />
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div>
              <FormControl
                fullWidth
                style={{
                  width: "100%",
                }}
              >
                <InputLabel id="order-select-label">Order by</InputLabel>
                <Select
                  labelId="order-select-label"
                  id="order-select"
                  label="Order by"
                  value={10}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Grid>
        </Grid> */}
      </div>
    );
  }
}
