// components/admin/documents/DocumentVerification.jsx
export const DocumentVerification = () => {
    const [documents, setDocuments] = useState([
      {
        id: 1,
        type: 'offer_letter',
        student: 'John Doe',
        company: 'Tech Corp',
        uploadDate: '2024-02-20',
        status: 'pending'
      }
    ]);
  
    return (
      <Card>
        <CardContent>
          {/* Document verification interface */}
        </CardContent>
      </Card>
    );
  };
  
  