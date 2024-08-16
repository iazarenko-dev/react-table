import { Box, Button } from '@mui/material';
import { MaterialReactTable, MRT_ColumnFiltersState, MRT_TableOptions,useMaterialReactTable } from 'material-react-table'
import { Dispatch, FC, SetStateAction, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CSVSheetClient } from '../../api/csv-sheet-client/csv-sheet-client';
import { CompanyInfo } from '../../types/company-row';
import { getTableColumns } from './table-columns'

const defaultTableState = [
    "created_dt",
    "credit_score",
    "data_source_modified_dt",
    "dba_name",
    "drivers",
    "duns_number",
    "entity_type",
    "id",
    "legal_name",
    "m_city",
    "m_state",
    "m_street",
    "m_zip_code",
    "mailing_address",
    "mc_mx_ff_number",
    "mcs_150_form_date",
    "mcs_150_mileage_year",
    "operating_status",
    "out_of_service_date",
    "p_city",
    "p_state",
    "p_street",
    "p_zip_code",
    "phone",
    "physical_address",
    "power_units",
    "record_status",
    "state_carrier_id_number",
    "usdot_number"
]

const client = new CSVSheetClient()

interface TableComponentProps {
    data: CompanyInfo[],
    setData: Dispatch<SetStateAction<CompanyInfo[]>>,
    columnFilters: MRT_ColumnFiltersState,
    setColumnFilters: Dispatch<SetStateAction<MRT_ColumnFiltersState>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>,

}

export const TableComponent: FC<TableComponentProps> = ({data,setData, columnFilters,setColumnFilters, setIsLoading}) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const fetchData = useCallback(async () => {
        const newData = await client.getTableFull()

        setData(newData)
    }, [setData, setIsLoading])

    useEffect(() => {
        setIsLoading(true)
        fetchData()
        setIsLoading(false)
    }, [fetchData, setIsLoading])

    const handleEditData: MRT_TableOptions<CompanyInfo>['onEditingRowSave'] = async ({ row, exitEditingMode }) => {

        setIsLoading(true)

        exitEditingMode()

        await client.updateRow(row.index, row._valuesCache)

        await fetchData()

        setIsLoading(false)
    }

    const tableStateOrderHandler: MRT_TableOptions<CompanyInfo>['onColumnOrderChange'] = (order) => {
        setSearchParams({ order: JSON.stringify(order) })
    }

    const handleResetTableState = () => {
        setSearchParams({ order: JSON.stringify(defaultTableState) })
    }

    const tableStateOrder = searchParams.get('order') ? JSON.parse(searchParams.get('order')!) : defaultTableState

    const table = useMaterialReactTable({
        data,
        columns: getTableColumns(),
        state: {
            columnFilters,
            columnOrder: tableStateOrder,
        },
        enableColumnOrdering: true,
        enableColumnResizing: true,
        enableEditing: true,
        enableRowVirtualization: true,
        enableFilters: true,
        enableDensityToggle: false,
        enableBatchRowSelection: false,
        enableExpandAll: false,
        columnFilterDisplayMode: 'popover',
        onColumnFiltersChange: setColumnFilters,
        editDisplayMode: 'modal',
        onEditingRowSave: handleEditData,
        onColumnOrderChange: tableStateOrderHandler
    });

    return (<Box component="section" mt="25px" mb="25px">
        <Button variant="text" onClick={handleResetTableState}>Reset Table State</Button>
        <MaterialReactTable table={table} />
    </Box>)
}