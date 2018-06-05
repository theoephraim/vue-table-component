// import moment from 'moment';
import { get } from '../helpers';

export default class Row {
    constructor(data, columns) {
        this.data = data;
        this.columns = columns;
    }

    getValue(columnName) {
        return get(this.data, columnName);
    }

    getColumnBySortField(sortFieldName) {
        return this.columns.find(column => column.sortFieldName === sortFieldName);
    }

    getFilterableValue(columnName) {
        const value = this.getValue(columnName);

        if (! value) {
            return '';
        }

        return value.toString().toLowerCase();
    }

    getSortableValue(columnName) {
        const dataType = this.getColumnBySortField(columnName).dataType;

        let value = this.getValue(columnName);

        if (value === undefined || value === null) {
            return '';
        }

        if (value instanceof String) {
            value = value.toLowerCase();
        }

        // if (dataType.startsWith('date')) {
        //     const format = dataType.replace('date:', '');
        //     return moment(value, format).format('YYYYMMDDHHmmss');
        // }

        if (dataType === 'numeric') {
            return value;
        }

        return value.toString();
    }

    passesFilter(filter) {
        return this.columns
            .filter(column => column.isFilterable())
            .map(column => this.getFilterableValue(column.getFilterFieldName()))
            .filter(filterableValue => filterableValue.indexOf(filter.toLowerCase()) >= 0)
            .length;
    }
}
