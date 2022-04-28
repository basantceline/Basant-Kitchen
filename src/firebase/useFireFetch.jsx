import { initializeApp } from 'firebase/app';
import {
    getFirestore, collection, getDocs, onSnapshot
} from 'firebase/firestore'
import { useState, useEffect } from 'react';
const firebaseConfig = {
    apiKey: "AIzaSyCtNECf3urGd3qsI3o761LspDoiZSY7_nk",
    authDomain: "basant-kitchen.firebaseapp.com",
    projectId: "basant-kitchen",
    storageBucket: "basant-kitchen.appspot.com",
    messagingSenderId: "649263173723",
    appId: "1:649263173723:web:0eda12c56ad24484fbaf7e"
};

//initializing firebase app
initializeApp(firebaseConfig);

//initialzing fireStore
export const database = getFirestore();

// getting reference to the collection

// Now getting the data
export const useFireFetch = (id = false) => {
    const [data, setData] = useState(null);
    const [isPending, setisPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const collRef = collection(database, 'recipes');
        let unsub = null;
        const getData = async () => {
            if (!id) {
                try {
                    unsub = onSnapshot(collRef,
                        snapshot => {
                            const datas = snapshot.docs;
                            const documents = datas.map(document => {
                                return { id: document.id, ...document.data() };
                            })
                            setisPending(false);
                            setData(documents);
                        }
                    )

                } catch (err) {
                    console.error(err)
                    setisPending(false);
                    setError(err.message)
                }
            }
            if (id) {
                try {
                    const snapshot = await getDocs(collRef);
                    const datas = snapshot.docs;
                    let documents = {};
                    datas.forEach(document => {
                        if (document.id === id) {
                            documents = { id: document.id, ...document.data() }
                        }
                    }
                    )

                    setisPending(false);
                    setData(documents);
                } catch (err) {
                    console.error(err)
                    setisPending(false);
                    setError(err.message)
                }

            }
        }
        getData();
        return () => {
            unsub(); // cleaning the function so that when Home unmounts onSnapshot needs to cancel the subscription
        }

    }
        , [id])
    return { data, isPending, error }
}


