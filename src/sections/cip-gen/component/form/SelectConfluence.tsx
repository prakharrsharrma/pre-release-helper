import { useState, useEffect } from 'react';

import MultiSelector from 'src/components/inputs/MultiSelector';

import { useGetConfluencePages } from '../../hooks/use-cip-services';

const SelectConfluence = () => {
  const [availableConfluencePages, setAvailableConfluencePages] = useState<string[]>([]);

  const { mutateAsync: getConfluencePages } = useGetConfluencePages();

  const fetchAndSaveConfluencePages = async () => {
    const pages = await getConfluencePages();
    setAvailableConfluencePages(pages);
  };

  useEffect(() => {
    fetchAndSaveConfluencePages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MultiSelector
      name="confluencePageIds"
      label="Select Confluence Pages"
      options={availableConfluencePages}
    />
  );
};

export default SelectConfluence;
