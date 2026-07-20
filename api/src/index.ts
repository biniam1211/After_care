import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { env } from './lib/env.js';
import { healthRouter } from './routes/health.js';
import { authRouter } from './routes/auth.js';
import { chatRouter } from './routes/chat.js';
import { conversationsRouter } from './routes/conversations.js';
import { questsRouter } from './routes/quests.js';
import { resourcesRouter } from './routes/resources.js';
import { panicRouter } from './routes/panic.js';
import { internalRouter } from './routes/internal.js';
import { documentsRouter } from './routes/documents.js';
import { devicesRouter } from './routes/devices.js';
import { demoRouter } from './routes/demo.js';

const app = express();

// Behind Railway's proxy; needed so rate limiting sees real client IPs.
app.set('trust proxy', 1);

// Security headers. CSP is disabled because the Expo web bundle relies on
// inline scripts/styles; the rest of helmet's defaults still apply.
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(cors());
// Gzip everything, most importantly the ~2.6 MB web JS bundle (→ ~600 KB).
app.use(compression());
app.use(express.json({ limit: '1mb' }));

// Global rate limit (per IP). Generous enough for real use; stops abuse.
// /demo/session keeps its own stricter limit on top of this.
app.use(
  rateLimit({
    windowMs: 60_000,
    limit: 300,
    standardHeaders: true,
    legacyHeaders: false,
    // Static assets are cheap and cached; don't count them against the limit.
    skip: (req) => req.path.startsWith('/app'),
  }),
);

// Routes
app.use(healthRouter);
app.use(authRouter);
app.use(chatRouter);
app.use(conversationsRouter);
app.use(questsRouter);
app.use(resourcesRouter);
app.use(panicRouter);
app.use(internalRouter);
app.use(documentsRouter);
app.use(devicesRouter);
app.use(demoRouter);

// Static web preview (Expo web export, base path /app). Served after the API
// routers so root API routes are untouched; the SPA fallback returns index.html
// for client-side routes like /app/onboarding.
//
// Caching: bundle/asset filenames are content-hashed, so they get a 1-year
// immutable cache; index.html must never be cached or deploys wouldn't show up.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webDir = path.join(__dirname, '..', 'public');
app.use(
  '/app',
  express.static(webDir, {
    setHeaders: (res, filePath) => {
      if (filePath.includes(`${path.sep}_expo${path.sep}`) || filePath.includes(`${path.sep}assets${path.sep}`)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      } else {
        res.setHeader('Cache-Control', 'no-cache');
      }
    },
  }),
);
app.get(['/app', '/app/*'], (_req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.sendFile(path.join(webDir, 'index.html'));
});

// Fallback 404
app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

// Last-resort error handler: never leak stack traces, never crash the process
// on a synchronous route error.
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[unhandled]', err.message);
  if (!res.headersSent) res.status(500).json({ error: 'Something went wrong on our end.' });
});

app.listen(env.port, () => {
  console.log(`🛟  AfterCare API listening on http://localhost:${env.port} (${env.nodeEnv})`);
});
