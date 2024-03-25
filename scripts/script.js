import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 100,s
  duration: "30s",
  thresholds: {
    http_req_duration: ["p(99)<1500"], // 99% of requests must complete below 1.5s
  },
  stages: [
    { duration: "30s", target: 30 },
    { duration: "60s", target: 30 },
    { duration: "10s", target: 0 },
  ],
};

export default function () {
  let res = http.get(
    "https://staging-api.yourqrmemorial.com/api/v1/qr-profile/fetch-page?page=1&search_keyword="
  );
  check(res, { "status is 200": (r) => r.status === 200 });
  sleep(1);
}
