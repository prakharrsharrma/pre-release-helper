import { CONFIG } from 'src/config-global';

import CipGenView from 'src/sections/cip-gen/view/CipGenView';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`CIP Generator - ${CONFIG.appName}`}</title>
      <CipGenView />
    </>
  );
}
