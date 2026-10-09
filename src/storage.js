// The browser can keep small amounts of data, so bookings survive a refresh.
// This file loads and saves the list of bookings under the name "hub-bookings".
const KEY = "hub-bookings";

export function loadBookings() {
  try {
    const saved = localStorage.getItem(KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return []; // if anything goes wrong, start with an empty list
  }
}

export function saveBookings(bookings) {
  try {
    localStorage.setItem(KEY, JSON.stringify(bookings));
  } catch (error) {
    // saving can fail in private browsing; the app still works for this visit
  }
}