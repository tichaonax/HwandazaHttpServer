using System;
using System.Collections.Generic;
using Windows.Web.Http;

namespace HwandazaHttpServer
{
    public sealed class Request
    {
        public HttpMethod Method { get; }
        public Uri Uri { get; }
        public HttpVersion Version { get; }
        public IDictionary<string, string> Headers { get; }
        public string Content { get; }

        public Request(HttpMethod method, Uri uri, HttpVersion version, IDictionary<string, string> headerDictionary, string content)
        {
            Method = method;
            Uri = uri;
            Version = version;
            Headers = headerDictionary;
            Content = content;
        }
    }
}
