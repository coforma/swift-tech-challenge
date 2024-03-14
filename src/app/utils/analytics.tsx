"use client";
import { useEffect } from "react";
import mixpanel from "mixpanel-browser";

export const InitAnalytics = () => {
  useEffect(() => {
    const isProd = process.env.NODE_ENV === "production";
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN || "", {
      debug: !isProd,
      ignore_dnt: !isProd,
      track_pageview: "full-url",
      persistence: "localStorage",
    });
  }, []);
  return <></>;
};
