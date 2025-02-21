import styled, { css } from "styled-components"


export const StyledCalendarContainer = styled.div<{}>`
    ${({ theme }) => `
    // Base styles
    display: inline-block;
    position: relative;
    right: 0px;
    border-radius: ${theme?.sizing?.borderRadius?.xl || "32px"};
    z-index: 2;
    `};
`;

export const StyledCalendarHeader = styled.div<{}>`
    ${({}) => `
    // Base styles
    display: flex;
    flex-direction: row;
    `};
`

export const StyledCalendarInputContainerWrapper = styled.div<{}>`
    ${({}) => `
    // Base styles
    display: flex;
    `};
`

export const StyledCalendarInputContainer = styled.div<{}>`
    ${({ theme }) => `
    // Base styles
    display: inline-flex;
    flex: 1 1 0%;
    flex-direction: row;
    -webkit-box-pack: end;
    justify-content: flex-end;
    margin-bottom: 0px;
    border-radius: ${theme?.sizing?.borderRadius?.sm || "4px"};
    border: 1px solid ${theme?.colors?.primary?.silver|| "rgb(197, 201, 208)"}
    `};
`

export const StyledCalendarInputHolder = styled.div.withConfig({
    shouldForwardProp: (prop) => !['isFocus'].includes(prop),
})<{
    isFocus: boolean
}>`
    ${({ theme, isFocus }) => `
    // Base styles
    display: inline-flex;
    flex: 1 1 0%;
    border: 1px solid transparent
    border-radius: ${theme?.sizing?.borderRadius?.sm || "4px"};
    margin-right: 0px;

    ${isFocus && `
        border: 1px solid ${theme?.colors?.primary?.black || "rgb(0,0,0)"};
    `}
    `};
`

export const StyledTextfieldWrapper = styled.div<{}>`
    ${({}) => `
    // Base styles
    display: flex;
    flex-direction: column;
    width: 100%;
    `};
`

export const StyledTextfieldInputWrapper = styled.div<{}>`
    ${({ theme }) => `
    // Base styles
    display: flex;
    flex-direction: row;
    position: relative;
    box-sizing: content-box;
    border-radius: ${theme?.sizing?.borderRadius?.sm || "4px"};
    border-color: ${theme?.colors?.primary?.silver || "rgb(217, 219, 224)"};
    background-color: ${theme?.colors?.background?.default || "rgb(255, 255, 255)"};
    height: ${theme?.sizing?.height(12) || "48px"};
    -webkit-box-pack: center;
    -webkit-box-align: center;
    justify-content: center;
    align-items: center;
    font-weight: ${theme?.typography?.fontWeight?.regular || 400};
    `};
`

export const StyledTextfieldIconCalendarWrapper = styled.div<{}>`
    ${({ theme }) => `
    // Base styles
    padding-left: ${theme?.sxConfig?.paddingLeft(2) || "8px"};
    `};
`

export const StyledCalendarIcon = styled.div<{}>`
    ${({ theme }) => `
    // Base styles
    display: block;
    outline: none;
    fill: currentcolor;
    color: ${theme?.colors?.text?.primary || "rgb(33, 33, 36)"}
    border-radius: 0px;
    padding: 0px;
    height: 25px;
    width: 25px;
    position: relative;
    top: 0px;
    right: 0px;
    left: 0px;
    user-select: none;
    transition: fill ${theme?.animation?.duration?.faster || "200ms"} ${theme?.animation?.easing?.easeInOut || "cubic-bezier(0.4, 0, 0.2, 1)"} 0ms;
    `}
`

export const StyledTextfieldInputContentWrapper = styled.div<{}>`
    ${({}) => `
    // Base styles
    display: flex;
    height: inherit;
    `};
`

export const StyledTextfieldInputContent = styled.div<{}>`
    ${({}) => `
    // Base styles
    display: flex;
    width: 100%;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    height: inherit;
    `}
`

export const StyledInputDisplayValue = styled.div<{}>`
    ${({ theme }) => `
    // Base styles
    position: absolute;
    top: ${theme?.sizing?.spacing?.custom(2.2) || "22px"};
    user-select: none;
    display: flex;
    padding: 0px ${theme?.sxConfig?.padding(2.5) || "10px"};
    `}
`

