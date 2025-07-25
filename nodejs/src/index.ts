import cors from "cors";
import express from "express";
import routes from "./routes";
import { getConfig } from "./utils";

const DEFAULT_PORT = 8080;
let port = DEFAULT_PORT;

const tomlConfig = getConfig();

if (!tomlConfig.bitmexApi?.keyId || !tomlConfig.bitmexApi?.keySecret) {
  console.error("Please enter a Bitmex API Key ID and Secret.");
  process.exit(1);
}

port = tomlConfig.port ?? DEFAULT_PORT;

const app = express();

const environment = tomlConfig.envName ?? "development";

if (environment === "production") {
  // Third-Party Middleware
  app.use(cors());

  // Built-In Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
}

app.use("/api", routes);

app.get("/ping", (_req, res) => {
  res.set("Content-Type", "application/json").send({ message: "Application up and running!" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});