import express from "express";
import bandController from "../controller/BandController";

export const bandRouter = express.Router();

bandRouter.post("/create", bandController.createBand);
bandRouter.get("/:id", bandController.getBandById);