import "react-pivottable/pivottable.css";

import { Box } from "@mui/material";
import { useState } from "react";
import PivotTableUI from "react-pivottable/PivotTableUI";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import TableRenderers from "react-pivottable/TableRenderers";
import Plot from "react-plotly.js";

import { CompanyInfo } from "../../types/company-row";

const PlotlyRenderers = createPlotlyRenderers(Plot);

interface PivotProps {
    data: CompanyInfo[]
}

export const Pivot = ({ data }: PivotProps) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [pivotState, setPivotState] = useState<any>({});

    const renderers = Object.assign({}, TableRenderers, PlotlyRenderers)

    return (
        <Box sx={
            {
                overflow: "auto",
                display: "grid",
            }
        }>
            <PivotTableUI
                data={data}
                onChange={setPivotState}
                renderers={renderers}
                {...pivotState}
            />
        </Box>
    );
};
