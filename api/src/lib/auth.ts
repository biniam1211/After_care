import type { NextFunction, Request, Response } from 'express';
import { supabaseAdmin } from './supabase.js';

export interface AuthedRequest extends Request {
  userId?: string;
  accessToken?: string;
}

/**
 * Verify the Supabase access token on the Authorization header and attach the
 * user id to the request. Routes behind this middleware require a signed-in user.
 */
export async function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.header('authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';

  if (!token) {
    return res.status(401).json({ error: 'Missing Authorization bearer token' });
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  req.userId = data.user.id;
  req.accessToken = token;
  next();
}
