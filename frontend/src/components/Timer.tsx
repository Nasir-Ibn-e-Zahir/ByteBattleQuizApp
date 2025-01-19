import { useState, useEffect } from "react";

function Timer() {
  const [time, setTime] = useState(10);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, time]);

  const reset = () => {
    setIsRunning(false);
    setTime(10);
  };

  // Circle dimensions and stroke calculations
  const circleRadius = 70;
  const circlePerimeter = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circlePerimeter - (time / 10) * circlePerimeter;

  // Dynamically calculate font size based on time (grow the font as time decreases)
  const minFontSize = 70;
  const maxFontSize = 150; // Increase the max font size to make it much larger
  const fontSize = Math.max(minFontSize, maxFontSize - (10 - time) * 10); // Adjust the formula for a larger font size

  return (
    <div style={{ textAlign: "center", margin: "2rem" }}>
      {/* Timer SVG */}
      <svg width="150" height="150" viewBox="0 0 150 150">
        {/* Background Circle (no fill) */}
        <circle
          cx="75"
          cy="75"
          r={circleRadius}
          fill="none"
          stroke="#eee"
          strokeWidth="10"
        />
        {/* Countdown Circle (red stroke, no fill) */}
        <circle
          cx="75"
          cy="75"
          r={circleRadius}
          fill="none"
          stroke="red"
          strokeWidth="10"
          strokeDasharray={circlePerimeter}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: "stroke-dashoffset 1s linear",
            transform: "rotate(-90deg)", // Start the fill from the top (12 o'clock)
            transformOrigin: "center",
          }}
        />
        {/* Timer Text in the middle of the circle */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={fontSize} // Dynamically calculated font size
          fontWeight="bolder"
          fill="#333"
          fontFamily="'Orbitron', sans-serif"
          style={{
            textShadow: "0px 0px 20px rgba(0, 0, 0, 0.7)", // Larger shadow for better visibility
            transition: "font-size 0.3s ease, fill 0.3s ease", // Smooth transition effects
          }}
        >
          {time}
        </text>
      </svg>

      {/* Buttons */}
      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={() => setIsRunning(!isRunning)}
          style={{
            margin: "0 5px",
            padding: "12px 25px",
            border: "none",
            borderRadius: "50px",
            backgroundColor: isRunning ? "#ffc107" : "#28a745",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            fontSize: "16px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
          }}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={reset}
          style={{
            margin: "0 5px",
            padding: "12px 25px",
            border: "none",
            borderRadius: "50px",
            backgroundColor: "#007bff",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            fontSize: "16px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;
