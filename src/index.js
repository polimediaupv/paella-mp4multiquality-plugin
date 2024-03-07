import Mp4MultiQualityVideoFormat from './plugins/es.upv.paella.mp4MultiQualityVideoFormat';

export default function getMP4MultiQualityContext() {
    return require.context("./plugins", true, /\.js/)
}

export const MP4MultiQualityPlugins = [
    {
        plugin: Mp4MultiQualityVideoFormat,
        config: {
            enabled: true
        }
    }
];

export const Mp4MultiQualityVideoFormatPlugin = Mp4MultiQualityVideoFormat;
