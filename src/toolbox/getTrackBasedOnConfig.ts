import { tracks } from "../data/tracks";
import { CompletedConfig, TrackWithScore } from "../types";

const lastTracks: string[] = [];

export default function getTrackBasedOnConfig(config: CompletedConfig) {
  const tracksWithScore: TrackWithScore[] = tracks.map(track => {
    let score = 0;
    let musicConfigParamName: keyof typeof config.music;
    let videoConfigParamName: keyof typeof config.video;

    for (musicConfigParamName in config.music) {
      const musicConfigElement = config.music[musicConfigParamName];
      const musicTrackElement = track.properties.music[musicConfigParamName];

      if (Array.isArray(musicConfigElement) && Array.isArray(musicTrackElement)) {
        for (const value of musicConfigElement) {
          if ((musicTrackElement as string[]).includes(value)) score += 1;
        }
      } else if (typeof musicConfigElement === 'string' && typeof musicTrackElement === 'string' && musicConfigElement === musicTrackElement) {
        score += 1;
      } else if (typeof musicConfigElement === 'number' && typeof musicTrackElement === 'number') {
        score += (10 - Math.abs(musicTrackElement - musicConfigElement)) / 10;
      }
    }

    for (videoConfigParamName in config.video) {
      const videoConfigElement = config.video[videoConfigParamName];
      const videoTrackElement = track.properties.video[videoConfigParamName];

      if (Array.isArray(videoConfigElement) && Array.isArray(videoTrackElement)) {
        for (const value of videoConfigElement) {
          if ((videoTrackElement as string[]).includes(value)) score += 1;
        }
      } else if (typeof videoConfigElement === 'string' && typeof videoTrackElement === 'string' && videoConfigElement === videoTrackElement) {
        score += 1;
      } else if (typeof videoConfigElement === 'number' && typeof videoTrackElement === 'number') {
        score += (10 - Math.abs(videoTrackElement - videoConfigElement)) / 10; 
      }
    }

    return {
      title: track.title,
      artist: track.artist,
      feat: track.feat,
      year: track.year,
      ytId: track.ytId,
      score
    };
  })
  .filter(track => !lastTracks.includes(track.ytId))
  .sort((track1, track2) => {
    if (track1.score < track2.score) return 1;
    if (track1.score > track2.score) return -1;
    return 0;
  });

  const topScore = tracksWithScore[0].score;

  const tracksWithTopScore = tracksWithScore.filter(track => track.score === topScore);

  const track = tracksWithTopScore[Math.round(Math.random() * (tracksWithTopScore.length - 1))];

  if (lastTracks.length === 10) lastTracks.shift();
  lastTracks.push(track.ytId);

  return track
}