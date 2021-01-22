import { Fragment, useEffect, useState } from "react";
import "./AutoComplete1.scss"
export const AutoComplete1 = (props) => {
    const { suggestions, onChange, onClick, inputCustom, defaultValue } = props;
    const [value, setValue] = useState(defaultValue);
    const [isShowSuggestions, setIsShowSuggestions] = useState(false);
    let suggestionsList = null;
    if (isShowSuggestions && value.length >= 3 && suggestions.length !== 0) {
        suggestionsList = <div
            className="list-group suggestions">
            {
                suggestions.map((suggestion, index) => {
                    return <button
                        className="list-group-item list-group-item-action"
                        onClick={() => handleClick(suggestion.email)}
                        key={index}
                    >
                        {suggestion.email}
                    </button>
                })
            }
        </div>
    }
    function handleChange(e) {
        setValue(e.target.value);
        onChange(e.target.value);
        if (e.target.value.length >= 3) {
            setIsShowSuggestions(true);
        } else setIsShowSuggestions(false);
    }
    function handleClick(email) {
        console.log(email);
        setValue(email);
        setIsShowSuggestions(false);
        onClick(email);
    }
    function handleBlur() {
        setIsShowSuggestions(false);
    }
    function handleClickInput(){
        setIsShowSuggestions(true);
    }
    useEffect(() => {
        setValue(props.defaultValue)
    }, [props]);
    return (
        <Fragment>
            {
                inputCustom ? inputCustom(handleChange, handleBlur, handleClickInput, value) :
                    <input
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        onClick={handleClickInput}
                        value={value}
                    />
            }
            <div style={{ position: "relative" }}>
                {suggestionsList}
            </div>
        </Fragment>
    );
}