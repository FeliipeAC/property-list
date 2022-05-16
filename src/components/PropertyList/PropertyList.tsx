import { Component } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { PropertyCard } from "../PropertyCard/PropertyCard";
import { FilterBar } from "../FilterBar/FilterBar";

export class PropertyList extends Component<any, { list: any[] }> {
  constructor(props: any) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    // Simple GET request using axios
    axios.get("data.json").then((response: any) => {
      console.log("data: ", response.data);
      this.setState({ list: response.data.properties });
    });
  }

  render() {
    return (
      <div>
        <FilterBar />
        <Grid
          container
          spacing={{ xs: 3, md: 6 }}
          justifyContent="flex-start"
          alignItems="stretch"
        >
          {this.state.list.map((item) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={item.id}>
                <PropertyCard item={item} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}
