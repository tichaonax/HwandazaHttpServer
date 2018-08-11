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
using System.Net.Http;

namespace HwandazaHttpServer
{
    public sealed class HwandazaHttpServer : IDisposable
    {
        private const string okHtmlString = "<html><head><title>Hwandaza Automation</title></head><body>Hi There</body></html>";

        private const uint BufferSize = 8192;
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
                                  Method = "Post",
                                  Module = "Operations"
                              };
            var hwandazaMessage = new ValueSet {{"HwandazaCommand", JsonConvert.SerializeObject(stopCommand)}};
#pragma warning disable CS4014
            _appServiceConnection.SendMessageAsync(hwandazaMessage);
#pragma warning restore CS4014
        }

        //private async Task ProcessRequestAsyncX(StreamSocket socket)
        //{
        //    // this works for text only
        //    StringBuilder request = new StringBuilder();
        //    byte[] data = new byte[BufferSize];
        //    IBuffer buffer = data.AsBuffer();
        //    uint dataRead = BufferSize;
        //    using (IInputStream input = socket.InputStream)
        //    {
        //        while (dataRead == BufferSize)
        //        {
        //            await input.ReadAsync(buffer, BufferSize, InputStreamOptions.Partial);
        //            request.Append(Encoding.UTF8.GetString(data, 0, data.Length));
        //            dataRead = buffer.Length;
        //        }
        //    }

        //    var restResponse = new RestResponse(socket, _appServiceConnection, request);
        //    restResponse.ProcessRequest();
        //}

        private async Task ProcessRequestAsync(StreamSocket socket)
        {
            Request request;
            try
            {
                var requestText = await ReadRequest(socket);
                request = _requestParser.ParseRequestText(requestText, socket.Information.LocalAddress, socket.Information.LocalPort);
            }
            catch (Exception ex)
            {
                await WriteInternalServerErrorResponse(socket, ex);
                return;
            }

            if (request.Method.Method == HttpMethod.Get.Method)
            {
                HttpResponse response;
                try
                {
                    response = await _staticFileHandler.HandleRequest(request);
                }
                catch (Exception ex)
                {
                    await WriteInternalServerErrorResponse(socket, ex);
                    return;
                }
                await WriteResponse(response, socket);
            }
            else
            {
                if (request.Method.Method == HttpMethod.Post.Method)
                { 
                    var restResponse = new RestResponse(socket, _appServiceConnection, request);
                    restResponse.ProcessRequest();
                }
            }

            





        }

        private static async Task WriteInternalServerErrorResponse(StreamSocket socket, Exception ex)
        {
            var httpResponse = GetInternalServerError(ex);
            await WriteResponse(httpResponse, socket);
        }

        private static HttpResponse GetInternalServerError(Exception exception)
        {
            var errorMessage = "Internal server error occurred.";
            if (Debugger.IsAttached)
                errorMessage += Environment.NewLine + exception;

            var httpResponse = new HttpResponse(Windows.Web.Http.HttpStatusCode.InternalServerError, errorMessage);
            return httpResponse;
        }

        private static async Task<string> ReadRequest(StreamSocket socket)
        {
            var httpStreamContent = new Windows.Web.Http.HttpStreamContent(socket.InputStream);

            var stringContent = await httpStreamContent.ReadAsInputStreamAsync();
            var request = new StringBuilder();
            using (var input = stringContent)
            {
                var data = new byte[BufferSize];
                var buffer = data.AsBuffer();
                var dataRead = BufferSize;
                while (dataRead == BufferSize)
                {
                    await input.ReadAsync(buffer, BufferSize, InputStreamOptions.Partial);
                    request.Append(Encoding.UTF8.GetString(data, 0, data.Length));
                    dataRead = buffer.Length;
                }
            }
            return request.ToString();
        }

        private static async Task WriteResponse(HttpResponse response, StreamSocket socket)
        {
            using (var resp = socket.OutputStream.AsStreamForWrite())
            {
                var bodyArray = Encoding.UTF8.GetBytes(response.Content);
                var stream = new MemoryStream(bodyArray);
                var headerBuilder = new StringBuilder();
                headerBuilder.AppendLine($"HTTP/1.1 {(int)response.StatusCode} {response.StatusCode}");
                headerBuilder.AppendLine("Connection: close");
                headerBuilder.AppendLine($"Content-Length: {stream.Length}");

                foreach (var header1 in response.Headers)
                {
                    headerBuilder.AppendLine($"{header1.Key}: {header1.Value}");
                }
                headerBuilder.AppendLine();

                var headerArray = Encoding.UTF8.GetBytes(headerBuilder.ToString());
                await resp.WriteAsync(headerArray, 0, headerArray.Length);
                await stream.CopyToAsync(resp);
                await resp.FlushAsync();
            }
        }
    }
}
