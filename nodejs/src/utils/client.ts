import { createHmac } from "crypto";
import fetch from "node-fetch";
import { ActiveIntervalResponseObj, BaseRequest, CompositeIndexObj, Instrument, LeaderboardItem, PATHS, QueryGetCompositeIndexReq, QueryGetUsdVolumesReq, QueryGetInstrumentReq, RequestValue, SimpleMap, UsdVolumeObj, QueryGetLeaderboardReq, defaultLeaderboardReq } from "../constants";
import { ReturnTypes, appendSlash } from "./misc";

type HeadersObj = SimpleMap<string>;

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

  /**
   * Instrument endpoints
   */
  public async Instruments(req: QueryGetInstrumentReq = {}): Promise<Instrument[]> {
    return new Promise((resolve, reject) => {
      const parsedParams: BaseRequest = {
        ...req,
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

  public async ActiveInstruments(): Promise<Instrument[]> {
    return this.BaseInstrumentQuery(PATHS.Instrument.Active);
  }

  public async ActiveAndIndices(): Promise<Instrument[]> {
    return this.BaseInstrumentQuery(PATHS.Instrument.ActiveAndIndices);
  }

  public async Indices(): Promise<Instrument[]> {
    return this.BaseInstrumentQuery(PATHS.Instrument.Indices);
  }

  public async UsdVolume(req: QueryGetUsdVolumesReq = {}): Promise<UsdVolumeObj[]> {
    return new Promise((resolve, reject) => {
      const url = getReqUrl(this.URL, PATHS.Instrument.UsdVolume, req as BaseRequest);
      const headers = this.genBitmexHeadersObj(
        PATHS.Instrument.UsdVolume,
        defaultExpiryDelay,
        HTTPMethod.Get,
        getQueryParamsStr(req as BaseRequest),
      );
      fetch(url, { headers })
        .then((response) => response.json())
        .then((result) => resolve(result as UsdVolumeObj[]))
        .catch(reject);
    });
  }

  public async ActiveIntervals(): Promise<ActiveIntervalResponseObj> {
    return new Promise((resolve, reject) => {
      const url = getReqUrl(this.URL, PATHS.Instrument.ActiveIntervals);
      const headers = this.genBitmexHeadersObj(
        PATHS.Instrument.ActiveIntervals,
        defaultExpiryDelay,
        HTTPMethod.Get,
        getQueryParamsStr({}),
      );
      fetch(url, { headers })
        .then((response) => response.json())
        .then((result) => resolve(result as ActiveIntervalResponseObj))
        .catch(reject);
    });
  }

  public async CompositeIndex(req: QueryGetCompositeIndexReq = {}): Promise<CompositeIndexObj[]> {
    return new Promise((resolve, reject) => {
      const url = getReqUrl(this.URL, PATHS.Instrument.CompositeIndex, req as BaseRequest);
      const headers = this.genBitmexHeadersObj(
        PATHS.Instrument.CompositeIndex,
        defaultExpiryDelay,
        HTTPMethod.Get,
        getQueryParamsStr(req as BaseRequest),
      );
      fetch(url, { headers })
        .then((response) => response.json())
        .then((result) => resolve(result as CompositeIndexObj[]))
        .catch(reject);
    });
  }

  private async BaseInstrumentQuery(path: string): Promise<Instrument[]> {
    return new Promise((resolve, reject) => {
      const url = getReqUrl(this.URL, path);
      const headers = this.genBitmexHeadersObj(
        path,
        defaultExpiryDelay,
        HTTPMethod.Get,
        getQueryParamsStr({}),
      );
      fetch(url, { headers })
        .then((response) => response.json())
        .then((result) => resolve(result as Instrument[]))
        .catch(reject);
    });
  }

  /**
   * Leaderboard endpoints
   */
  public async Leaderboard(req: QueryGetLeaderboardReq = defaultLeaderboardReq): Promise<LeaderboardItem[]> {
    return new Promise((resolve, reject) => {
      const parsedReq = { ...req } as BaseRequest;
      const url = getReqUrl(this.URL, PATHS.Leaderboard.All, parsedReq);
      const headers = this.genBitmexHeadersObj(
        PATHS.Leaderboard.All,
        defaultExpiryDelay,
        HTTPMethod.Get,
        getQueryParamsStr(parsedReq),
      );
      fetch(url, { headers })
        .then((response) => response.json())
        .then((result) => resolve(result as LeaderboardItem[]))
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