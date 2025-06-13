"use client";
import { useEffect } from "react";

function BootstrapClient() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  });
}
export default BootstrapClient;
