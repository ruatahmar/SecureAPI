import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    withCredentials: true
});
export const publicApi = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    withCredentials: true,
})


let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

api.interceptors.response.use(
    res => res,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) { //originalRequest._retry to prevent infinite loop
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(() => api(originalRequest));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await api.post("/auth/refresh");
                console.log("entered")
                processQueue(null);
                return api(originalRequest);
            } catch (err) {
                processQueue(err, null);
                // redirect to login
                window.location.href = "/login";
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);




export default api;