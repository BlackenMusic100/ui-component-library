import styled, { css } from "styled-components"


export const StyledCalendarContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => !['containerWidth'].includes(prop)
})<{
    containerWidth: number;
}>`
    ${({ theme, containerWidth }) => `
    // Base styles
    display: flex;
    align-items: center;
    gap: ${theme?.sizing?.spacing?.custom(1.6) || "1rem"};
    max-width: ${`${containerWidth + (theme?.sizing?.spacing?.custom(0.1) || 1)}px` || "785px"};
    border: ${theme?.sizing?.spacing?.custom(0.1) || "1px"} solid #ccc;
    position: relative;
    overflow: auto;
    `};
`;

export const StyledCalendarsWrapper = styled.div<{}>`
    ${({ theme }) => `
    // Base styles
    display: flex;
    gap: ${theme?.sizing?.spacing?.custom(1.6) || "1rem"};
    position: relative;
    padding: ${theme?.sxConfig?.padding(4) || "1rem"};
    width: fit-content;
    `};
`;

export const StyledCalendarHeader = styled.div<{}>`
    ${({}) => `
    // Base styles
    display: flex;
    justify-content: space-between;
    align-items: center;
    `};
`;

export const StyledCalendar = styled.div<{}>`
    ${({ theme }) => `
    // Base styles
    padding: ${theme?.sxConfig?.padding(4) || "16px"};
    flex: 1;
    min-width: ${theme?.sizing?.spacing?.custom(28) || "280px"};
    flex-shrink: 0;
    overflow: hidden;
    width: fit-content;
    `};
`;

export const StyledCalendarWeekdays = styled.div<{}>`
    ${({ theme }) => `
    // Base styles
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    padding: ${theme?.sxConfig?.padding(4) || "16px"} 0;
    border-radius: ${theme?.sizing?.borderRadius?.sm || "4px"};
    font-weight: bold;
    justify-items: center;
    `};
`;

export const StyledContainerWrapper = styled.div<{}>`
    ${({ theme }) => `
    // Base styles
    width: ${theme?.sizing?.spacing?.custom(33.6) || "336px"};
    display: flex;
    position: relative;
    overflow: hidden;
    min-height: ${theme?.sizing?.spacing?.custom(31) || "310px"};
    `};
`;

export const StyledContainer = styled.div<{}>`
    ${({ theme }) => `
    // Base styles
    width: ${theme?.sizing?.spacing?.custom(33.6) || "336px"};
    display: flex;
    position: relative;
    overflow: hidden;
    height: fit-content;
    min-height: ${theme?.sizing?.spacing?.custom(20) || "200px"};
    `};
`;

export const StyledCalendarDays = styled.div.withConfig({
    shouldForwardProp: (prop) => !['isTransitioning', 'slidingDirection', 'initial'].includes(prop)
})<{
    isTransitioning?: boolean;
    slidingDirection?: 'right' | 'left' | null;
    initial?: boolean;
}>`
    ${({}) => `
    // Base styles
    display: grid;
    grid-template-columns: repeat(7, 48px);
    grid-template-rows: repeat(6, 1fr);
    gap: 0px;
    opacity: 1;
    `};

    ${({ isTransitioning, slidingDirection, initial }) => isTransitioning && slidingDirection && initial && css`
        ${StyledSlideExit.componentStyle.rules}
        ${slidingDirection === 'right' ? 
            StyledSlideExitActiveLeftRight.componentStyle.rules :
            StyledSlideExitActiveLeftLeft.componentStyle.rules
        }
    `};

    ${({ isTransitioning, slidingDirection, initial }) => isTransitioning && slidingDirection === 'right' && !initial && css`
        ${StyledSlideEnterRight.componentStyle.rules}
        ${StyledSlideEnterActiveRight.componentStyle.rules}
    `};

    ${({ isTransitioning, slidingDirection, initial }) => isTransitioning && slidingDirection === 'left' && !initial && css`
        ${StyledSlideEnterLeft.componentStyle.rules}
        ${StyledSlideEnterActive.componentStyle.rules}
    `};
`;

