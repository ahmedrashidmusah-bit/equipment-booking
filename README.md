# Innovation Hub Equipment Booking

A small web app for borrowing Innovation Hub equipment (ESP32 and Arduino
boards, Raspberry Pis, tools). Built with React and Vite.

## How to run it

You need Node.js (the LTS version) installed.

    npm install
    npm run dev

Then open the link it prints (usually http://localhost:5173).

## What it does

- Shows all equipment, and which items are unavailable right now.
- Books an item for a chosen start and end time.
- Lists current bookings and lets you cancel one.
- Rejects bad or conflicting bookings with a clear message.

## Rules

- Two bookings of the same item cannot overlap. A booking may start exactly
  when another ends.
- One person (name, ignoring capital letters) may have at most 3 active
  bookings. Active means the booking has not finished yet.
- The end must be after the start, and the start cannot be in the past.
- Name, item, start and end are all required.

## Design

Data is two lists:

- Equipment: id, name, type
- Bookings: id, equipmentId, userName, start, end

All rules are in `src/bookingRules.js`, separate from the screens in
`src/components`, so the logic is easy to test and change. Bookings are saved
in the browser (localStorage), so they survive a refresh.

## Limitations

Because data is stored in each visitor's own browser, bookings are not shared
between users or devices. A real system would use a database and user
accounts, so overlaps and limits would be checked across all users.