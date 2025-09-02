import { useEffect, useState } from "react";

export default function LoadingDots({ label = "Loading", maxDots = 6, interval = 300 }){
  const [dots, setDots] = useState(0);
  useEffect(()=>{
    const t = setInterval(()=> setDots(d => (d+1) % (maxDots+1)), interval);
    return ()=> clearInterval(t);
  },[maxDots, interval]);
  const tail = ".".repeat(dots);
  return (
    <div style={{
      fontWeight:700,
      letterSpacing:1,
      padding:"14px 0"
    }}>
      {label} {tail}
    </div>
  );
}