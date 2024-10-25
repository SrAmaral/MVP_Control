"use client";

import { OsCalendar } from "~/components/Os/calendar";
import { api } from "~/core/trpc/callers/react";
import { type OSType } from "../../module/types";

export default function Page() {
  const { data } = api.os.listOs.useQuery();

  return (
    <>
      <div className="container">
        <OsCalendar events={data as unknown as OSType[]} />
      </div>
    </>
  );
}
