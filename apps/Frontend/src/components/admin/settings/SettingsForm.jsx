import { Card, CardContent, Grid } from '@mui/material';
import { TextInput, SelectInput } from '../../common/forms/Input';

export const SettingsForm = ({ settings, onUpdate }) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextInput
              label="Academic Year"
              name="academicYear"
              value={settings.academicYear}
              onChange={onUpdate}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectInput
              label="Placement Season"
              name="season"
              value={settings.season}
              onChange={onUpdate}
              options={[
                { value: 'summer', label: 'Summer' },
                { value: 'winter', label: 'Winter' }
              ]}
            />
          </Grid>
          {/* Add more settings fields */}
        </Grid>
      </CardContent>
    </Card>
  );
};