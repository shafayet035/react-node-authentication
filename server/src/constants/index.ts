export const __prod__ = process.env.NODE_ENV === 'production';
export const PORT = process.env.PORT || 8080;
export const MONGO_DB_URI = process.env.MONGO_DB_URI || 'mongodb://localhost:27017/authentication';
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
