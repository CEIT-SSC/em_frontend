import { ApiClient } from "../ApiClient";
import { apiPath, ApiPath } from "../../types/ApiPaths";
import { RequestResponse } from "../../types/api/general";
import {
  WalletBalance,
  WalletTopUpResult,
  WalletTopUpStartResult,
  WalletTransactionPage,
} from "../../types/api/Wallet/Wallet";

export class WalletApi extends ApiClient {
  async getBalance() {
    return await this.Api.get<WalletBalance, RequestResponse<WalletBalance>>(
      apiPath(ApiPath.WALLET_BALANCE),
      { requiresAuth: true }
    );
  }

  async startTopUp(amount: string) {
    return await this.Api.post<
      WalletTopUpStartResult,
      RequestResponse<WalletTopUpStartResult>
    >(
      apiPath(ApiPath.WALLET_TOP_UPS),
      { amount },
      { requiresAuth: true }
    );
  }

  async getTopUp(publicId: string) {
    return await this.Api.get<
      WalletTopUpResult,
      RequestResponse<WalletTopUpResult>
    >(apiPath(ApiPath.WALLET_TOP_UP_STATUS, { id: publicId }), {
      requiresAuth: true,
    });
  }

  async getTransactions(page: number, pageSize = 20) {
    return await this.Api.get<
      WalletTransactionPage,
      RequestResponse<WalletTransactionPage>
    >(apiPath(ApiPath.WALLET_TRANSACTIONS), {
      requiresAuth: true,
      params: { page, page_size: pageSize },
    });
  }
}
