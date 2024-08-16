import { CSSProperties } from 'react';
// Вся информация здесь: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-table/Readme.md
import {
    UseExpandedOptions,
    UseFiltersColumnOptions,
    UseFiltersOptions,
    UseGlobalFiltersColumnOptions,
    UseGlobalFiltersOptions,
    UseGroupByColumnOptions,
    UseGroupByOptions,
    UsePaginationOptions,
    UseRowSelectOptions,
    UseRowStateOptions,
    UseSortByColumnOptions,
    UseSortByOptions,
} from 'react-table';

declare module 'react-table' {
    // take this file as-is, or comment out the sections that don't apply to your plugin configuration

    export interface TableOptions<D>
        extends UseExpandedOptions<D>,
            UseFiltersOptions<D>,
            UseGlobalFiltersOptions<D>,
            UseGroupByOptions<D>,
            UsePaginationOptions<D>,
            UseResizeColumnsOptions<D>,
            UseRowSelectOptions<D>,
            UseRowStateOptions<D>,
            UseSortByOptions<D>,
            // note that having Record here allows you to add anything to the options, this matches the spirit of the
            // underlying js library, but might be cleaner if it's replaced by a more specific type that matches your
            // feature set, this is a safe default.
            Record<string, unknown> {}

    export interface Hooks<D>
        extends UseExpandedHooks<D>,
            UseGroupByHooks<D>,
            UseRowSelectHooks<D>,
            UseSortByHooks<D> {}

    export interface TableInstance<D>
        extends UseColumnOrderInstanceProps<D>,
            UseExpandedInstanceProps<D>,
            UseFiltersInstanceProps<D>,
            UseGlobalFiltersInstanceProps<D>,
            UseGroupByInstanceProps<D>,
            UsePaginationInstanceProps<D>,
            UseRowSelectInstanceProps<D>,
            UseRowStateInstanceProps<D>,
            UseSortByInstanceProps<D> {}

    export interface TableState<D>
        extends UseColumnOrderState<D>,
            UseExpandedState<D>,
            UseFiltersState<D>,
            UseGlobalFiltersState<D>,
            UseGroupByState<D>,
            UsePaginationState<D>,
            UseResizeColumnsState<D>,
            UseRowSelectState<D>,
            UseRowStateState<D>,
            UseSortByState<D> {}

    export interface ColumnInterface<D>
        extends UseFiltersColumnOptions<D>,
            UseGlobalFiltersColumnOptions<D>,
            UseGroupByColumnOptions<D>,
            UseResizeColumnsColumnOptions<D>,
            UseSortByColumnOptions<D> {
        getColumnStyles?: (columnData: D) => CSSProperties;
        getRowSpan?: (columnData: D) => number;
        getColSpan?: (columnData: D) => number;
    }

    export interface ColumnInstance<D>
        extends UseFiltersColumnProps<D>,
            UseGroupByColumnProps<D>,
            UseResizeColumnsColumnProps<D>,
            UseSortByColumnProps<D> {}

    export interface Cell<D, V> // eslint-disable-line @typescript-eslint/no-unused-vars
        extends UseGroupByCellProps<D>,
            UseRowStateCellProps<D> {}

    export interface Row<D>
        extends UseExpandedRowProps<D>,
            UseGroupByRowProps<D>,
            UseRowSelectRowProps<D>,
            UseRowStateRowProps<D> {}
}
export type {
    Cell,
    CellProps,
    CellValue,
    Column,
    ColumnGroup,
    ColumnWithLooseAccessor,
    FilterProps,
    FilterType,
    HeaderGroup,
    HeaderProps,
    IdType,
    Row,
    TableInstance,
    TableOptions,
    TableState,
} from 'react-table';
