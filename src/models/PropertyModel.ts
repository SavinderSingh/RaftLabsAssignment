interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface PropertyInterface {
  id: string;
  title: string;
  price: number;
  features: string[];
  images: string[];
  location: {
    address: string;
    city: string;
    state: string;
    coordinates: Coordinates;
  };
}
