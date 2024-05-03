import React from 'react';
import "./Front.scss";
import ReactAudioPlayer from 'react-audio-player';

export default function Front({front}) {
    return (
        <div className="card-front mb-5">
            <div className="sub-section-content">
                <p> {front.text} </p>
            </div>
            <div className="box text-center">
                <ReactAudioPlayer src={front.audio} controls/>
            </div>
        </div>
    );
};
