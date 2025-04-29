
import { useState, useEffect } from "react";

const ADMIN_PASSWORD = "tajneheslo123";

export default function Admin() {
  const [authorized, setAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [target, setTarget] = useState(3000);
  const [collected, setCollected] = useState(0);
  const [contributors, setContributors] = useState(0);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((data) => {
        setTarget(data.target);
        setCollected(data.collected);
        setContributors(data.contributors);
      });
  }, []);

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthorized(true);
    } else {
      alert("Nesprávne heslo!");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch("/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ target, collected, contributors }),
    });
    alert("Údaje boli uložené!");
  };

  if (!authorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-gray-100 to-gray-300">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
          <h1 className="text-2xl font-bold mb-4">🔒 Zadaj heslo</h1>
          <form onSubmit={handleLogin} className="flex flex-col space-y-4">
            <input
              type="password"
              placeholder="Heslo"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="border p-2 rounded"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              🔑 Vstúpiť
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-6">📋 Admin sekcia</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input type="number" placeholder="Cieľová suma (€)" value={target} onChange={(e) => setTarget(Number(e.target.value))} className="border p-2 rounded" />
          <input type="number" placeholder="Vyzbieraná suma (€)" value={collected} onChange={(e) => setCollected(Number(e.target.value))} className="border p-2 rounded" />
          <input type="number" placeholder="Počet vkladov" value={contributors} onChange={(e) => setContributors(Number(e.target.value))} className="border p-2 rounded" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            💾 Uložiť
          </button>
        </form>
      </div>
    </div>
  );
}
