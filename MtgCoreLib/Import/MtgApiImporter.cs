using MtgApiManager.Lib.Service;
using MtgCoreLib.DataManagers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MtgCoreLib.Import
{
    public class MtgApiImporter
    {
        private CardService _cardService;

        public MtgApiImporter(DbConnector dbConnector)
        {
            _cardService = new CardService();
        }
    }
}
