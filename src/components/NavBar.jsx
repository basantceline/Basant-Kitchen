import '../Styles/NavBar.css'
import { Link } from 'react-router-dom';
import Search from './Searchbar';
import useColor from '../hooks/useColor';
const NavBar = () => {
    const { color } = useColor();
    return (
        <div className="navBar" style={{ backgroundColor: color }}>
            <nav>
                <Link to='/' className='brand'>
                    <h1>Chat-The-Pat</h1>
                </Link>
                <Search />
                <Link to='/create' className='createRecipe'><p>Create Recipe</p></Link>
            </nav>
        </div>
    );
}

export default NavBar;