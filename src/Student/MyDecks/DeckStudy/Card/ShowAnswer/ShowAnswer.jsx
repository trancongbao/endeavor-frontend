import React from 'react';

export default function ShowAnswer({ setIsBackShownToTrue }) {
  return (
    <div className="view-answer mt-5">
      <div className="inline-btn" onClick={setIsBackShownToTrue}>
        Show Answer
      </div>
    </div>
  );
}
