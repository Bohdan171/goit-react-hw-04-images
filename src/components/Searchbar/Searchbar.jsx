import { useState } from "react";
import css from './Searchbar.module.css';

export function Searchbar({onSubmit}){
    const [searchName, setSearchName] = useState('');

    const handleNameChange = evt => {
        setSearchName(evt.currentTarget.value.toLowerCase() );
    }

    const handleSubmit = evt => {
        evt.preventDefault();

        if (searchName.trim() === '') {
            alert('Введите корректное имя');
            return;
        }

        onSubmit(searchName);
        setSearchName('');
    }

        return (
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={handleSubmit}>
                    <button type="submit" className={css.SearchFormButton}>
                        <span className={css.SearchFormButtonLabel}>Search</span>
                    </button>

                    <input
                        className={css.SearchFormInput}
                        type="text"
                        autocomplete="off"
                        autofocus
                        placeholder="Search images and photos"
                        value={searchName}
                        onChange={handleNameChange}
                    />
                </form>
            </header>
        );
}
