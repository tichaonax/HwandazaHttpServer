using Windows.ApplicationModel.Background;

namespace HwandazaHttpServer
{
    public sealed class StartupTask : IBackgroundTask
    {
        private BackgroundTaskDeferral _backgroundTaskDeferral;
        private HwandazaHttpServer _hwandazaHttpServer;

        public void Run(IBackgroundTaskInstance taskInstance)
        {
            //var installedLocation = Windows.ApplicationModel.Package.Current.InstalledLocation;
            var path = "Web";
           
            // Get the deferral object from the task instance
            _backgroundTaskDeferral = taskInstance.GetDeferral();
            //create a reference point to clean up method that will be called in the event an application is cancelled
            taskInstance.Canceled += TaskInstanceCanceled;
            _hwandazaHttpServer = new HwandazaHttpServer(8100, path);
            _hwandazaHttpServer.StartServer();
        }

        private void TaskInstanceCanceled(IBackgroundTaskInstance sender, BackgroundTaskCancellationReason reason)
        {
            //gracefully stop modules so that we do not leave peripherals like waterpump running after the control application is terminated

            //a few reasons that you may be interested in.
            switch (reason)
            {
                case BackgroundTaskCancellationReason.Abort:
                    //app unregistered background task (amoung other reasons).
                    _hwandazaHttpServer.StopServer();
                    _backgroundTaskDeferral.Complete();
                    break;
                case BackgroundTaskCancellationReason.Terminating:
                    //system shutdown
                    _hwandazaHttpServer.StopServer();
                    _backgroundTaskDeferral.Complete();
                    break;
                case BackgroundTaskCancellationReason.ConditionLoss:
                    break;
                case BackgroundTaskCancellationReason.SystemPolicy:
                    break;
            }
        }
    }
}
