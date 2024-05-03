import React from 'react';
import Word from './Word/Word';

export default function Words({words}) {
    return (
        <div className="words">
            {
                words.map((word, index) =>
                    <Word word={word} key={index}/>
                )
            }
        </div>
    );
};
