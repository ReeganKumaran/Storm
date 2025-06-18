export const Weather_API = {
    BASE_URL: "https://api.openweathermap.org/data/2.5",
    GEO: "https://api.openweathermap.org/geo/1.0",
    API_KEY: "a75229dcab410ebdf455f992ad181aea",
    DEFAULT_PARAMS: {
    units: "metric",
    appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
  },
}