export const StyledTextContainer = styled.p<{}>`
    ${({ theme }) => `
    // Base styles
    display: inline-flex;
    font-weight: ${theme?.typography?.fontWeight?.regular || 400};
    font-family: ${theme?.typography?.fontFamily?.secondary || '"DM Sans", Roboto'};
    font-size: ${theme?.typography?.fontSize?.md || "1rem"};
    color: ${theme?.colors?.text?.primary || "rgb(33, 33, 36)"};
    text-decoration: none;
    text-align: initial;
    margin: 0px;
    line-height: 12px;
    opacity: 1;
    width: auto;
    `}
`

export const StyledTextfieldInputLabel = styled.p<{}>`
    ${({ theme }) => `
    // Base styles
    height: ${theme?.sxConfig?.height(2.25) || "9px"};
    color: ${theme?.colors?.text?.secondary || "rgb(117, 118, 122)"};
    line-height: 14px;
    margin-bottom: ${theme?.sxConfig?.marginBottom(2.5) || "10px"};
    outline: none;
    top: ${theme?.sizing?.spacing?.custom(0.6) || "6px"};
    position: absolute;
    padding: 0px ${theme?.sxConfig?.padding(2.5) || "10px"};
    opacity: 0.5;
    `}
`

export const StyledInputLabel = styled.p`
    ${({}) => css`
        ${StyledTextContainer.componentStyle.rules}
        ${StyledTextfieldInputLabel.componentStyle.rules}
    `}
`

export const StyledTextStyle = styled.p<{}>`
    ${({ theme }) => `
    // Base styles
    font-size: ${theme?.typography?.fontSize?.md || "1rem"};
    font-weight: ${theme?.typography?.fontWeight?.regular || 400};
    line-height: 20px;
    color: ${theme?.colors?.text?.primary || "rgb(33, 33, 36)"};
    `}
`

export const StyledInputText = styled.p`
    ${({}) => css`
        ${StyledTextStyle.componentStyle.rules}
        ${StyledTextContainer.componentStyle.rules}
    `}
`

export const StyledInputDay = styled.div<{}>`
    ${({ theme }) => `
    // Base styles
    opacity: 0.5;
    font-size: ${theme?.typography?.fontSize?.xs || "0.75rem"};
    font-family: ${theme?.typography?.fontFamily?.primary || "DM Sans"};
    // margin-top: ${theme?.sxConfig?.marginTop(1) || "4px"};
    margin-left: ${theme?.sxConfig?.marginLeft(1) || "4px"};
    `}
`

export const StyledInputMaskText = styled.p<{}>`
    ${({ theme }) => `
    // Base styles
    opacity: 0.5;
    color: ${theme?.colors?.text?.secondary || "rgb(117, 118, 122)"};
    `}
`

export const StyledInputTextMask = styled.p`
    ${({}) => css`
        ${StyledTextContainer.componentStyle.rules}
        ${StyledInputMaskText.componentStyle.rules}
    `}
`

export const StyledInputStyledInputMask = styled.input<{}>`
    ${({ theme }) => `
    // Base styles
    outline: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border: none;
    border-radius: ${theme?.sizing?.borderRadius?.sm || "4px"};
    font-size: ${theme?.typography?.fontSize?.md || "1rem"};
    line-height: 20px;
    background: transparent;
    color: transparent;
    font-family: ${theme?.typography?.fontFamily?.primary || "DM Sans"};
    caret-color: ${theme?.colors?.text?.primary || "rgb(33, 33, 36)"};
    padding: ${theme?.sxConfig?.padding(2) || "8px"} ${theme?.sxConfig?.padding(2.5) || "10px"} 0px;
    z-index: 1;
    `}
`

export const StyledDivider = styled.div<{}>`
    ${({ theme }) => `
    // Base styles
    width: ${theme?.sizing?.spaing?.custom(0.1) || "1px"};
    height: 100%;
    background-color: ${theme?.colors?.primary?.silver|| "rgb(197, 201, 208)"};
    `}
`

export const StyledCalendarWidgetContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => !['rightEdge'].includes(prop),
})<{
    rightEdge: boolean
}>`
    ${({ rightEdge }) => `
    // Base styles
    position: absolute;
    z-index: 999;
    background-color: white;

    ${rightEdge && `
        right: 0
    `}
    `}
`
