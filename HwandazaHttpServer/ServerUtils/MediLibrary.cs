using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.Foundation.Collections;
using Windows.Storage;
using Windows.Storage.Search;
using Windows.UI.Xaml.Media.Imaging;

namespace HwandazaHttpServer.ServerUtils
{
    public sealed class MediLibrary
    {
        private async Task<List<string>> GetSongs()
        {
            QueryOptions queryOption = new QueryOptions
                (CommonFileQuery.OrderByTitle, new string[] { ".mp3", ".mp4", ".wma" });

            queryOption.FolderDepth = FolderDepth.Deep;

            Queue<IStorageFolder> folders = new Queue<IStorageFolder>();

            var files = await KnownFolders.MusicLibrary.CreateFileQueryWithOptions
                (queryOption).GetFilesAsync();

            foreach (var file in files)
            {
                // do something with the music files
            }
            
            return null;
        }

        private async Task<List<string>> GetImages()
        {
            QueryOptions queryOption = new QueryOptions
                (CommonFileQuery.OrderByTitle, new string[] { ".jpg", ".jpeg", ".gif", ".png" });

            queryOption.FolderDepth = FolderDepth.Deep;

            Queue<IStorageFolder> folders = new Queue<IStorageFolder>();

            var files = await KnownFolders.PicturesLibrary.CreateFileQueryWithOptions
                (queryOption).GetFilesAsync();

            foreach (var file in files)
            {
                // do something with the music files
            }

            return null;
        }

        private async Task<List<string>> GetVideos()
        {
            QueryOptions queryOption = new QueryOptions
                (CommonFileQuery.OrderByTitle, new string[] { ".mp4", ".mov", ".flv", ".avi" });

            queryOption.FolderDepth = FolderDepth.Deep;

            Queue<IStorageFolder> folders = new Queue<IStorageFolder>();

            var files = await KnownFolders.VideosLibrary.CreateFileQueryWithOptions
                (queryOption).GetFilesAsync();

            foreach (var file in files)
            {
                // do something with the music files
            }

            return null;
        }
    }
}
