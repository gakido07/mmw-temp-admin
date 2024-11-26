import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

const NASA = ({id, color, quantity, min, max, fullScreen}) => {
  const [init, setInit] = useState(false);

 
  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(() => ({
    key: "nasa",
    name: "NASA",
    
    particles: {
        number: {
            value: quantity || 360,
            density: {
                enable: true,
            },
        },
        color: {
            value: color || "#ffffff",
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: {
                min: 0.1,
                max: 1,
            },
            animation: {
                enable: true,
                speed: 1,
                sync: false,
            },
        },
        size: {
            value: {
                min: min || 1,
                max: max || 2.5,
            },
        },
        move: {
            enable: true,
            speed: {
                min: 0.1,
                max: 1,
            },
        },
    },

    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "bubble",
            },
            onClick: {
                enable: true,
                mode: "repulse",
            },
            resize: true,
        },
        modes: {
            grab: {
                distance: 400,
                links: {
                    opacity: 1,
                },
            },
            bubble: {
                distance: 250,
                size: 0,
                duration: 2,
                opacity: 0,
            },
            repulse: {
                distance: 400,
                duration: 0.4,
            },
            push: {
                quantity: 4,
            },
            remove: {
                quantity: 2,
            },
        },
    },

    detectRetina: true,

    fullScreen: { 
      enable: fullScreen
    }
  }), [])

  if (init) {
    return (
      <Particles
        id={id || "experimentalModalNASA"}
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }
};


export default React.memo(NASA);