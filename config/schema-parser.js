var SchemaParser = function () {
  this.processTableSchema = function (tableSchema) {
    var baseSQL = 'CREATE TABLE IF NOT EXISTS'
    var tableName = tableSchema.name
    var columns = this.processColumns(tableSchema.columns)
    var primaryKey = this.processPrimaryKey(tableSchema.primaryKey)
    var foreignKey = this.processForeignKey(tableSchema.foreignKey)
    var finalColumns = this.polishColumns(columns, primaryKey, foreignKey)

    return [baseSQL, tableName, finalColumns].join(' ')
  }

  this.processColumns = function (columns) {
    var self = this
    return Object.keys(columns).map(function (col) {
      return self.processColumn(col, columns[col])
    })
  }

  this.processColumn = function (name, props) {
    var self = this
    var type = self.processType(props)
    var nonNull = props.nonNullable ? 'NOT NULL' : ''

    return [name, type, nonNull].join(' ').trim()
  }

  this.processType = function (props) {
    var self = this
    switch (props.type) {
      case 'string':
        return 'VARCHAR' + self.processMaxLength(props.maxlength)
      case 'int':
        return 'INT' + self.processAutoIncrement(props.auto)
      default:
        throw new Error('Invalid column type provided: ' + props.type)
    }
  }

  this.processMaxLength = function (maxlength) {
    if (!maxlength) throw new Error('Invalid schema: no maxlength')
    return '(' + maxlength + ')'
  }

  this.processAutoIncrement = function (autoInc) {
    if (!autoInc) return ''
    return ' AUTO_INCREMENT'
  }

  this.processPrimaryKey = function (key) {
    if (!key) throw new Error('No primary key specified')
    return 'PRIMARY KEY (' + key + ')'
  }

  this.processForeignKey = function (key) {
    if (!key) return
    var colName = key.colName
    var referenceTable = key.referenceTable
    var referenceCol = key.referenceCol

    return 'FOREIGN KEY (' + colName + ') REFERENCES ' + referenceTable + '(' + referenceCol + ')'
  }

  this.polishColumns = function (cols, pk, fk) {
    var str = cols.concat(pk).join(', ')
    if (fk) str += ', ' + fk
    return '(' + str + ')'
  }
}

var users = {
  id: { type: 'increments', nonnull: true, primary: true },
  f_name: { type: 'string', nonnull: true, maxlength: 60 },
  l_name: { type: 'string', nonnull: true, maxlength: 60 }
}

var performance = {
  id: { type: 'increments', nonnull: true, primary: true },
  title: { type: 'string', nonnull: true, maxlength: 60 },
  playwright: { type: 'string', maxlength: 60 },
  director: { type: 'string', maxlength: 60 },
  company: { type: 'string', maxlength: 60 },
  venue: { type: 'string', maxlength: 60 },
  music: { type: 'string', maxlength: 60 },
  choreographer: { type: 'string', maxlength: 60 },
  synopsis: { type: 'string', maxlength: 600 },
  category: { type: 'string', maxlength: 60 },
  image: { type: 'string', maxlength: 260 }
}

module.exports = SchemaParser
