import { Component } from "react";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

export class PropertyCardSkeleton extends Component {
	render() {
		return (
			<Stack
				style={{
					boxShadow:
						"23px 23px 51px #adadad, -23px -23px 51px #ffffff",
					borderRadius: 24,
					padding: "0 16px 32px 16px",
				}}
			>
				<div
					style={{
						position: "relative",
						marginBottom: 46,
						marginLeft: -16,
						marginRight: -16,
					}}
				>
					<Skeleton
						sx={{ height: 200 }}
						animation="wave"
						variant="rectangular"
						style={{
							borderTopLeftRadius: "7%",
							borderBottomRightRadius: "70%",
							borderTopRightRadius: "24px",
						}}
					/>
					<Skeleton
						animation="wave"
						variant="circular"
						width={70}
						height={70}
						style={{
							position: "absolute",
							right: "16px",
							bottom: "0",
							zIndex: "2",
						}}
					/>
				</div>

				<Skeleton
					animation="wave"
					height={56}
					width="100%"
					style={{ marginBottom: 4 }}
				/>
				<Skeleton animation="wave" variant="text" />
				<div style={{ marginTop: 24, marginBottom: 18 }}>
					<Skeleton animation="wave" variant="text" />
					<Skeleton animation="wave" variant="text" />
					<Skeleton animation="wave" variant="text" />
				</div>

				<Divider />

				<div style={{ marginTop: 24 }}>
					<Grid container>
						<Grid item xs={2}>
							<Skeleton
								animation="wave"
								variant="circular"
								width={40}
								height={40}
								style={{}}
							/>
						</Grid>
						<Grid item xs={2}>
							<Skeleton
								animation="wave"
								height={32}
								style={{ marginBottom: 4 }}
							/>
						</Grid>
						<Grid item xs={12}>
							<Skeleton
								animation="wave"
								height={14}
								width="38%"
								style={{ marginBottom: 4 }}
							/>
						</Grid>
					</Grid>
				</div>
				{/* <Skeleton variant="circular" width={40} height={40} /> */}
			</Stack>
		);
	}
}
