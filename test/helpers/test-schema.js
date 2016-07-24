var basicTable = {
  name: 'basic',
  columns: {
    id: {type: 'int', nonNullable: true, auto: true},
    fName: { type: 'string', maxlength: 60 },
    lName: { type: 'string', maxlength: 60 },
    email: { type: 'string', maxlength: 90, nonnull: true },
  },
  primaryKey: 'id',
  foreignKey: { colName: 'fName', referenceTable: 'foo', referenceCol: 'bar' },
}

var complexTable = {
  name: 'complex',
  columns: {
    fName: {type: 'string', maxlength: 60},
    email: { type: 'string', maxlength: 90, nonNullable: true },
  },
  primaryKey: ['fName', 'email'],
  foreignKey: [
    { colName: 'fName', referenceTable: 'foo', referenceCol: 'bar' },
    { colName: 'email', referenceTable: 'crunchy', referenceCol: 'bacon' },
  ],
}

module.exports = {
  basicTable,
  complexTable,
}
