import {RedirectResponse, Request, Route, Session, Template} from '@byteshift/harmony';

export class AppController
{
    @Route("/")
    @Template("index.html")
    public indexAction(session: Session)
    {
        return {
            nickname: session.get('nickname', '')
        };
    }

    @Route("/app", {method: "POST"})
    @Template("app.html")
    public appAction(request: Request, session: Session): any
    {
        session.set('nickname', request.get('nickname'));

        return {
            nickname: session.get('nickname', '')
        };
    }
}
