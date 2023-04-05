import './App.scss';
import React, { useState } from 'react';
import { Group } from './components/Group';
import { VideoWindow } from './components/VideoWindow';
import { Window } from './components/Window';
import { SelectList } from './components/SelectList';
import { LoadingWindow } from './components/LoadingWindow';
import { HelpWindow } from './components/HelpWindow';
import { LevelSlider } from './components/LevelSlider';
import { Error } from './components/Error';
import { musicConfigState, setMusicConfigValue } from './app/slices/musicConfig';
import { videoConfigState, setVideoConfigValue } from './app/slices/videoConfig';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { MusicConfigParamName, MusicSelected, VideoConfigParamName, VideoSelected, CompletedConfig } from './types';
import getTrackBasedOnConfig from './toolbox/getTrackBasedOnConfig';

function validateConfig(config: CompletedConfig) {
  let valid = true;
  let subconfigName: keyof typeof config;

  for (subconfigName in config) {
    const subconfig = config[subconfigName];
    let elementName: keyof typeof subconfig;

    for (elementName in subconfig) {
      if (subconfig[elementName] === undefined) {
        valid = false;
        break;
      }
    }

    if (!valid) break;
  }

  return valid;
}

function App() {
  const [videoData, setVideoData] = useState<{title: string, ytId: string} | null>(null);
  const [showLoading, setShowLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showError, setShowError] = useState(false);
  const musicConfig = useAppSelector(musicConfigState);
  const videoConfig = useAppSelector(videoConfigState);
  const dispatch = useAppDispatch();

  const onWizardClose = () => {
    window.close();
  };

  const onCreateClick = () => {
    if (showLoading) return;

    setVideoData(null);

    const completedConfig: CompletedConfig = {
      music: {
        style: musicConfig.style.selected[0],
        topic: musicConfig.topic.selected[0],
        stolen: musicConfig.stolen.selected[0],
        featuring: [...musicConfig.featuring.selected],
        swearLevel: musicConfig.swearLevel.selected,
        rhymesLevel: musicConfig.rhymesLevel.selected
      },
      video: {
        style: videoConfig.style.selected[0],
        location: videoConfig.location.selected[0],
        homiesLevel: videoConfig.homiesLevel.selected,
        hotGirlsLevel: videoConfig.hotGirlsLevel.selected,
        carsLevel: videoConfig.carsLevel.selected
      }
    };

    
    if (validateConfig(completedConfig)) {
      const video = getTrackBasedOnConfig(completedConfig);
      const title = `${video.artist}${video.feat ? ' (feat. ' + video.feat + ')' : ''} - ${video.title} (${video.year})`;

      setShowLoading(true);

      setVideoData({
        title,
        ytId: video.ytId
      })
    } else {
      setShowError(true);
    }
  }

  const onMusicConfigValueChange = (name: MusicConfigParamName, selected: MusicSelected) => {
    dispatch(setMusicConfigValue({
      name,
      selected
    }))
  }

  const onVideoConfigValueChange = (name: VideoConfigParamName, selected: VideoSelected) => {
    dispatch(setVideoConfigValue({
      name,
      selected
    }))
  }

  const onVideoWindowClose = () => {
    setVideoData(null);
  }

  return (
    <div className="app">
      <Window
        icon="/favicon.png"
        title="Macrohard Hit Wizard!"
        initialSize={{width: 800}}
        onClose={onWizardClose}
        onHelp={() => setShowHelp(true)}
        center={true}
        isMain={true}
      >
        <div className="app__inner">
          <h1 className="app__title">Macrohard Hit Wizard! - Hip-Hop Edition - Wersja Polska</h1>
          <h2 className="app__subtitle">Stwórz hit w dwie minuty!</h2>
          <div className="app__row">
            <h3 className="app__row-title">Etap 1 - okreś parametry muzyki:</h3>
            <Group outerTitle='Wybierz właściwe brzmienie'>
              <div className="app__subgroup">
                <div className="app__subgroup-column">
                <Group outerTitle='Wybierz styl'>
                    <SelectList
                      name="style"
                      options={musicConfig.style.options}
                      selected={musicConfig.style.selected}
                      multi={false}
                      onChange={(newSelected) => onMusicConfigValueChange('style', newSelected)}
                    />
                  </Group>
                </div>
                <div className="app__subgroup-column">
                  <Group outerTitle='Wybierz temat (max 3)'>
                    <SelectList
                      name="topic"
                      options={musicConfig.topic.options}
                      selected={musicConfig.topic.selected}
                      multi={false}
                      onChange={(newSelected) => onMusicConfigValueChange('topic', newSelected)}
                    />
                  </Group>
                </div>
                <div className="app__subgroup-column">
                  <Group outerTitle='Kradziona nuta?'>
                    <SelectList
                      name="stolen"
                      options={musicConfig.stolen.options}
                      selected={musicConfig.stolen.selected}
                      multi={false}
                      onChange={(newSelected) => onMusicConfigValueChange('stolen', newSelected)}
                    />
                  </Group>
                  <Group outerTitle='Goście?'>
                    <SelectList
                      name="featuring"
                      options={musicConfig.featuring.options}
                      selected={musicConfig.featuring.selected}
                      multi={true}
                      onChange={(newSelected) => onMusicConfigValueChange('featuring', newSelected)}
                    />
                  </Group>
                </div>
                <div className="app__subgroup-column">
                  <Group outerTitle='Przekleństwa'>
                    <LevelSlider
                      name="swearLevel"
                      minLabel='grzecznie'
                      maxLabel='w kurwę'
                      minValue={musicConfig.swearLevel.min}
                      maxValue={musicConfig.swearLevel.max}
                      selected={musicConfig.swearLevel.selected}
                      onChange={(newSelected) => onMusicConfigValueChange('swearLevel', newSelected)}
                    />
                  </Group>
                  <Group outerTitle='Rymy'>
                    <LevelSlider
                      name="rhymesLevel"
                      minLabel='częstochowskie'
                      maxLabel='kozackie'
                      minValue={musicConfig.rhymesLevel.min}
                      maxValue={musicConfig.rhymesLevel.max}
                      selected={musicConfig.rhymesLevel.selected}
                      onChange={(newSelected) => onMusicConfigValueChange('rhymesLevel', newSelected)}
                    />
                  </Group>
                </div>
              </div>
            </Group>
          </div>
          <div className="app__row">
            <h3 className="app__row-title">Etap 2 - okreś parametry teledysku:</h3>
            <Group outerTitle='Wybierz właściwe elementy'>
              <div className="app__subgroup">
                <div className="app__subgroup-column">
                  <Group outerTitle='Jaki styl teledysku?'>
                    <SelectList
                      name="video_style"
                      options={videoConfig.style.options}
                      selected={videoConfig.style.selected}
                      multi={false}
                      onChange={(newSelected) => onVideoConfigValueChange('style', newSelected)}
                    />
                  </Group>
                </div>
                <div className="app__subgroup-column">
                  <Group outerTitle='Miejscówka'>
                    <SelectList
                      name="location"
                      options={videoConfig.location.options}
                      selected={videoConfig.location.selected}
                      multi={false}
                      onChange={(newSelected) => onVideoConfigValueChange('location', newSelected)}
                    />
                  </Group>
                </div>
                <div className="app__subgroup-column">
                  <Group outerTitle='Ziomeczki'>
                    <LevelSlider
                      name="homiesLevel"
                      minLabel='samotnie'
                      maxLabel='pełno'
                      minValue={videoConfig.homiesLevel.min}
                      maxValue={videoConfig.homiesLevel.max}
                      selected={videoConfig.homiesLevel.selected}
                      onChange={(newSelected) => onVideoConfigValueChange('homiesLevel', newSelected)}
                    />
                  </Group>
                  <Group outerTitle='Gorące dziewczyny'>
                    <LevelSlider
                      name="hotgirlsLevel"
                      minLabel='nie ma'
                      maxLabel='są'
                      minValue={videoConfig.hotGirlsLevel.min}
                      maxValue={videoConfig.hotGirlsLevel.max}
                      selected={videoConfig.hotGirlsLevel.selected}
                      onChange={(newSelected) => onVideoConfigValueChange('hotGirlsLevel', newSelected)}
                    />
                  </Group>
                  <Group outerTitle='Samochody'>
                    <LevelSlider
                      name="carsLevel"
                      minLabel='brak'
                      maxLabel='dużo'
                      minValue={videoConfig.carsLevel.min}
                      maxValue={videoConfig.carsLevel.max}
                      selected={videoConfig.carsLevel.selected}
                      onChange={(newSelected) => onVideoConfigValueChange('carsLevel', newSelected)}
                    />
                  </Group>
                </div>
              </div>
            </Group>
          </div>
          <div className="app__row app__row--flex">
            <h3 className="app__row-title">Etap 3 - wciśnij stwórz, a wielki hit zostanie stworzony!:</h3>
            <button disabled={showLoading} onClick={onCreateClick}>Stwórz!</button>
          </div>
        </div>
      </Window>
      {showLoading && (
        <LoadingWindow onCompleted={() => setShowLoading(false)}/>
      )}
      {showHelp && (
        <HelpWindow onClose={() => setShowHelp(false)}/>
      )}
      {showError && (
        <Error onClose={() => setShowError(false)}/>
      )}
      {videoData && !showLoading && (
        <VideoWindow
          title={videoData.title}
          ytId={videoData.ytId}
          onVideoWindowClose={onVideoWindowClose}
        />
      )}
    </div>
  );
}

export default App;
