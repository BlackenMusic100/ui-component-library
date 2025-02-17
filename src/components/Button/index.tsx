import { ButtonProps } from "./types"
import loader from "../../assets/icons/icon-loader.svg"
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
                    <img src={loader} />
                    :
                    <div>
                        {text ? text : <></>}
                    </div>
                }
            </StyledButton>
    )
}

export default Button