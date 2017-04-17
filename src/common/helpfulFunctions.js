export default class LocalStorage {

    get(key) {
            return JSON.parse(localStorage.getItem(key));
    }

    set(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
};