import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { IDevice } from '../../types/device';
import L from 'leaflet';
import AdvancedImg from '../../assets/img/advanced.png';
import BasicImg from '../../assets/img/basic.png';
import SpecialImg from '../../assets/img/special.png';

interface DeviceMapProps {
  devices: IDevice[];
}

const MarkerList = {
  basic: BasicImg,
  advanced: AdvancedImg,
  special: SpecialImg,
};

export const DeviceMap: React.FC<DeviceMapProps> = ({ devices }) => {
  return (
    <MapContainer
      center={[devices[0]?.lat || 55.751244, devices[0]?.lon || 37.618423]}
      zoom={13}
      style={{ height: '80vh', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {devices.map((device, index) => {
        const isDraggable = index === 1;
        return (
          <React.Fragment key={device.id}>
            <Marker
              draggable={isDraggable}
              position={[device.lat, device.lon]}
              icon={
                new L.Icon({
                  iconUrl: MarkerList[device.model],
                  iconSize: [40, 40],
                  iconAnchor: [20, 20],
                  popupAnchor: [0, -20],
                })
              }
              eventHandlers={{
                dragend: (e) => {
                  if (isDraggable) {
                    const pos = e.target.getLatLng();
                    console.log(`New position for ${device.name}:`, pos);
                  }
                },
              }}
            >
              <Popup>
                Name: {device.name} <br />
                Model: {device.model} <br />
                Status: {device.status}
              </Popup>
            </Marker>

            {device.children?.map((child) => (
              <Marker
                key={child.id}
                position={[child.lat, child.lon]}
                icon={
                  new L.Icon({
                    iconUrl: MarkerList[child.model],
                    iconSize: [28, 28],
                    iconAnchor: [14, 14],
                    popupAnchor: [0, -14],
                  })
                }
              >
                <Popup>
                  Name: {child.name} <br />
                  Model: {child.model} <br />
                  Status: {child.status}
                </Popup>
              </Marker>
            ))}
          </React.Fragment>
        );
      })}
    </MapContainer>
  );
};
