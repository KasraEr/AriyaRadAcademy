import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
export default function Leaflet() {
  return (
    <div className="w-full">
      <MapContainer
        className="w-full h-[300px] rounded-2xl overflow-hidden border border-text-500"
        center={[35.818139, 50.940669]}
        zoom={17}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[35.818139, 50.940669]}>
          <Popup autoPan={true} className="b4">
            آکادمی آریاراد
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
