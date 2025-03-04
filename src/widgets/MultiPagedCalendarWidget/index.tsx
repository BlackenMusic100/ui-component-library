import { useState, useEffect, useCallback, useRef } from "react";
import { MultiPagedCalendarWidgetProps } from "./types";
import NextPageIcon from '../../assets/icons/icon-next-grey.svg';
import PreviousPageIcon from '../../assets/icons/icon-prev-grey.svg';
import { StyledCalendar, StyledCalendarButton, StyledCalendarContainer, StyledCalendarDay, StyledCalendarDays, StyledCalendarHeader, StyledCalendarsWrapper, StyledCalendarWeekdays, StyledContainer, StyledContainerWrapper, StyledEmptyCalendarDay } from "./styled-component";

const MultiPagedCalendarWidget: React.FC<MultiPagedCalendarWidgetProps> = ({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isFocusLeft,
    setIsFocusLeft,
    isFocusRight,
    setIsFocusRight,
    numberOfMonths = 2,
    minDate,
    maxDate,
}) => {
    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const [visibleMonths, setVisibleMonths] = useState<Date[]>([]);
    const [slidingDirection, setSlidingDirection] = useState<'left' | 'right' | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [containerWidth, setContainerWidth] = useState(0)

    const calendarRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (calendarRef.current[0] && calendarRef.current[0].parentElement) {
            const singlePagedWidth = calendarRef.current[0]?.offsetWidth;
            const doublePagedWidth = singlePagedWidth * 2;
            const parentPaddingRight = parseFloat(window.getComputedStyle(calendarRef.current[0].parentElement).paddingRight);
            const parentPaddingLeft = parseFloat(window.getComputedStyle(calendarRef.current[0].parentElement).paddingLeft);
            const parentGap = parseFloat(window.getComputedStyle(calendarRef.current[0].parentElement).gap);

            setContainerWidth(doublePagedWidth + parentPaddingLeft + parentPaddingRight + parentGap)
        }
    }, [visibleMonths.length]);

    // Initialize visible months
    useEffect(() => {
        const months = Array.from({ length: numberOfMonths }, (_, index) => {
            const date = startDate ? new Date(startDate.toString()) : new Date();
            date.setMonth(date.getMonth() + index);
            return date;
        });

        setVisibleMonths(months);
    }, [numberOfMonths]);

    const handleMonthTransition = useCallback((direction: 'left' | 'right') => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        setSlidingDirection(direction);

        // Wait for animation to start
        requestAnimationFrame(() => {
            // Update months after a brief delay
            setTimeout(() => {
                setVisibleMonths(prev => prev.map(date => {
                    const newDate = new Date(date);
                    newDate.setMonth(date.getMonth() + (direction === 'right' ? -1 : 1));
                    return newDate;
                }));

                setSlidingDirection(null);
                setIsTransitioning(false);
            }, 300);
        });
    }, [isTransitioning]);

    const generateMonthData = (currentDate: Date) => {
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const daysInMonth = lastDay.getDate();
        const emptyCells = Array(firstDay.getDay()).fill(null);
        const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

        return { emptyCells, daysArray };
    };

    const handlePrevMonth = () => {
        handleMonthTransition('right');
    };

    const handleNextMonth = () => {
        handleMonthTransition('left');
    };

    const handleDayClick = (day: number, month: number, year: number) => {
        const selectedDate = new Date(year, month, day);

        if (minDate && selectedDate < minDate) return;
        if (maxDate && selectedDate > maxDate) return;

        if (!startDate && isFocusLeft) {
            setStartDate(selectedDate);
            setEndDate(null);
            setFocusEndDate();
        } else if (startDate && isFocusLeft) {
            if (selectedDate > endDate!) {
                setEndDate(null);
            }
            setStartDate(selectedDate);
            setFocusEndDate();
        } else if (!endDate && isFocusRight || (startDate && endDate && isFocusRight)) {
            if (selectedDate < startDate!) {
                setStartDate(selectedDate);
                setEndDate(null);
                setFocusEndDate();
            } else {
                setEndDate(selectedDate);
                setFocusStartDate();
            }
        } else {
            setStartDate(selectedDate);
            setEndDate(null);
            setFocusEndDate();
        }
    };

    const setFocusStartDate = () => {
        setIsFocusLeft(true);
        setIsFocusRight(false);
    };

    const setFocusEndDate = () => {
        setIsFocusLeft(false);
        setIsFocusRight(true);
    };

    const isDateInRange = (day: number, month: number, year: number) => {
        if (!startDate || !endDate) return false;
        const currentDay = new Date(year, month, day);
        return currentDay >= startDate && currentDay <= endDate;
    };

    const computeIsStartDate = (day: number, month: number, year: number) => {
        return startDate?.getDate() === day &&
            startDate?.getMonth() === month &&
            startDate?.getFullYear() === year;
    };

    const computeIsEndDate = (day: number, month: number, year: number) => {
        return endDate?.getDate() === day &&
            endDate?.getMonth() === month &&
            endDate?.getFullYear() === year;
    };

    const getPrevMonthSameDate = (date: Date) => {
        const nextMonthDate = new Date(date);
        const currentDay = date.getDate();

        nextMonthDate.setMonth(date.getMonth() - 1);

        if (nextMonthDate.getDate() < currentDay) {
            nextMonthDate.setDate(0);
        }

        return nextMonthDate;
    }

    const getNextMonthSameDate = (date: Date) => {
        const nextMonthDate = new Date(date);
        const currentDay = date.getDate();

        nextMonthDate.setMonth(date.getMonth() + 1);

        if (nextMonthDate.getDate() < currentDay) {
            nextMonthDate.setDate(0);
        }

        return nextMonthDate;
    }

    const getDayClasses = (day: number, month: number, year: number) => {
        const isInRange = isDateInRange(day, month, year);
        const isStartDate = computeIsStartDate(day, month, year);
        const isEndDate = computeIsEndDate(day, month, year);
        const isDisabled = minDate && new Date(year, month, day) < minDate || maxDate && new Date(year, month, day) > maxDate
        
        return {
            inRange: isInRange,
            startDate: isStartDate,
            endDate: isEndDate,
            disabled: isDisabled
        }
    }

    const TargetMonth = (month: Date, type: string) => {
        // If not doing transition, hide prev and next month
        if (type === 'prev' && slidingDirection !== 'right') return null;
        if (type === 'next' && slidingDirection !== 'left') return null;

        const isInitial = type === 'current';
        const targetMonth = type === 'prev' ? getPrevMonthSameDate(month) :
                            type === 'next' ? getNextMonthSameDate(month) :
                            month;
        return (
            <StyledCalendarDays 
                key={type}
                isTransitioning={isTransitioning}
                slidingDirection={slidingDirection}
                initial={isInitial}
            >
                {generateMonthData(targetMonth).emptyCells.map((_, i) => (
                    <StyledEmptyCalendarDay key={`empty-${i}`}/>
                ))}
                {generateMonthData(targetMonth).daysArray.map((day: number) => (
                    <StyledCalendarDay
                        key={`${targetMonth.getFullYear()}/${targetMonth.getMonth()}/${day}`}
                        onClick={() => handleDayClick(day, targetMonth.getMonth(), targetMonth.getFullYear())}
                        {...getDayClasses(day, targetMonth.getMonth(), targetMonth.getFullYear())}
                    >
                        {day}
                    </StyledCalendarDay>
                ))}
            </StyledCalendarDays>
        )
    }

    return (
        <StyledCalendarContainer containerWidth={containerWidth}>

            <StyledCalendarsWrapper>

                {visibleMonths && visibleMonths?.map((month, index) => (
                    <StyledCalendar ref={(el) => (calendarRef.current[index] = el)} key={`${month.getFullYear()}-${month.getMonth()}_${index}`}>
                        <StyledCalendarHeader>
                            <div>
                                {month === visibleMonths[0] &&
                                    <StyledCalendarButton
                                        onClick={handlePrevMonth}
                                        disabled={minDate && visibleMonths[0]! <= minDate}
                                    >
                                        <img src={PreviousPageIcon} alt="Previous" />
                                    </StyledCalendarButton>}
                            </div>
                            <h3>
                                {month.toLocaleString('default', { month: 'long' })} {month.getFullYear()}
                            </h3>
                            <div>
                                {month === visibleMonths[visibleMonths.length - 1] &&
                                    <StyledCalendarButton
                                        onClick={handleNextMonth}
                                        disabled={maxDate && visibleMonths[visibleMonths.length - 1]! >= maxDate}
                                    >
                                        <img src={NextPageIcon} alt="Next" />
                                    </StyledCalendarButton>}
                            </div>
                        </StyledCalendarHeader>

                        <StyledCalendarWeekdays>
                            {weekDays.map((weekday, idx) => (
                                <div key={`${weekday}-${idx}`}>
                                    {weekday}
                                </div>
                            ))}
                        </StyledCalendarWeekdays>

                        <StyledContainerWrapper>
                            <StyledContainer>
                            {
                                ['current', 'prev', 'next'].map((type) => {
                                    return TargetMonth(month, type)
                                })
                            }
                            </StyledContainer>
                        </StyledContainerWrapper>
                    </StyledCalendar>
                ))}

            </StyledCalendarsWrapper>
        </StyledCalendarContainer>
    );
};

export default MultiPagedCalendarWidget;