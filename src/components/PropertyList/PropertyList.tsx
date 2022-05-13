import { Component } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { PropertyCard } from "../PropertyCard/PropertyCard";

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
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        justifyContent="flex-start"
        alignItems="stretch"
      >
        {this.state.list.map((item) => {
          return (
            <Grid item xs={2} sm={4} md={4} key={item.id}>
              <PropertyCard item={item} />
            </Grid>
          );
        })}
      </Grid>
    );
  }
}
