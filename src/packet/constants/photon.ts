export enum PHOTON_HEADERS {
  TYPE_2 = 2,
  TYPE_4 = 4, // 0, 0, 0, 4
}

export enum PHOTON_FLAGS {
  ACTION = 503317271, // 30, 0, 3, 23, must be after TYPE_4
  MOVEMENT = 33556246, // 2, 0, 7, 22, includes TYPE_2
}
