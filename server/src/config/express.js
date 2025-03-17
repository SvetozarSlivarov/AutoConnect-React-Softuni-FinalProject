import express from "express";
import cors from "cors";

const configureExpress = (app) => {
    app.use(express.json());
    app.use(cors());
};

export default configureExpress;