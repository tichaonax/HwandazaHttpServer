using System;
using System.Threading.Tasks;
using Windows.ApplicationModel.AppService;
using Windows.Foundation.Collections;
using Windows.Networking.Sockets;
using HwandazaHttpServer.ServerUtils;
using Newtonsoft.Json;

namespace HwandazaHttpServer
{
    public sealed class HwandazaHttpServer : IDisposable
    {
        private readonly int _httpServerPort; // = 8100;
        private readonly StreamSocketListener _streamSocketListener;
        private AppServiceConnection _appServiceConnection;
        private readonly RequestParser _requestParser;
        private readonly StaticFileHandler _staticFileHandler;

        public HwandazaHttpServer(int httpServerPort, string staticFilesFolder)
        {
            _streamSocketListener = new StreamSocketListener();
            _streamSocketListener.Control.KeepAlive = true;
            _streamSocketListener.Control.NoDelay = true;
            _httpServerPort = httpServerPort;
            _staticFileHandler = new StaticFileHandler(staticFilesFolder);
            _requestParser = new RequestParser();
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
                                  Module = "Operations"
                              };
            var hwandazaMessage = new ValueSet {{"HwandazaCommand", JsonConvert.SerializeObject(stopCommand)}};
#pragma warning disable CS4014
            _appServiceConnection.SendMessageAsync(hwandazaMessage);
#pragma warning restore CS4014
        }

        private async Task ProcessRequestAsync(StreamSocket socket)
        {
            Request request;
            try
            {
                var requestText = await RequestUtils.ReadRequest(socket);
                request = _requestParser.ParseRequestText(requestText, socket.Information.LocalAddress, socket.Information.LocalPort);
            }
            catch (Exception ex)
            {
                await RequestUtils.WriteInternalServerErrorResponse(socket, ex);
                return;
            }

            var requestHandler = new RequestHandler(socket, _appServiceConnection, request, _staticFileHandler, _requestParser);
            await requestHandler.HandleRequestAsync();
        }
    }
}
