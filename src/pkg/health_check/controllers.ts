import * as hapi from 'hapi'
import { ResponseSuccess } from '../../utils'
import { Service } from './services'
import { Repository } from './repositorys'

export class Controller {
    private prefix: string
    private service: Service
    private server: hapi.Server

    constructor(prefix: string, server: hapi.Server) {
        const repository = new Repository()
        const service = new Service(repository)
        this.service = service
        this.server = server
        this.prefix = prefix
    }

    public GetRoutes(): any[] {
        return [
            { method: 'GET', path: `${this.prefix}/health`, handler: this.Health }
        ]
    }

    private Health = (request: any, h: any, err: Error) => {
        if (err) {
            console.log(`cannot get health: ${err.message}`)
            return this.server.methods.ResponseFail(500, 'internal server error')
        }
        const result = this.service.Health()
        if (result instanceof Error) {
            return this.server.methods.ResponseFail(500, result.message)
        }
        return this.server.methods.ResponseSuccess(result)
    }
}
