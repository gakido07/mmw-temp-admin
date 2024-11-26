
export const transition = [0.76, 0, 0.24, 1];

export const opacityY = {
  initial: {
    opacity: 0,
    y: 20
  },
  enter: (i: any)=> ({
    opacity: 1,
    y: 0,
    transition: {...transition, duration: i || 0.7}
  }),
  exit: (i: any)=> ({
    opacity: 0,
    y: -20,
    transition: {...transition, duration: i || 0.7}
  })
}

export const opacity = {
  initial: {
    opacity: 0,
  },
  enter: (i: any)=> ({
    opacity: 1,
    transition: {...transition, duration: i || 0.7}
  }),
  exit: (i: any)=> ({
    opacity: 0,
    transition: {...transition, duration: i || 0.7}
  })
}

export const height = {
  initial:{
    height: 0,
    opacity: 0
  },
  enter: {
    height: "150px",
    opacity: 1,
    transition
  },
  exit:{
    height: 0,
    opacity: 0,
    transition
  }
};