import { Request, Response } from "express-serve-static-core";

export default class HomeController {
    /**
    * Je veux afficher la dernière citation
    * @param req 
    * @param res 
    */
    static index(req: Request, res: Response): void {

        const db = req.app.locals.db;


        //reste à trouver le moyen d'afficher le dernier en date

        const lastCitation = db.prepare('SELECT citation FROM citations ORDER BY created_at ASC').all();
        console.log(lastCitation);
        const lastCitationArray = lastCitation.map((e: any) => e.citation)
        //console.log(lastCitationtest);

        const auteur = db.prepare('SELECT username FROM auteurs').all()
        const auteur_id = db.prepare('SELECT auteurs_id FROM citations').all()

        if (auteur == auteur_id) {
            console.log('ok!');

        } else {
            console.log('not ok :( grrrrr');
        }

        res.render('pages/index', {
            citation: lastCitationArray[0],
            auteur: auteur

        });
    }




}