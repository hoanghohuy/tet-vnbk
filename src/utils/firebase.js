import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, getDoc, updateDoc, doc, query, where, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyC5F_GEyDC0yeqenNujoObfwMHHj7dVra4',
    authDomain: 'e-vissa.firebaseapp.com',
    databaseURL: 'https://e-vissa-default-rtdb.firebaseio.com',
    projectId: 'e-vissa',
    storageBucket: 'e-vissa.appspot.com',
    messagingSenderId: '125619557819',
    appId: '1:125619557819:web:9a734d1bfb0ec7e603609e',
    measurementId: 'G-EBVPK6CTC5',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getBookTours = async () => {
    try {
        const eventToursQuery = collection(db, 'eventTours');
        const eventToursSnapshot = await getDocs(eventToursQuery);

        const eventToursData = [];

        eventToursSnapshot.forEach((doc) => {
            eventToursData.push({ id: doc.id, ...doc.data() });
        });

        console.table(eventToursData);
        console.log(eventToursData)
    } catch (error) {
        console.error('Error getting eventTours data:', error);
    }
};

const handleBookTour = async (item) => {
    try {
        const tourQuery = query(collection(db, 'eventTours'), where('tourlink', '==', item.link));
        const querySnapshot = await getDocs(tourQuery);

        if (!querySnapshot.empty) {
            const tourDocRef = querySnapshot.docs[0].ref;
            const tourData = querySnapshot.docs[0].data();
            const plusViews = tourData.views + 1 || 0;

            // Update views in Firestore
            const tourDoc = await updateDoc(tourDocRef, {
                views: plusViews,
            });

            console.log('Views: ', plusViews);
        } else {
            const docRef = await addDoc(collection(db, 'eventTours'), {
                tourName: item.name,
                tourPrice: item.price,
                tourlink: item.link,
                timestamp: new Date(),
                views: 1,
            });
            console.log('Have a nice tour');
        }
        // await getBookTours();
    } catch (e) {
        console.error('Error adding document: ', e);
    }
};

export { handleBookTour, getBookTours };
