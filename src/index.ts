import * as hapi from "hapi"
import { ResponseSuccess, ResponseFail } from './utils'
import { LoadENV } from './utils'
import Routes from './pkg/routes'
// middlewares
import cors from './pkg/middlewares/cors'
import globalCors from './pkg/middlewares/global_auth'
// type
import Boom = require("boom")

LoadENV("dev")

const server: hapi.Server = new hapi.Server({
    host: '0.0.0.0',
    port: process.env.APP_HAPI_PORT
})

server.method('ResponseFail', ResponseFail)
server.method('ResponseSuccess', ResponseSuccess)
server.route(Routes(server))

server.events.on('response', function (request) {
    let d = new Date()
    if (request.response instanceof Boom) {
        console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.path + ' --> ' + request.response.message)
    } else {

        console.log(`${d.getDate()}-${d.getMonth()}-${d.getFullYear()} ${d.getUTCHours()}:${d.getUTCMinutes()}:${d.getUTCSeconds()} ${request.info.remoteAddress}: ${request.method.toUpperCase()} ${request.path} --> ${request.response.statusCode}`)
    }
})

async function start() {
    try {
        await server.register([cors(), globalCors()])
        await server.start()
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
    console.log('Server running at:', server.info.uri)
}
start()