import { CONFIG } from 'src/config-global';

import { UserView } from 'src/sections/cip-gen/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`CIP Generator - ${CONFIG.appName}`}</title>

      <UserView />
    </>
  );
}
