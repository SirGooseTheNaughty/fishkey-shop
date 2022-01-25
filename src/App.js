import './App.scss';
import { useState, useEffect, createContext } from 'react';
import { Header } from "./components/header/Header";
import { Filters } from "./components/filters/Filters";
import { FishContainer } from "./components/fishes/FishContainer";
import { Basket } from "./components/basket/Basket";
import { FishPopup } from "./components/fishPopup/FishPopup";
import { Login } from "./components/loginPopup/Login";
import { getAuth } from "firebase/auth";
import { fetchFishes, fetchOwnedFishes, mergeFishData } from './services/DataService';
import useBasket from './hooks/useBasket';
import useTags from './hooks/useTags';
import useUser from './hooks/useUser';

export const BasketContext = createContext({ basketIds: null, addId: null, removeId: null, toggleId: null, ownedFishes: null });

const App = () => {
  const [firebaseUser, ownedFishes, userIcon] = useUser();
  const [fishes, setFishes] = useState([]);
  const [shouldFetchFullFishes, setShouldFetchFullFishes] = useState(true);
  const [basketIds, toggleId, isBasketShown, setIsBasketShown] = useBasket();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [tags, toggleTag] = useTags();

  useEffect(() => {
    if (!fishes.length) {
      fetchFishes()
        .then(data => setFishes(data))
        .catch(err => console.error(err));
    }
  }, [fishes]);
  
  useEffect(() => {
    const auth = getAuth();
    if (auth.currentUser && showLoginPopup) {
      setShowLoginPopup(false);
    }
  }, [firebaseUser]);
  
  useEffect(() => {
    if (shouldFetchFullFishes && fishes.length) {
      fetchOwnedFishes()
        .then(data => mergeFishData(fishes, data))
        .then(fishes => setFishes(fishes))
        .catch(err => console.error(err))
        .finally(() => setShouldFetchFullFishes(false));
    }
  }, [ownedFishes, fishes, shouldFetchFullFishes]);

  const currentFishes = tags.size
    ? fishes.filter(fish => {
      for (const tag of tags) {
        if (!fish.tags.includes(tag)) {
          return false;
        }
      }
      return true;
    })
    : fishes;

  return (
    <>
      {isBasketShown &&
        <Basket
          user={firebaseUser}
          setShowBasket={setIsBasketShown}
          fishes={fishes}
          basketIds={basketIds}
          toggleFish={toggleId}
        />
      }
      {showLoginPopup &&
        <Login user={firebaseUser} setShowLoginPopup={setShowLoginPopup}/>
      }
      <Header
        userIcon={userIcon}
        setShowBasket={setIsBasketShown}
        basketIds={basketIds}
        setShowLoginPopup={setShowLoginPopup}
      />
      {/* <FishPopup /> */}
      <main>
        <Filters tags={tags} toggleTag={toggleTag} fishes={currentFishes} />
        <BasketContext.Provider value={{basketIds, toggleId, ownedFishes}}>
          <FishContainer fishes={currentFishes} tags={tags} />
        </BasketContext.Provider>
      </main>
    </>
  );
}

export default App;
