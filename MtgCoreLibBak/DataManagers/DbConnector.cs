using LiteDB;
using System.Collections.Generic;
using System.IO;

namespace MtgCoreLib.DataManagers
{
    public class DbConnector
    {
        private static DbConnector _instance;

        public static DbConnector Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new DbConnector();
                    _instance.Connect();
                }
                return _instance;
            }
        }
        
        private const string _defaultDbFilePath = "./Database/mtgcorelib.ldb";
        private LiteDatabase _db;

        public void Connect(string dbFilePath = null)
        {
            dbFilePath = dbFilePath ?? _defaultDbFilePath;
            Directory.CreateDirectory(Path.GetDirectoryName(dbFilePath));
            _db = new LiteDatabase(dbFilePath);
        }

        public void Upsert<T>(T item)
        {
            var collection = _db.GetCollection<T>();
            collection.Upsert(item);
        }

        public T GetItemById<T>(BsonValue id)
        {
            var collection = _db.GetCollection<T>();
            return collection.FindById(id);
        }

        public IEnumerable<T> GetAllItems<T>()
        {
            var collection = _db.GetCollection<T>();
            return collection.FindAll();
        }
    }
}
