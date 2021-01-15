import React from 'react';

const Search = (props) => {
    const divStyles = {
        position: 'absolute',
        top: '110px',
        right: '30px',
    }
    const inputStyles = {
        height: '7vh',
        fontSize : '18px',
        borderRadius: '2px',
        padding: 10,
        border: 'none',
        outline: 'none',
        backgroundColor: '#eee'
    }
    return ( 
        <div className="search" style={divStyles}>
            <input style={inputStyles} type="search" placeholder="Search by admin name"
                value={props.search}
                onChange={e => {
                    console.log(e.target.value);
                    props.setSearch(e.target.value);
                    props.setDataChange(!props.dataChange);
                }}
            />
        </div>
     );
}
 
export default Search;