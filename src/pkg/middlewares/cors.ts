import { Plugin, Server, ResponseToolkit } from 'hapi'

export default () => {
    let middleware: Plugin<ResponseToolkit> = {
        name: 'cors-middlewares',
        version: '1.0.0',
        register: async (server: Server, options: ResponseToolkit) => {
            server.ext({
                type: 'onPreResponse',
                method: (request: any, reply: ResponseToolkit) => {
                    if (!request.headers.origin) {
                        return reply.continue
                    }

                    var response = request.response.isBoom ? request.response.output : request.response

                    response.headers['access-control-allow-origin'] = ['*']
                    response.headers['access-control-allow-credentials'] = true
                    response.headers['access-control-expose-headers'] = ['content-type', 'content-length']
                    response.headers['access-control-max-age'] = 600
                    response.headers['access-control-allow-methods'] = ['POST, GET, OPTIONS']
                    response.headers['access-control-allow-headers'] = ['Accept', 'Content-Type', 'Authorization']

                    return reply.continue
                }
            })
        }
    }
    return middleware
}