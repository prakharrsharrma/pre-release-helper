import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import MultiSelector from 'src/components/inputs/MultiSelector';

import { useGetJiraTickets } from '../../hooks/use-cip-services';

const SelectJira = () => {
  const { control } = useFormContext();

  const [availableJiraTickets, setAvailableJiraTickets] = useState<string[]>([]);

  const { mutateAsync: getJiraTickets } = useGetJiraTickets();

  const fetchAndSaveJiraTickets = async () => {
    const tickets = await getJiraTickets();
    setAvailableJiraTickets(tickets);
  };

  useEffect(() => {
    fetchAndSaveJiraTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <MultiSelector label="Select Jira Tickets" options={availableJiraTickets} />;
};

export default SelectJira;
