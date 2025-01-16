// components/admin/calendar/EventCalendar.jsx
export const EventCalendar = () => {
    const [events, setEvents] = useState([
      {
        id: 1,
        title: 'Tech Corp Campus Drive',
        start: '2024-03-15',
        end: '2024-03-16',
        type: 'placement_drive'
      }
    ]);
  
    return (
      <Card>
        <CardContent>
          {/* Calendar UI */}
        </CardContent>
      </Card>
    );
  };