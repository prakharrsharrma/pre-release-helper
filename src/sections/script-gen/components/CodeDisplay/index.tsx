import React from 'react';

import { Box, Button } from '@mui/material';

import { renderIcon } from 'src/layouts/nav-config-dashboard';

const CodeDisplay = ({ generatedLiquibase }: { generatedLiquibase: string }) => (
  <Box className="flex-1 bg-gray-900 border border-gray-700 rounded-xl shadow-sm overflow-hidden flex flex-col">
    <div className="bg-gray-800 border-b border-gray-700 p-3 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
        <span className="text-gray-400 text-sm font-mono ml-4">{11102}-changeset.xml</span>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#059669', // emerald-600
            color: '#fff',
            textTransform: 'none',
            fontSize: '0.875rem',
            fontWeight: 500,
            px: 2,
            py: 0.5,
            borderRadius: '6px',
            '&:hover': {
              backgroundColor: '#10b981', // emerald-500
            },
          }}
          startIcon={renderIcon('common/copy')}
        >
          Copy Script
        </Button>
      </div>
    </div>

    <div className="p-4 overflow-y-auto flex-1">
      <pre className="text-sm font-mono text-emerald-400 leading-relaxed whitespace-pre-wrap">
        {generatedLiquibase}
      </pre>
    </div>
  </Box>
);

export default CodeDisplay;
