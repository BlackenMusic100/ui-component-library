import styled from "styled-components"


const StyledButton = styled.button<{ variant?: string; size?: string }>`
  ${({ theme, variant = 'primary', size = 'md' }) => `
    // Base styles
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: solid 2px;
    border-radius: ${theme?.sizing?.borderRadius?.md || "5px"};
    font-family: ${theme?.typography?.fontFamily?.primary || "'Inter', sans-serif"};
    font-weight: ${theme?.typography?.fontWeight?.medium || 500};
    cursor: pointer;
    transition: all ${theme?.animation?.duration?.fast || '150ms'} ${theme?.animation?.easing?.easeInOut || 'cubic-bezier(0.4, 0, 0.2, 1)'};

    // Size variations
    ${size === 'sm' && `
      padding: ${theme?.sizing?.spacing?.xs || '0.25rem'} ${theme?.sizing?.spacing?.sm || '0.5rem'};
      font-size: ${theme?.typography?.fontSize?.sm || '0.5rem'};
    `}

    ${size === 'md' && `
      padding: ${theme?.sizing?.spacing?.sm || '0.5rem'} ${theme?.sizing?.spacing?.md || '1rem'};
      font-size: ${theme?.typography?.fontSize?.md || '1rem'};
    `}

    ${size === 'lg' && `
      padding: ${theme?.sizing?.spacing?.md || '1rem'} ${theme?.sizing?.spacing?.lg || '1.5rem'};
      font-size: ${theme?.typography?.fontSize?.lg || '1.5rem'};
    `}

    // Variant styles
    ${variant === 'primary' && `
      background-color: ${theme?.colors?.primary?.contrast || '#ffffff'};
      color: ${theme?.colors?.primary?.main || '#2196f3'};

      &:hover {
        background-color: ${theme?.colors?.primary?.dark || '#1769aa'};
      }
    `}

    ${variant === 'secondary' && `
      background-color: ${theme?.colors?.secondary?.main || '#2196f3'};
      color: ${theme?.colors?.secondary?.contrast || '#ffffff'};

      &:hover {
        background-color: ${theme?.colors?.secondary?.dark || '#4615b2'};
      }
    `}

    ${variant === 'error' && `
      background-color: ${theme?.colors?.error?.main || '#f44336'};
      color: ${theme?.colors?.error?.contrast || '#ffffff'};

      &:hover {
        background-color: ${theme?.colors?.error?.dark || '#d32f2f'};
      }
    `}

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `};
`;

export default StyledButton