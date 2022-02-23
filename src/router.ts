import { Application } from "express";
import HomeController from "./controllers/HomeController";
import AuteursController from "./controllers/AuteursControlleur";
import CitationsController from "./controllers/CitationsControlleur";
import DashboardController from "./controllers/DashboardController";


export default function route(app: Application) {
    /** Static pages **/
    app.get('/', (req, res) => {
        HomeController.index(req, res);
    });

    app.get('/auteurs', (req, res) => {
        AuteursController.view(req, res);
    });


    app.get('/citations', (req, res) => {
        CitationsController.view(req, res);
    });

    app.get('/dashboard', (req, res) => {
        DashboardController.view(req, res);
    });



    app.get('/create', (req, res) => {
        DashboardController.showForm(req, res)
    });
    app.post('/create', (req, res) => {
        DashboardController.create(req, res)
    });
    app.get('/create-auteur', (req, res) => {
        DashboardController.showForm2(req, res)
    });
    app.post('/create-auteur', (req, res) => {
        DashboardController.create2(req, res)
    });


    app.get('/update/:id', (req, res) => {
        DashboardController.showFormUpdate(req, res);
    });
    app.post('/update/:id', (req, res) => {
        DashboardController.update(req, res)
    });

    app.get('/update-auteur/:id', (req, res) => {
        DashboardController.showFormUpdate2(req, res);
    });
    app.post('/update-auteur/:id', (req, res) => {
        DashboardController.update2(req, res)
    });
    app.get('/profils', (req, res) => {
        AuteursController.profil(req, res);
    });

    app.get('/delete/:id', (req, res) => {
        DashboardController.delete(req, res)
    });

    app.get('/delete-auteur/:id', (req, res) => {
        DashboardController.delete2(req, res)
    });
}
