export const setDataLocal = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}

export const getDataLocal = (key) => {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
}

export const removeDataLocal = (key) => {
    localStorage.removeItem(key);
}
