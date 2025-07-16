import { readFileSync } from "fs";
import toml from "toml";
import { cwd } from "process";

interface TomlConfig {
  port?: number;
  bitmexApi?: {
    keyId?: string;
    keySecret?: string;
  };
}

const defaultTomlConfig: TomlConfig = {};

export const getConfig = (): TomlConfig => {
  const tomlConfig = { ...defaultTomlConfig };
  try {
    const tomlContents = readFileSync(`${cwd()}/../configs/config.toml`, "utf-8");
    const config = toml.parse(tomlContents);
    if (typeof config.server.port === "number") {
      tomlConfig.port = config.server.port;
    }
    if (typeof config.bitmex_api.key_id === "string") {
      tomlConfig.bitmexApi = {
        keyId: config.bitmex_api.key_id,
      };
    }
    if (typeof config.bitmex_api.key_secret === "string") {
      tomlConfig.bitmexApi = {
        ...tomlConfig.bitmexApi,
        keySecret: config.bitmex_api.key_secret,
      };
    }
    return tomlConfig;
  } catch (_err) {
    return defaultTomlConfig;
  }
};