// ALL the booking rules live in this file.

// The most active bookings one person may have at once
export const MAX_ACTIVE_BOOKINGS = 3;

// Turn a text like "2026-12-01T09:00" into a number (milliseconds),
// so we can compare two times with < and >
function toTime(text) {
  return new Date(text).getTime();
}

// Do two time periods overlap?
// Period A is startA to endA. Period B is startB to endB.
export function periodsOverlap(startA, endA, startB, endB) {
  return toTime(startA) < toTime(endB) && toTime(endA) > toTime(startB);
}

// Is this item already booked at any point during the requested period?
export function hasConflict(bookings, equipmentId, start, end) {
  return bookings.some(
    (b) => b.equipmentId === equipmentId && periodsOverlap(start, end, b.start, b.end)
  );
}

// How many active bookings does this user have?
// "Active" means the booking has not finished yet.
export function countActiveBookings(bookings, userName) {
  const now = Date.now();
  const name = userName.trim().toLowerCase();
  return bookings.filter(
    (b) => b.userName.trim().toLowerCase() === name && toTime(b.end) > now
  ).length;
}

// Is this item in use right now?
export function isUnavailableNow(bookings, equipmentId) {
  const now = Date.now();
  return bookings.some(
    (b) => b.equipmentId === equipmentId && toTime(b.start) <= now && toTime(b.end) > now
  );
}

// Check a new booking. Returns a list of error messages.
// An empty list means the booking is fine.
export function validateBooking(bookings, newBooking) {
  const errors = [];
  const { equipmentId, userName, start, end } = newBooking;

  if (!userName || userName.trim() === "") {
    errors.push("Please enter your name.");
  }
  if (!equipmentId) {
    errors.push("Please choose an item.");
  }
  if (!start || !end) {
    errors.push("Please choose both a start and an end time.");
    return errors; // we cannot check the times if they are missing
  }
  if (toTime(end) <= toTime(start)) {
    errors.push("The end time must be after the start time.");
  }
  if (toTime(start) < Date.now()) {
    errors.push("The start time cannot be in the past.");
  }
  if (errors.length > 0) {
    return errors; // fix the basic mistakes before checking conflicts
  }

  if (hasConflict(bookings, equipmentId, start, end)) {
    errors.push("This item is already booked during that time.");
  }
  if (countActiveBookings(bookings, userName) >= MAX_ACTIVE_BOOKINGS) {
    errors.push(
      `You already have ${MAX_ACTIVE_BOOKINGS} active bookings. Cancel one first.`
    );
  }
  return errors;
}