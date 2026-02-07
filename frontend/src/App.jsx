import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [hoursData, setHoursData] = useState(null);
  const [view, setView] = useState("daily"); // default view

  useEffect(() => {
    const fetchHours = async () => {
      try {
        const res = await fetch("https://time-tracking-fullstack-mern.vercel.app/api/hours");
        const data = await res.json();
        setHoursData(data[0]); // first item
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchHours();
  }, []);

  if (!hoursData) return <p>Loading...</p>;

  const { user, time } = hoursData;

  return (
    <div className="container">
      {/* LEFT SIDE BUTTONS */}
      <aside className="sidebar">
        <h2>{user}</h2>
        <button onClick={() => setView("daily")} className={view === "daily" ? "active" : ""}>
          Daily
        </button>
        <button onClick={() => setView("weekly")} className={view === "weekly" ? "active" : ""}>
          Weekly
        </button>
        <button onClick={() => setView("monthly")} className={view === "monthly" ? "active" : ""}>
          Monthly
        </button>
      </aside>

      {/* RIGHT SIDE DISPLAY */}
      <main className="content">
        <h2>{view.charAt(0).toUpperCase() + view.slice(1)}</h2>
        <ul>
          {time[view].map((item) => (
            <li key={item._id}>
              <strong>{item.name}</strong>: {item.hours} {" "}
              <span>(Last Week: {item.lastWeek})</span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
