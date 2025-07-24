import { request as __request } from "@core/Api/request";
import { ApiPath } from "@core/types/ApiPaths";

export default class TokenModule {
  private static instance: TokenModule;

  private constructor() {}

  public static getInstance(): TokenModule {
    if (!TokenModule.instance) {
      TokenModule.instance = new TokenModule();
    }
    return TokenModule.instance;
  }

  public async refreshToken(refresh: string) {
    return __request("POST", ApiPath.AUTH_REFRESH, {
      refresh,
    });
  }
}
