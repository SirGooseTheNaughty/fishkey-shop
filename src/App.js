import './App.scss';
import { useState, useEffect, createContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Header } from "./components/header/Header";
import { Filters } from "./components/filters/Filters";
import { FishContainer } from "./components/fishes/FishContainer";
import { Basket } from "./components/basket/Basket";
import { FishPopup } from "./components/fishPopup/FishPopup";
import { Login } from "./components/loginPopup/Login";
import { getAuth } from "firebase/auth";
import { fetchFishes, fetchOwnedFishes, fetchFullFishes, mergeFishData } from './services/DataService';
import { getFilteredFishes } from './services/DataFlowService';
import { VideoPopup } from './components/videoPopup/VideoPopup';
import useBasket from './hooks/useBasket';
import useTags from './hooks/useTags';
import useUser from './hooks/useUser';
import usePopup from './hooks/usePopup';
import useVideo from './hooks/useVideo';

export const Context = createContext({
  basketIds: null,
  addId: null,
  removeId: null,
  toggleId: null,
  ownedFishes: null,
  setFishPopup: null,
  setVideo: null
});

const App = () => {
  const [firebaseUser, ownedFishes, userIcon] = useUser();
  const [fishes, setFishes] = useState([]);
  const [shouldFetchFullFishes, setShouldFetchFullFishes] = useState(true);
  const [basketIds, toggleId, isBasketShown, setIsBasketShown] = useBasket();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [tags, toggleTag] = useTags();
  const [popupFishData, isFishPopupOpened, setFishPopup] = usePopup(fishes);
  const [hideNotBought, setHideNotBought] = useState(false);
  const [isVideoShown, videoLink, setVideo] = useVideo();

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
      setShouldFetchFullFishes(true);
      if (showLoginPopup) {
        setShowLoginPopup(false);
      }
    }
  }, [firebaseUser]);
  
  useEffect(() => {
    if (shouldFetchFullFishes && fishes.length) {
      fetchOwnedFishes(firebaseUser)
        .then(ownedIds => fetchFullFishes(ownedIds))
        .then(addData => mergeFishData(fishes, addData))
        .then(fishes => setFishes(fishes))
        .catch(err => console.error(err))
        .finally(() => setShouldFetchFullFishes(false));
    }
  }, [ownedFishes, fishes, shouldFetchFullFishes, firebaseUser]);

  useEffect(() => {
    if (isBasketShown || showLoginPopup || isFishPopupOpened || isVideoShown) {
      document.body.classList.add('popup-opened');
    } else {
      document.body.classList.remove('popup-opened');
    }
  }, [isBasketShown, showLoginPopup, isFishPopupOpened, isVideoShown])

  const currentFishes = getFilteredFishes({ fishes, tags, ownedFishes, hideNotBought });

  return (
    <>
      <CSSTransition in={isBasketShown} classNames="popup-transition" timeout={250} unmountOnExit>
        <Basket
          user={firebaseUser}
          setShowBasket={setIsBasketShown}
          fishes={fishes}
          basketIds={basketIds}
          toggleFish={toggleId}
        />
      </CSSTransition>
      <CSSTransition in={showLoginPopup} classNames="popup-transition" timeout={250} unmountOnExit>
        <Login user={firebaseUser} setShowLoginPopup={setShowLoginPopup}/>
      </CSSTransition>
      <CSSTransition in={isFishPopupOpened} classNames="popup-transition" timeout={250} unmountOnExit>
        <FishPopup data={popupFishData} setFishPopup={setFishPopup}/>
      </CSSTransition>
      <CSSTransition in={isVideoShown} classNames="popup-transition" timeout={250} unmountOnExit>
        <VideoPopup link={videoLink} setVideo={setVideo}/>
      </CSSTransition>
      <main>
        <Header
          userIcon={userIcon}
          setShowBasket={setIsBasketShown}
          basketIds={basketIds}
          setShowLoginPopup={setShowLoginPopup}
        />
        <Filters tags={tags} toggleTag={toggleTag} fishes={currentFishes} hideNotBought={hideNotBought} setHideNotBought={setHideNotBought} />
        <Context.Provider value={{basketIds, toggleId, ownedFishes, setFishPopup, setVideo}}>
          <FishContainer fishes={currentFishes} tags={tags} />
        </Context.Provider>
      </main>
    </>
  );
}

export default App;
