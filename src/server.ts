import app from "./index";
import { env } from "./config";

app.listen(env.port, () => {
  console.log(`Server is running on port ${env.port}`);
});
