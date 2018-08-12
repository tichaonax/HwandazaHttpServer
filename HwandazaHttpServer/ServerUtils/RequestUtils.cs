using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Text;
using System.Threading.Tasks;
using Windows.Networking.Sockets;
using Windows.Storage.Streams;

namespace HwandazaHttpServer.ServerUtils
{
    static class RequestUtils
    {
        private const uint BufferSize = 8192;

        public static async Task<string> ReadRequest(StreamSocket socket)
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

        public static async Task WriteMethodNotAllowedRequest(StreamSocket socket)
        {
            var errorMessage = "Method Not Allowed.";
            var httpResponse = new HttpResponse(Windows.Web.Http.HttpStatusCode.MethodNotAllowed, errorMessage);
            await WriteResponse(httpResponse, socket);
        }

        public static async Task WriteInternalServerErrorResponse(StreamSocket socket, Exception ex)
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

        public static async Task WriteResponse(HttpResponse response, StreamSocket socket)
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

        //public static string ParseLocalPath(Request request)
        //{
        //    var localPath = request.Uri.LocalPath;
        //    if (localPath.EndsWith("/"))
        //        localPath += "index.html";

        //    if (localPath.StartsWith("/"))
        //        localPath = localPath.Substring(1);
        //    return localPath;
        //}

        public static string ParseLocalPath(string uriLocalPath)
        {
            var localPath = uriLocalPath;
            if (localPath.EndsWith("/"))
                localPath += "index.html";

            if (localPath.StartsWith("/"))
                localPath = localPath.Substring(1);
            return localPath;
        }
    }
}
