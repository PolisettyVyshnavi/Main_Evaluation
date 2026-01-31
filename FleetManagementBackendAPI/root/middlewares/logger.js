import fs from 'fs';

export default (req, res, next) => {
  const log = `${new Date().toISOString()} ${req.method} ${req.originalUrl}\n`;
  fs.appendFileSync('logs.txt', log);
  next();
};