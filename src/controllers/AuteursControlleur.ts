import { Request, Response } from "express-serve-static-core";

export default class AuteursController {
    static view(req: Request, res: Response): void {
        const db = req.app.locals.db;



        const auteurs = db.prepare('SELECT * FROM auteurs').all();
        console.log(auteurs);

        res.render('pages/auteurs', {
            title: 'Auteurs',
            auteurs: auteurs
        });
    }

    static profil(req: Request, res: Response): void {

        const db = req.app.locals.db;



        const citations = db.prepare('SELECT * FROM citations').all();
        const auteurs = db.prepare('SELECT * FROM auteurs ').all();

        res.render('pages/profils', {
            title: 'Profils',
            profils: citations,
            auteurs: auteurs

        });
    }

}