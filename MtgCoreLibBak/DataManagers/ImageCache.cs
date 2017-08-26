using System.Drawing;
using System.IO;
using System.Linq;

namespace MtgCoreLib.DataManagers
{
    public class ImageCache
    {
        private const string _imageExtension = ".bmp";
        private string _dirPath;

        public ImageCache(string dirPath)
        {
            _dirPath = dirPath;
        }

        public bool TryGetCachedImage(object id, out Image image)
        {
            image = null;
            var savePath = GetSavePath(id);
            if (!Directory.Exists(_dirPath) ||
                !Directory.EnumerateFiles(_dirPath).Any(f => Path.GetFileName(f) == GetFileName(id)))
                return false;

            using (var filestream = new FileStream(savePath, FileMode.Open))
                image = Image.FromStream(filestream);
            return true;
        }

        public void CacheImage(object id, Image image)
        {
            Directory.CreateDirectory(_dirPath);
            var savePath = GetSavePath(id);
            image.Save(savePath);
        }

        private string GetSavePath(object id)
        {
            return Path.Combine(_dirPath, id.ToString() + _imageExtension);
        }

        private string GetFileName(object id)
        {
            return id.ToString() + _imageExtension;
        }
    }
}
