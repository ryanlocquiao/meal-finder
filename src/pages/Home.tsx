import { useState, useEffect, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import type { MealApiResponse } from '../types';
import './Home.css';

export default function Home() {
    // Grab search params from URL
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('search') || '';

    // Set initial state to remember search
    const [searchInput, setSearchInput] = useState(query);
    const [fetchUrl, setFetchUrl] = useState('');

    useEffect(() => {
        if (query) {
            const baseUrl = import.meta.env.VITE_API_BASE_URL;
            setFetchUrl(`${baseUrl}/search.php?s=${searchInput}`);
        } else {
            setFetchUrl('');
        }
    }, [query]);

    const { data, loading, error } = useFetch<MealApiResponse>(fetchUrl);

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchInput.trim() !== '') {
            // Update the URL to /?search=your_search
            setSearchParams({ search: searchInput.trim() });
        } else {
            setSearchParams({});
        }
    };

    return (
        <div className="container">
            <div className="logo-container">
                <span className="logo-icon">🍹</span>
                <h1 className="logo-text">Meal Finder</h1>
            </div>

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
                        <div className="img-wrapper">
                            <img src={meal.strMealThumb} alt={meal.strMeal}/>
                        </div>
                        <h3>{meal.strMeal}</h3>
                        <p>{meal.strCategory} | {meal.strArea}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}