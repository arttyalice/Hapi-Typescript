// Health check
import { Controller as HealthCtrl } from '../health_check/controllers'

import DefaultRoutes from './default'
import * as hapi from 'hapi'


export default function (server: hapi.Server): any[] {
    const healthCtrl = new HealthCtrl("", server)
    return [].concat(
        healthCtrl.GetRoutes(),
        DefaultRoutes(server)
    )
}