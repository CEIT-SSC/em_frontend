import { AuthApi } from "./Authentication/auth.api";
import { ShopApi } from "./Shopping/shop.api";
import { PresentationsApi } from "./Presentations/presentations.api";

/**
 * Main API class that provides a centralized entry point for all API operations.
 * Uses lazy loading pattern to instantiate API classes only when needed.
 *
 * This design pattern provides:
 * - Single entry point for all APIs
 * - Lazy instantiation (better performance)
 * - Easy extensibility for new API classes
 * - Clean separation of concerns
 * - Type safety
 *
 * Usage:
 * const api = new API();
 * const response = await api.auth.register({...});
 * const products = await api.shop.getCart();
 * const events = await api.events.getEvents();
 * const presentations = await api.presentations.getPresentations();
 */
export class API {
  private _auth?: AuthApi;
  private _shop?: ShopApi;
  private _presentations?: PresentationsApi;

  constructor() {}

  get auth(): AuthApi {
    if (!this._auth) {
      this._auth = new AuthApi();
    }
    return this._auth;
  }

  get shop(): ShopApi {
    if (!this._shop) {
      this._shop = new ShopApi();
    }
    return this._shop;
  }

  get presentations(): PresentationsApi {
    if (!this._presentations) {
      this._presentations = new PresentationsApi();
    }
    return this._presentations;
  }

  public isLoaded(apiName: "auth" | "shop" | "presentations"): boolean {
    switch (apiName) {
      case "auth":
        return !this._auth;
      case "shop":
        return !this._shop;
      case "presentations":
        return !this._presentations;
      default:
        return false;
    }
  }
}

export const ApiModule = new API();
export default API;
