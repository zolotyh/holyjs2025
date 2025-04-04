import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';

// Custom metrics
const responseTimeTrend = new Trend('response_time');
const errorRate = new Rate('error_rate');
const successCounter = new Counter('success_count');

export const options = {
  stages: [
    { duration: '10s', target: 300 },
  ]
};

export default function () {
  http.get('http://localhost:3001/problem');
  sleep(1); // Add a short sleep between iterations
}
