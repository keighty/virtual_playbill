var expect = require('chai').expect
var sinon = require('sinon')
var Schema = require('../../config/schema.js')

describe.only('Schema tests', function () {
  var schema, sandbox, table1

  beforeEach(function () {
    schema = new Schema()
    sandbox = sinon.sandbox.create()

    table1 = {
      name: 'tester1',
      columns: {
        fName: { type: 'string', maxlength: 66 }
      },
      primaryKey: 'fName'
    }
  })

  afterEach(function() {
    sandbox.restore();
  });

  it('should pass this canary test', function () {
    expect(true).to.be.true
  })

  describe('Column Definitions', function () {
    it('processTableSchema should invoke processColumns for a valid table schema', function (done) {
      sandbox.stub(schema, 'processColumns', function (data) {
        expect(data).to.be.eql(table1.columns)
        done()
        return []
      })

      schema.processTableSchema(table1)
    })

    it('processColumns should invoke processColumn for each column provided', function (done) {
      var columns = {
        fName: { type: 'string', maxlength: 66 }
      }
      sandbox.stub(schema, 'processColumn', function (name, data) {
        expect(name).to.be.eql('fName')
        expect(data).to.be.eql(columns.fName)
        done()
      })

      schema.processTableSchema(table1)
    })

    it('processColumns should return a list of SQL column definitions', function () {
      var columns = {
        fName: { type: 'string', maxlength: 66 },
        cmail:  { type: 'string', maxlength: 33, nonnull: true }
      }
      var result = schema.processColumns(columns)

      expect(result.length).to.be.eql(2)
    })
  })

  describe('Column Type', function () {
    var columns = {
      fName: { type: 'string', maxlength: 66 }
    }

    it('processColumn should call processType for a column', function (done) {
      sandbox.stub(schema, 'processType', function (data) {
        expect(data).to.be.eql(columns.fName)
        done()
      })

      schema.processColumns(columns)
    })

    it('processType should throw an error if there is no column type', function () {
      var props = {}
      var call = function () {
        schema.processType(props)
      }

      expect(call).to.throw(Error, 'Invalid column type')
    })

    it('processColumn should include NOT NULL for columns that should not be null', function () {
      columns.fName.nonNullable = true
      var expectedSQL = 'fName VARCHAR(66) NOT NULL'

      expect(schema.processColumn('fName', columns.fName)).to.be.eql(expectedSQL)
    })

    describe('String', function () {
      var stringColumn = {
        fName: { type: 'string', maxlength: 66 }
      }

      it('processType should call processMaxLength for a string column', function (done) {
        sandbox.stub(schema, 'processMaxLength', function (data) {
          expect(data).to.be.eql(stringColumn.fName.maxlength)
          done()
        })

        schema.processType(stringColumn.fName)
      })

      it('processType should return valid syntax for a string type', function () {
        var expectedSQL = 'VARCHAR(66)'

        expect(schema.processType(stringColumn.fName)).to.be.eql(expectedSQL)
      })

      it('processColumn should return a valid SQL syntax for a string', function () {
        var expectedSQL = 'fName VARCHAR(66)'

        expect(schema.processColumn('fName', stringColumn.fName)).to.be.eql(expectedSQL)
      })
    })

    describe('Int', function () {
      var intColumn = {
        id: {type: 'int', nonNullable: true}
      }

      it('processType should return valid syntax for an INT type', function () {
        var expectedSQL = 'id INT NOT NULL'

        expect(schema.processColumn('id', intColumn.id)).to.be.eql(expectedSQL)
      })
    })

    describe('MaxLength', function () {
      it('processMaxLength should throw an error if it has no maxlength prop', function () {
        var call = function () {
          schema.processMaxLength(undefined)
        }

        expect(call).to.throw(Error, 'Invalid schema: no maxlength')
      })

      it('processMaxLength should return valid syntax for maxLength', function () {
        var expectedSQL = '(66)'

        expect(schema.processMaxLength(columns.fName.maxlength)).to.be.eql(expectedSQL)
      })
    })

    describe('AutoIncrement', function () {
      var intColumn = {
        id: {type: 'int', nonNullable: true, auto: true}
      }

      it('processType should call processAutoIncrement', function (done) {
        sandbox.stub(schema, 'processAutoIncrement', function (data) {
          expect(data).to.be.eql(intColumn.id.auto)
          done()
        })

        schema.processType(intColumn.id)
      })

      it('processAutoIncrement should return an empty string if the column is not auto-incremented', function () {
        var auto = undefined

        expect(schema.processAutoIncrement(auto)).to.be.eql('')
      })

      it('processAutoIncrement should return AUTO_INCREMENT if the colum is auto-increments', function () {
        var auto = {auto: true}
        var expectedSQL = ' AUTO_INCREMENT'

        expect(schema.processAutoIncrement(auto)).to.be.eql(expectedSQL)
      })
    })
  })

  describe('Primary Key', function () {
    it('processTableSchema should call processPrimaryKey for the table schema', function (done) {
      sandbox.stub(schema, 'processPrimaryKey', function (data) {
        expect(data).to.be.eql(table1.primaryKey)
        done()
      })

      schema.processTableSchema(table1)
    })

    it('processPrimaryKey should return valid PRIMARY KEY SQL syntax', function () {
      var primaryKey = 'fName'
      var expectedSQL = 'PRIMARY KEY (fName)'
      expect(schema.processPrimaryKey(primaryKey)).to.be.eql(expectedSQL)
    })

    it('processPrimaryKey should throw an error if no valid primary key is set', function () {
      var primaryKey = undefined
      var call = function () {
        schema.processPrimaryKey(primaryKey)
      }

      expect(call).to.throw(Error, 'No primary key specified')
    })

    it('processPrimaryKey should handle a compound primary Key', function () {
      var primaryKey = ['fName', 'cmail']
      var expectedSQL = 'PRIMARY KEY (fName,cmail)'

      expect(schema.processPrimaryKey(primaryKey)).to.be.eql(expectedSQL)
    })
  })

  describe('Foreign Key', function () {
    var tableWithForeignKey = {
      name: 'foreigner',
      columns: {
        fName: { type: 'string', maxlength: 66 },
        cmail:  { type: 'string', maxlength: 33, nonnull: true }
      },
      primaryKey: ['cmail', 'fName'],
      foreignKey: { colName: 'fName', referenceTable: 'foo', referenceCol: 'bar' }
    }

    it('processTableSchema should call processForeignKey for the table schema', function (done) {
      sandbox.stub(schema, 'processForeignKey', function (data) {
        expect(data).to.be.eql(tableWithForeignKey.foreignKey)
        done()
      })

      schema.processTableSchema(tableWithForeignKey)
    })

    it('processForeignKey should return valid FOREIGN KEY SQL syntax', function () {
      var expectedSQL = 'FOREIGN KEY (fName) REFERENCES foo(bar)'

      expect(schema.processForeignKey(tableWithForeignKey.foreignKey)).to.be.eql(expectedSQL)
    })

    it('processForeignKey should return null if no foreign key specified', function () {
      var noForeignKey = {}

      expect(schema.processForeignKey(noForeignKey.foreignKey)).to.be.eql(undefined)
    })
  })

  describe('Table Schema', function () {
    var basicTable = {
      name: 'basic',
      columns: {
        id: {type: 'int', nonNullable: true, auto: true},
        fName: { type: 'string', maxlength: 60 },
        lName: { type: 'string', maxlength: 60 },
        email: { type: 'string', maxlength: 90, nonnull: true }
      },
      primaryKey: 'id'
    }

    var complexTable = {
      name: 'complex',
      columns: {
        fName: {type: 'string', maxlength: 60},
        email: { type: 'string', maxlength: 90, nonNullable: true }
      },
      primaryKey: ['fName', 'email'],
      foreignKey: {colName: 'email', referenceTable: 'basic', referenceCol: 'email'}
    }

    it('processTableSchema should call polishColumns', function (done) {
      var expectedArgs = [
        'id INT AUTO_INCREMENT NOT NULL',
        'fName VARCHAR(60)',
        'lName VARCHAR(60)',
        'email VARCHAR(90)'
      ]
      sandbox.stub(schema, 'polishColumns', function (data) {
        expect(data).to.be.eql(expectedArgs)
        done()
        return []
      })

      schema.processTableSchema(basicTable)
    })

    it('polishColumns should return a properly formatted string with a fk', function () {
      var expectedSQL = '(crunchy VARCHAR(100) NOT NULL, bacon VARCHAR(79), PRIMARY KEY (crunchy), FOREIGN KEY (bacon) REFERENCES canadian(bacon))'
      var col1 = 'crunchy VARCHAR(100) NOT NULL'
      var col2 = 'bacon VARCHAR(79)'
      var pk = 'PRIMARY KEY (crunchy)'
      var fk = 'FOREIGN KEY (bacon) REFERENCES canadian(bacon)'

      expect(schema.polishColumns([col1, col2], pk, fk)).to.be.eql(expectedSQL)
    })

    it('polishColumns should return a properly formatted string without a fk', function () {
      var expectedSQL = '(crunchy VARCHAR(100) NOT NULL, bacon VARCHAR(79), PRIMARY KEY (crunchy))'
      var col1 = 'crunchy VARCHAR(100) NOT NULL'
      var col2 = 'bacon VARCHAR(79)'
      var pk = 'PRIMARY KEY (crunchy)'
      var fk = undefined

      expect(schema.polishColumns([col1, col2], pk, fk)).to.be.eql(expectedSQL)
    })

    it('processTableSchema should return valid CREATE TABLE sql for basicTable', function () {
      var expectedFinalSQL = 'CREATE TABLE IF NOT EXISTS basic (id INT AUTO_INCREMENT NOT NULL, fName VARCHAR(60), lName VARCHAR(60), email VARCHAR(90), PRIMARY KEY (id))'

      expect(schema.processTableSchema(basicTable)).to.be.eql(expectedFinalSQL)
    })

    it('processTableSchema should return valid CREATE TABLE sql for a complexTable', function () {
      var expectedFinalSQL = 'CREATE TABLE IF NOT EXISTS complex (fName VARCHAR(60), email VARCHAR(90) NOT NULL, PRIMARY KEY (fName,email), FOREIGN KEY (email) REFERENCES basic(email))'

      expect(schema.processTableSchema(complexTable)).to.be.eql(expectedFinalSQL)
    })
  })
})


/* ROUGH WORK

mysql> describe complex
    -> ;
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| fName | varchar(60) | NO   | PRI |         |       |
| email | varchar(90) | NO   | PRI | NULL    |       |
+-------+-------------+------+-----+---------+-------+
2 rows in set (0.02 sec)

mysql> describe basic
    -> ;
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| fName | varchar(60) | YES  |     | NULL    |       |
| lName | varchar(60) | YES  |     | NULL    |       |
| email | varchar(90) | NO   | PRI |         |       |
+-------+-------------+------+-----+---------+-------+
3 rows in set (0.00 sec)

*/
