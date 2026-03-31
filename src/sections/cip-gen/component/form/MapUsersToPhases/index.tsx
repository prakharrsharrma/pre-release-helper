import React, { useState } from 'react';

import { Button } from '@mui/material';

import MappingModal from './MappingModal';

const MapUsersToPhases = () => {
  const [triggerMappingModal, setTriggerMappingModal] = useState<boolean>(false);
  return (
    <>
      <Button
        fullWidth
        className="rounded-2xl px-4 py-2 shadow-inner "
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
