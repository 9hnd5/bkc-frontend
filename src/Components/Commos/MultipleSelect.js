import { Fragment, useState } from "react";
import remove from "lodash/remove"
import './MultipleSelect.scss';

export const MultipleSelect = (props) => {
    const { suggestions, onChange, className, name, onSelectedItem, onDeleteItem, isDisabled, onCloseWhenClickOut } = props;
    console.log("isd", isDisabled);
    const [isShowSuggestions, setIsShowSuggestions] = useState(false);
    const [isShowSearch, setIsShowSearch] = useState(false);
    const [items, setItems] = useState([]);
    const [activeIdItems, setActiveIdItems] = useState([]);
    const displayItems = items.map((item, index) => {
        return (
            <div key={index} className="item-container">
                <div className="item">
                    {item.content}
                </div>
                <i onClick={() => handleDeleteItem(item.id)} className="fas fa-times fa-sm ml-1 mt-1"></i>
            </div>
        )
    })
    const displaySuggestions =
        <div className="suggestions-wrapper">
            <div className="multiple-selected">
                {suggestions.map((suggestion, index) => {
                    const isActive = activeIdItems.findIndex(activeIdItem => {
                        return activeIdItem === suggestion.id;
                    }) > -1 ? true : false;
                    return (
                        <div
                            style={{ cursor: "pointer" }}
                            key={index}
                            className={isActive ? "active-item" : ""}
                            onClick={() => handleClickItemSuggestions(suggestion.id, suggestion.content)}
                        >
                            {suggestion.label}
                        </div>
                    )
                })}
            </div>
        </div>
    function handleChangeSearch(e) {
        onChange(e);
        if (suggestions.length !== 0) {
            setIsShowSuggestions(true);
        }
    }
    function handleClickItemSuggestions(suggestionId, suggestionContent) {
        const index = activeIdItems.findIndex(activeIdItem => {
            return activeIdItem === suggestionId
        });
        if (index > -1) return;
        const suggestion = {
            id: suggestionId,
            content: suggestionContent
        }
        onSelectedItem(suggestion)
        setItems([...items, suggestion])
        setActiveIdItems([...activeIdItems, suggestionId]);
    }
    function handleKeyDown(e) {
        if (e.keyCode === 8) {
            const temp = [...items];
            temp.pop();
            setItems(temp);
        }
    }
    function handleClickSearch() {
        if (isDisabled) return;
        setIsShowSearch(true);
        setIsShowSuggestions(true);
    }
    function handleDeleteItem(id) {
        onDeleteItem(id);
        const cloneItems = [...items];
        remove(cloneItems, (item) => {
            return item.id === id;
        });
        setItems(cloneItems);
        const cloneActiveIdItems = [...activeIdItems];
        remove(cloneActiveIdItems, (activeIdItem) => {
            return activeIdItem === id;
        });
        setActiveIdItems(cloneActiveIdItems);
    }
    function handleExit() {
        setIsShowSuggestions(false);
        setIsShowSearch(false);
    }
    function handleBlur(e) {
        console.log("e", e);
        if (e.target.tagName === "INPUT") return;
        setIsShowSuggestions(false);
        setIsShowSearch(false);
    }
    return (
        <div
            // tabIndex="0"
            // onBlur={handleBlur}
            //multiple-selected-and-search-bar
            className="wraper-all"
        >
            <div
                className={isDisabled ? "form-control multiple-items-container disabled" : "form-control multiple-items-container"}
                onKeyDown={handleKeyDown}
                onClick={handleClickSearch}
            >
                {displayItems}

            </div>

            {
                isShowSearch ?

                    <div className="search-bar-and-suggestions">
                        <div className="search-bar">
                            <div className="input-group search-and-icon">
                                <div className="input-group-prepend">
                                    <i className="fas fa-search input-group-text icon-search"></i>
                                </div>
                                <input placeholder="Search name" name={name} onChange={handleChangeSearch} className="form-control form-control-sm" />
                            </div>
                        </div>
                        <hr></hr>
                        <i onClick={handleExit} className="fas fa-times-circle fa-lg icon-exit"></i>
                        {displaySuggestions}
                    </div> : ""
            }


        </div>
    )
}