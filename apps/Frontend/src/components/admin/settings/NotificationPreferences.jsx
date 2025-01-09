 // components/admin/settings/NotificationPreferences.jsx
  export const NotificationPreferences = () => {
    const [preferences, setPreferences] = useState({
      email: {
        jnfSubmission: true,
        studentRegistration: true,
        placementUpdate: true
      },
      sms: {
        emergencyUpdates: true,
        interviewSchedule: true
      },
      system: {
        dailyDigest: true,
        weeklyReport: true
      }
    });
  
    return (
      <Card>
        <CardContent>
          {/* Notification preferences interface */}
        </CardContent>
      </Card>
    );
  };
  
  