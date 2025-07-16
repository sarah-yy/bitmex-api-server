import { createHmac } from "crypto";
import fetch from "node-fetch";
import { Instrument, QueryInstrumentRequest, SimpleMap } from "../constants";
import { ReturnTypes, appendSlash } from "./misc";

type HeadersObj = SimpleMap<string>;

const PATHS: SimpleMap<SimpleMap<string>> = {
  Instrument: {
    All: "/instrument",
  },
};

const defaultExpiryDelay = 300;

const MILLISECONDS_PER_SECOND = Math.pow(10, 3);

export class BitmexClient {
  private keyId: string;
  private keySecret: string;
  private URL: string = "https://www.bitmex.com/api/v1";

  constructor(keyId: string, keySecret: string) {
    if (keyId.length === 0 || keySecret.length === 0) {
      throw new Error("API Key Id and Secret required.");
    }
    this.keyId = keyId;
    this.keySecret = keySecret;
  }

  public async Instrument(req: QueryInstrumentRequest = {}): Promise<Instrument[]> {
    return new Promise((resolve, reject) => {
      const parsedParams: BaseRequest = {
        ...req,
        ...req.filter && ({
          filter: JSON.stringify(req.filter),
        }),
        ...req.columns && ({
          columns: JSON.stringify(req.columns),
        }),
      };

      const url = getReqUrl(this.URL, PATHS.Instrument.All, parsedParams);
      const headers = this.genBitmexHeadersObj(
        PATHS.Instrument.All,
        defaultExpiryDelay,
        HTTPMethod.Get,
        getQueryParamsStr(parsedParams),
      );
      fetch(url, { headers })
        .then((response) => response.json())
        .then((result) => resolve(result as Instrument[]))
        .catch(reject);
    });
  }

  private genBitmexHeadersObj = (
    endpoint: string,
    validSeconds: number = defaultExpiryDelay, // 5 minutes
    method: HTTPMethod = HTTPMethod.Get,
    data: string = "",
    acceptType: ReturnTypes = ReturnTypes.JSON,
    returnType: ReturnTypes = ReturnTypes.JSON,
  ): HeadersObj => {
    const nowTime = new Date().getTime();
    const expiryTimestamp = Math.ceil((nowTime + (validSeconds * MILLISECONDS_PER_SECOND)) / MILLISECONDS_PER_SECOND);

  let query = "", postBody = "";
  if (method === HTTPMethod.Get) {
    query = data.length === 0 ? data : `?${data}`;
  } else {
    // Pre-compute the reqBody so we can be sure that we're using *exactly* the same body in the request
    // and in the signature. If you don't do this, you might get differently-sorted keys and blow the signature.
    postBody = data;
  }

    const message = `${method}/api/v1${appendSlash(endpoint)}${query}${expiryTimestamp}${postBody}`;
    const hmac = createHmac("sha256", this.keySecret);
    hmac.update(message);
    const signature = hmac.digest("hex");

    const headers: HeadersObj = {
      "api-expires": expiryTimestamp.toString(10),
      "api-key": this.keyId,
      "api-signature": signature,
      "content-type": returnType,
      "accept": acceptType,
    };
    return headers;
  };
}

type RequestValue = string | boolean | number;
type BaseRequest = SimpleMap<RequestValue>;

const getReqUrl = (domain: string, path: string, req: BaseRequest = {}): string => {
  let queryUrl = `${domain}${appendSlash(path)}`;
  if (Object.keys(req).length > 0) {
    queryUrl = `${queryUrl}?${getQueryParamsStr(req)}`;
  }
  return queryUrl;
};

const getQueryParamsStr = (req: BaseRequest = {}): string => {
  if (Object.keys(req).length === 0) return "";
  const queryStrArr = Object.entries(req).map(([key, value]: [string, RequestValue]) => {
    const encodedValue = typeof value === "string" ? encodeURIComponent(value) : value;
    return `${key}=${encodedValue}`;
  });
  return queryStrArr.join("&");
};

enum HTTPMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE",
}