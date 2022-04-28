import '../Styles/RecipeList.css'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Delete from '../images/delete.svg'
import useFirePost from '../firebase/useFirePost';
const RecipeList = ({ recipes }) => {
    const [updateID, setUpdateID] = useState(null)
    const { data } = useFirePost(null, updateID)
    const handleClick = id => {
        console.log('called from handle Click')
        setUpdateID(id)
    }

    return (
        <React.Fragment>
            {recipes.length !== 0 && (<div className='recipeList'>
                {recipes.map(recipe => {
                    return (
                        <div className="card" key={recipe.id}>
                            <img className='trashCan' src={Delete} onClick={() => handleClick(recipe.id)} alt='for delete ' />
                            <h2>{recipe.title}</h2>
                            <p>{recipe.cookingTime} to make.</p>
                            <div>{recipe.method.substring(0, 100)}...</div>
                            <Link to={`/recipe/${recipe.id}`} > Cook This </Link>
                        </div>
                    )
                })
                }
            </div >)}
        </React.Fragment>
    );
}

export default RecipeList;