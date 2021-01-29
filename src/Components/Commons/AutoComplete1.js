import { Fragment, useEffect, useState } from "react";
import "./AutoComplete1.scss"
export const AutoComplete1 = (props) => {
    const { suggestions, onChange, onClick, defaultValue, className, name } = props;
    const [value, setValue] = useState(props.initialValue);
    console.log("value", value);
    const [isShowSuggestions, setIsShowSuggestions] = useState(false);
    let suggestionsList = null;
    if (isShowSuggestions&&suggestions.length !== 0) {
        suggestionsList = <div
            className="list-group suggestions">
            {
                suggestions.map((suggestion, index) => {
                    return <button
                        className="list-group-item list-group-item-action"
                        onClick={() => handleClick(suggestion)}
                        key={index}
                    >
                        {suggestion.content}
                    </button>
                })
            }
        </div>
    }
    function handleChange(e) {
        onChange(e);
        setValue(e.target.value);
        if (e.target.value.length >= 3) {
            setIsShowSuggestions(true);
        } else setIsShowSuggestions(false);
    }
    function handleClick(suggestion) {
        setValue(suggestion.content);
        setIsShowSuggestions(false);
        onClick(suggestion);
    }
    function handleBlur() {
        setIsShowSuggestions(false);
    }
    function handleClickInput() {
        setIsShowSuggestions(true);
    }
    // useEffect(() => {
    //     setValue(props.initialValue)
    // }, [props]);
    return (
        <Fragment>
            {
                <input
                    onChange={handleChange}
                    onClick={handleClickInput}
                    value={value}
                    className={className}
                    name={name}
                    autoComplete="off"
                    // onBlur={handleBlur}
                />
            }
            <div style={{ position: "relative" }}>
                {suggestionsList}
            </div>
        </Fragment>
    );
}