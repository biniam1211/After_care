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

// Fallback 404
app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(env.port, () => {
  console.log(`🛟  AfterCare API listening on http://localhost:${env.port} (${env.nodeEnv})`);
});
