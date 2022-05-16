import { Component, ReactNode } from "react";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";

import "./FilterBar.css";

export class FilterBar extends Component<any> {
  render(): ReactNode {
    return (
      <div className="search-container">
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <div>
              <FormControl
                style={{
                  width: "100%",
                }}
              >
                <OutlinedInput placeholder="Search" />
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
        </Grid>
      </div>
    );
  }
}