export const StyledSlideEnterLeft = styled.div<{}>`
    ${({ theme }) => `
    // Base styles
    transform: translate(100%);
    transition: transform ${theme?.animation?.duration.normal || "150ms"} cubic-bezier(0.35, 0.8, 0.4, 1);
    will-change: 'transform';
    `};
`;

export const StyledSlideEnterRight = styled.div<{}>`
    ${({ theme }) => `
    // Base styles
    position: absolute;
    left: -100%;
    transform: translate(-100%);
    transition: transform ${theme?.animation?.duration.normal || "150ms"} cubic-bezier(0.35, 0.8, 0.4, 1);
    will-change: 'transform';
    `};
`;

export const StyledSlideEnterActiveRight = styled.div<{}>`
    ${({ theme }) => `
    // Base styles
    transform: translate(100%);
    transition: transform ${theme?.animation?.duration.normal || "150ms"} cubic-bezier(0.35, 0.8, 0.4, 1);
    `};
`;

export const StyledSlideEnterActive = styled.div<{}>`
    ${({ theme }) => `
    // Base styles
    transform: translate(-100%);
    transition: transform ${theme?.animation?.duration.normal || "150ms"} cubic-bezier(0.35, 0.8, 0.4, 1);
    `};
`;

export const StyledSlideExit = styled.div<{}>`
    ${({}) => `
    // Base styles
    transform: translate(0%);
    `};
`;

export const StyledSlideExitActiveLeftLeft = styled.div<{}>`
    ${({ theme }) => `
    // Base styles
    transform: translate(-100%);
    transition: transform ${theme?.animation?.duration.normal || "150ms"} cubic-bezier(0.35, 0.8, 0.4, 1);
    `};
`;

export const StyledSlideExitActiveLeftRight = styled.div<{}>`
    ${({ theme }) => `
    // Base styles
    transform: translate(100%);
    transition: transform ${theme?.animation?.duration.normal || "150ms"} cubic-bezier(0.35, 0.8, 0.4, 1);
    `};
`;

export const StyledCalendarDay = styled.div.withConfig({
    shouldForwardProp: (prop) => !['inRange', 'startDate', 'endDate', 'disabled'].includes(prop),
})<{
    inRange?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    disabled?: boolean;
}>`
    ${({ theme }) => `
    // Base styles
    padding: ${theme?.sxConfig?.padding(4) || "16px"};
    text-align: center;
    border-radius: ${theme?.sizing?.spacing?.custom(0.4) || "4px"};
    cursor: pointer;

    &:hover {
        background-color: #007bff;
        color: white;
    }
    `};

    ${({ inRange }) => inRange && `
        background-color: #cce5ff;
        border-radius: 0% !important;
    `}

    ${({ startDate }) => startDate && `
        background-color: #007bff;
        color: white;
        font-weight: bold;
        border-top-left-radius: 4px !important;
        border-bottom-left-radius: 4px !important;
    `}

    ${({ endDate }) => endDate && `
        background-color: #007bff;
        color: white;
        font-weight: bold;
        border-top-right-radius: 4px !important;
        border-bottom-right-radius: 4px !important;
    `}

    ${({ disabled }) => disabled && `
        cursor: not-allowed;
        pointer-events: auto;
        color: rgb(180, 180, 180);

        &:hover {
            background-color: inherit;
            color: rgb(180, 180, 180);
            box-shadow: none;
            transition: none;
        }
    `}
`;

export const StyledEmptyCalendarDay = styled.div<{}>`
    ${({}) => `
    // Base styles
    background-color: transparent;
    pointer-events: none;
    `};
`;

export const StyledCalendarButton = styled.button<{}>`
    ${({}) => `
    // Base styles
    opacity: 1;
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: relative;
    `};
`;

