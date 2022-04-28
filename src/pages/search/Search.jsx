import '../../Styles/Search.css'
import { useSearchParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import RecipeList from '../../components/RecipeList';
const Search = () => {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('q');
    const url = ` http://localhost:8000/recipes?q=${searchTerm}`;
    const { error, isPending, data } = useFetch(url);

    return (
        <div className='Search'>
            {data && (data.length === 0 ? <p> Recipes not Found</p> : <p> Recipes Found for {searchTerm}</p>)}
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='loading'>Loading...</p>}
            {data && <RecipeList recipes={data} />}
        </div>);
}

export default Search;