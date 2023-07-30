using System.Collections.Generic;

namespace Sonarr.Api.V3.Episodes
{
    public class EpisodesWatchedResource
    {
        public List<int> EpisodeIds { get; set; }
        public bool Watched { get; set; }
    }
}
