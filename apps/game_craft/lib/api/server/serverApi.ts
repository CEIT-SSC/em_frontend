import { serverHttpService } from "@ssc/core";
import { ApiModule } from "@ssc/core";

export const serverApi = new ApiModule(serverHttpService);
