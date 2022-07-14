const { Model, snakeCaseMappers } = require('objection');
class Role extends Model {
    static get tableName() {
        return 'role';
    }
    static get columnNameMappers() {
        return snakeCaseMappers();
    }
}
module.exports = Role 