import { useState, useCallback } from 'react';

import {
  Box,
  Card,
  Grid,
  Button,
  Divider,
  TextField,
  Typography,
  CardContent,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';
import { renderIcon } from 'src/layouts/nav-config-dashboard';

import MultiSelector from '../component/MultiSelector';

// ----------------------------------------------------------------------

const options = ['1102', '1103', '1104', '1105'];

const confluenceOption = ['112', '212', '232'];

export function UserView() {
  const [changeRequest, setChangeRequest] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [jiraTickets, setJiraTickets] = useState<Array<string>>([]);
  const [confluence, setConfluence] = useState<Array<string>>([]);

  const handleSearch = () => {
    if (!changeRequest.trim()) return;
    setIsSearched(true);
  };
  return (
    <DashboardContent>
      {/* Header */}
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {renderIcon('navbar/script-gen', 'h-8 w-8', {
          color: 'primary.main',
        })}

        <Box>
          <Typography variant="h4" fontWeight={600}>
            CIP Generator
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Automatically draft standardized Change Implementation Plans from Jira and Confluence
            data.
          </Typography>
        </Box>
      </Box>

      {/* Main Card */}

      <Card
        elevation={2}
        sx={{
          borderRadius: 3,
          p: 1,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box mb={4}>
            <Typography variant="h5" fontWeight={600}>
              CIP Inputs
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Select required Jira and Confluence references
            </Typography>
          </Box>

          {/* Form Grid */}
          <Grid container spacing={3}>
            {/* CR Input */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h6" mb={2}>
                Add Change Request
              </Typography>

              <Box
                display="flex"
                gap={2}
                alignItems="center"
                flexDirection={{ xs: 'column', sm: 'row' }}
              >
                <TextField
                  fullWidth
                  label="Change Request"
                  placeholder="Enter Change Request ID (e.g. CR-1234)"
                  value={changeRequest}
                  onChange={(e) => setChangeRequest(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch();
                  }}
                />

                <Button
                  variant="contained"
                  onClick={handleSearch}
                  disabled={!changeRequest}
                  sx={{
                    whiteSpace: 'nowrap',
                    height: '56px',
                    px: 3,
                    textTransform: 'none',
                    fontWeight: 500,
                  }}
                >
                  Search
                </Button>
              </Box>
            </Grid>

            {isSearched && (
              <>
                <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
                  <Divider />
                </Grid>

                {/* JIRA Selector */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <MultiSelector
                    label="Select JIRA Ticket"
                    options={options}
                    value={jiraTickets}
                    onChange={setJiraTickets}
                    placeholder="Choose JIRA Ticket..."
                  />
                </Grid>

                {/* Confluence Selector */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <MultiSelector
                    label="Select Confluence Id"
                    options={confluenceOption}
                    value={confluence}
                    onChange={setConfluence}
                    placeholder="Choose Confluence Id..."
                  />
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
