import { VideoPlugin, VideoQualityItem, Mp4Video, supportsVideoType } from 'paella-core';

export class Mp4MultiQualityVideo extends Mp4Video {
    async getQualities() {
        if (!this._qualities) {
            this._qualities = this._sources.map((src, i) => new VideoQualityItem({
                index: i,
                label: `${src.res.w}x${src.res.h}`,
                shortLabel: `${src.res.h}p`,
                width: src.res.w,
                height: src.res.h
            }));
        }

        return this._qualities;
    }

    async setQuality(q) {
        if (!(q instanceof VideoQualityItem)) {
            throw new Error("Invalid parameter setting video quality");
        }

        this._currentQuality = q;

        const currentTime = this.video.currentTime;
        const playbackRate = this.video.playbackRate;

        this.clearStreamData();
        await this.loadStreamData(this._streamData);

        this.video.currentTime = currentTime;
        this.video.playbackRate = playbackRate;
    }

    get currentQuality() {
        return this._currentQuality;
    }

    async loadStreamData(streamData = null) {
        // this.player.log.debug("es.upv.paella.mp4MultiQualityVideoFormat: loadStreamData");
        this._sources = null;
        this._sources = streamData.sources.mp4;
        this._sources.sort((a,b) => {
            return Number(a.res.w) - Number(b.res.w);
        });

        if (!this._qualities) {
            const qualities = await this.getQualities();
            this._currentQuality = qualities[qualities.length - 1];
        }
        this._currentSource = this._sources[this._currentQuality.index];

        await super.loadStreamData(streamData);
    }
}

export default class Mp4MultiQualityVideoFormatPlugin extends VideoPlugin {
    get streamType() {
        return "mp4";
    }

    get name() {
        return "es.upv.paella.mp4MultiQualityVideoFormat";
    }

    isCompatible(streamData) {
        const { mp4 } = streamData.sources;
        return mp4 && supportsVideoType(mp4[0]?.mimetype);
    }

    async getVideoInstance(playerContainer, isMainAudio) {
        return new Mp4MultiQualityVideo(this.player, playerContainer, isMainAudio, this.config);
    }
}
