
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState({ target: 3000, collected: 0, contributors: 0 });

  const fetchData = async () => {
    const res = await fetch("/api/data");
    const newData = await res.json();
    setData(newData);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const progress = Math.min((data.collected / data.target) * 100, 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-blue-100 to-purple-200">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">🎯 Stav finančnej zbierky</h1>
        <p className="text-lg mb-2">🏦 Počet vkladov: <strong>{data.contributors}</strong></p>
        <p className="text-lg mb-6">💶 Vyzbieraná suma: <strong>{data.collected} €</strong></p>
        <div className="w-full bg-gray-300 rounded-full h-6 mb-6 overflow-hidden">
          <div className="bg-green-500 h-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-md">Cieľová suma: {data.target} € ({progress.toFixed(1)} %)</p>
      </div>
    </div>
  );
}
