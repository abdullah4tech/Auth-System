import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as Sentry from '@sentry/vue';

import App from './App.vue'
import router from './router'

const app = createApp(App)

Sentry.init({
  app,
  dsn: "https://c76145841f23714087313e3c4a4d3be2@o4507877326520320.ingest.us.sentry.io/4507877331107840",
  integrations: [
    Sentry.browserTracingIntegration({ router }),
    Sentry.replayIntegration(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/backend-aurh-production\.up\.railway\.app/],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

app.use(createPinia())
app.use(router)

app.mount('#app')

