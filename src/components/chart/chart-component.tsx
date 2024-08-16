import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { FC } from "react";

import { CompanyInfo } from "../../types/company-row";
import { Filter } from "../../types/filter";

function applyFilter(record: CompanyInfo, filter: Filter[]): boolean {

  return filter.some(({ id, value }) => record[id]?.includes(value))
}

interface ChartProps {
  data: CompanyInfo[];
  filter: Filter[];
}

export const Chart: FC<ChartProps> = ({
  data,
  filter,
}) => {

  const countByMonth: Record<string, number> = data.reduce((acc, record) => {
    const outOfServiceDate = new Date(record.out_of_service_date);
    
    if (isNaN(outOfServiceDate.getTime())) {
      return acc;
    }

    if (
      filter.length === 0 ||
      (
        filter[0].value &&
        applyFilter(record, filter))
    ) {

      const year = outOfServiceDate.getFullYear();
      const month = outOfServiceDate.toLocaleString("default", {
        month: "long",
      });

      const key = `${year}-${month}`;

      return { ...acc, [key]: (acc[key] || 0) + 1 }
    }

    return acc
  }, {} as Record<string, number>);


  const xAxisData = Object.keys(countByMonth);

  const series = Object.values(countByMonth);

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "5px",
        marginTop: "30px",
        marginBottom: "30px",
        marginLeft: "auto",
        overflow: "auto",
        display: "grid",
        border: "1px solid #fff",
      }}
    >
      <BarChart
        height={400}
        series={[{ data: series }]}
        colors={["#1976d2"]}
        xAxis={[
          {
            data: xAxisData,
            scaleType: "band",
          },
        ]}
        yAxis={[
          {
            label: "Out Of Service",
          },
        ]}
      />
    </Box>
  );
};
