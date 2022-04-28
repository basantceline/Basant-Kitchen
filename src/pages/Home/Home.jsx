//styles import
import '../../Styles/Home.css'
// components import
import RecipeList from '../../components/RecipeList';
//hooks import
//firestore import
import { useFireFetch } from '../../firebase/useFireFetch';
const Home = () => {
    const { data, error, isPending } = useFireFetch();
    // useEffect(() => {
    //     setIsPending(true);
    //     const getData = async () => {
    //         const snapshot = await projectFirestore.collection('recipes').get();
    //         if (snapshot.empty) {
    //             setError('No recipes Found!!');
    //             setIsPending(false);
    //         } else {
    //             let results = [];
    //             snapshot.docs.forEach(doc => {
    //                 results.push({ id: doc.id, ...doc.data() })
    //             })
    //             setData(results);
    //             setIsPending(false);

    //         }
    //     }
    //     getData();
    // }
    //     , [])
    return (
        <div className='home'>
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='loading'>Loading...</p>}
            {data && <RecipeList recipes={data} />}

        </div>
    );
}

export default Home;