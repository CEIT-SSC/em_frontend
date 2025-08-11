import React from "react";
import MiniEvent, { Event } from "./MiniEvent";

interface EventResponse {
  count: number;
  next: "string";
  previous: "string";
  results: Event[];
}

const EventList = async () => {
  //   const res = await fetch("https://aut-ssc.ir/api/events/");
  //   const data: EventResponse = await res.json();
  //   const events = data.results;

  const events: Event[] = [
    {
      id: 1,
      title: "ACPC",
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString(),
      poster: "/event.png",
      is_active: false,
      landing_url: "acpc",
    },
  ];

  if (events.length === 0)
    return (
      <div className="flex flex-col items-center gap-2">
        <h4 className="text-2xl font-bold">فعلا رویدادی نداریم!</h4>
        <h4 className="text-2xl font-bold">Stay Tuned</h4>
      </div>
    );

  return (
    <div className="flex justify-evenly flex-wrap gap-4">
      {events.map((event) => (
        <MiniEvent key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
