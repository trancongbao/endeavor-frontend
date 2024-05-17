import React from 'react';
import './Word.scss';
import ReactAudioPlayer from 'react-audio-player';

export default function Word({ word }) {
  return (
    <div className="word">
      <p>
        <strong>{word.spelling}</strong> /{word.phonetic}/: {word.definition}
      </p>
      <ReactAudioPlayer src={word.audio} controls />
      <img className="word-image" alt="" src={word.image} />
    </div>
  );
}
