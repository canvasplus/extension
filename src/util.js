const getPathAPI = (rel) => {
    const url = new URL(window.location);
    return url.protocol + url.hostname + rel;
}