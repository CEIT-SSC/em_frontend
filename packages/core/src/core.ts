import TokenModule from "./modules/TokenModule";

export class Core {
  public tokenService: TokenModule;
  private static instance: Core;

  private constructor() {
    this.tokenService = TokenModule.getInstance();
  }

  public static getInstance(): Core {
    if (!Core.instance) {
      Core.instance = new Core();
    }
    return Core.instance;
  }
}

export default Core;
