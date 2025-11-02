import { useEffect, useState } from "react";
import axios from "axios";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";

export default function App() {
    const [symbol, setSymbol] = useState<string>("");
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string>("");

    async function fetchStockData() {
        if (!symbol) {
            setError("Please enter a symbol.");
            return;
        }
        
        try {
            setError("");
            fetch("https://stock-analysis-app-e177.onrender.com/api/v8/finance/chart/" + symbol + "?inverval=1d")
                .then(res => res.json())
                .then(setData);
        } catch (err: any) {
            console.error(err);
            setError("Failed to fetch data.");
        }
    }

    return (
        <div>
            <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="Symbol"
            />
            <button onClick={fetchStockData}>Refresh data</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {data && <pre>{JSON.stringify(data)};</pre>}
        </div>
    );
}