export default function EditPane({card}) {
  return (
    <section className="edit-place">
      <div className="front-section">
        <h1>Text</h1>
        <input type="text" value={card ? card.text : ""}/>
      </div>
    </section>
  );
}