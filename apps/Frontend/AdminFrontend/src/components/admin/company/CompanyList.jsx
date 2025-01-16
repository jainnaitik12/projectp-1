import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Avatar,
  Rating,
  Tooltip
} from '@mui/material';
import {
  Search,
  FilterList,
  MoreVert,
  Business,
  Visibility,
  Edit,
  Delete
} from '@mui/icons-material';
import { useState } from 'react';

const CompanyList = ({ onCompanySelect, selectedCompany }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [companies] = useState([
    {
      id: 1,
      name: 'Tech Corp',
      logo: '/path/to/logo.png',
      industry: 'Technology',
      rating: 4,
      status: 'active',
      lastVisit: '2024-02-15',
      offersCount: 25,
      avgPackage: '12 LPA',
      location: 'Bangalore'
    },
    // Add more companies...
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Registered Companies</Typography>
          <Box display="flex" gap={2}>
            <TextField
              size="small"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <IconButton>
              <FilterList />
            </IconButton>
          </Box>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell>Industry</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Visit</TableCell>
              <TableCell>Offers Made</TableCell>
              <TableCell>Avg Package</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow 
                key={company.id}
                hover
                selected={selectedCompany?.id === company.id}
              >
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar src={company.logo} alt={company.name}>
                      <Business />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2">
                        {company.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {company.location}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{company.industry}</TableCell>
                <TableCell>
                  <Rating value={company.rating} readOnly size="small" />
                </TableCell>
                <TableCell>
                  <Chip
                    label={company.status}
                    color={getStatusColor(company.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{company.lastVisit}</TableCell>
                <TableCell>{company.offersCount}</TableCell>
                <TableCell>{company.avgPackage}</TableCell>
                <TableCell>
                  <Box>
                    <Tooltip title="View Details">
                      <IconButton 
                        size="small"
                        onClick={() => onCompanySelect(company)}
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton size="small">
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small">
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CompanyList; 