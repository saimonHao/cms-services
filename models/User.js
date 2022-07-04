const { Model, snakeCaseMappers } = require('objection');

class User extends Model {
    static get tableName() {
        return 'user';
    }
    static get columnNameMappers() {
        return snakeCaseMappers();
    }
}

module.exports = User 