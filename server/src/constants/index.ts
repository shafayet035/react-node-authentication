export const __prod__ = process.env.NODE_ENV === 'production';
export const PORT = process.env.PORT || 8080;
export const MONGO_DB_URI = process.env.MONGO_DB_URI || 'mongodb://localhost:27017/authentication';
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const SMTP_USER_NAME = process.env.SMTP_USER_NAME;
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
export const SMTP_EMAIL_FROM = process.env.SMTP_EMAIL_FROM;
