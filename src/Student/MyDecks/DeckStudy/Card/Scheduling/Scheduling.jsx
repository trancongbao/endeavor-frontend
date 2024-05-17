import React from 'react';

export default function Scheduling({
  cardId,
  studyDate,
  dueDate,
  showNextCard,
}) {
  const intervals = schedulingIntervals(studyDate, dueDate);

  return (
    <div className="memorize-option-container">
      {Object.entries(intervals).map(([title, interval]) => (
        <div
          key={title}
          className="inline-btn memorize-option"
          onClick={() => {
            scheduleCard(cardId, interval);
            showNextCard();
          }}
        >
          <p className="memorize-front">{title}</p>
          <p className="memorize-back">{interval}</p>
        </div>
      ))}
    </div>
  );
}

/*
 * This function returns the scheduling intervals for different difficulty options using a "simplified" Anki algorithm
 * Ref: https://www.youtube.com/watch?v=newlu_xQazU&t=6s
 * */
function schedulingIntervals(studyDate, dueDate) {
  const GRADUATING_INTERVAL = 1;
  const EASE_PERCENTAGE = 2.5;
  const INTERVAL_MODIFIER = 1;
  const EASY_BONUS = 1.3;
  const HARD_INTERVAL = 1.2;

  let interval =
    studyDate === null || dueDate <= studyDate
      ? GRADUATING_INTERVAL
      : Math.floor(
          (new Date(dueDate) - new Date(studyDate)) / (1000 * 60 * 60 * 24)
        );

  return {
    Again: 0,
    Easy: Math.floor(
      interval * EASE_PERCENTAGE * INTERVAL_MODIFIER * EASY_BONUS
    ),
    Good: Math.floor(interval * EASE_PERCENTAGE * INTERVAL_MODIFIER),
    Hard: Math.floor(interval * HARD_INTERVAL * INTERVAL_MODIFIER),
  };
}

function scheduleCard(cardId, interval) {
  //TODO
}
