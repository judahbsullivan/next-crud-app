"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWeather, type CurrentWeather } from "@/lib/api";

export default function WeatherClient() {
  const [, setCoords] = React.useState<{lat:number;lon:number} | null>(null);
  const [data, setData] = React.useState<CurrentWeather | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchWeather = async (lat: number, lon: number) => {
    setLoading(true); setError(null);
    try {
      const d = await getWeather(lat, lon);
      setData(d);
    } catch (e) {
      const err = e as { message?: string };
      setError(String(err.message || e));
    } finally {
      setLoading(false);
    }
  };

  const useMyLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setCoords({ lat: latitude, lon: longitude });
      fetchWeather(latitude, longitude);
    }, (err) => setError(err.message));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Button onClick={useMyLocation}>Use My Location</Button>
          <Button variant="secondary" onClick={() => fetchWeather(40.7128, -74.0060)}>NYC</Button>
          <Button variant="secondary" onClick={() => fetchWeather(34.0522, -118.2437)}>LA</Button>
        </div>
        {loading && <p className="text-sm text-gray-500">Loading…</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {data && (
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-gray-500">Temp</span><div className="text-lg font-semibold">{data.temperature_2m ?? "-"}°C</div></div>
            <div><span className="text-gray-500">Wind</span><div className="text-lg font-semibold">{data.wind_speed_10m ?? "-"} km/h</div></div>
            <div><span className="text-gray-500">Humidity</span><div className="text-lg font-semibold">{data.relative_humidity_2m ?? "-"}%</div></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


