import WeatherClient from "./WeatherClient";

export default function WeatherPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">Weather</h1>
      <WeatherClient />
    </section>
  );
}


