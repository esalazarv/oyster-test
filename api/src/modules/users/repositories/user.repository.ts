import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async findByUsername(username: string): Promise<User> {
        return await this.findOne({
            where: { username },
        });
    }
}
