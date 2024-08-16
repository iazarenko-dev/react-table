import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { MRT_ColumnFiltersState } from "material-react-table";
import { useState } from "react";

import { Chart } from "../../components/chart/chart-component";
import { LoadingContent } from "../../components/loading-content/loading-content";
import { Pivot } from "../../components/pivot/pivot";
import { TableComponent } from "../../components/table/table-component";
import { CompanyInfo } from "../../types/company-row";
import { Filter } from "../../types/filter";


export const DataTable = () => {

    const [data, setData] = useState<CompanyInfo[]>([])

    const [isLoading, setIsLoading] = useState(true)

    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
        [],
    );


    return (
        <Box m="3rem 3rem">
            <LoadingContent isLoading={isLoading || data.length === 0}>
                <Box component="section" mt="25px" mb="25px">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TableComponent data={data} setData={setData} columnFilters={columnFilters} setColumnFilters={setColumnFilters} setIsLoading={setIsLoading} />
                        <Chart filter={columnFilters as Filter[]} data={data} />
                        <Pivot data={data} />
                    </LocalizationProvider>
                </Box>
            </LoadingContent>
        </Box>
    )
};
