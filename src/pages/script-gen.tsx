import { CONFIG } from 'src/config-global';

import { LiquiBaseScriptGenView } from 'src/sections/script-gen/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Script Generator - ${CONFIG.appName}`}</title>

      <LiquiBaseScriptGenView />
    </>
  );
}
