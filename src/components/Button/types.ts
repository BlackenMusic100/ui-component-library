export type ButtonProps = {
    text?: string,
    isLoading?: boolean,
    button: React.ButtonHTMLAttributes<HTMLButtonElement> | undefined,
    variant?: 'primary' | 'secondary' | 'error',
    size?: 'sm' | 'md' | 'lg',
}