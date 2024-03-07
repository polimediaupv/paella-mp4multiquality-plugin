import { Paella } from 'paella-core';
import getBasicPluginContext from 'paella-basic-plugins';
import getMP4MultiQualityContext from './index';

const initParams = {
    customPluginContext: [
        getBasicPluginContext(),
        getMP4MultiQualityContext()
    ]
};

const paella = new Paella('player-container', initParams);

paella.loadManifest()
    .then(() => console.log("done"))
    .catch(e => console.error(e));
