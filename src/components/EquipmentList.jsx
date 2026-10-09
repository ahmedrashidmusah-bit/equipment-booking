import { isUnavailableNow } from "../bookingRules";

// Shows every item, whether it is free right now,
// and a summary of what is currently unavailable.
function EquipmentList({ equipment, bookings }) {
  const unavailableItems = equipment.filter((item) =>
    isUnavailableNow(bookings, item.id)
  );

  return (
    <section>
      <h2>Equipment</h2>

      <p>
        <strong>Currently unavailable: </strong>
        {unavailableItems.length === 0
          ? "none"
          : unavailableItems.map((item) => item.name).join(", ")}
      </p>

      <ul>
        {equipment.map((item) => {
          const unavailable = isUnavailableNow(bookings, item.id);
          return (
            <li key={item.id} className="item" data-type={item.type}>
              {item.name} <span className="note">{item.type}</span>
              <br />
              <span className={unavailable ? "unavailable" : "available"}>
                {unavailable ? "Unavailable" : "Available"}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default EquipmentList;