using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Text;
using System.Threading.Tasks;
using Windows.ApplicationModel.AppService;
using Windows.Foundation.Collections;
using Windows.Networking.Sockets;
using Windows.Storage.Streams;
using HwandazaHttpServer.ServerUtils;
using Newtonsoft.Json;

namespace HwandazaHttpServer
{
    public sealed class HwandazaHttpServer : IDisposable
    {
        private const string okHtmlString = "<html><head><title>Hwandaza Automation</title></head><body>Hi There</body></html>";

        private const uint BufferSize = 8192;
        private readonly int _httpServerPort = 8100;
        private readonly StreamSocketListener _streamSocketListener;
        private AppServiceConnection _appServiceConnection;

        public HwandazaHttpServer(int httpServerPort)
        {
            _streamSocketListener = new StreamSocketListener();
            _streamSocketListener.Control.KeepAlive = true;
            _streamSocketListener.Control.NoDelay = true;
            _httpServerPort = httpServerPort;
            _streamSocketListener.ConnectionReceived += async (s, e) => { await ProcessRequestAsync(e.Socket); };
        }

        public async void Dispose()
        {
            await _streamSocketListener.CancelIOAsync();
            _streamSocketListener.Dispose();
        }

        public void StartServer()
        {
            Task.Run(async () =>
                           {
                               await _streamSocketListener.BindServiceNameAsync(_httpServerPort.ToString());

                               // Initialize the AppServiceConnection
                               _appServiceConnection = new AppServiceConnection
                                                       {
                                                           PackageFamilyName ="HwandazaWebService_7c1xvdqapnqy0",
                                                           AppServiceName = "HwandazaAppCommunicationService"
                                                       };

                               // Send a initialize request 
                               var res = await _appServiceConnection.OpenAsync();
                               if (res != AppServiceConnectionStatus.Success)
                               {
                                   throw new Exception("Failed to connect to the AppService");
                               }
                           });
        }

        public void StopServer()
        {
            var stopCommand = new HwandazaCommand()
                              {
                                  Command = "Stop",
                                  Method = "Post",
                                  Module = "Operations"
                              };
            var hwandazaMessage = new ValueSet {{"HwandazaCommand", JsonConvert.SerializeObject(stopCommand)}};
#pragma warning disable CS4014
            _appServiceConnection.SendMessageAsync(hwandazaMessage);
#pragma warning restore CS4014
        }

        private async Task ProcessRequestAsync(StreamSocket socket)
        {
            // this works for text only
            StringBuilder request = new StringBuilder();
            byte[] data = new byte[BufferSize];
            IBuffer buffer = data.AsBuffer();
            uint dataRead = BufferSize;
            using (IInputStream input = socket.InputStream)
            {
                while (dataRead == BufferSize)
                {
                    await input.ReadAsync(buffer, BufferSize, InputStreamOptions.Partial);
                    request.Append(Encoding.UTF8.GetString(data, 0, data.Length));
                    dataRead = buffer.Length;
                }
            }

            var restResponse = new RestResponse(socket, _appServiceConnection, request);
            restResponse.ProcessRequest();
        }
    }
}
