import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import { DateRangePickerProps } from "./types"
import CalendarIcon from '../../assets/icons/calendar-icon.svg'
import { StyledCalendarContainer, StyledCalendarHeader, StyledCalendarIcon, StyledCalendarInputContainer, 
        StyledCalendarInputHolder, StyledCalendarWidgetContainer, StyledDivider, StyledInputDay, StyledInputDisplayValue, StyledInputLabel, 
        StyledInputStyledInputMask, StyledInputText, StyledInputTextMask, StyledTextfieldIconCalendarWrapper, 
        StyledTextfieldInputContent, StyledTextfieldInputContentWrapper, StyledTextfieldInputWrapper, StyledTextfieldWrapper } from "./styled-component"
import MultiPagedCalendarWidget from "../../widgets/MultiPagedCalendarWidget"

const DateRangePicker: React.FC<DateRangePickerProps> = ({ fromDate, toDate, onFromDateChange, onToDateChange, startDateLabel, endDateLabel, numberOfMonths, minDate, maxDate, disabled = false }) => {
    const [startDay, setStartDay] = useState('');
    const [endDay, setEndDay] = useState('');
    const [startDate, setStartDate] = useState<Date | null>(fromDate);
    const [endDate, setEndDate] = useState<Date | null>(toDate);
    const [formattedStartDate, setFormattedStartDate] = useState('');
    const [formattedEndDate, setFormattedEndDate] = useState('');
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isFocusLeft, setIsFocusLeft] = useState(false);
    const [isFocusRight, setIsFocusRight] = useState(false);
    const [calendarContainerRightEdge, setCalendarContainerRightEdge] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    const formatDate = (date: Date | null) => {
        if (!date) return "";
        const targetDate = new Date(date);
        const dateYear = targetDate.getFullYear();
        const dateMonth = targetDate.getMonth() + 1;
        const dateDay = targetDate.getDate();

        const formattedMonth = dateMonth < 10 ? `0${dateMonth}` : dateMonth; 
        const formattedDay = dateDay < 10 ? `0${dateDay}` : dateDay; 

        return `${formattedDay}/${formattedMonth}/${dateYear}`;
    };

    const initialValues = () => {
        const formattedFromDate = formatDate(fromDate);
        const formattedToDate = formatDate(toDate);

        setStartDay(getDayOfWeek(formattedFromDate));
        setEndDay(getDayOfWeek(formattedToDate));
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

    const handleChangeDate = (event: ChangeEvent<HTMLInputElement>, type: 'start' | 'end') => {
        const input = event.target;
        const cursorPosition = input.selectionStart;
        let inputValue = event.target.value;
        const previousValue = type === 'start' ? formattedStartDate : formattedEndDate;

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

        if (type === 'start') {
            setFormattedStartDate(inputValue);
            setStartDay(getDayOfWeek(inputValue));
            if (inputValue.length < 10) {
                onFromDateChange(inputValue);
            }
        } else {
            setFormattedEndDate(inputValue);
            setEndDay(getDayOfWeek(inputValue));
            if (inputValue.length < 10) {
                onToDateChange(inputValue);
            }
        }

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
            type === 'start' ? setStartDate(inputDate) : setEndDate(inputDate);
        }
    }

    const handleClickOutsideContainer = useCallback((event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node) && 
            calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
            setIsCalendarOpen(false);
            
            if (startDate && endDate) {
                if (startDate > endDate && isFocusLeft) {
                    setStartDate(endDate);
                } else if (endDate < startDate && isFocusRight) {
                    setEndDate(startDate);
                }
            }

            if (startDate && minDate && startDate < minDate) {
                setStartDate(minDate);
            } else if (endDate && maxDate && endDate > maxDate) {
                setEndDate(maxDate);
            }

            if (!formattedStartDate) setStartDate(null);
            if (!formattedEndDate) setEndDate(null);
        }
    }, [startDate, endDate, formattedStartDate, formattedEndDate])

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
        if (isCalendarOpen === false) { // Remove focus when calendar is closed
            setIsFocusLeft(false);
            setIsFocusRight(false);
        }
    }, [isCalendarOpen])

    useEffect(() => {
        if (startDate) {
            const formattedStart = formatDate(startDate);
            setFormattedStartDate(formattedStart);
            setStartDay(getDayOfWeek(formattedStart));
        } else {
            setFormattedStartDate('');
            setStartDay('');
        }

        if (endDate) {
            const formattedEnd = formatDate(endDate);
            setFormattedEndDate(formattedEnd);
            setEndDay(getDayOfWeek(formattedEnd));
        } else {
            setFormattedEndDate('');
            setEndDay('');
        }
    }, [startDate, endDate])

    useEffect(() => {
        if (formattedStartDate.length === 10) { // To avoid calling twice onFromDateChange with handleChangeDate()
            onFromDateChange(formattedStartDate);
        }
    }, [formattedStartDate])

    useEffect(() => {
        if (formattedEndDate.length === 10) { // To avoid calling twice onToDateChange with handleChangeDate()
            onToDateChange(formattedEndDate);
        }
    }, [formattedEndDate])

    window.addEventListener('resize', () => { // Adjust CalendarWidget to end on right edge of DateRangePicker when it will trigger overflow
        if(isCalendarOpen) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => { // Double RequestAnimationFrame method
                    const containerRightEdge = calendarRef.current?.getBoundingClientRect().right || 0;
                    if (containerRightEdge > window.innerWidth ) {
                        setCalendarContainerRightEdge(true);
                    } else {
                        setCalendarContainerRightEdge(false);
                    }
                })
            })
        }
    })

    return (
        <div style={{position: 'relative'}} id="date_picker_range_calendar">
            <StyledCalendarContainer disabled={disabled} ref={containerRef}>
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
                                            <StyledInputStyledInputMask tabIndex={0} placeholder="dd/mm/yyyy" aria-label="Start" value={formattedStartDate} onChange={(event: ChangeEvent<HTMLInputElement>) => handleChangeDate(event, 'start')}/>
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
                                            <StyledInputStyledInputMask tabIndex={0} placeholder="dd/mm/yyyy" aria-label="End" value={formattedEndDate} onChange={(event: ChangeEvent<HTMLInputElement>) => handleChangeDate(event, 'end')}/>
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
                <StyledCalendarWidgetContainer ref={calendarRef} rightEdge={calendarContainerRightEdge}>
                    <MultiPagedCalendarWidget 
                        startDate={startDate ? new Date(startDate) : null}
                        setStartDate={setStartDate}
                        endDate={endDate ? new Date(endDate) : null}
                        setEndDate={setEndDate}
                        isFocusLeft={isFocusLeft}
                        setIsFocusLeft={setIsFocusLeft}
                        isFocusRight={isFocusRight}
                        setIsFocusRight={setIsFocusRight}
                        numberOfMonths={numberOfMonths}
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                </StyledCalendarWidgetContainer>
            }
        </div>
    )
}

export default DateRangePicker