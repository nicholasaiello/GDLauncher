import * as path from 'path';
import { remote, ipcRenderer } from 'electron';
import { message } from 'antd';
import { APPPATH } from '../constants';
import { promisify } from 'util';


export const START_DOWNLOAD = 'START_DOWNLOAD';
export const CLEAR_QUEUE = 'CLEAR_QUEUE';
export const ADD_TO_QUEUE = 'ADD_TO_QUEUE';
export const DOWNLOAD_COMPLETED = 'DOWNLOAD_COMPLETED';
export const DOWNLOAD_FILE_COMPLETED = 'DOWNLOAD_FILE_COMPLETED';
export const UPDATE_TOTAL_FILES_TO_DOWNLOAD = 'UPDATE_TOTAL_FILES_TO_DOWNLOAD';

export function addToQueue(pack, packType) {
  return (dispatch, getState) => {
    const { downloadManager } = getState();
    dispatch({
      type: ADD_TO_QUEUE,
      payload: pack,
      packType
    });
    if (downloadManager.actualDownload === null) {
      dispatch({
        type: START_DOWNLOAD,
        payload: pack
      });
      dispatch(downloadPack(pack));
    }
  };
}

export function clearQueue() {
  // This needs to clear any instance that is already installed
  return (dispatch, getState) => {
    const { downloadManager } = getState();
    const completed = Object.keys(downloadManager.downloadQueue).filter(act => downloadManager.downloadQueue[act].downloadCompleted);
    // It makes no sense to dispatch if no instance is to remove
    if (completed.length !== 0) {
      dispatch({
        type: CLEAR_QUEUE,
        payload: completed
      });
    }
  };
}

export function downloadPack(pack) {
  return async (dispatch, getState) => {
    const { downloadManager } = getState();
    console.log(`%cDownloading ${pack}`, 'color: #3498db');

    const fs = require('fs');
    const constants = require('../constants');
    const vnlHelpers = require('../utils/getMCFilesList');
    const downloader = require('../utils/downloader');

    const vnlPath = path.join(APPPATH, constants.LAUNCHER_FOLDER, constants.PACKS_FOLDER_NAME, pack);
    const vnlRead = await promisify(fs.readFile)(`${vnlPath}/vnl.json`);
    const vnlJSON = JSON.parse(vnlRead);

    const vnlLibs = await vnlHelpers.extractLibs(vnlJSON);

    const vnlAssets = await vnlHelpers.extractAssets(vnlJSON);

    const mainJar = await vnlHelpers.extractMainJar(vnlJSON);

    dispatch({
      type: UPDATE_TOTAL_FILES_TO_DOWNLOAD,
      payload: {
        pack,
        total: vnlLibs.length + vnlAssets.length + mainJar.length
      }
    });

    await downloader.downloadArr(vnlLibs, path.join(APPPATH, constants.LAUNCHER_FOLDER, 'libraries'), dispatch, pack);

    await downloader.downloadArr(vnlAssets, path.join(APPPATH, constants.LAUNCHER_FOLDER, 'assets'), dispatch, pack, 10);

    await downloader.downloadArr(mainJar, path.join(APPPATH, constants.LAUNCHER_FOLDER, 'versions'), dispatch, pack);

    await vnlHelpers.extractNatives(vnlLibs.filter(lib => 'natives' in lib), pack, APPPATH);

    dispatch({
      type: DOWNLOAD_COMPLETED,
      payload: pack
    });
    message.success(`${pack} has been downloaded!`);
    dispatch(addNextPackToActualDownload());
  };
}

function addNextPackToActualDownload() {
  return (dispatch, getState) => {
    const { downloadManager } = getState();
    const queueArr = Object.keys(downloadManager.downloadQueue);
    queueArr.some(pack => {
      if (!downloadManager.downloadQueue[pack].downloadCompleted) {
        dispatch({
          type: START_DOWNLOAD,
          payload: pack
        });
        dispatch(downloadPack(pack));
        return true;
      }
    });
  };
}
