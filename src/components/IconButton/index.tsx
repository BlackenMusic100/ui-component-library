import { IconButtonProps } from "./types"
import LoaderIcon from "../../assets/icons/icon-loader"
import './style.css'
import React from "react"

const IconButton: React.FC<IconButtonProps> = ({ button, icon, isLoading }) => {
    return (
        <div className="relative-button">
            <button onClick={button.onClick} {...button}>
                {isLoading ? 
                    <LoaderIcon />
                    :
                    <div>
                        {React.isValidElement(icon) ? icon : null}
                    </div>
                }
            </button>
        </div>
    )
}

export default IconButton