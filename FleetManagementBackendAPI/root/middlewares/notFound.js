export default (req, res) => {
  res.status(404).json({ error: "This Request Is Not Found" });
};