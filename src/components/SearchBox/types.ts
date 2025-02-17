import React from "react"

export type SearchBoxProps = {
    theme: string,
    dropdownSelection: string[],
    input: React.InputHTMLAttributes<HTMLInputElement>,
    button: React.ButtonHTMLAttributes<HTMLButtonElement>,
    hasButtonContent: boolean, 
    buttonIcon: string, 
    buttonText: string,
    buttonPosition: 'Left' | 'Right' | null,
    isLoading: boolean,
    isButtonLoading: boolean,
} 