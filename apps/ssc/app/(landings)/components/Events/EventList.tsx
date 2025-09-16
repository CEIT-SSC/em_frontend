import React from "react";
import Event, { EventProps } from "./Event";
import clsx from "clsx";

const EventList = async () => {
  const request = await fetch("https://api.ceit-ssc.ir/api/events/");
  const results = await request.json();
  const events: EventProps[] = results.data.results;

  // const events: EventProps[] = [
  //   {
  //     id: 1,
  //     title: "ACPC",
  //     start_date: new Date().toISOString(),
  //     end_date: new Date(new Date().getTime() + 1000000).toISOString(),
  //     poster: "/event.png",
  //     is_active: false,
  //     landing_url: "acpc",
  //     description: "alaki",
  //     manager: "ssc",
  //   },
  // ];

  return (
    <div
      className={clsx("flex justify-evenly flex-wrap gap-4", {
        ["flex-col items-center"]: events.length === 0,
      })}
    >
      {events.length === 0 ? (
        <>
          <h4 className="text-2xl font-bold text-gray-100 opacity-60">
            فعلا رویدادی نداریم!
          </h4>
        </>
      ) : (
        events.map((event) => <Event key={event.id} event={event} />)
      )}
    </div>
  );
};

export default EventList;
