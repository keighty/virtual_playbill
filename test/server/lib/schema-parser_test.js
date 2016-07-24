var expect = require('chai').expect
var sinon = require('sinon')
var SchemaParser = require('../../../lib/schema-parser.js')
var testSchema = require('../../helpers/test-schema')

describe('SchemaParser tests', function () {
  var schemaParser, sandbox, table1

  beforeEach(function () {
    schemaParser = new SchemaParser()
    sandbox = sinon.sandbox.create()

    table1 = {
      name: 'tester1',
      columns: {
        fName: { type: 'string', maxlength: 66 },
      },
      primaryKey: 'fName',
    }
  })

  afterEach(function () {
    sandbox.restore();
  });

  it('should pass this canary test', function () {
    expect(true).to.be.true
  })

  describe('Column Definitions', function () {
    it('processTableSchema should invoke processColumns for a valid table schema', function (done) {
      sandbox.stub(schemaParser, 'processColumns', function (data) {
        expect(data).to.be.eql(table1.columns)
        done()
        return []
      })

      schemaParser.processTableSchema(table1)
    })

    it('processColumns should invoke processColumn for each column provided', function (done) {
      var columns = {
        fName: { type: 'string', maxlength: 66 },
      }
      sandbox.stub(schemaParser, 'processColumn', function (name, data) {
        expect(name).to.be.eql('fName')
        expect(data).to.be.eql(columns.fName)
        done()
      })

      schemaParser.processTableSchema(table1)
    })

    it('processColumns should return a list of SQL column definitions', function () {
      var columns = {
        fName: { type: 'string', maxlength: 66 },
        cmail:  { type: 'string', maxlength: 33, nonnull: true },
      }
      var result = schemaParser.processColumns(columns)

      expect(result.length).to.be.eql(2)
    })
  })

  describe('Column Type', function () {
    var columns = {
      fName: { type: 'string', maxlength: 66 },
    }

    it('processColumn should call processType for a column', function (done) {
      sandbox.stub(schemaParser, 'processType', function (data) {
        expect(data).to.be.eql(columns.fName)
        done()
      })

      schemaParser.processColumns(columns)
    })

    it('processType should throw an error if there is no column type', function () {
      var props = {}
      var call = function () {
        schemaParser.processType(props)
      }

      expect(call).to.throw(Error, 'Invalid column type')
    })

    it('processColumn should include NOT NULL for columns that should not be null', function () {
      columns.fName.nonNullable = true
      var expectedSQL = 'fName VARCHAR(66) NOT NULL'

      expect(schemaParser.processColumn('fName', columns.fName)).to.be.eql(expectedSQL)
    })

    describe('String', function () {
      var stringColumn = {
        fName: { type: 'string', maxlength: 66 },
      }

      it('processType should call processMaxLength for a string column', function (done) {
        sandbox.stub(schemaParser, 'processMaxLength', function (data) {
          expect(data).to.be.eql(stringColumn.fName.maxlength)
          done()
        })

        schemaParser.processType(stringColumn.fName)
      })

      it('processType should return valid syntax for a string type', function () {
        var expectedSQL = 'VARCHAR(66)'

        expect(schemaParser.processType(stringColumn.fName)).to.be.eql(expectedSQL)
      })

      it('processColumn should return a valid SQL syntax for a string', function () {
        var expectedSQL = 'fName VARCHAR(66)'

        expect(schemaParser.processColumn('fName', stringColumn.fName)).to.be.eql(expectedSQL)
      })
    })

    describe('Int', function () {
      var intColumn = {
        id: {type: 'int', nonNullable: true},
      }

      it('processType should return valid syntax for an INT type', function () {
        var expectedSQL = 'id INT NOT NULL'

        expect(schemaParser.processColumn('id', intColumn.id)).to.be.eql(expectedSQL)
      })
    })

    describe('Date', function () {
      var dateColumn = {
        ticketDate: {type: 'date'},
      }

      it('processType should return valid syntax for a DATE type', function () {
        var expectedSQL = 'ticketDate DATE'

        expect(schemaParser.processColumn('ticketDate', dateColumn.ticketDate)).to.be.eql(expectedSQL)
      })
    })

    describe('MaxLength', function () {
      it('processMaxLength should throw an error if it has no maxlength prop', function () {
        var call = function () {
          schemaParser.processMaxLength(undefined)
        }

        expect(call).to.throw(Error, 'Invalid schema: no maxlength')
      })

      it('processMaxLength should return valid syntax for maxLength', function () {
        var expectedSQL = '(66)'

        expect(schemaParser.processMaxLength(columns.fName.maxlength)).to.be.eql(expectedSQL)
      })
    })

    describe('AutoIncrement', function () {
      var intColumn = {
        id: {type: 'int', nonNullable: true, auto: true},
      }

      it('processType should call processAutoIncrement', function (done) {
        sandbox.stub(schemaParser, 'processAutoIncrement', function (data) {
          expect(data).to.be.eql(intColumn.id.auto)
          done()
        })

        schemaParser.processType(intColumn.id)
      })

      it('processAutoIncrement should return an empty string if the column is not auto-incremented', function () {
        var auto = undefined

        expect(schemaParser.processAutoIncrement(auto)).to.be.eql('')
      })

      it('processAutoIncrement should return AUTO_INCREMENT if the colum is auto-increments', function () {
        var auto = {auto: true}
        var expectedSQL = ' AUTO_INCREMENT'

        expect(schemaParser.processAutoIncrement(auto)).to.be.eql(expectedSQL)
      })
    })
  })

  describe('Primary Key', function () {
    it('processTableSchema should call processPrimaryKey for the table schema', function (done) {
      sandbox.stub(schemaParser, 'processPrimaryKey', function (data) {
        expect(data).to.be.eql(table1.primaryKey)
        done()
      })

      schemaParser.processTableSchema(table1)
    })

    it('processPrimaryKey should return valid PRIMARY KEY SQL syntax', function () {
      var primaryKey = 'fName'
      var expectedSQL = 'PRIMARY KEY (fName)'

      expect(schemaParser.processPrimaryKey(primaryKey)).to.be.eql(expectedSQL)
    })

    it('processPrimaryKey should throw an error if no valid primary key is set', function () {
      var primaryKey = undefined
      var call = function () {
        schemaParser.processPrimaryKey(primaryKey)
      }

      expect(call).to.throw(Error, 'No primary key specified')
    })

    it('processPrimaryKey should handle a compound primary Key', function () {
      var primaryKey = ['fName', 'cmail']
      var expectedSQL = 'PRIMARY KEY (fName,cmail)'

      expect(schemaParser.processPrimaryKey(primaryKey)).to.be.eql(expectedSQL)
    })
  })

  describe('Foreign Key', function () {
    it('processTableSchema should call processForeignKey for the table schema', function (done) {
      sandbox.stub(schemaParser, 'processForeignKey', function (data) {
        expect(data).to.be.eql(testSchema.basicTable.foreignKey)
        done()
      })

      schemaParser.processTableSchema(testSchema.basicTable)
    })

    it('processForeignKey should return valid FOREIGN KEY SQL syntax', function () {
      var expectedSQL = 'FOREIGN KEY (fName) REFERENCES foo(bar)'

      expect(schemaParser.processForeignKey(testSchema.basicTable.foreignKey)).to.be.eql(expectedSQL)
    })

    it('processForeignKey should return null if no foreign key specified', function () {
      var noForeignKey = {}

      expect(schemaParser.processForeignKey(noForeignKey.foreignKey)).to.be.eql(undefined)
    })

    it('processForeignKey should handle an array of foreign keys', function () {
      var expectedSQL = 'FOREIGN KEY (fName) REFERENCES foo(bar), FOREIGN KEY (email) REFERENCES crunchy(bacon)'

      expect(schemaParser.processForeignKey(testSchema.complexTable.foreignKey)).to.be.eql(expectedSQL)

    })
  })

  describe('Table Schema', function () {
    it('processTableSchema should call polishColumns', function (done) {
      var expectedArgs = [
        'id INT AUTO_INCREMENT NOT NULL',
        'fName VARCHAR(60)',
        'lName VARCHAR(60)',
        'email VARCHAR(90)',
      ]
      sandbox.stub(schemaParser, 'polishColumns', function (data) {
        expect(data).to.be.eql(expectedArgs)
        done()
        return []
      })

      schemaParser.processTableSchema(testSchema.basicTable)
    })

    it('polishColumns should return a properly formatted string with a fk', function () {
      var expectedSQL = '(crunchy VARCHAR(100) NOT NULL, bacon VARCHAR(79), PRIMARY KEY (crunchy), FOREIGN KEY (bacon) REFERENCES canadian(bacon))'
      var col1 = 'crunchy VARCHAR(100) NOT NULL'
      var col2 = 'bacon VARCHAR(79)'
      var pk = 'PRIMARY KEY (crunchy)'
      var fk = 'FOREIGN KEY (bacon) REFERENCES canadian(bacon)'

      expect(schemaParser.polishColumns([col1, col2], pk, fk)).to.be.eql(expectedSQL)
    })

    it('polishColumns should return a properly formatted string without a fk', function () {
      var expectedSQL = '(crunchy VARCHAR(100) NOT NULL, bacon VARCHAR(79), PRIMARY KEY (crunchy))'
      var col1 = 'crunchy VARCHAR(100) NOT NULL'
      var col2 = 'bacon VARCHAR(79)'
      var pk = 'PRIMARY KEY (crunchy)'
      var fk = undefined

      expect(schemaParser.polishColumns([col1, col2], pk, fk)).to.be.eql(expectedSQL)
    })

    it('processTableSchema should return valid CREATE TABLE sql for basicTable', function () {
      var expectedFinalSQL = 'CREATE TABLE IF NOT EXISTS basic (id INT AUTO_INCREMENT NOT NULL, fName VARCHAR(60), lName VARCHAR(60), email VARCHAR(90), PRIMARY KEY (id), FOREIGN KEY (fName) REFERENCES foo(bar));'

      expect(schemaParser.processTableSchema(testSchema.basicTable)).to.be.eql(expectedFinalSQL)
    })

    it('processTableSchema should return valid CREATE TABLE sql for a complexTable', function () {
      var expectedFinalSQL = 'CREATE TABLE IF NOT EXISTS complex (fName VARCHAR(60), email VARCHAR(90) NOT NULL, PRIMARY KEY (fName,email), FOREIGN KEY (fName) REFERENCES foo(bar), FOREIGN KEY (email) REFERENCES crunchy(bacon));'

      expect(schemaParser.processTableSchema(testSchema.complexTable)).to.be.eql(expectedFinalSQL)
    })
  })

  describe('Full Schema', function () {
    it('parseSchema should call processTableSchema for each table', function () {
      var schemaParserMock = sandbox.mock(schemaParser)
      schemaParserMock.expects('processTableSchema').withArgs(testSchema.basicTable)
      schemaParserMock.expects('processTableSchema').withArgs(testSchema.complexTable)

      schemaParser.parseSchema(testSchema)
      schemaParserMock.verify()
    })

    it('parseSchema should return valid SQL to create the schema', function () {
      var expectedSQL = [
        'CREATE TABLE IF NOT EXISTS basic (id INT AUTO_INCREMENT NOT NULL, fName VARCHAR(60), lName VARCHAR(60), email VARCHAR(90), PRIMARY KEY (id), FOREIGN KEY (fName) REFERENCES foo(bar));',
        'CREATE TABLE IF NOT EXISTS complex (fName VARCHAR(60), email VARCHAR(90) NOT NULL, PRIMARY KEY (fName,email), FOREIGN KEY (fName) REFERENCES foo(bar), FOREIGN KEY (email) REFERENCES crunchy(bacon));',
      ]

      expect(schemaParser.parseSchema(testSchema)).to.be.eql(expectedSQL)
    })
  })
})


/* ROUGH WORK

mysql> describe complex
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| fName | varchar(60) | NO   | PRI |         |       |
| email | varchar(90) | NO   | PRI | NULL    |       |
+-------+-------------+------+-----+---------+-------+
2 rows in set (0.02 sec)

mysql> describe basic
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| fName | varchar(60) | YES  |     | NULL    |       |
| lName | varchar(60) | YES  |     | NULL    |       |
| email | varchar(90) | NO   | PRI |         |       |
+-------+-------------+------+-----+---------+-------+
3 rows in set (0.00 sec)

*/
