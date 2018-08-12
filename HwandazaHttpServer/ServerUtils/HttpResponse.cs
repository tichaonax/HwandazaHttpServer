using System.Collections.Generic;
using Windows.Web.Http;

namespace HwandazaHttpServer.ServerUtils
{
    public sealed class HttpResponse
    {
        public HttpStatusCode StatusCode { get; }
        public IDictionary<string, string> Headers { get; }
        public string Content { get; }

        public HttpResponse(HttpStatusCode statusCode, string content)
            : this(statusCode, new Dictionary<string, string>(), content)
        { }

        public HttpResponse(HttpStatusCode statusCode, IDictionary<string, string> headers, string content)
        {
            StatusCode = statusCode;
            Headers = headers;
            Content = content;
        }
    }
}
