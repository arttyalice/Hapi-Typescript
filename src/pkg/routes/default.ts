import * as hapi from 'hapi'

export default function (server: hapi.Server) {
    return [
        {
            method: ['GET', 'POST'],
            path: '/{any*}',
            handler: (req: any, h: any, err: Error) => {
                return server.methods.ResponseFail(404, 'not found')
            }
        }
    ]
}