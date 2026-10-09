// Shows bookings that have not finished yet, with a Cancel button for each.
function BookingList({ equipment, bookings, onCancel }) {
  const now = Date.now();

  // keep only bookings that have not ended, earliest first
  const current = bookings
    .filter((b) => new Date(b.end).getTime() > now)
    .sort((a, b) => new Date(a.start) - new Date(b.start));

  function findItem(id) {
    return equipment.find((e) => e.id === id);
  }

  function formatTime(text) {
    return new Date(text).toLocaleString();
  }

  function handleCancel(id) {
    if (window.confirm("Cancel this booking?")) {
      onCancel(id);
    }
  }

  return (
    <section>
      <h2>Current bookings</h2>
      {current.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul>
          {current.map((b) => {
            const item = findItem(b.equipmentId);
            return (
              <li key={b.id} className="item" data-type={item ? item.type : ""}>
                <strong>{item ? item.name : "Unknown item"}</strong> booked by{" "}
                {b.userName}
                <br />
                <span className="note">
                  {formatTime(b.start)} to {formatTime(b.end)} (
                  {new Date(b.start).getTime() <= now ? "in use now" : "upcoming"})
                </span>
                <br />
                <button className="cancel" onClick={() => handleCancel(b.id)}>
                  Cancel booking
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default BookingList;