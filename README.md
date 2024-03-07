# paella-mp4multiquality-plugin

A MP4 multiquality plugin for Paella Player.

## Usage

**Step 1:** Import the plugin context and add it to the Paella Player initialization parameters:

Usin plugin context API:

```javascript
...
import getMP4MultiQualityContext from 'paella-mp4multiquality-plugin';

let paella = new Paella('player-container', {
    customPluginContext: [
        getMP4MultiQualityContext()
    ]
});
...
```

Using explicit plugin import API:

```javascript
...
import {
    Mp4MultiQualityVideoFormatPlugin      // Independent plugin
} from 'paella-zoom-plugin';

let paella = new Paella('player-container', {
    plugins: [
        {
            plugin: Mp4MultiQualityVideoFormatPlugin,
            config: {
                enabled: true
            }
        }
    ]
});
...
```

**Step 2:** Disable the `es.upv.paella.mp4VideoFormat` and add the `es.upv.paella.mp4MultiQualityVideoFormat`.

```json
{
    "plugins": {
        ...
        "es.upv.paella.mp4VideoFormat": {
            "enabled": false,
            "order": 1
        },
        "es.upv.paella.mp4MultiQualityVideoFormat": {
            "enabled": true,
            "order": 1
        },
      }
        ... other plugin settings
    }
}
```