import { AxiosInstance } from "axios";
import { AuthApi } from "./Authentication/auth.api";
import { ShopApi } from "./Shopping/shop.api";
import { PresentationsApi } from "./Presentations/presentations.api";
import { UserProfileApi } from "./UserProfile/userProfile.api";
import { ProfileApi } from "./Profile/profile.api";

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
 * const profile = await api.userProfile.getProfile();
 */
export class ApiModule {
  private _auth?: AuthApi;
  private _shop?: ShopApi;
  private _profile?: ProfileApi;
  private apiInstance: AxiosInstance;

  constructor(apiInstance: AxiosInstance) {
    this.apiInstance = apiInstance;
  }

  get auth(): AuthApi {
    if (!this._auth) {
      this._auth = new AuthApi(this.apiInstance);
    }
    return this._auth;
  }

  get shop(): ShopApi {
    if (!this._shop) {
      this._shop = new ShopApi(this.apiInstance);
    }
    return this._shop;
  }

  get profile(): ProfileApi {
    if (!this._profile) {
      this._profile = new ProfileApi(this.apiInstance);
    }
    return this._profile;
  }

  public isLoaded(apiName: "auth" | "shop"): boolean {
    switch (apiName) {
      case "auth":
        return !this._auth;
      case "shop":
        return !this._shop;
      default:
        return false;
    }
  }
}
