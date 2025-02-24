export type DateRangePickerProps = {
    fromDate: Date,
    toDate: Date,
    startDateLabel: string,
    endDateLabel: string,
    onFromDateChange: (input: string) => void,
    onToDateChange: (input: string) => void,
    isDoublePagedCalendar: boolean,
    numberOfMonths: number,
    minDate?: Date,
    maxDate?: Date,
    disabled?: boolean,
}