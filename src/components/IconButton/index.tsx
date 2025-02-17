import { IconButtonProps } from "./types"
import loader from "../../assets/icons/icon-loader.svg"
import './style.css'

const IconButton: React.FC<IconButtonProps> = ({ button, icon, isLoading }) => {
    return (
        <div className="relative-button">
            <button onClick={button.onClick} {...button}>
                {isLoading ? 
                    <img src={loader}/>
                    :
                    <div>
                        <img src={icon} />
                    </div>
                }
            </button>
        </div>
    )
}

export default IconButton