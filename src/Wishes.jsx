/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import wishesData from "./wishesData";

export default function Wishes({ setOpen }) {
  const wishes = useRef(null);

  useEffect(() => {
    if (!wishes.current) return;
    const typed = new Typed(wishes.current, {
      strings: wishesData,
      typeSpeed: 50,
      showCursor: false,
      backSpeed: 0,
      backDelay: 1500,
      smartBackspace: true,
      onComplete: async () => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setOpen(false);
      },
    });

    return () => {
      typed.destroy();
    };
  }, [setOpen]);

  return <div ref={wishes}></div>;
}
