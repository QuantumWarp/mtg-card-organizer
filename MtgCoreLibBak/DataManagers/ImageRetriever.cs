using MtgCoreLib.Utils;
using System;
using System.Drawing;
using System.Windows.Media.Imaging;

namespace MtgCoreLib.DataManagers
{
    public class ImageRetriever
    {
        private static ImageRetriever _instance;

        public static ImageRetriever Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new ImageRetriever();
                return _instance;
            }
        }

        private const string _cardCacheDirPath = "./CardImageCache";
        private const string _gathererUriString = "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid={0}&type=card";
        private ImageCache _cardCache;

        public ImageRetriever()
        {
            _cardCache = new ImageCache(_cardCacheDirPath);
        }
        
        public BitmapImage GetGathererImage(Card card)
        {
            if (_cardCache.TryGetCachedImage(card.Id, out Image image))
                return new Bitmap(image).ToBitmapImage();

            var urlString = string.Format(_gathererUriString, card.Id);
            var bitmapImage = new BitmapImage(new Uri(urlString));
            bitmapImage.DownloadCompleted += (x, y) => BitmapImage_DownloadCompleted(card, bitmapImage);
            return bitmapImage;
        }

        private void BitmapImage_DownloadCompleted(Card card, BitmapImage bitmapImage)
        {
            _cardCache.CacheImage(card.Id, bitmapImage.ToBitmap());
        }
    }
}
