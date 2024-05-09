export default function Preview({card}) {
  return (
    <section className="preview-pane">
      <div className="front-section">
        <h1>Text</h1>
        <input type="text" value={card ? card.text : ""}/>
      </div>
    </section>
  );
}