var user = {
  name: 'user',
  columns: {
    id: { type: 'int', nonNullable: true, auto: true },
    fName: { type: 'string', nonNullable: true, maxlength: 60 },
    lName: { type: 'string', nonNullable: true, maxlength: 60 },
  },
  primaryKey: 'id',
}

var performance = {
  name: 'performance',
  columns: {
    id: { type: 'int', nonNullable: true, auto: true },
    title: { type: 'string', nonNullable: true, maxlength: 60 },
    playwright: { type: 'string', maxlength: 60 },
    director: { type: 'string', maxlength: 60 },
    company: { type: 'string', maxlength: 60 },
    venue: { type: 'string', maxlength: 60 },
    music: { type: 'string', maxlength: 60 },
    choreographer: { type: 'string', maxlength: 60 },
    synopsis: { type: 'string', maxlength: 600 },
    category: { type: 'string', maxlength: 60 },
    image: { type: 'string', maxlength: 260 },
  },
  primaryKey: 'id',
}

var userPerformance = {
  name: 'userPerformance',
  columns: {
    userId: {type: 'int', nonNullable: true},
    performanceId: {type: 'int', nonNullable: true},
    rating: {type: 'int'},
    ticketDate: {type: 'date'},
  },
  primaryKey: ['userId', 'performanceId'],
  foreignKey: [
    {colName: 'performanceId', referenceTable: 'performance', referenceCol: 'id'},
    {colName: 'userId', referenceTable: 'user', referenceCol: 'id'},
  ],
}

var performer = {
  name: 'performer',
  columns: {
    id: { type: 'int', nonNullable: true, auto: true },
    fName: { type: 'string', maxlength: 60 },
    lName: { type: 'string', maxlength: 60 },
  },
  primaryKey: 'id',
}

var performerPerformance = {
  name: 'performerPerformance',
  columns: {
    performerId: {type: 'int', nonNullable: true},
    performanceId: {type: 'int', nonNullable: true},
  },
  primaryKey: ['performerId', 'performanceId'],
  foreignKey: [
   {colName: 'performerId', referenceTable: 'performer', referenceCol: 'id'},
   {colName: 'performanceId', referenceTable: 'performance', referenceCol: 'id'},
 ],
}

var getTableValues = function (schemaName, obj) {
  var keys = Object.keys(tableList[schemaName].columns)
  return keys.slice(1).map(function (col) {
    return '"' + obj[col] + '"'
  }).join(',')
}

var tableList = {
  getTableValues,
  user,
  performance,
  userPerformance,
  performer,
  performerPerformance,
}

module.exports = tableList
