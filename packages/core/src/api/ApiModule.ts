import { AxiosInstance } from "axios";
import { AuthApi } from "./Authentication/auth.api";
import { ShopApi } from "./Shopping/shop.api";
import { ProfileApi } from "./Profile/profile.api";
import { PresentationsApi } from "./Presentations/presentations.api";
import { OrderApi } from "./Order/order.api";
import { PaymentApi } from "./Payment/payment.api";
import { PurchasesApi } from "./Purchases/purchases.api";
import { TeamsApi } from "./Teams/teams.api";
import { CompetitionsApi } from "./Competitions/competitions.api";

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
  private _presentations?: PresentationsApi;
  private _orderApi?: OrderApi;
  private _paymentApi?: PaymentApi;
  private _purchasesApi?: PurchasesApi;
  private _teamsApi?: TeamsApi;
  private _competitionsApi?: CompetitionsApi;
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

  get presentations(): PresentationsApi {
    if (!this._presentations) {
      this._presentations = new PresentationsApi(this.apiInstance);
    }
    return this._presentations;
  }

  get order(): OrderApi {
    if (!this._orderApi) {
      this._orderApi = new OrderApi(this.apiInstance);
    }
    return this._orderApi;
  }

  get payment(): PaymentApi {
    if (!this._paymentApi) {
      this._paymentApi = new PaymentApi(this.apiInstance);
    }
    return this._paymentApi;
  }

  get purchases(): PurchasesApi {
    if (!this._purchasesApi) {
      this._purchasesApi = new PurchasesApi(this.apiInstance);
    }
    return this._purchasesApi;
  }

  get teams(): TeamsApi {
    if (!this._teamsApi) {
      this._teamsApi = new TeamsApi(this.apiInstance);
    }
    return this._teamsApi;
  }

  get competitions(): CompetitionsApi {
    if (!this._competitionsApi) {
      this._competitionsApi = new CompetitionsApi(this.apiInstance)
    }
    return this._competitionsApi;
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
