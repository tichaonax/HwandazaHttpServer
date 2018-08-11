using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Windows.ApplicationModel;
using Windows.Foundation;
using Windows.Storage;
using Windows.Web.Http;

namespace HwandazaHttpServer
{
    public sealed class StaticFileHandler
    {
        private readonly string _basePath;
        private readonly ContentTypeMapper _contentTypeMapper;

        public StaticFileHandler(string basePath)
        {
            _basePath = GetAbsoluteBasePathUri(basePath);
            _contentTypeMapper = new ContentTypeMapper();
        }

        private static string GetAbsoluteBasePathUri(string relativeOrAbsoluteBasePath)
        {
            var basePathUri = new Uri(relativeOrAbsoluteBasePath, UriKind.RelativeOrAbsolute);
            if (basePathUri.IsAbsoluteUri)
                return relativeOrAbsoluteBasePath;
            else
                return Path.Combine(Package.Current.InstalledLocation.Path, relativeOrAbsoluteBasePath);
        }

        public IAsyncOperation<HttpResponse> HandleRequest(Request headerLine)
        {
            Task<HttpResponse> task = HandleRequestTask(headerLine);
            IAsyncOperation<HttpResponse> httpResponse = task.AsAsyncOperation();
            return httpResponse;
        }

        private IAsyncOperation<HttpResponse> GetHttpResponse(StorageFile item)
        {
            Task<HttpResponse> task = GetHttpResponseTask(item);
            IAsyncOperation<HttpResponse> httpResponse = task.AsAsyncOperation();
            return httpResponse;
        }

        private async Task<HttpResponse> HandleRequestTask(Request headerLine)
        {
            var filePath = GetFilePath(headerLine);

            Task<StorageFile> item = null;
            try
            {
                item = StorageFile.GetFileFromPathAsync(filePath).AsTask();
            }
            catch (FileNotFoundException)
            {
              return new HttpResponse(HttpStatusCode.NotFound, $"File: {headerLine.Uri.LocalPath} not found");
            }

            return await GetHttpResponse(item.Result);
        }

        private async Task<HttpResponse> GetHttpResponseTask(StorageFile item)
        {
            var inputStream = await item.OpenSequentialReadAsync();
            using (var streamReader = new StreamReader(inputStream.AsStreamForRead()))
            {
                var fileContents = await streamReader.ReadToEndAsync();
                var contentType = _contentTypeMapper.GetContentTypeForExtension(Path.GetExtension(item.Name));
                var headers = new Dictionary<string, string>();
                if (!string.IsNullOrWhiteSpace(contentType))
                    headers.Add("Content-Type", contentType);

                return new HttpResponse(HttpStatusCode.Ok, headers, fileContents);
            }
        }

        private string GetFilePath(Request headerLine)
        {
            var localPath = ParseLocalPath(headerLine);
            var sanitizedLocalPath = localPath.Replace('/', '\\');
            var filePath = Path.Combine(_basePath, sanitizedLocalPath);
            return filePath;
        }

        private static string ParseLocalPath(Request headerLine)
        {
            var localPath = headerLine.Uri.LocalPath;
            if (localPath.EndsWith("/"))
                localPath += "index.html";

            if (localPath.StartsWith("/"))
                localPath = localPath.Substring(1);
            return localPath;
        }
    }
}
