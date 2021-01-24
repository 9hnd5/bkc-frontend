import { Fragment, useState } from "react";
import remove from "lodash/remove"
import './MultipleSelect.scss';
import { useEffect } from "react";

export const MultipleSelect = (props) => {
    const { onChange, className, name, onSelectedItem, onDeleteItem, isDisabled, icon, isMultipleSelected } = props;
    const [isShowSuggestions, setIsShowSuggestions] = useState(false);
    const [isShowSearch, setIsShowSearch] = useState(false);
    const [items, setItems] = useState([]);
    const [activeIdItems, setActiveIdItems] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
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
                {suggestions.length !== 0 ?
                    suggestions.map((suggestion, index) => {
                        const isActive = activeIdItems.findIndex(activeIdItem => {
                            return activeIdItem === suggestion.id;
                        }) > -1 ? true : false;
                        return (
                            <div
                                style={{ cursor: "pointer" }}
                                key={index}
                                className={isActive ? "active-item" : ""}
                                onClick={() => handleSelectedItem(suggestion.id, suggestion.content)}
                            >
                                {suggestion.label}
                            </div>
                        )
                    }) : <p>Not Found</p>}
            </div>
        </div>
    function handleChangeSearch(e) {
        onChange(e);
        if (suggestions.length !== 0) {
            setIsShowSuggestions(true);
        }
    }
    function handleSelectedItem(suggestionId, suggestionContent) {
        if (isMultipleSelected) {
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
            return;
        }
        const suggestion = {
            id: suggestionId,
            content: suggestionContent
        }
        onSelectedItem(suggestion)
        setItems([suggestion])
        setActiveIdItems([suggestionId]);
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
    function handleDeleteItem(itemId) {
        if (isMultipleSelected) {
            onDeleteItem(itemId);
            const cloneItems = [...items];
            remove(cloneItems, (item) => {
                return item.id === itemId;
            });
            setItems(cloneItems);
            const cloneActiveIdItems = [...activeIdItems];
            remove(cloneActiveIdItems, (activeIdItem) => {
                return activeIdItem === itemId;
            });
            setActiveIdItems(cloneActiveIdItems);
            return;
        }
        onDeleteItem(itemId);
        setItems([]);
        setActiveIdItems([]);
    }
    function handleExit() {
        setIsShowSuggestions(false);
        setIsShowSearch(false);
        setSuggestions([]);
    }
    useEffect(() => {
        setIsShowSuggestions(false);
        setIsShowSearch(false);
    }, [props.isDisabled]);
    useEffect(() => {
        if (props.initialValue !== undefined && props.initialValue.length !== 0) {
            setItems([...props.initialValue]);
            setActiveIdItems(props.initialValue.map(item => {
                return item.id;
            }))
        }
    }, [props.initialValue])
    useEffect(() => {
        setSuggestions(props.suggestions);
    }, [props.suggestions])
    return (
        <div
            className="wraper-all"
        >
            {
                icon ?
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <img className="input-group-text" src={icon} />
                        </div>
                        <div
                            className={isDisabled ? `${className} multiple-items-container disabled` : `${className} multiple-items-container`}
                            // className={isDisabled ? `multiple-items-container disabled` : `multiple-items-container`}
                            onKeyDown={handleKeyDown}
                            onClick={handleClickSearch}
                        >
                            {displayItems}

                        </div>
                    </div> :
                    <div
                        // className={isDisabled ? "form-control multiple-items-container disabled" : "form-control multiple-items-container"}
                        className={isDisabled ? `${className} multiple-items-container disabled` : `${className} multiple-items-container`}
                        // className={isDisabled ? `multiple-items-container disabled` : `multiple-items-container`}
                        onKeyDown={handleKeyDown}
                        onClick={handleClickSearch}
                    >
                        {displayItems}

                    </div>
            }

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