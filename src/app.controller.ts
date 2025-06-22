import { Elysia } from "elysia";
import { dayjs } from "./libs/plugins/dayjs.plugin";

const AppController = new Elysia().get("/", () => {
  return {
    status: "success",
    message: "Elysia Running",
    date: dayjs().utc().toDate(),
  };
});

export default AppController;
