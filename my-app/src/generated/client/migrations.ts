export default [
  {
    "statements": [
      "CREATE TABLE \"items\" (\n  \"value\" TEXT NOT NULL,\n  CONSTRAINT \"items_pkey\" PRIMARY KEY (\"value\")\n) WITHOUT ROWID;\n",
      "CREATE TABLE \"rowmap\" (\n  \"id\" TEXT NOT NULL,\n  \"pos\" INTEGER,\n  CONSTRAINT \"rowmap_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "CREATE TABLE \"colmap\" (\n  \"id\" TEXT NOT NULL,\n  \"pos\" INTEGER,\n  CONSTRAINT \"colmap_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "CREATE TABLE \"contentmap\" (\n  \"rowIndex\" TEXT NOT NULL,\n  \"colIndex\" TEXT NOT NULL,\n  \"content\" TEXT,\n  CONSTRAINT \"contentmap_colIndex_fkey\" FOREIGN KEY (\"colIndex\") REFERENCES \"colmap\" (\"id\") ON DELETE CASCADE ON UPDATE CASCADE,\n  CONSTRAINT \"contentmap_rowIndex_fkey\" FOREIGN KEY (\"rowIndex\") REFERENCES \"rowmap\" (\"id\") ON DELETE CASCADE ON UPDATE CASCADE,\n  CONSTRAINT \"contentmap_pkey\" PRIMARY KEY (\"rowIndex\", \"colIndex\")\n) WITHOUT ROWID;\n",
      "INSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.items', 1);",
      "DROP TRIGGER IF EXISTS update_ensure_main_items_primarykey;",
      "CREATE TRIGGER update_ensure_main_items_primarykey\n  BEFORE UPDATE ON \"main\".\"items\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"value\" != new.\"value\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column value as it belongs to the primary key')\n    END;\nEND;",
      "DROP TRIGGER IF EXISTS insert_main_items_into_oplog;",
      "CREATE TRIGGER insert_main_items_into_oplog\n   AFTER INSERT ON \"main\".\"items\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.items')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'items', 'INSERT', json_object('value', new.\"value\"), json_object('value', new.\"value\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_items_into_oplog;",
      "CREATE TRIGGER update_main_items_into_oplog\n   AFTER UPDATE ON \"main\".\"items\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.items')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'items', 'UPDATE', json_object('value', new.\"value\"), json_object('value', new.\"value\"), json_object('value', old.\"value\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_items_into_oplog;",
      "CREATE TRIGGER delete_main_items_into_oplog\n   AFTER DELETE ON \"main\".\"items\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.items')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'items', 'DELETE', json_object('value', old.\"value\"), NULL, json_object('value', old.\"value\"), NULL);\nEND;",
      "INSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.rowmap', 1);",
      "DROP TRIGGER IF EXISTS update_ensure_main_rowmap_primarykey;",
      "CREATE TRIGGER update_ensure_main_rowmap_primarykey\n  BEFORE UPDATE ON \"main\".\"rowmap\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"id\" != new.\"id\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n    END;\nEND;",
      "DROP TRIGGER IF EXISTS insert_main_rowmap_into_oplog;",
      "CREATE TRIGGER insert_main_rowmap_into_oplog\n   AFTER INSERT ON \"main\".\"rowmap\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.rowmap')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'rowmap', 'INSERT', json_object('id', new.\"id\"), json_object('id', new.\"id\", 'pos', new.\"pos\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_rowmap_into_oplog;",
      "CREATE TRIGGER update_main_rowmap_into_oplog\n   AFTER UPDATE ON \"main\".\"rowmap\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.rowmap')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'rowmap', 'UPDATE', json_object('id', new.\"id\"), json_object('id', new.\"id\", 'pos', new.\"pos\"), json_object('id', old.\"id\", 'pos', old.\"pos\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_rowmap_into_oplog;",
      "CREATE TRIGGER delete_main_rowmap_into_oplog\n   AFTER DELETE ON \"main\".\"rowmap\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.rowmap')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'rowmap', 'DELETE', json_object('id', old.\"id\"), NULL, json_object('id', old.\"id\", 'pos', old.\"pos\"), NULL);\nEND;",
      "INSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.colmap', 1);",
      "DROP TRIGGER IF EXISTS update_ensure_main_colmap_primarykey;",
      "CREATE TRIGGER update_ensure_main_colmap_primarykey\n  BEFORE UPDATE ON \"main\".\"colmap\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"id\" != new.\"id\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n    END;\nEND;",
      "DROP TRIGGER IF EXISTS insert_main_colmap_into_oplog;",
      "CREATE TRIGGER insert_main_colmap_into_oplog\n   AFTER INSERT ON \"main\".\"colmap\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.colmap')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'colmap', 'INSERT', json_object('id', new.\"id\"), json_object('id', new.\"id\", 'pos', new.\"pos\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_colmap_into_oplog;",
      "CREATE TRIGGER update_main_colmap_into_oplog\n   AFTER UPDATE ON \"main\".\"colmap\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.colmap')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'colmap', 'UPDATE', json_object('id', new.\"id\"), json_object('id', new.\"id\", 'pos', new.\"pos\"), json_object('id', old.\"id\", 'pos', old.\"pos\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_colmap_into_oplog;",
      "CREATE TRIGGER delete_main_colmap_into_oplog\n   AFTER DELETE ON \"main\".\"colmap\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.colmap')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'colmap', 'DELETE', json_object('id', old.\"id\"), NULL, json_object('id', old.\"id\", 'pos', old.\"pos\"), NULL);\nEND;",
      "INSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.contentmap', 1);",
      "DROP TRIGGER IF EXISTS update_ensure_main_contentmap_primarykey;",
      "CREATE TRIGGER update_ensure_main_contentmap_primarykey\n  BEFORE UPDATE ON \"main\".\"contentmap\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"colIndex\" != new.\"colIndex\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column colIndex as it belongs to the primary key')\n      WHEN old.\"rowIndex\" != new.\"rowIndex\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column rowIndex as it belongs to the primary key')\n    END;\nEND;",
      "DROP TRIGGER IF EXISTS insert_main_contentmap_into_oplog;",
      "CREATE TRIGGER insert_main_contentmap_into_oplog\n   AFTER INSERT ON \"main\".\"contentmap\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.contentmap')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'contentmap', 'INSERT', json_object('colIndex', new.\"colIndex\", 'rowIndex', new.\"rowIndex\"), json_object('colIndex', new.\"colIndex\", 'content', new.\"content\", 'rowIndex', new.\"rowIndex\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_contentmap_into_oplog;",
      "CREATE TRIGGER update_main_contentmap_into_oplog\n   AFTER UPDATE ON \"main\".\"contentmap\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.contentmap')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'contentmap', 'UPDATE', json_object('colIndex', new.\"colIndex\", 'rowIndex', new.\"rowIndex\"), json_object('colIndex', new.\"colIndex\", 'content', new.\"content\", 'rowIndex', new.\"rowIndex\"), json_object('colIndex', old.\"colIndex\", 'content', old.\"content\", 'rowIndex', old.\"rowIndex\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_contentmap_into_oplog;",
      "CREATE TRIGGER delete_main_contentmap_into_oplog\n   AFTER DELETE ON \"main\".\"contentmap\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.contentmap')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'contentmap', 'DELETE', json_object('colIndex', old.\"colIndex\", 'rowIndex', old.\"rowIndex\"), NULL, json_object('colIndex', old.\"colIndex\", 'content', old.\"content\", 'rowIndex', old.\"rowIndex\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS compensation_insert_main_contentmap_colIndex_into_oplog;",
      "CREATE TRIGGER compensation_insert_main_contentmap_colIndex_into_oplog\n  AFTER INSERT ON \"main\".\"contentmap\"\n  WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.colmap') AND\n       1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'colmap', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"colmap\" WHERE \"id\" = new.\"colIndex\";\nEND;",
      "DROP TRIGGER IF EXISTS compensation_update_main_contentmap_colIndex_into_oplog;",
      "CREATE TRIGGER compensation_update_main_contentmap_colIndex_into_oplog\n   AFTER UPDATE ON \"main\".\"contentmap\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.colmap') AND\n        1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'colmap', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"colmap\" WHERE \"id\" = new.\"colIndex\";\nEND;",
      "DROP TRIGGER IF EXISTS compensation_insert_main_contentmap_rowIndex_into_oplog;",
      "CREATE TRIGGER compensation_insert_main_contentmap_rowIndex_into_oplog\n  AFTER INSERT ON \"main\".\"contentmap\"\n  WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.rowmap') AND\n       1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'rowmap', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"rowmap\" WHERE \"id\" = new.\"rowIndex\";\nEND;",
      "DROP TRIGGER IF EXISTS compensation_update_main_contentmap_rowIndex_into_oplog;",
      "CREATE TRIGGER compensation_update_main_contentmap_rowIndex_into_oplog\n   AFTER UPDATE ON \"main\".\"contentmap\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.rowmap') AND\n        1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'rowmap', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"rowmap\" WHERE \"id\" = new.\"rowIndex\";\nEND;"
    ],
    "version": "20240429104131_148"
  }
]