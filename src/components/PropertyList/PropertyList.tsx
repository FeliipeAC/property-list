import { Component } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { PropertyCardSkeleton } from "../PropertyCardSkeleton/PropertyCardSkeleton";

import { PropertyCard } from "../PropertyCard/PropertyCard";
import { FilterBar } from "../FilterBar/FilterBar";
export class PropertyList extends Component<
  any,
  {
    list: any[];
    filtredList: any[];
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
      filtredList: [],
      loading: true,
      page: 1,
      perPage: 24,
      totalPages: 0,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      // Simple GET request using axios
      axios.get("data.json").then((response: any) => {
        console.log(response.data.properties);
        this.setState({
          list: response.data.properties,
          totalPages: Math.ceil(
            response.data.properties.length / this.state.perPage
          ),
        });
        console.log(this.state.list);
        this.sortList({
          key: "price",
          name: "Lowest price per night",
        });

        this.listByPage();

        this.setState({
          loading: false,
        });
      });
    }, 1500);
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

  sortList = (value: { key: string; name: string }) => {
    console.log(this.state.list);
    switch (value.key) {
      case "rating":
        this.setState({
          list: this.state.list.sort(
            (a, b) => b.overallRating?.overall - a.overallRating?.overall
          ),
        });
        break;
      case "name":
        this.setState({
          list: this.state.list.sort((a, b) =>
            a.name.localeCompare(b.name, "en", {
              numeric: true,
            })
          ),
        });
        break;
      case "price":
        this.setState({
          list: this.state.list.sort(
            (a, b) => a.lowestPricePerNight.value - b.lowestPricePerNight.value
          ),
        });
        break;
      default:
        break;
    }
  };

  handlePage = (event: object, page: number) => {
    this.setState({
      page: page,
    });

    this.listByPage();
  };

  listByPage() {
    console.log(this.state.list);
    let listFilterPage = [];
    if (this.state.page === 1) {
      listFilterPage = this.state.list.slice(0, this.state.perPage);
    } else {
      const startIndex =
        this.state.perPage * this.state.page + 1 - this.state.perPage;

      listFilterPage = this.state.list.slice(
        startIndex,
        startIndex + this.state.perPage
      );
    }
    console.log("listFilterPage: ", listFilterPage);
    this.setState({
      filtredList: listFilterPage,
    });
  }

  render() {
    return (
      <div
        style={{
          padding: "48px 0",
        }}
      >
        <FilterBar onSearchChange={this.filter} onSortChange={this.sortList} />
        {this.state.loading ? (
          <Grid
            container
            spacing={{ xs: 3, md: 6 }}
            justifyContent="flex-start"
            alignItems="stretch"
          >
            {[1, 2, 3].map((item) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={item}>
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
              {this.state.filtredList.map((item) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={item.id}>
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
                onChange={this.listByPage}
              />
            </Stack>
          </div>
        )}
      </div>
    );
  }
}
