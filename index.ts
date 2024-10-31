import express, { Router } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

const app = express();
const router: Router = Router();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);
app.use("/api", router);

router.post("/contact", async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);

    res.jsonp({ message: `Thank you for your interest, ${name}` });
  } catch (e) {
    const err = e as Error;
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
});

const start = (): void => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`Server works on port ${process.env.PORT}`);
    });
  } catch (e) {
    console.error("Failed to start the server:", e);
  }
};

start();
