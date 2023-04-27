// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from 'D:/graduation/graduationWebItem/main-app/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/login",
    "component": require('@/pages/login/index').default,
    "exact": true
  },
  {
    "path": "/",
    "component": require('@/layouts/index').default,
    "routes": [
      {
        "path": "/messagelist",
        "component": require('@/pages/messageList/index').default,
        "exact": true
      },
      {
        "path": "/contacts",
        "component": require('@/pages/contactList/index').default,
        "exact": true
      },
      {
        "path": "/calendar",
        "component": require('@/pages/calendar/index').default,
        "exact": true
      },
      {
        "path": "/",
        "redirect": "/messagelist",
        "exact": true
      },
      {
        "component": require('@/pages/404').default,
        "exact": true
      }
    ]
  },
  {
    "component": require('D:/graduation/graduationWebItem/main-app/src/pages/404').default,
    "exact": true
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
