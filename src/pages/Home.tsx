import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import type { MealApiResponse } from '../types';
import './Home.css';

export default function Home() {
    const [searchInput, setSearchInput] = useState('');
    const [fetchUrl, setFetchUrl] = useState('');
    const { data, loading, error } = useFetch<MealApiResponse>(fetchUrl);

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchInput.trim() !== '') {
            const baseUrl = import.meta.env.VITE_API_BASE_URL;
            setFetchUrl(`${baseUrl}/search.php?s=${searchInput}`);
        }
    };

    return (
        <div className="container">
            <h1>Meal Finder</h1>

            <form onSubmit={handleSearch} className="search-form">
                <input type="text" placeholder="Search for a meal (e.g., chicken, pasta)..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
                <button type="submit">Search</button>
            </form>

            {/* Loading & Error States */}
            {loading && <p>Loading meals...</p>}
            {error && <p className="error">Error: {error}</p>}
            {data && data.meals === null && <p>No meals found. Try another search!</p>}

            <div className="meal-grid">
                {data?.meals?.map((meal) => (
                    <Link to={`/meal/${meal.idMeal}`} key={meal.idMeal} className="meal-card">
                        <img src={meal.strMealThumb} alt={meal.strMeal}/>
                        <h3>{meal.strMeal}</h3>
                        <p>{meal.strCategory} | {meal.strArea}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}