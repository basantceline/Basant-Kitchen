import '../../Styles/Create.css'
import { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import useColor from '../../hooks/useColor';
import useFirePost from '../../firebase/useFirePost';
const Create = () => {
    const { color } = useColor();
    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [cookTime, setCookTime] = useState('');
    const [bufferIngredient, setBufferIngredient] = useState('');
    const [ingredient, setIngredient] = useState([]);
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();
    const [payLoad, setPayLoad] = useState(null)
    const { data, error } = useFirePost(payLoad, null)
    useEffect(() => {
        if (data) {
            navigate('/')
        }
    }
        , [data, navigate])
    const handleSubmit = event => {
        event.preventDefault();
        const doc = {
            title: title,
            ingredients: ingredient,
            method: method,
            cookingTime: cookTime + 'min'
        }
        setPayLoad(doc);

    }

    const handleAddtion = event => {
        event.preventDefault();
        let inge = bufferIngredient.trim();
        if (inge && !ingredient.includes(inge)) {
            let temp = [...ingredient, inge];
            setIngredient(temp);
            setFlag(true)
            setBufferIngredient('')

        }
        else {
            setBufferIngredient('');
        }
        document.querySelector('.focusInput').focus(); // to make the input field focused after clicking the button Add the Ingredient.
    }

    return (
        <React.Fragment>
            {error && <React.Fragment>
                <div className='errorContainer'>
                    <p className='error'>Failed to post data to the Server. <br />Please check the server endpoint.</p>
                    <button className="err" onClick={() => navigate('/create')}>Click Here to Try Again</button>
                </div>
            </React.Fragment>}
            {<div className='createContainer'>
                <h2>Add a new Recipe</h2>
                <form onSubmit={event => handleSubmit(event)}>
                    <label className='createTitle'>
                        <span> Title for Recipe</span>
                        <input
                            type="text"
                            onChange={event => setTitle(event.target.value)}
                            value={title}
                            required
                        />
                    </label>

                    <label className='createCookTime'>
                        <span> Time to Cook(min)</span>
                        <input
                            type="number"
                            onChange={event => setCookTime(event.target.value)}
                            value={cookTime}
                            required
                        />
                    </label>

                    <label className='createIngredient'>
                        <span>Ingredients</span>
                        <div className='createIngContainer'>
                            <input type="text" className='focusInput' onChange={event => setBufferIngredient(event.target.value)} value={bufferIngredient} />
                            <button style={{ backgroundColor: color }} onClick={event => handleAddtion(event)}>Add Ingredient</button>
                        </div>
                        {flag &&
                            <React.Fragment>
                                {
                                    ingredient.map(item => {
                                        return (
                                            <em key={Math.random()}> {`${item},`}</em>
                                        )
                                    })
                                }
                            </React.Fragment>}
                        <br />
                    </label>

                    <label className='createMethod'>
                        <span>Recipe Method</span>
                        <textarea
                            onChange={event => setMethod(event.target.value)}
                            value={method}
                            required
                        />
                    </label>
                    <button style={{ backgroundColor: color }} className='createButton'> Add the recipe</button>
                </form>
            </div >}

        </React.Fragment >
    );
}

export default Create;