export interface MultiPagedCalendarWidgetProps {
    startDate: Date | null;
    setStartDate: any;
    endDate: Date | null;
    setEndDate: any;
    isFocusLeft: boolean;
    setIsFocusLeft: (focus: boolean) => void;
    isFocusRight: boolean;
    setIsFocusRight: (focus: boolean) => void;
    numberOfMonths?: number;
    minDate?: Date;
    maxDate?: Date;
  }