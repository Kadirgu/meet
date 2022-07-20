import { mockData } from './mock-data';
import axios from 'axios';
import NProgress from 'nprogress';


export const extractLocations = (events) => {
    var extractLocations = events.map((event) => event.location);
    var locations = [...new Set(extractLocations)];
    return locations;
};

export const checkToken = async (accessToken) => {
    const result = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    )
        .then((res) => res.json())
        .catch((error) => error.json());

    return result;
};

export const getEvents = async () => {

    NProgress.start();

    if (window.location.href.startsWith("http://localhost")) {
        NProgress.done();
        return mockData;
    }

    if (!navigator.onLine) {
        const data = localStorage.getItem("lastEvents");
        NProgress.done();
        return data ? JSON.parse(data).events : [];;
    }

    if (result.data) {
        var locations = extractLocations(result.data.events);
        localStorage.setItem('lastEvents', JSON.stringify(result.data));
        localStorage.setItem('locations', JSON.stringify(locations));
      }

    const token = await getAccessToken();

    if (token) {
        removeQuery();
        // eslint-disable-next-line no-useless-concat
        const url = `https://zy85c0f6wf.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/${token}`;
        const result = await axios.get(url);
        if (result.data) {
            var locations = extractLocations(result.data.events);
            localStorage.setItem("lastEvents", JSON.stringify(result.data));
            localStorage.setItem("locations", JSON.stringify(locations));
        }
        NProgress.done();
        return result.data.events;
    }
};

const getToken = async (code) => {
    try {
        const encodeCode = encodeURIComponent(code);

        // eslint-disable-next-line no-useless-concat
        const response = await fetch('https://zy85c0f6wf.execute-api.eu-central-1.amazonaws.com/dev/api/token' + '/' + encodeCode);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const { access_token } = await response.json();
        access_token && localStorage.setItem("access_token", access_token);
        return access_token;
    } catch (error) {
        error.json();
    }
}

export const getAccessToken = async () => {
    const accessToken = localStorage.getItem('access_token');
    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || tokenCheck.error) {
        await localStorage.removeItem("access_token");
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get("code");
        if (!code) {
            const results = await axios.get(
                "https://zy85c0f6wf.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
            );
            const { authUrl } = results.data;
            return (window.location.href = authUrl);
        }
        return code && getToken(code);
    }
    return accessToken;
}

const removeQuery = () => {
    if (window.history.pushState && window.location.pathname) {
        var newurl =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname;
        window.history.pushState("", "", newurl);
    } else {
        newurl = window.location.protocol + "//" + window.location.host;
        window.history.pushState("", "", newurl);
    }
};