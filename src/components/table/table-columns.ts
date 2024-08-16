
import { MRT_ColumnDef } from "material-react-table"

import { CompanyInfo } from "../../types/company-row"

export const getTableColumns = (): MRT_ColumnDef<CompanyInfo>[] => [
    { accessorKey: 'created_dt', header: 'Created Date', filterVariant: 'date', muiEditTextFieldProps: { type: 'date' } },
    { accessorKey: 'credit_score', header: 'Credit Score' },
    { accessorKey: 'data_source_modified_dt', header: 'Data Source Modified Date', filterVariant: 'date', muiEditTextFieldProps: { type: 'date' } },
    { accessorKey: 'dba_name', header: 'DBA Name' },
    { accessorKey: 'drivers', header: 'Drivers' },
    { accessorKey: 'duns_number', header: 'DUNS Number' },
    { accessorKey: 'entity_type', header: 'Entity Type' },
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'legal_name', header: 'Legal Name' },
    { accessorKey: 'm_city', header: 'Mailing City' },
    { accessorKey: 'm_state', header: 'Mailing State' },
    { accessorKey: 'm_street', header: 'Mailing Street' },
    { accessorKey: 'm_zip_code', header: 'Mailing Zip Code' },
    { accessorKey: 'mailing_address', header: 'Mailing Address' },
    { accessorKey: 'mc_mx_ff_number', header: 'MC/MX/FF Number' },
    {
        accessorKey: 'mcs_150_form_date', header: 'MCS-150 Form Date', filterVariant: 'date', muiEditTextFieldProps: { type: 'date' }
    },
    { accessorKey: 'mcs_150_mileage_year', header: 'MCS-150 Mileage Year' },
    { accessorKey: 'operating_status', header: 'Operating Status' },
    { accessorKey: 'out_of_service_date', header: 'Out of Service Date', filterVariant: 'date', muiEditTextFieldProps: { type: 'date' } },
    { accessorKey: 'p_city', header: 'Physical City' },
    { accessorKey: 'p_state', header: 'Physical State' },
    { accessorKey: 'p_street', header: 'Physical Street' },
    { accessorKey: 'p_zip_code', header: 'Physical Zip Code' },
    { accessorKey: 'phone', header: 'Phone' },
    { accessorKey: 'physical_address', header: 'Physical Address' },
    { accessorKey: 'power_units', header: 'Power Units' },
    { accessorKey: 'record_status', header: 'Record Status' },
    { accessorKey: 'state_carrier_id_number', header: 'State Carrier ID Number' },
    { accessorKey: 'usdot_number', header: 'USDOT Number' },
]