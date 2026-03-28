import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { DashboardLayout } from 'src/layouts/dashboard';

import MainLoading from 'src/components/loaders/MainLoading';

// ----------------------------------------------------------------------

export const DashboardPage = lazy(() => import('src/pages/dashboard'));
export const CipGeneratorPage = lazy(() => import('src/pages/cip-gen'));
export const ScriptGeneratorPage = lazy(() => import('src/pages/script-gen'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

const renderFallback = () => <MainLoading />;

export const routesSection: RouteObject[] = [
  {
    element: (
      <DashboardLayout>
        <Suspense fallback={renderFallback()}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'cip-generator', element: <CipGeneratorPage /> },
      { path: 'script-generator', element: <ScriptGeneratorPage /> },
    ],
  },
  // {
  //   path: 'sign-in',
  //   element: (
  //     <AuthLayout>
  //       <SignInPage />
  //     </AuthLayout>
  //   ),
  // },
  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];
