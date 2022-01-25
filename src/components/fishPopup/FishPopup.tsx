import React from 'react';
import "./fishPopup.scss";
import { ContentShort, ContentExtended } from '../../types/contentTypes';
import { FISH_DESC_NAMES } from '../../stores/AppStateStore';

export const FishPopup = (): React.FunctionComponent => {
//   const { contentStore, appStateStore } = React.useContext(MobXProviderContext)

//   if (!appStateStore.popupFishId) {
//       return null;
//   }

//   const currentFishContent = (): ContentShort & ContentExtended => {
//     const cuntentShort = contentStore.contentShort.find((cont: ContentShort) => {
//         return cont.id === appStateStore.popupFishId;
//     });
//     const contentExtended = contentStore.contentExtended.find((cont: ContentExtended) => {
//         console.log(cont.id, appStateStore.popupFishId)
//         return cont.id === appStateStore.popupFishId;
//     });
//     return {...cuntentShort, ...contentExtended};
//   }

//   const fishParam = (paramId: string, paramCont: string): React.ReactNode => {
//       return (
//         <div className="fishPopup__item">
//             <div className="fishPopup__itemName">{FISH_DESC_NAMES[paramId]}</div>
//             <div className="fishPopup__itemContent">{paramCont}</div>
//         </div>
//       )
//   }

//   const fishInit = (inits: any[]): React.ReactNode => {
//       return (
//           <div className="fishPopup__item">
//               <div className="fishPopup__itemName">{FISH_DESC_NAMES["params"]}</div>
//               <div className="fishPopup__itemContent">
//                 {inits && inits.map(init => {
//                     return <div className="fishPopup__itemParam"><i>{init.param}</i> — {init.desc}</div>
//                 })} 
//               </div>
//           </div>
//       )
//   }

//   return (
//     <div className="fishPopup">
//         <div className="fishPopup__content">
//             <div className="fishPopup__close" onClick={() => appStateStore.setPopupFishId("")}>
//                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M15 1L8 8M1 15L8 8M8 8L15 15L1 1" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//                 </svg>
//             </div>
//             <div className="fishPopup__header">{currentFishContent().name}</div>
//             <div className="fishPopup__items">
//                 {fishParam("desc", currentFishContent().description)}
//                 {currentFishContent().warning ? fishParam("warning", currentFishContent().warning) : null}
//                 {fishParam("prep", currentFishContent().prep)}
//                 {fishInit(currentFishContent().params)}
//             </div>
//             <div className="fishPopup__code">
//                 {currentFishContent().code}
//             </div>
//         </div>
//     </div>
//   )
return null;
};