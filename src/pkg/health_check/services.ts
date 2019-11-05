import { Repository } from './repositorys'
import { HealthRes } from './models'
import { types } from 'util'

export class Service {
    private repo: Repository
    constructor(repo: Repository) {
        this.repo = repo
    }

    public Health(): HealthRes | Error {
        const result = this.repo.Health()
        return result
    }
}
