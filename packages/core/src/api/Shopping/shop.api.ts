import { ApiClient } from "../ApiClient";
import { apiPath, ApiPath } from "../../types/ApiPaths";
import { Cart, ItemType } from "../../types/api/Shop/Shop";
import { RequestResponse } from "../../types/api/general";

export class ShopApi extends ApiClient {
  async fetchCart(event_id?: number) {
    return await this.Api.get<Cart, RequestResponse<Cart>>(
      apiPath(ApiPath.SHOP_CART),
      {
        params: {
          event: event_id,
        },
        requiresAuth: true,
      }
    );
  }

  async addItem(item_type: ItemType, item_id: number) {
    return await this.Api.post<Cart, RequestResponse<Cart>>(
      apiPath(ApiPath.SHOP_ADD_ITEM),
      {
        item_type,
        item_id,
      },
      {
        requiresAuth: true,
      }
    );
  }

  async removeItem(item_id: number, item_type: ItemType) {
    return await this.Api.delete<Cart, RequestResponse<Cart>>(
      apiPath(ApiPath.SHOP_REMOVE_ITEM),
      {
        params: {
          item_id,
          item_type,
        },
        requiresAuth: true,
      }
    );
  }

  async applyDiscountCode(code: string) {
    return await this.Api.post<Cart, RequestResponse<Cart>>(
      apiPath(ApiPath.SHOP_DISCOUNT_CODE),
      {
        code,
      },
      {
        requiresAuth: true,
      }
    );
  }
}
