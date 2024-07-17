import { Connection } from "mongoose";
import { DailyViewsSchema } from "./daily-views.schema";
import { IDailyViews, IDailyViewsModel } from "./daily-views.interface";

export const dailyViewsProviders = [
  {
    provide: "DAILY_VIEWS_MODEL",
    useFactory: (connection: Connection) =>
      connection.model<IDailyViews, IDailyViewsModel>(
        "dailyViews",
        DailyViewsSchema
      ),
    inject: ["DATABASE_CONNECTION"],
  },
];
