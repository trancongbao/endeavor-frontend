import React from 'react';
import Words from "./Words/Words";

export default function Back({back, isBackShown}) {
    return (
        <div className="back">
            {
                isBackShown
                    ? <Words words={back.words}/>
                    : <div className="back-blank"></div>
            }
        </div>
    );
};
