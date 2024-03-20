"use client";
import { useEffect } from "react";
import mixpanel from "mixpanel-browser";

export const InitAnalytics = () => {
  useEffect(() => {
    const isProd = process.env.NODE_ENV === "production";
    const tokenMap: any = {
      prod: "68858e4ca428836ed94d18a0faa8e338", // pragma: allowlist-secret
      lower: "9e4e035518e9c13c5ebf624717a1d5bc", // pragma: allowlist-secret
    };
    // note: this variable is not a secret: https://developer.mixpanel.com/reference/project-token
    const mixpanelToken = isProd ? tokenMap.prod : tokenMap.lower;
    mixpanel.init(mixpanelToken, {
      debug: !isProd,
      ignore_dnt: !isProd,
      track_pageview: "full-url",
      persistence: "localStorage",
    });
  }, []);
  return <></>;
};
