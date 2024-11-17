import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRouter } from "next/navigation";
import { type OSType } from "~/app/(loggedArea)/(modules)/os/module/types";
import { resolveOsStatus } from "~/lib/utils";

type CalendarProps = {
  events: OSType[];
};

export const OsCalendar = ({ events }: CalendarProps) => {
  const router = useRouter();
  const resolveEvents = events?.map((event) => {
    return {
      title:
        event.client.fantasyName.length > 0
          ? event.client.fantasyName
          : event.client.companyName,
      start: event.scheduleDate,
      allDay: true,
      description: event.description,
      id: event.id,
      status: event.status,
      backgroundColor:
        event.status == "pending"
          ? "#111827"
          : event.status == "pendingApproval"
            ? "#fb923c"
            : event.status == "approved"
              ? "#65a30d"
              : "#dc2626",
    };
  });

  return (
    <>
      <div className="custom-calendar container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth" // Inicia na visão de mês
          headerToolbar={{
            left: "prev,next today", // Botões de navegação
            center: "title", // Título central
            right: "dayGridMonth,timeGridWeek,timeGridDay", // Visões de mês, semana e dia
          }}
          locale={ptBrLocale}
          events={resolveEvents}
          dateClick={(date) => router.push(`/os/create/?date=${date.dateStr}`)}
          eventContent={(eventInfo) => (
            <div
              className="flex cursor-pointer flex-col rounded-lg p-4 text-[12px] font-normal text-white hover:bg-slate-800"
              onClick={() =>
                router.push(
                  `/os/${eventInfo.event.extendedProps.status == "pending" ? "schedules" : eventInfo.event.extendedProps.status == "pendingApproval" ? "schedules/service-report" : "schedules/service-report"}/${eventInfo.event.id}`,
                )
              }
            >
              <p>{eventInfo.event.title}</p>
              <p>
                {resolveOsStatus(
                  eventInfo.event.extendedProps.status as string,
                )}
              </p>
            </div>
          )}
        />
      </div>
    </>
  );
};
