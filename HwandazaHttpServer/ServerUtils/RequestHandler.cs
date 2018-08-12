using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.ApplicationModel.AppService;
using Windows.Networking.Sockets;
using Windows.Web.Http;

namespace HwandazaHttpServer.ServerUtils
{
    class RequestHandler
    {
        private readonly StreamSocket _streamSocket;
        private readonly AppServiceConnection _appServiceConnection;
        private readonly Request _request;
        private readonly RequestParser _requestParser;
        private readonly StaticFileHandler _staticFileHandler;

        public RequestHandler(StreamSocket socket, AppServiceConnection appServiceConnection, Request request, StaticFileHandler staticFileHandler, RequestParser requestParser)
        {
            _streamSocket = socket;
            _appServiceConnection = appServiceConnection;
            _request = request;
            _staticFileHandler = staticFileHandler;
            _requestParser = requestParser;
        }

        public async Task HandleRequestAsync()
        {
            //Request request;
            //try
            //{
            //    var requestText = await RequestUtils.ReadRequest(_streamSocket);
            //    request = _requestParser.ParseRequestText(requestText, _streamSocket.Information.LocalAddress, _streamSocket.Information.LocalPort);
            //}
            //catch (Exception ex)
            //{
            //    await RequestUtils.WriteInternalServerErrorResponse(_streamSocket, ex);
            //    return;
            //}

            await ProcessRequestAsync();
        }


        private async Task ProcessRequestAsync()
        {
            if (_request.Method.Method == HttpMethod.Get.Method)
            {
                HttpResponse response;
                try
                {
                    response = await _staticFileHandler.HandleRequest(_request);
                }
                catch (Exception ex)
                {
                    await RequestUtils.WriteInternalServerErrorResponse(_streamSocket, ex);
                    return;
                }
                await RequestUtils.WriteResponse(response, _streamSocket);
            }
            else
            {
                if (_request.Method.Method == HttpMethod.Post.Method)
                {
                    var restResponse = new RestResponse(_streamSocket, _appServiceConnection, _request);
                    restResponse.ProcessRequest();
                }
            }
        }


        //private static async Task WriteInternalServerErrorResponse(StreamSocket socket, Exception ex)
        //{
        //    var httpResponse = GetInternalServerError(ex);
        //    await WriteResponse(httpResponse, socket);
        //}

        //private static HttpResponse GetInternalServerError(Exception exception)
        //{
        //    var errorMessage = "Internal server error occurred.";
        //    if (Debugger.IsAttached)
        //        errorMessage += Environment.NewLine + exception;

        //    var httpResponse = new HttpResponse(Windows.Web.Http.HttpStatusCode.InternalServerError, errorMessage);
        //    return httpResponse;
        //}
        //private static async Task WriteResponse(HttpResponse response, StreamSocket socket)
        //{
        //    using (var resp = socket.OutputStream.AsStreamForWrite())
        //    {
        //        var bodyArray = Encoding.UTF8.GetBytes(response.Content);
        //        var stream = new MemoryStream(bodyArray);
        //        var headerBuilder = new StringBuilder();
        //        headerBuilder.AppendLine($"HTTP/1.1 {(int)response.StatusCode} {response.StatusCode}");
        //        headerBuilder.AppendLine("Connection: close");
        //        headerBuilder.AppendLine($"Content-Length: {stream.Length}");

        //        foreach (var header1 in response.Headers)
        //        {
        //            headerBuilder.AppendLine($"{header1.Key}: {header1.Value}");
        //        }
        //        headerBuilder.AppendLine();

        //        var headerArray = Encoding.UTF8.GetBytes(headerBuilder.ToString());
        //        await resp.WriteAsync(headerArray, 0, headerArray.Length);
        //        await stream.CopyToAsync(resp);
        //        await resp.FlushAsync();
        //    }
        //}
    }
}
