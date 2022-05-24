import React from "react";
import { ResponsiveLine } from "@nivo/line";

export default function MSmallLineChart({ data }) {
  return (
    <ResponsiveLine
      data={data}
      curve="natural"
      enableGridX={false}
      enableGridY={false}
      colors={{ scheme: "dark2" }}
      margin={{ top: 10, right: 110, bottom: 10, left: 10 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={null}
      pointSize={2}
      // pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[]}
    />
  );
}
