export { API, ApiModule } from "./ApiModule";
export { AuthApi } from "./Authentication/auth.api";
export { ShopApi } from "./Shopping/shop.api";
export { PresentationsApi } from "./Presentations/presentations.api";
export { UserProfileApi } from "./UserProfile/userProfile.api";
export { Api, BASE_URL } from "./api";
export * from "../types/ApiPaths";

// Export common types first
export * from "../types/generated/common";

// Export specific module types (avoiding conflicts)
export * from "../types/generated/accounts";
export * from "../types/generated/presentations";
export * from "../types/generated/shopping";
export * from "../types/generated/userProfile";
