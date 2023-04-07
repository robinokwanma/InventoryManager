const mockStorage = {};

export default {
    getItem: (key) => {
        return new Promise((resolve) => {
            resolve(mockStorage[key] || null);
        });
    },
    setItem: (key, value) => {
        return new Promise((resolve) => {
            mockStorage[key] = value;
            resolve(value);
        });
    },
    removeItem: (key) => {
        return new Promise((resolve) => {
            delete mockStorage[key];
            resolve();
        });
    },
    clear: () => {
        return new Promise((resolve) => {
            mockStorage = {};
            resolve();
        });
    },
};