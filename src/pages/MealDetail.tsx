import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import type { MealApiResponse } from '../types';
import './MealDetail.css';

export default function MealDetail() {
    const { id } = useParams<{ id: string }>();
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const { data, loading, error } = useFetch<MealApiResponse>(`${baseUrl}/lookup.php?i=${id}`);

    if (loading) return <div className="container"><h2>Loading...</h2></div>;
    if (error) return <div className="container"><h2>Error: {error}</h2></div>;
    if (!data || !data.meals) return <div className="container"><h2>Meal not found.</h2></div>;

    const meal = data.meals[0];

    return (
        <div className="container detail-container">
            <Link to="/" className="back-link">← Back to Search</Link>

            <h1>{meal.strMeal}</h1>
            <div className="detail-content">
                <img src={meal.strMealThumb} alt={meal.strMeal} className="detail-img"/>

                <div className="detail-info">
                    <h3>Category: {meal.strCategory}</h3>
                    <h3>Origin: {meal.strArea}</h3>
                    <p className="instructions">{meal.strInstructions}</p>
                </div>
            </div>
        </div>
    );
}