"use client";

import { useEffect } from "react";

const AdComponent = ({ adData }) => {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("Error loading ads: ", e);
    }
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adData.ad_client}
        data-ad-slot={adData.ad_slot}
        data-ad-format={adData.ad_format}
        data-full-width-responsive={adData.ad_fullWidthResponsive}
      ></ins>
    </div>
  );
};

export default AdComponent;
