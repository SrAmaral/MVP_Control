"use client";

import { OsCalendar } from "~/components/Os/calendar";
import { api } from "~/core/trpc/callers/react";

export default function Page() {
  const { data } = api.os.listOs.useQuery();

  return (
    <>
      <div className="container">
        <OsCalendar events={data ?? []} />
      </div>
    </>
  );
}
