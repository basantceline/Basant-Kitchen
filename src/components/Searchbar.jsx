import React from 'react';
import '../Styles/SearchBar.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Search = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const handleSubmit = event => {
        event.preventDefault();
        navigate(`/search?q=${keyword}`);
        setKeyword('');
    }
    return (
        <div className='searchContainer'>
            <form onSubmit={event => handleSubmit(event)}>
                <input type="text"
                    onChange={event => setKeyword(event.target.value)}
                    value={keyword}
                    className='searchInput'
                    placeholder='Search Recipe'
                    required
                />
            </form>
        </div>
    );
}

export default Search;