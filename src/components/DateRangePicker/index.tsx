import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import { DateRangePickerProps } from "./types"
import CalendarIcon from '../../assets/icons/calendar-icon.svg'
import { StyledCalendarContainer, StyledCalendarHeader, StyledCalendarIcon, StyledCalendarInputContainer, 
        StyledCalendarInputHolder, StyledDivider, StyledInputDay, StyledInputDisplayValue, StyledInputLabel, 
        StyledInputStyledInputMask, StyledInputText, StyledInputTextMask, StyledTextfieldIconCalendarWrapper, 
        StyledTextfieldInputContent, StyledTextfieldInputContentWrapper, StyledTextfieldInputWrapper, StyledTextfieldWrapper } from "./styled-component"
import MultiPagedCalendarWidget from "../../widgets/MultiPagedCalendarWidget"

const DateRangePicker: React.FC<DateRangePickerProps> = ({ startDateLabel, endDateLabel, numberOfMonths, minDate, maxDate }) => {
    const [startDay, setStartDay] = useState('');
    const [endDay, setEndDay] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [formattedStartDate, setFormattedStartDate] = useState('');
    const [formattedEndDate, setFormattedEndDate] = useState('');
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isFocusLeft, setIsFocusLeft] = useState(false);
    const [isFocusRight, setIsFocusRight] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    const initialValues = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm: any = today.getMonth() + 1;
        let dd: any = today.getDate();

        if (dd < 10) dd = '0' + dd.toString();
        if (mm < 10) mm = '0' + mm.toString();

        const formattedDate = dd + '/' + mm + '/' + yyyy;

        setStartDate(today);
        setEndDate(today);
        setStartDay(getDayOfWeek(formattedDate));
        setEndDay(getDayOfWeek(formattedDate));
    }

    const getDayOfWeek = (dateString: string) => {
        // Extract day, month, and year from dd/mm/yyyy format
        const day = parseInt(dateString.slice(0, 2), 10);
        const month = parseInt(dateString.slice(3, 5), 10) - 1; // Months are zero-indexed in JavaScript
        const year = parseInt(dateString.slice(6), 10);
        
        // Create a new Date object from dateString
        const date = new Date(year, month, day);
        
        // Array of day names
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const result = daysOfWeek[date.getDay()] as string;
        
        // Get the day of the week
        return result;
    }

    const handleLeftInputClick = () => {
        setIsCalendarOpen(true);
        setIsFocusRight(false);
        setIsFocusLeft(true);
    }

    const handleRightInputClick = () => {
        setIsCalendarOpen(true);
        setIsFocusLeft(false);
        setIsFocusRight(true);
    }

    // Helper function to calculate the new cursor position
    const calculateCursorPosition = (
        previousValue: string,
        newValue: string,
        oldCursorPosition: number,
        slashesBeforeCursor: number
    ): number => {
        // If deleting, move cursor back
        if (newValue.length < previousValue.length) {
            // If we just deleted a slash, move back one more
            if (previousValue[oldCursorPosition] === '/') {
                console.log('deleting cursor')
                return oldCursorPosition - 1;
            }
            return oldCursorPosition;
        }

        // If typing and cursor would be at a slash position, jump over it
        if (newValue[oldCursorPosition] === '/') {
            return oldCursorPosition + 1;
        }
        
        // Handle cursor position after auto-formatting
        if ((oldCursorPosition === 2 || oldCursorPosition === 5) && newValue.length > oldCursorPosition && newValue[oldCursorPosition] === '/') {
            return oldCursorPosition + 1;
        }
        
        // If typing, check if we need to jump forward over a slash
        const newSlashesBeforeCursor = newValue
            .slice(0, oldCursorPosition)
            .split('/')
            .length - 1;
        
        // Add extra position for each new slash that was added
        const extraSlashes = Math.max(0, newSlashesBeforeCursor - slashesBeforeCursor);
        
        return oldCursorPosition + extraSlashes;
    }

    const handleChangeStartDate = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
        const cursorPosition = input.selectionStart;
        let inputValue = event.target.value;
        const previousValue = formattedStartDate;

        // Handle deletion of slash and previous number
        if (inputValue.length < previousValue.length && cursorPosition !== null) {
            if (previousValue[cursorPosition] === '/' && cursorPosition > 0) {
                // Remove the slash and the number before it
                inputValue = previousValue.slice(0, cursorPosition - 1) + previousValue.slice(cursorPosition + 1);
            }
        }

        inputValue = inputValue.replace(/[^0-9]/g, '');

        // Store the number of slashes before the cursor in the previous value
        const slashesBeforeCursor = previousValue
            .slice(0, cursorPosition ?? 0)
            .split('/')
            .length - 1;
        
        // Auto-format as DD/MM/YYYY
        if (inputValue.length > 2 && inputValue.length <= 4) {
            inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2)}`;
        } else if (inputValue.length > 4) {
            inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2, 4)}/${inputValue.slice(4, 8)}`;
        }
        
        const inputDay = inputValue.slice(0,2);
        const inputMonth = inputValue.slice(3,5);
        const inputYear = inputValue.slice(6, 10);
        const inputDate = new Date(parseInt(inputYear), parseInt(inputMonth) - 1, parseInt(inputDay));
        const isValidDate = !isNaN(inputDate.getTime()) &&
        inputDate.getDate() === parseInt(inputDay) &&
        inputDate.getMonth() === parseInt(inputMonth) - 1 &&
        inputDate.getFullYear() === parseInt(inputYear);
        
        setFormattedStartDate(inputValue);
        setTimeout(() => {
            const newCursorPosition = calculateCursorPosition(
                previousValue,
                inputValue,
                cursorPosition ?? 0,
                slashesBeforeCursor
            );
            input.setSelectionRange(newCursorPosition, newCursorPosition);
        }, 0)

        if (isValidDate) {
            setStartDate(inputDate)
        }
    }

    const handleChangeEndDate = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
        const cursorPosition = input.selectionStart;
        let inputValue = event.target.value;
        const previousValue = formattedEndDate;

        // Handle deletion of slash and previous number
        if (inputValue.length < previousValue.length && cursorPosition !== null) {
            if (previousValue[cursorPosition] === '/' && cursorPosition > 0) {
                // Remove the slash and the number before it
                inputValue = previousValue.slice(0, cursorPosition - 1) + previousValue.slice(cursorPosition + 1);
            }
        }

        inputValue = inputValue.replace(/[^0-9]/g, '');

        // Store the number of slashes before the cursor in the previous value
        const slashesBeforeCursor = previousValue
            .slice(0, cursorPosition ?? 0)
            .split('/')
            .length - 1;

        // Auto-format as DD/MM/YYYY
        if (inputValue.length > 2 && inputValue.length <= 4) {
            inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2)}`;
        } else if (inputValue.length > 4) {
            inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2, 4)}/${inputValue.slice(4, 8)}`;
        }
        
        const inputDay = inputValue.slice(0,2);
        const inputMonth = inputValue.slice(3,5);
        const inputYear = inputValue.slice(6, 10);
        const inputDate = new Date(parseInt(inputYear), parseInt(inputMonth) - 1, parseInt(inputDay));
        const isValidDate = !isNaN(inputDate.getTime()) &&
        inputDate.getDate() === parseInt(inputDay) &&
        inputDate.getMonth() === parseInt(inputMonth) - 1 &&
        inputDate.getFullYear() === parseInt(inputYear) 
        
        setFormattedEndDate(inputValue);
        setTimeout(() => {
            const newCursorPosition = calculateCursorPosition(
                previousValue,
                inputValue,
                cursorPosition ?? 0,
                slashesBeforeCursor
            );
            input.setSelectionRange(newCursorPosition, newCursorPosition);
        }, 0)

        if (isValidDate) {
            setEndDate(inputDate)
        }
    }

    const handleClickOutsideContainer = useCallback((event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node) && 
            calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
            setIsCalendarOpen(false);
            
            if (startDate > endDate && isFocusLeft) {
                setStartDate(endDate);
            } else if (endDate < startDate && isFocusRight) {
                setEndDate(startDate);
            }
        }
    }, [startDate, endDate])

    useEffect(() => {
        initialValues();
    }, [])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideContainer);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideContainer);
        };
    }, [handleClickOutsideContainer])

    useEffect(() => {
        if (isCalendarOpen === false) {
            setIsFocusLeft(false);
            setIsFocusRight(false);
        }
    }, [isCalendarOpen])

    useEffect(() => {
        const startYear = startDate.getFullYear();
        let startMonth: any = startDate.getMonth() + 1;
        let startDay: any = startDate.getDate();

        if (startDay < 10) startDay = '0' + startDay.toString();
        if (startMonth < 10) startMonth = '0' + startMonth.toString();

        setFormattedStartDate(startDay + '/' + startMonth + '/' + startYear);
    }, [startDate])
    
    useEffect(() => {
        if (endDate) {
            const endYear = endDate.getFullYear();
            let endMonth: any = endDate.getMonth() + 1;
            let endDay: any = endDate.getDate();
    
            if (endDay < 10) endDay = '0' + endDay.toString();
            if (endMonth < 10) endMonth = '0' + endMonth.toString();
    
            setFormattedEndDate(endDay + '/' + endMonth + '/' + endYear);
        }
    }, [endDate])

    useEffect(() => {
        setStartDay(getDayOfWeek(formattedStartDate));
    }, [formattedStartDate])

    useEffect(() => {
        setEndDay(getDayOfWeek(formattedEndDate));
    }, [formattedEndDate])

    return (
        <div id="date_picker_range_calendar">
            <StyledCalendarContainer ref={containerRef}>
                <StyledCalendarHeader id="calendar_header">
                    <StyledCalendarInputContainer id="dateinputn">
                        <StyledCalendarInputHolder isFocus={isFocusLeft} id="startclick-handle" onClick={handleLeftInputClick}>
                            <StyledTextfieldWrapper>
                                <StyledTextfieldInputWrapper>
                                    <StyledTextfieldIconCalendarWrapper>
                                        <StyledCalendarIcon>
                                            <img src={CalendarIcon} />
                                        </StyledCalendarIcon>
                                    </StyledTextfieldIconCalendarWrapper>
                                    <StyledTextfieldInputContent>
                                        <StyledInputLabel tabIndex={-1}>{startDateLabel}</StyledInputLabel>
                                        <StyledTextfieldInputContentWrapper>
                                            <StyledInputDisplayValue>
                                                <StyledInputText tabIndex={-1}>{formattedStartDate}</StyledInputText>
                                                <StyledInputDay>
                                                    {startDay ? `(${startDay})`: null}
                                                </StyledInputDay>
                                                <StyledInputTextMask tabIndex={-1}></StyledInputTextMask>
                                            </StyledInputDisplayValue>
                                            <StyledInputStyledInputMask tabIndex={0} placeholder="dd/mm/yyyy" aria-label="Start" value={formattedStartDate} onChange={handleChangeStartDate}/>
                                        </StyledTextfieldInputContentWrapper>
                                    </StyledTextfieldInputContent>
                                </StyledTextfieldInputWrapper>
                            </StyledTextfieldWrapper>
                        </StyledCalendarInputHolder>
                        <StyledDivider />
                        <StyledCalendarInputHolder isFocus={isFocusRight} id="endclick-handle" onClick={handleRightInputClick}>
                            <StyledTextfieldWrapper>
                                <StyledTextfieldInputWrapper>
                                    <StyledTextfieldInputContent>
                                        <StyledInputLabel tabIndex={-1}>{endDateLabel}</StyledInputLabel>
                                        <StyledTextfieldInputContentWrapper>
                                            <StyledInputDisplayValue>
                                                <StyledInputText tabIndex={-1}>{formattedEndDate}</StyledInputText>
                                                <StyledInputDay>
                                                    {endDay ? `(${endDay})`: null}
                                                </StyledInputDay>
                                                <StyledInputTextMask tabIndex={-1}></StyledInputTextMask>
                                            </StyledInputDisplayValue>
                                            <StyledInputStyledInputMask tabIndex={0} placeholder="dd/mm/yyyy" aria-label="End" value={formattedEndDate} onChange={handleChangeEndDate}/>
                                        </StyledTextfieldInputContentWrapper>
                                    </StyledTextfieldInputContent>
                                </StyledTextfieldInputWrapper>
                            </StyledTextfieldWrapper>
                        </StyledCalendarInputHolder>
                    </StyledCalendarInputContainer>
                </StyledCalendarHeader>
            </StyledCalendarContainer>
            {
                isCalendarOpen &&
                <div ref={calendarRef}>
                    <MultiPagedCalendarWidget 
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        isFocusLeft={isFocusLeft}
                        setIsFocusLeft={setIsFocusLeft}
                        isFocusRight={isFocusRight}
                        setIsFocusRight={setIsFocusRight}
                        numberOfMonths={numberOfMonths}
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                </div>
            }
        </div>
    )
}

export default DateRangePicker