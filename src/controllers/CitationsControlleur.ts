import { Request, Response } from "express-serve-static-core";

export default class CitationsController {
    static view(req: Request, res: Response): void {

        const db = req.app.locals.db;

        const citations = db.prepare('SELECT citation FROM citations LIMIT 10').all();


        res.render('pages/citations', {
            title: 'Citations',
            citations: citations
        });
    }


}