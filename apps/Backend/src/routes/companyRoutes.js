import { Router } from "express";
import companyModel from "../models/companyModel.js";
import companyServices from "../services/companyServices.js";
import companyController from "../controllers/company/companyController.js";

const companyRouter = Router();

const CompanyModel = new companyModel();
const CompanyServices = new companyServices(CompanyModel);
const CompanyController = new companyController(CompanyServices);



companyRouter.post("/add", (req, res) => {
    CompanyController.createCompany(req, res);
});

companyRouter.put("/update", (req, res) => {
    companyController.updateCompany(req, res);
});

companyRouter.delete("/remove/:id", (req, res) => {
    companyController.deleteCompany(req, res);
});


export default companyRouter;



