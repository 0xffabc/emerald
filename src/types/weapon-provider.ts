export interface IWeaponProvider {
  getWeaponNameById(id: number): string | undefined;
  getWeaponIdByName(name: string): number | undefined;
}
