import { useState, useEffect } from 'react'
import { database } from "./useFireFetch";
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore'
const collRef = collection(database, 'recipes')
export const useFirePost = (payload, updateID) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null)
    useEffect(() => {
        if (payload) {
            const postData = async () => {
                try {
                    await addDoc(collRef, payload);
                    setData('post successful');
                } catch (error) {
                    setError(`Couldn't post the data`);
                }
            }
            postData();

        }
        if (updateID) {
            console.log('called from firepost update')
            const docref = doc(database, 'recipes', updateID);
            const update = async () => {
                try {
                    await deleteDoc(docref);
                    setData('Successfully deleted');
                } catch (err) {
                    setError('Couldnt delete the recipe');
                    console.log('Failed to delete the data');
                }
            }
            update();
        }
    }, [payload, updateID])
    return { error, data }
}

export default useFirePost;