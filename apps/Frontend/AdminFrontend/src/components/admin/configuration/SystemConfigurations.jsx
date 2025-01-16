 // components/admin/configuration/SystemConfiguration.jsx
 export const SystemConfiguration = () => {
    const [config, setConfig] = useState({
      academic: {
        currentYear: '2024-25',
        placementCycle: 'current'
      },
      eligibility: {
        defaultCGPA: 7.0,
        maxBacklogs: 0
      },
      communication: {
        emailEnabled: true,
        smsEnabled: true,
        defaultTemplates: {}
      },
      security: {
        sessionTimeout: 30,
        maxLoginAttempts: 3
      }
    });
  
    return (
      <Card>
        <CardContent>
          {/* Configuration interface */}
        </CardContent>
      </Card>
    );
  };
  
  