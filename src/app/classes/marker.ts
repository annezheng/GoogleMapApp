export class Marker {
  constructor(public name: string,
        public lat: number,
        public lng: number,
        public draggable: boolean,
        public label: string,
        public formattedAddress: string = '',
        public addressComponents: string[] = []) {
        }
}
