export enum PHOTON_HEADERS {
  TYPE_2 = 2,
  TYPE_4 = 4,
}

export enum PHOTON_FLAGS {
  ACTION = 369295389, // 29, 0, 3, 22, must be after TYPE_4
  MOVEMENT = 33556246, // 2, 0, 7, 22, includes TYPE_2
}
