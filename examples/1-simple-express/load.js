import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 300, // Number of virtual users (simulated users)
  duration: "10s", // Test duration (you can change this)
};

export default function () {
  const url = "http://localhost:3002/checkout";
  http.get(url);
  sleep(1);
}
