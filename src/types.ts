export type OptionsConfig = {
  label: string,
  options: {
    label: string,
    value: string,
  }[]
}

export type MusicConfigParamName = 'style' | 'topic' | 'stolen' | 'featuring' | 'swearLevel' | 'rhymesLevel'
export type VideoConfigParamName = 'style' | 'location' | 'homiesLevel' | 'hotGirlsLevel' | 'carsLevel'

export type Level = 0|1|2|3|4|5|6|7|8|9

export type MusicStyle = 'classic' | 'psycho' | 'bounce' | 'rock' | 'hiphopolo'
export type MusicTopic = 'tough_life' | 'drugs' | 'money' | 'rap' | 'deep' | 'party' | 'patriotic'
export type MusicStolen = 'unknown' | 'famous'
export type MusicFeaturing = 'raper' | 'singer'

export type VideoStyle = 'simple' | 'artistic' | 'street' | 'amatour' | 'party'
export type VideoLocation = 'studio' | 'neighborhood' | 'club' | 'car' | 'other'

type SelectConfig<OptionType> = {
  options: {
    label: string,
    value: OptionType
  }[],
  selected: OptionType[]
}

type LevelConfig = {
  min: Level,
  max: Level,
  selected: Level
}

export type MusicConfigState = {
  style: SelectConfig<MusicStyle>,
  topic: SelectConfig<MusicTopic>,
  stolen: SelectConfig<MusicStolen>,
  featuring: SelectConfig<MusicFeaturing>,
  swearLevel: LevelConfig,
  rhymesLevel: LevelConfig
}

export type VideoConfigState = {
  style: SelectConfig<VideoStyle>
  location: SelectConfig<VideoLocation>
  homiesLevel: LevelConfig,
  hotGirlsLevel: LevelConfig,
  carsLevel: LevelConfig,
}

export type MusicSelected = MusicStyle[] | MusicTopic[] | MusicStolen[] | MusicFeaturing[] | Level 
export type VideoSelected = VideoStyle[] | VideoLocation[] | Level
export type Selected = MusicSelected | VideoSelected

export type CompletedConfig = {
  music: {
    style: MusicStyle,
    topic: MusicTopic,
    stolen: MusicStolen,
    featuring: MusicFeaturing[],
    swearLevel: Level,
    rhymesLevel: Level
  },
  video: {
    style: VideoStyle,
    location: VideoLocation,
    homiesLevel: Level,
    hotGirlsLevel: Level,
    carsLevel: Level,
  }
}

export type Track = {
  title: string,
  artist: string,
  feat?: string,
  year: number,
  ytId: string,
  properties: {
    music: {
      style: MusicStyle,
      topic: MusicTopic,
      stolen: MusicStolen,
      featuring: MusicFeaturing[],
      swearLevel: Level,
      rhymesLevel: Level
    },
    video: {
      style: VideoStyle,
      location: VideoLocation,
      homiesLevel: Level,
      hotGirlsLevel: Level,
      carsLevel: Level
      budget: number
    }
  }
}

export type TrackWithScore = {
  title: string,
  artist: string,
  feat?: string,
  year: number,
  ytId: string,
  score: number,
}