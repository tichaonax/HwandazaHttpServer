﻿using System.Collections.Generic;

namespace HwandazaHttpServer.ServerUtils
{
    internal class HwandazaCommand
    {
        public string Command { get; set; }
        public string Module { get; set; }
        public List<string> Lights { get; set; }
    }
}
