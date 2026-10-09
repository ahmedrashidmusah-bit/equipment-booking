import { useState } from "react";
import { validateBooking } from "../bookingRules";

// A form to book an item for a period.
// It does not decide anything itself: it asks validateBooking.
function BookingForm({ equipment, bookings, onAddBooking }) {
  // Each piece of the form is remembered with useState
  const [userName, setUserName] = useState("");
  const [equipmentId, setEquipmentId] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault(); // stop the page from reloading
    setMessage("");

    const newBooking = {
      equipmentId: equipmentId ? Number(equipmentId) : null,
      userName: userName,
      start: start,
      end: end,
    };

    const problems = validateBooking(bookings, newBooking);
    if (problems.length > 0) {
      setErrors(problems); // show what is wrong, and do NOT book
      return;
    }

    onAddBooking({ ...newBooking, userName: userName.trim() });
    setErrors([]);
    setMessage("Booking confirmed!");
    setEquipmentId("");
    setStart("");
    setEnd("");
  }

  return (
    <section>
      <h2>Book equipment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Your name
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="e.g. Ama Mensah"
          />
        </label>

        <label>
          Item
          <select value={equipmentId} onChange={(e) => setEquipmentId(e.target.value)}>
            <option value="">-- choose an item --</option>
            {equipment.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Start
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </label>

        <label>
          End
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </label>

        <button type="submit">Book</button>
      </form>

      {errors.length > 0 && (
        <ul>
          {errors.map((error) => (
            <li key={error} className="error">
              {error}
            </li>
          ))}
        </ul>
      )}
      {message && <p className="success">{message}</p>}
    </section>
  );
}

export default BookingForm;