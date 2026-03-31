import React, { useState } from 'react';

import { Button } from '@mui/material';

import MappingModal from './MappingModal';

const MapUsersToPhases = () => {
  const [triggerMappingModal, setTriggerMappingModal] = useState<boolean>(false);
  return (
    <>
      <Button
        className="rounded-full px-4 py-1.5 shadow-inner"
        variant="contained"
        color="info"
        onClick={() => setTriggerMappingModal((prev) => !prev)}
      >
        Map Users to Phases
      </Button>
      {triggerMappingModal && (
        <MappingModal
          open={triggerMappingModal}
          handleClose={() => setTriggerMappingModal(false)}
          scroll="paper"
        />
      )}
    </>
  );
};

export default MapUsersToPhases;
