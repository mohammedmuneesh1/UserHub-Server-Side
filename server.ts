// The bin directory traditionally holds executable scripts or entry points for your application.
import {app} from "./index"
import http from "http"
const Port = process.env.PORT;
if (!Port) {
    console.error("PORT environment variable is not defined.");
    process.exit(1); // Exit the process with a non-zero status code to indicate failure
  }
app.set("port", Port);
//The app.set() function is used to assign the setting name to value. You may store any value that you want, but certain names can be used to configure the behavior of the server.
export const server = http.createServer(app);
server.listen(Port, () => {
  console.log("app running on", Port);
});
