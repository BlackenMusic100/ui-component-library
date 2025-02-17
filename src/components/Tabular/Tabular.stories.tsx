import Tabular from ".";
import { fn } from '@storybook/test'

const convertISODateToDDMMYYYY = (isoDateString: string | number | Date) => {
    const date = new Date(isoDateString); // Parse ISO date string

    const day = date.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero if needed
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month (zero-indexed) and pad with leading zero if needed
    const year = date.getFullYear(); // Get full year
  
    // Return formatted date string in dd/MM/YYYY format
    return `${day}/${month}/${year}`;
}

const isDDMMYYYY = (input: string) => {// format: dd/MM/YYYY
    return(/^\d{2}\/\d{2}\/\d{4}$/.test(input));
}

const convertToISODate = (dateStr: { split: (arg0: string) => { (): any; new(): any; map: { (arg0: NumberConstructor): [any, any, any]; new(): any; }; }; }) => {
    // Parse the date string into day, month, and year (format: dd/MM/YYYY)
    const [day, month, year] = dateStr.split('/').map(Number);

    // Create a JavaScript Date object (month is 0-indexed in JavaScript)
    const jsDate = new Date(year, month - 1, day);

    // Calculate timezone offset in milliseconds
    const timezoneOffset = (new Date()).getTimezoneOffset() * 60000;

    // Convert JavaScript Date to ISO 8601 date string
    const isoDateString = new Date(jsDate.getTime() - timezoneOffset).toISOString().split('T')[0]; // Keep only the date part
    
    return isoDateString;
}

export default {
    title: "UIComponents/Tabular",
    component: Tabular,
    parameters: {
        layout: "centered"
    },
    tags: ["!dev"],
    argTypes: {
        tableData: {
            description: "The data of the table",
            control: {
                type: "object"
            }
        },
        tableFields: {
            description: "The fields of the table",
            control: {
                type: "object"
            }
        },
        readonly: {
            description: "Is tabular read only",
            control: {
                type: "boolean"
            }
        },
        onDataUpdate: {
            description: "Action when data in tabular changes."
        }
    },
    args: {
    }
};

export const TabularOne = {
    args: {
        tableData: [
            {_id: '67457d4716298e295c3a93dc', slot: 4, duration: 12, expiryDate: '2025-10-16T04:05:47.518Z'},
            {_id: '67457d4716298e295c3a93dd', slot: 1, duration: 12, expiryDate: '2025-11-26T00:00:00.000Z'}
        ],
        tableFields: [
            {
                "Slot": {
                    "name": "slot",
                    "component": "number",
                    "min": 1,
                    "max": 10,
                    "width": "50px"
                },
                "Duration": {
                    "name": "duration",
                    "component": "dropdown",
                    "options": [
                        { value: 0, label: 'Select Duration' },
                        { value: 12, label: '12 Months'}
                    ],
                    "valueDisplay": function (duration: any) {
                        return duration ? `${duration}` + " months" : ""
                    }
                },
                "Expected Expiry Date": {
                    "name": "expiryDate",
                    "component": "customInput",
                    "customFunction": function (_mode: any, newRow: { duration: string; }, editRow: { duration: string; }) {
                        var newDate = new Date();
                        var currentMonth = newDate.getMonth();
                        var months = parseInt(newRow.duration) || parseInt(editRow.duration)
                        newDate.setMonth(currentMonth + months);
                        return convertISODateToDDMMYYYY(newDate);
                    },
                    "valueDisplay": function (date: any) {
                        if (isDDMMYYYY(date)) {
                            date = convertToISODate(date)
                        }
        
                        return date ? convertISODateToDDMMYYYY(date) : ""
                    }
                },
                "Action": {
                    "name": "action",
                    "component": "action",
                    "validation": function (newRow: { slot: number; duration: number; }) {
                        if (newRow.slot && newRow.slot >= 0 && newRow.duration && newRow.duration != 0) {
                            return true;
                        }
                        return false;
                    }
                }
            }
        ],
        readonly: false,
        onDataUpdate: fn(), //mock function
    }
}