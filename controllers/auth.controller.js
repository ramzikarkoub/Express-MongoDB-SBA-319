export const login = (req, res) => {
  console.log("login");
  res.send("login");
};

export function logout(req, res) {
  res.send("Logout route");
}

export function register(req, res) {
  console.log(req.body);
}
