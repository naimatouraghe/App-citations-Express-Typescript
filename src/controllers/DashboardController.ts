import { Request, Response } from "express-serve-static-core";

export default class DashboardController {
    /**
     * Renvoie la vue de base
     * @param req 
     * @param res 
     */
    static view(req: Request, res: Response): void {

        const db = req.app.locals.db;
        const dashboardCitations = db.prepare('SELECT * FROM citations').all()
        const dashboardAuteurs = db.prepare('SELECT * FROM auteurs').all()

        res.render('pages/dashboard', {
            dashboard: dashboardCitations,
            dashboard2: dashboardAuteurs
        });
    }

    /**
     * Affiche le formulaire de modification
     * @param req 
     * @param res 
     */
    static formulaire(req: Request, res: Response): void {
        res.render('pages/update');
    }
    static formulaire2(req: Request, res: Response): void {
        res.render('pages/update-auteur');
    }

    /**Affiche le formulaire de creation de citation
     * 
     * @param req 
     * @param res 
     */
    static showForm(req: Request, res: Response): void {
        res.render('pages/create');
    }
    /**Affiche le formulaire de creation d'auteur
         * 
         * @param req 
         * @param res 
         */
    static showForm2(req: Request, res: Response): void {
        res.render('pages/create-auteur');
    }
    /**
     * Recupere le formulaire de la citation et insere en db
     * @param req 
     * @param res 
     */
    static create(req: Request, res: Response): void {

        const db = req.app.locals.db;

        db.prepare("INSERT INTO citations (citation, auteurs_id) VALUES (?, ?)").run(req.body.citation, req.body.auteurs_id)


        DashboardController.view(req, res);
    }

    /**
         * Recupere le formulaire et insere l'auteur en db
         * @param req 
         * @param res 
         */

    static create2(req: Request, res: Response): void {

        const db = req.app.locals.db;



        let auteurs = db.prepare('SELECT username FROM auteurs').all()

        console.log(auteurs);

        const auteursArray = auteurs.map((e: any) => e.username)
        console.log(auteursArray);
        auteursArray.forEach((auteur: string) => {
            if (req.body[auteur]) {
                // Verifier si present en DB
                const usernameAuteur = ('SELECT * FROM auteurs WHERE id=?')

                // Verifier si doublon en DB 
                if (usernameAuteur === undefined) {
                    db.prepare("INSERT INTO auteurs (username) VALUES (?)").run(req.body.auteur)
                }
            }
            else {
                //delete les elements en bdd
                db.prepare("DELETE FROM auteurs WHERE id=?").run(req.params.id);
            }
        });



        DashboardController.view(req, res);
    }






    /**
    * Affiche 1 citation
    * @param req 
    * @param res 
    */
    static read(req: Request, res: Response): void {
        const db = req.app.locals.db;

        const content = db.prepare('SELECT * FROM citation WHERE id = ?').get(req.params.id);

        res.render('pages/read', {
            content: content
        });
    }

    /**
    * Affiche le formulaire pour modifier une citation
    * @param req 
    * @param res 
    * 
    */
    static showFormUpdate(req: Request, res: Response) {
        const db = req.app.locals.db;

        const projets = db.prepare("SELECT * FROM citations WHERE id=?").get(req.params.id);
        console.log('test', projets);

        res.render('pages/update', {
            projets: projets
        });
    }

    /**
    * Affiche le formulaire pour modifier un auteur
    * @param req 
    * @param res 
    * 
    */
    static showFormUpdate2(req: Request, res: Response) {
        const db = req.app.locals.db;

        const projets = db.prepare("SELECT * FROM auteurs WHERE id=?").get(req.params.id);
        console.log('test', projets);

        res.render('pages/update-auteur', {
            projets: projets
        });
    }
    /**
         * Recupere le formulaire de la citation modifié et l'ajoute a la database
         * @param req 
         * @param res 
         */
    static update(req: Request, res: Response) {
        const db = req.app.locals.db;

        db.prepare("UPDATE citations SET citation=? WHERE id=?").run(req.body.citation, req.params.id);

        DashboardController.view(req, res);
    }
    /**
            * Recupere le formulaire de l'auteur modifié et l'ajoute a la database
            * @param req 
            * @param res 
            */

    static update2(req: Request, res: Response) {
        const db = req.app.locals.db;

        db.prepare("UPDATE auteurs SET username=? WHERE id=?").run(req.body.username, req.params.id);

        DashboardController.view(req, res);
    }

    /**
        * Supprime une citation
        * @param req 
        * @param res 
        */
    static delete(req: Request, res: Response) {
        const db = req.app.locals.db;

        db.prepare("DELETE FROM citations WHERE id=?").run(req.params.id);
        DashboardController.view(req, res);
    }

    /**
        * Supprime un auteur
        * @param req 
        * @param res 
        */
    static delete2(req: Request, res: Response) {
        const db = req.app.locals.db;

        db.prepare("DELETE FROM auteurs WHERE id=?").run(req.params.id);
        DashboardController.view(req, res);
    }

}