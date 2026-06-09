import cors from "cors";
import express from "express";

import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

t.router({
  // query
  sayHi: t.procedure.query(() => {
    return "Hi";
  }),

  //   mutation
  logToServer: t.procedure
    .input((v) => {
      // we type narrow here
      if (typeof v === "string") return v;
      throw new Error("Invalid input: Expected string");
    })
    .mutation((req) => {
      console.log(`${req}`);
    }),
});

const app = express();
// app.use(cors({ origin: "http://localhost:5173" }));
app.listen(3000, () => {
  console.log("listening @ port 3000 :p");
});

app.get("/", (req, res) => {
  res.json({ h: "h" });
});
