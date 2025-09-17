import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface EventProps {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  poster: string;
  is_active: boolean;
  landing_url: string;
  description: string;
  manager: string;
}

const Event = ({ event }: { event: EventProps }) => {
  const isOver = new Date(event.end_date).getTime() - new Date().getTime() <= 0;
  const localDate = new Date(event.start_date).toLocaleDateString("fa-IR", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const [weekday, date, month] = localDate.split(" ");

  return (
    <div className="w-100 min-h-110 flex flex-col border rounded-3xl justify-between overflow-hidden">
      <Image
        width={400}
        height={160}
        src={event.poster}
        alt="event photo"
        className="aspect-square object-cover"
      />
      <div className="h-full flex flex-col gap-4 justify-between p-4">
        <div className="flex flex-col gap-1">
          <div className="flex gap-4 justify-center">
            <h4 className="text-2xl font-bold">{event.title}</h4>
            {isOver && (
              <span className="rounded-full bg-mainRed h-fit py-1 px-2 text-mainWhite text-md font-semibold">
                اتمام یافت
              </span>
            )}
          </div>
          <p className="text-sm text-center">{event.manager}</p>
        </div>
        <p className="text-whiteText line-clamp-3 text-center">
          {event.description}
        </p>
        <div className="w-full flex justify-between items-center">
          <Link
            className={clsx("border rounded-full px-3 py-2", {
              "pointer-events-none opacity-25": !event.is_active,
            })}
            href={event.landing_url}
            target="_blank"
          >
            اطلاعات بیشتر
          </Link>
          <div className="flex items-center gap-1.5">
            <p>{weekday}</p>
            <h3 className="text-[32px] font-bold">{date}</h3>
            <p>{month}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
