import { DataTable } from '../../common/ui/Table/DataTable';
import { Card, CardContent, Typography } from '@mui/material';

const columns = [
  { id: 'companyName', label: 'Company Name' },
  { id: 'jobProfile', label: 'Job Profile' },
  { id: 'offersExtended', label: 'Offers Extended' },
  { id: 'offersAccepted', label: 'Offers Accepted' },
  { id: 'averageCTC', label: 'Average CTC' },
];

export const CompanyWiseReport = ({ data }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Company-wise Placement Report
        </Typography>
        <DataTable 
          columns={columns}
          data={data}
        />
      </CardContent>
    </Card>
  );
};
