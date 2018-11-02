using System;
using System.Threading.Tasks;
using Windows.Networking.Sockets;
using HwandazaHttpServer.ServerUtils;
using System.IO;
using Windows.ApplicationModel;

namespace HwandazaHttpServer
{
    public sealed class HwandazaHttpServer : IDisposable
    {
        private readonly int _httpServerPort;
        private StreamSocketListener _streamSocketListener;
        private readonly RequestParser _requestParser;
        private readonly StaticFileHandler _staticFileHandler;
        private string _staticFilesFolder;

        public HwandazaHttpServer(int httpServerPort, string staticFilesFolder)
        {
            _httpServerPort = httpServerPort;
            _staticFileHandler = new StaticFileHandler(staticFilesFolder);
            _staticFilesFolder = staticFilesFolder;
            _requestParser = new RequestParser();
        }
        
        private string GetAbsoluteBasePathUri(string relativeOrAbsoluteBasePath)
        {
            var basePathUri = new Uri(relativeOrAbsoluteBasePath, UriKind.RelativeOrAbsolute);
            if (basePathUri.IsAbsoluteUri)
                return relativeOrAbsoluteBasePath;
            else
                return Path.Combine(Package.Current.InstalledLocation.Path, relativeOrAbsoluteBasePath);
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
                _streamSocketListener = new StreamSocketListener();
                _streamSocketListener.Control.QualityOfService = SocketQualityOfService.LowLatency;
                _streamSocketListener.Control.KeepAlive = true;
                _streamSocketListener.Control.NoDelay = true;
                _streamSocketListener.ConnectionReceived += async (s, e) => { await ProcessRequestAsync(e.Socket); };
                await _streamSocketListener.BindServiceNameAsync(_httpServerPort.ToString());
            });
        }

        public void StopServer()
        {
            try
            {
                Task.Run(async () =>
                {
                    if (_streamSocketListener != null)
                    {
                        await _streamSocketListener.CancelIOAsync();
                        _streamSocketListener.Dispose();
                    }
                    _streamSocketListener = null;
                });
            }
            catch
            {
            }
            finally
            {
                _streamSocketListener = null;
            }
        }

        private async Task ProcessRequestAsync(StreamSocket socket)
        {
            Request request;
            RequestHandler requestHandler = null;
            string requestText = null;
            try
            {
                requestText = await RequestUtils.ReadRequest(socket);
                request = _requestParser.ParseRequestText(requestText, socket.Information.LocalAddress, socket.Information.LocalPort);
                requestHandler = new RequestHandler(socket, request, _staticFileHandler, _requestParser);
                await requestHandler.HandleRequestAsync();
            }
            catch (Exception ex)
            {
                try
                {
                    //await Logger.WriteDebugLog("Error ProcessRequestAsync =>" + ex.Message + "Trace" + ex.StackTrace);
                    await RequestUtils.WriteInternalServerErrorResponse(socket, ex);
                }
                catch (Exception innnerException)
                {
                    //await Logger.WriteDebugLog("Error WriteInternalServerErrorResponse =>" + ex.Message + "Trace" + innnerException.StackTrace);
                }
            }
            finally
            {
                // Clean up by disposing the socket.
                request = null;
                requestText = null;
                requestHandler = null;
                if (socket != null)
                    socket.Dispose();
            }
        }
    }
}
