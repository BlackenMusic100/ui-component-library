import { useEffect, useState } from "react"
import { SearchBoxProps } from "./types"
import Button from "../Button"
import './style.css'
import IconButton from "../IconButton"

const SearchBox: React.FC<SearchBoxProps> = ({ input, button, buttonIcon, buttonText, buttonPosition, isLoading, isButtonLoading, dropdownSelection }) => {
    const [value, setValue] = useState(input?.value || '')
    const options = dropdownSelection

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const hasPartialMatch = options?.some((option) => {
        return option.toString().toLowerCase().includes((value ?? '').toString().toLowerCase())
    })

    useEffect(() => {
        const inputField = document.getElementById('input-field') as HTMLInputElement;
        const popper = document.getElementById('popper');

        const isInputFieldFocus = document.activeElement === inputField

        const showPopper = () => popper?.classList.remove('hidden')
        const hidePopper = () => popper?.classList.add('hidden')

        if (hasPartialMatch && isInputFieldFocus) {
            showPopper();
        } else {
            hidePopper();
        }
    }, [value])

    useEffect(() => {
        const inputField = document.getElementById('input-field') as HTMLInputElement;
        const popper = document.getElementById('popper');
        const optionElements = document.querySelectorAll('.option');

        const showPopper = () => popper?.classList.remove('hidden')
        const hidePopper = () => popper?.classList.add('hidden')

        const filterOptions = () => {
            const query = inputField.value.toLowerCase();
            optionElements.forEach((option) => {
                const optionText = option.textContent?.toLowerCase() || '';
                if (optionText.includes(query)) {
                    option.classList.remove('hidden');
                } else {
                    option.classList.add('hidden');
                }
            });
        };

        const handleDocumentClick = (event: MouseEvent) => {
            if (!inputField.contains(event.target as Node) && !popper?.contains(event.target as Node)) {
                hidePopper();
            }
        };

        const handleOptionClick = (event: Event | any) => {
            const target = event.target as HTMLElement;
            if (target) {
                inputField.value = target.textContent || '';
                hidePopper();
                setValue(target.textContent || '');
            }
        };

        // Attach event listeners
        inputField.addEventListener('focus', showPopper);
        inputField.addEventListener('input', filterOptions);
        document.addEventListener('click', handleDocumentClick);
        optionElements.forEach((option) => option.addEventListener('click', handleOptionClick));

        // Cleanup event listeners
        return () => {
            inputField.removeEventListener('focus', showPopper);
            inputField.removeEventListener('input', filterOptions);
            document.removeEventListener('click', handleDocumentClick);
            optionElements.forEach((option) => option.removeEventListener('click', handleOptionClick));
        };
    }, [])


    return (
        <div style={{ display: "flex", border: "0.5px", borderStyle: "solid", borderRadius: "8px", padding: "10px"}}>
            {(buttonPosition === "Left" && buttonText) && <Button button={button} text={buttonText} isLoading={isButtonLoading} /> }
            {(buttonPosition === "Left" && buttonIcon) && <IconButton button={button} icon={buttonIcon} isLoading={isButtonLoading} /> }
            <div className="searchbox-picker-container">
                {isLoading && 
                    <div className="searchbox-loader-overlay">
                        <div className="searchbox-spinner" />
                    </div>
                }
                <input id="input-field" value={value} onChange={handleChange} autoComplete="false"
                style={{width: "300px", border: "none", outline: 0}}
                {...input}></input> 

                {dropdownSelection?.length > 0 && <div id="popper" className="popper hidden">
                    <div className="option-group">
                        <div className="click-search">Click to search result related to</div>
                    </div>
                    <ul id="popper-options" className="popper-options">
                        {options?.map((option, index) => (
                            <li key={index} className="option">
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>}
            </div>
            {(buttonPosition === "Right" && buttonText) && <Button button={button} text={buttonText} isLoading={isButtonLoading} />}
            {(buttonPosition === "Right" && buttonIcon) && <IconButton button={button} icon={buttonIcon} isLoading={isButtonLoading} />}
        </div>
    )
}

export default SearchBox