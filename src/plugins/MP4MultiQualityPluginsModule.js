import { PluginModule } from "paella-core";
import packageData from "../../package.json";

let g_pluginModule = null;

export default class MP4MultiQualityPluginsModule extends PluginModule {
    static Get() {
        if (!g_pluginModule) {
            g_pluginModule = new MP4MultiQualityPluginsModule();
        }
        return g_pluginModule;
    }

    get moduleName() {
        return packageData.name;
    }

    get moduleVersion() {
        return packageData.version;
    }

}