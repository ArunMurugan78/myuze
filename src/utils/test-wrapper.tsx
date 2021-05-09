import React, { FC } from 'react';
import { interpret, Interpreter, MachineOptions } from 'xstate';
import { render, RenderResult } from '@testing-library/react';

import { AppProvider } from '../AppProvider';
import { AudioAPI } from '../services/audio-api';
import { MusicStorage } from '../services/music-storage';
import { AudioServiceInterface, MusicStorageInterface } from '../interfaces';
import { getMusicPlayerMachine, MusicPlayerMachineContext, MusicPlayerMachineStates } from '../machines';
import { isTruthy } from './is-truthy.util';

type RenderTestComponentResult = {
  renderResult: RenderResult,
  audioService: AudioServiceInterface,
  musicStorage: MusicStorageInterface,
  musicPlayerMachineService: Interpreter<MusicPlayerMachineContext>,
};

jest.mock('../services/audio-api');
jest.mock('../services/music-storage');

export type ServiceConfig = {
  machines: {
    musicPlayerMachine:{
      config?: Partial<MachineOptions<MusicPlayerMachineContext, any>>,
      context?: MusicPlayerMachineContext,
      initialState?: MusicPlayerMachineStates,
    }
  }
};

export function getMockedServices(
  config: ServiceConfig,
): Omit<RenderTestComponentResult, 'renderResult'> {
  const {
    machines: {
      musicPlayerMachine: {
        config: musicPlayerMachineConfig,
        context: musicPlayerMachineContext,
        initialState,
      },
    },
  } = config;

  const audioService = new AudioAPI();
  const musicStorage = new MusicStorage();
  let musicPlayerMachine = getMusicPlayerMachine(musicStorage, audioService);

  if (isTruthy(musicPlayerMachineContext)) {
    musicPlayerMachine = musicPlayerMachine.withContext(musicPlayerMachineContext);
  }

  musicPlayerMachine = musicPlayerMachine.withConfig(musicPlayerMachineConfig ?? ({
    services: {
      loadMusic: () => Promise.reject(),
    },
  }));
  const musicPlayerMachineService = interpret(musicPlayerMachine)
    .start(initialState ?? MusicPlayerMachineStates.NOT_LOADED);
  return {
    audioService, musicStorage, musicPlayerMachineService,
  };
}

export function renderTestComponent<Props>(
  Component: FC<Props>, props: Props,
  config: ServiceConfig,
): RenderTestComponentResult {
  const {
    audioService,
    musicStorage,
    musicPlayerMachineService,
  } = getMockedServices(config);
  const renderResult = render(
    <AppProvider
      audioService={audioService}
      musicStorage={musicStorage}
      musicPlayerMachineInterpreter={musicPlayerMachineService}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...props} />
    </AppProvider>,
  );

  return {
    renderResult, audioService, musicStorage, musicPlayerMachineService,
  };
}
export function componentRenderFactory<Props>(testId: string, Component: FC<Props>)
  : (props: Props, config: ServiceConfig) => (Omit<RenderTestComponentResult, 'renderResult'> & { rootElement: HTMLElement } & RenderResult) {
  return (
    props: Props,
    config: ServiceConfig,
  ) => {
    const { renderResult, ...rest } = renderTestComponent(
      Component, props, config,
    );
    const rootElement = renderResult.getByTestId(testId);
    return {
      ...rest,
      ...renderResult,
      rootElement,
    };
  };
}
