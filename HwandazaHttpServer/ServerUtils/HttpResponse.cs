using System.Collections.Generic;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Web.Http;

namespace HwandazaHttpServer.ServerUtils
{
    public sealed class HttpResponse
    {
        public HttpStatusCode StatusCode { get; }
        public IDictionary<string, string> Headers { get; }
        public byte[] Content { get; }

        public HttpResponse(HttpStatusCode statusCode, [ReadOnlyArray()]  byte[] content)
            : this(statusCode, new Dictionary<string, string>(), content)
        { }

        public HttpResponse(HttpStatusCode statusCode, IDictionary<string, string> headers, [ReadOnlyArray()]  byte[] content)
        {
            StatusCode = statusCode;
            Headers = headers;
            Content = content;
        }
    }
}
