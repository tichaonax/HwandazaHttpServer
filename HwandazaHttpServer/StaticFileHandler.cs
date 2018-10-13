using HwandazaHttpServer.ServerUtils;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Windows.ApplicationModel;
using Windows.Foundation;
using Windows.Storage;
using Windows.Web.Http;
using System.Security.Cryptography;

namespace HwandazaHttpServer
{
    public sealed class StaticFileHandler
    {
        private readonly string _basePath;
        private readonly ContentTypeMapper _contentTypeMapper;
        private static IList<string> _imageGalleryList = new List<string>();
      
        public IList<string> ImageGalleryList { get { return _imageGalleryList;} }

        public StaticFileHandler(string basePath)
        {
            _basePath = GetAbsoluteBasePathUri(basePath);
            _contentTypeMapper = new ContentTypeMapper();
            string imageBasePath = GetAbsoluteBasePathUri(basePath + "/gallery");
            LoadGalleryImages(imageBasePath);
        }
        
        private static void LoadGalleryImages(string path)
        {
            ProcessDirectory(path);
        }

        private static void ProcessDirectory(string targetDirectory)
        {
            // Process the list of files found in the directory.
            string[] fileEntries = Directory.GetFiles(targetDirectory);
            foreach (string fileName in fileEntries) {
                var gallerImage = fileName.Split(new string[] { "build" }, StringSplitOptions.None)[1]
                    .Replace("/", "").Replace("\\", "/");
                var cleanString = Uri.EscapeUriString(gallerImage);
                AddGalleryImage(cleanString);
            }

            // Recurse into subdirectories of this directory.
            string[] subdirectoryEntries = Directory.GetDirectories(targetDirectory);
            foreach (string subdirectory in subdirectoryEntries)
                ProcessDirectory(subdirectory);
        }

        private static void AddGalleryImage(string path)
        {
            _imageGalleryList.Add(path);
        }
        
        private static string GetAbsoluteBasePathUri(string relativeOrAbsoluteBasePath)
        {
            var basePathUri = new Uri(relativeOrAbsoluteBasePath, UriKind.RelativeOrAbsolute);
            if (basePathUri.IsAbsoluteUri)
                return relativeOrAbsoluteBasePath;
            else
                return Path.Combine(Package.Current.InstalledLocation.Path, relativeOrAbsoluteBasePath);
        }

        public IAsyncOperation<HttpResponse> HandleRequest(string uriLocalPath)
        {
            Task<HttpResponse> task = HandleRequestTask(uriLocalPath);
            IAsyncOperation<HttpResponse> httpResponse = task.AsAsyncOperation();
            return httpResponse;
        }

        private IAsyncOperation<HttpResponse> GetHttpResponse(StorageFile item)
        {
            Task<HttpResponse> task = GetHttpResponseTask(item);
            IAsyncOperation<HttpResponse> httpResponse = task.AsAsyncOperation();
            return httpResponse;
        }

        private async Task<HttpResponse> HandleRequestTask(string uriLocalPath)
        {
            var filePath = GetFilePath(uriLocalPath);

            Task<StorageFile> item = null;
            try
            {
                item = StorageFile.GetFileFromPathAsync(filePath).AsTask();
            }
            catch (FileNotFoundException)
            {
              return new HttpResponse(HttpStatusCode.NotFound, Encoding.ASCII.GetBytes( $"File: {uriLocalPath} not found"));
            }

            return await GetHttpResponse(item.Result);
        }

        private async Task<HttpResponse> GetHttpResponseTask(StorageFile item)
        {
            var inputStream = await item.OpenStreamForReadAsync();
            byte[] fileContents = null;
            byte[] buffer = new byte[16 * 1024];
            using (MemoryStream ms = new MemoryStream())
            {
                int read;
                while ((read = inputStream.Read(buffer, 0, buffer.Length)) > 0)
                {
                    ms.Write(buffer, 0, read);
                }
                fileContents = ms.ToArray();

                var contentType = _contentTypeMapper.GetContentTypeForExtension(Path.GetExtension(item.Name));
                var headers = new Dictionary<string, string>();
                if (!string.IsNullOrWhiteSpace(contentType))
                    headers.Add("Content-Type", contentType);

                return new HttpResponse(HttpStatusCode.Ok, headers, fileContents);
            }

        }

        private string GetFilePath(string uriLocalPath)
        {
            var sanitizedLocalPath = uriLocalPath.Replace('/', '\\');
            var filePath = Path.Combine(_basePath, sanitizedLocalPath);
            return filePath;
        }
    }
}
