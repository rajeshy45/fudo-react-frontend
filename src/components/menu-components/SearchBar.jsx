import React from 'react';

function SearchBar(props) {
    return (
        <div style={{textAlign: 'center'}}>
            <input onChange={props.onChange} value={props.search} type="text" placeholder="Search Items" className="search-bar input-number" />
        </div>
    )
}

export default SearchBar;