const requests = {};

export default (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();

  if (!requests[ip]) requests[ip] = [];
  requests[ip] = requests[ip].filter(ts => now - ts < 60000);

  if (requests[ip].length >= 3) {
    return res.status(429).json({ error: "Too many requests. Limit is 3 per minute." });
  }

  requests[ip].push(now);
  next();
};