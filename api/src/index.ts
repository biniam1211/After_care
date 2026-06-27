import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
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

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

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

// Static web preview (Expo web export, base path /app). Served after the API
// routers so root API routes are untouched; the SPA fallback returns index.html
// for client-side routes like /app/onboarding.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webDir = path.join(__dirname, '..', 'public');
app.use('/app', express.static(webDir));
app.get(['/app', '/app/*'], (_req, res) => res.sendFile(path.join(webDir, 'index.html')));

// Fallback 404
app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(env.port, () => {
  console.log(`🛟  AfterCare API listening on http://localhost:${env.port} (${env.nodeEnv})`);
});
