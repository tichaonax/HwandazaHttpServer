using System.Collections.Generic;

namespace HwandazaHttpServer.ServerUtils
{
    public sealed class HwandazaCommand
    {
        internal HwandazaCommand(){}

        public string Command { get; set; }
        public string Module { get; set; }
        public IList<string> Lights { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
    }
}
