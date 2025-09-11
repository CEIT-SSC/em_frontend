export enum GrantTypes {
  Password = "password",
  Refresh = "refresh_token",
}
export interface UserRegistrationSuccess {
  /**
   * @format email
   */
  email: string;
  message: string;
}

export interface UserRegistration {
  /**
   * @label Email Address
   * @maxLength 254
   * @format email
   */
  email: string;
  password: string;
  /**
   * @label First Name
   * @maxLength 150
   * @default ""
   */
  first_name?: string;
  /**
   * @label Last Name
   * @maxLength 150
   * @default ""
   */
  last_name?: string;
  /**
   * @maxLength 20
   */
  phone_number: string;
}

export interface EmailVerification {
  /**
   * @format email
   */
  email: string;
  /**
   * @minLength 6
   * @maxLength 6
   */
  code: string;
}

export interface Login {
  email: string;
  password: string;
}
export interface TokenResponse {
  handshake_token: string;
}

export interface handshakeTokenResponse {
  handshake_token: string;
}
