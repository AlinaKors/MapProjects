export interface IDevice {
  id: string;
  name: string;
  lat: number;
  lon: number;
  model: 'basic' | 'advanced' | 'special';
  status: 'on' | 'off';
  color: string;
  children?: IDevice[];
}
