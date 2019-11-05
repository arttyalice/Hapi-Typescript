import { Plugin, Server, Request, ResponseToolkit } from 'hapi'

export default () => {
    let middleware: Plugin<ResponseToolkit> = {
        name: 'global-auth-middlewares',
        version: '1.0.0',
        register: async (server: Server, options: ResponseToolkit) => {
            server.ext({
                type: 'onPreResponse',
                method: (request: Request, reply: ResponseToolkit) => {
                    if (!request.headers['Authorization']) {
                        return reply.continue
                    }
                    return reply.continue
                }
            })
        }
    }
    return middleware
}