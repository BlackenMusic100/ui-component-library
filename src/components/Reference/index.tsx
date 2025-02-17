import { ReferenceProps } from "./types"

const Reference: React.FC<ReferenceProps> = ({ ...props }) => {
    return (
        <button onClick={props.function} disabled={props.boolean} style={{ backgroundColor: props.color}}>
            Theme: {props.theme}   <br/>
            String: {props.string} <br/>
            Number: {props.number} <br/>
            Symbol: {props.symbol} <br/>
        </button>
    )
}

export default Reference