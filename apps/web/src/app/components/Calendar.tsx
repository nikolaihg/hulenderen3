'use client';
import { Calendar as BigCalendar, dateFnsLocalizer, Event as BigCalendarEvent, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useState, useCallback } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export type CalendarEvent = {
  id?: string;
  title: string;
  start: Date;
  end: Date;
  bandCurfew?: Date;
  barCloses?: Date;
  eventDescription?: string;
  colorCode: string;
  color: string;
  allDay?: boolean;
};

interface CalendarProps {
  events: CalendarEvent[];
}

interface EventModalProps {
  event: CalendarEvent;
  onClose: () => void;
}

function EventModal({ event, onClose }: EventModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: event.color }}
            />
            <h2 className="text-xl font-bold">{event.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-3">
          <div>
            <span className="font-semibold">Type:</span> [{event.colorCode}]
          </div>
          
          <div>
            <span className="font-semibold">Start:</span>{' '}
            {format(event.start, 'PPP p')}
          </div>
          
          <div>
            <span className="font-semibold">End:</span>{' '}
            {format(event.end, 'PPP p')}
          </div>
          
          {event.bandCurfew && (
            <div>
              <span className="font-semibold">Band Curfew:</span>{' '}
              {format(event.bandCurfew, 'PPP p')}
            </div>
          )}
          
          {event.barCloses && (
            <div>
              <span className="font-semibold">Bar Closes:</span>{' '}
              {format(event.barCloses, 'PPP p')}
            </div>
          )}
          
          {event.eventDescription && (
            <div>
              <span className="font-semibold">Description:</span>
              <p className="mt-1 text-gray-700">{event.eventDescription}</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Calendar({ events }: CalendarProps) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const handleSelectEvent = useCallback((event: CalendarEvent) => {
    setSelectedEvent(event);
  }, []);

  const eventStyleGetter = useCallback((event: CalendarEvent) => {
    return {
      style: {
        backgroundColor: event.color,
        borderColor: event.color,
        color: 'white',
        border: 'none',
        borderRadius: '4px',
      },
    };
  }, []);

  const CustomEvent = ({ event }: { event: CalendarEvent }) => (
    <div className="text-xs">
      <strong>[{event.colorCode}] {event.title}</strong>
    </div>
  );

  return (
    <>
      <div className="h-[80vh] p-4">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CustomEvent,
          }}
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          defaultView={Views.MONTH}
          popup
          showMultiDayTimes
        />
      </div>
      
      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </>
  );
}