import { ButtonProps } from "./types"
import LoaderIcon from "../../assets/icons/icon-loader"
import StyledButton from "./styled-component"


const Button: React.FC<ButtonProps> = ({ button, text, isLoading, variant = 'primary', size = 'md' }) => {

    return (
            <StyledButton
                {...button}
                variant={variant}
                size={size}
                disabled={isLoading || button?.disabled || false}
            >
                {isLoading ?
                    <LoaderIcon />
                    :
                    <div>
                        {text ? text : <></>}
                    </div>
                }
            </StyledButton>
    )
}

export default Button