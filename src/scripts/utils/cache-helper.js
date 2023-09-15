import CONFIG from "../globals/config";

const CacheHelper = {
  async cachingAppShell(requests) {
    const cache = await this._openCache();
    cache.addAll(requests);
  },

  async deleteOldCache() {
    const cacheNames = await caches.keys();
    console.log(cacheNames);
    // cacheNames
    //   .filter((name) => name !== CONFIG.CACHE_NAME)
    //   .map((filteredName) => caches.delete(filteredName));

    const filteredNames = cacheNames.filter((name) => name !== CONFIG.CACHE_NAME);
    console.log(filteredNames);
  },

  async revalidateCache(request) {
    const response = await caches.match(request);

    if (response) {
      this._fetchRequest(request);
      return response;
    }

    return this._fetchRequest(request);
  },

  async _openCache() {
    return caches.open(CONFIG.CACHE_NAME); // "MovieCatalogue-V1"
  },

  async _fetchRequest(request) {
    const response = await fetch(request);

    if (!response || response.status !== 200) {
      return response;
    }

    await this._addCache(request);
    return response;
  },

  async _addCache(request) {
    const cache = await this._openCache();
    cache.add(request);
  },
};

export default CacheHelper;
