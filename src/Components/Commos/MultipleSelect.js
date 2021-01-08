import { Fragment } from "react";
import { useState } from "react";
import './MultipleSelect.scss';

export const MultipleSelect = (props) => {
    const { suggestions, onChange, className, name, onSelectedItem } = props;
    const [isShowSuggestions, setIsShowSuggestions] = useState(true);
    const [value, setValue] = useState("");
    const displaySuggestions =
        <div className="multiple-select-wrapper">
            <div className="list-group multiple-select">
                {suggestions.map((suggestion, index) => {
                    return (
                        <button type="button"
                            key={index}
                            className="list-group-item list-group-item-action"
                            onClick={() => handleClickItem(suggestion.value)}
                        >
                            {suggestion.label}
                        </button>
                    )
                })}
            </div>
        </div>
    function handleChange(e) {
        console.log("e", e);
        // setValue(e.target.value);
        // onChange(e);
        // if(suggestions.length !== 0){
        //     setIsShowSuggestions(true);
        // }
    }
    function handleClickItem(suggestion){
        onSelectedItem(suggestion)
        setValue(suggestion);
        setIsShowSuggestions(false);
    }
    return (
        <Fragment>
            <input value={value} className={className} onChange={handleChange} name={name} />
            <div onChange={handleChange} contentEditable={true} className="form-control input-multiple-selected">

            </div>
            {isShowSuggestions ? displaySuggestions : ""}
        </Fragment>
    )
}