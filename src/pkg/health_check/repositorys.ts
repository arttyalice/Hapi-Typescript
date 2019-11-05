import { HealthRes } from './models'

export class Repository {
    public Health(): HealthRes | Error {
        return {
            status: "OK"
        }
    }
}