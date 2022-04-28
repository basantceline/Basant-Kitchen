import React from 'react';
import { useParams } from 'react-router-dom';
import '../../Styles/Recipe.css'
import { useFireFetch } from '../../firebase/useFireFetch';
const Recipe = () => {
    const { id } = useParams();
    const { data, error, isPending } = useFireFetch(id);
    data && console.log(data);


    return (
        <div className="recipe">
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='loading'>Loading...</p>}
            {data &&
                <div className='recipeContainer'>
                    <p className='recipeTitle'>{data.title}</p>
                    <p className="recipeTime">{data.cookingTime}s to make.</p>
                    <div className="recipeIng">
                        {data.ingredients.map(each => {
                            return (
                                <ul key={each}>
                                    <li>{each}</li>
                                </ul>
                            )
                        })
                        }
                    </div>
                    <p className="recipeMethod">{data.method}</p>
                </div>
            }
        </div>
    );
}

export default Recipe;