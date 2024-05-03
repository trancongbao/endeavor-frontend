import React, {useEffect, useState} from 'react';
import Front from './Front/Front';
import Back from './Back/Back';
import Scheduling from "./Scheduling/Scheduling";
import ShowAnswer from "./ShowAnswer/ShowAnswer";

export default function Card({card, showNextCard}) {
    const [isBackShown, setIsBackShown] = useState(false);

    // isBackShown must be reset when card changes
    useEffect(() => {
        setIsBackShown(false);
    }, [card]);

    return (
        <div className="card">
            <Front front={card.front}/>
            <Back back={card.back} isBackShown={isBackShown}/>
            {
                isBackShown
                    ? <Scheduling cardId={card.id} studyDate={card.studyDate} dueDate={card.dueDate} showNextCard={showNextCard}/>
                    : <ShowAnswer setIsBackShownToTrue={() => setIsBackShown(true)}/>
            }
        </div>
    );
};
