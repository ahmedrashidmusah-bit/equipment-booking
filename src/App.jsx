import { useState, useEffect } from "react";
import { equipment } from "./data/equipment";
import { loadBookings, saveBookings } from "./storage";
import EquipmentList from "./components/EquipmentList";
import BookingForm from "./components/BookingForm";
import BookingList from "./components/BookingList";

function App() {
  // The one list of bookings. React redraws the page whenever it changes.
  const [bookings, setBookings] = useState(loadBookings);

  // Re-check the clock every 30 seconds so "Unavailable" stays up to date
  const [, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(timer);
  }, []);

  // Every change goes through here: update the screen AND save it
  function updateBookings(newList) {
    setBookings(newList);
    saveBookings(newList);
  }

  function addBooking(newBooking) {
    const booking = { ...newBooking, id: Date.now() };
    updateBookings([...bookings, booking]);
  }

  function cancelBooking(id) {
    updateBookings(bookings.filter((b) => b.id !== id));
  }

  return (
    <div>
      <h1>Innovation Hub Equipment Booking</h1>
      <EquipmentList equipment={equipment} bookings={bookings} />
      <BookingForm
        equipment={equipment}
        bookings={bookings}
        onAddBooking={addBooking}
      />
      <BookingList
        equipment={equipment}
        bookings={bookings}
        onCancel={cancelBooking}
      />
    </div>
  );
}

export default App;