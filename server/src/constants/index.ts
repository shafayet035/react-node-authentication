export const __prod__ = process.env.NODE_ENV === 'production';
export const PORT = process.env.PORT || 8080;
export const MONGO_DB_URI = process.env.MONGO_DB_URI;
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const AWS_EMAIL_FROM = process.env.AWS_EMAIL_FROM;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '60s';
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
