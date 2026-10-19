export interface NetworkCountry {
  name: string;
  flag: string;
  lat: number;
  lng: number;
  region: "middleEast" | "asiaPacific" | "europe" | "americasAfrica";
  isHQ?: boolean;
  hubCity: string;
}

export const NETWORK_COUNTRIES_49: NetworkCountry[] = [
  // Middle East (9)
  { name: "Saudi Arabia", flag: "sa", lat: 26.28, lng: 50.21, region: "middleEast", isHQ: true, hubCity: "Al-Khobar HQ" },
  { name: "United Arab Emirates", flag: "ae", lat: 24.45, lng: 54.37, region: "middleEast", hubCity: "Dubai / Abu Dhabi" },
  { name: "Oman", flag: "om", lat: 23.58, lng: 58.40, region: "middleEast", hubCity: "Muscat" },
  { name: "Bahrain", flag: "bh", lat: 26.22, lng: 50.58, region: "middleEast", hubCity: "Manama" },
  { name: "Qatar", flag: "qa", lat: 25.28, lng: 51.53, region: "middleEast", hubCity: "Doha" },
  { name: "Kuwait", flag: "kw", lat: 29.37, lng: 47.97, region: "middleEast", hubCity: "Kuwait City" },
  { name: "Egypt", flag: "eg", lat: 30.04, lng: 31.23, region: "middleEast", hubCity: "Cairo / Alexandria" },
  { name: "Jordan", flag: "jo", lat: 31.95, lng: 35.93, region: "middleEast", hubCity: "Amman / Aqaba" },
  { name: "Iran", flag: "ir", lat: 35.68, lng: 51.38, region: "middleEast", hubCity: "Tehran" },

  // Asia Pacific (12)
  { name: "Pakistan", flag: "pk", lat: 31.52, lng: 74.35, region: "asiaPacific", hubCity: "Lahore / Karachi" },
  { name: "Indonesia", flag: "id", lat: -6.20, lng: 106.81, region: "asiaPacific", hubCity: "Jakarta / Batam" },
  { name: "Malaysia", flag: "my", lat: 3.13, lng: 101.68, region: "asiaPacific", hubCity: "Kuala Lumpur / Johor" },
  { name: "Taiwan", flag: "tw", lat: 25.03, lng: 121.56, region: "asiaPacific", hubCity: "Taipei / Kaohsiung" },
  { name: "Korea", flag: "kr", lat: 37.56, lng: 126.97, region: "asiaPacific", hubCity: "Seoul / Busan" },
  { name: "Japan", flag: "jp", lat: 35.67, lng: 139.65, region: "asiaPacific", hubCity: "Tokyo / Yokohama" },
  { name: "India", flag: "in", lat: 19.07, lng: 72.87, region: "asiaPacific", hubCity: "Mumbai / Gujarat" },
  { name: "China", flag: "cn", lat: 31.23, lng: 121.47, region: "asiaPacific", hubCity: "Shanghai / Beijing" },
  { name: "Singapore", flag: "sg", lat: 1.35, lng: 103.81, region: "asiaPacific", hubCity: "Singapore Port" },
  { name: "Thailand", flag: "th", lat: 13.75, lng: 100.50, region: "asiaPacific", hubCity: "Bangkok / Rayong" },
  { name: "Philippines", flag: "ph", lat: 14.59, lng: 120.98, region: "asiaPacific", hubCity: "Manila / Batangas" },
  { name: "Australia", flag: "au", lat: -31.95, lng: 115.86, region: "asiaPacific", hubCity: "Perth / Sydney" },

  // Europe (23)
  { name: "France", flag: "fr", lat: 48.85, lng: 2.35, region: "europe", hubCity: "Paris / Lyon" },
  { name: "Portugal", flag: "pt", lat: 38.72, lng: -9.13, region: "europe", hubCity: "Lisbon / Porto" },
  { name: "Spain", flag: "es", lat: 40.41, lng: -3.70, region: "europe", hubCity: "Madrid / Bilbao" },
  { name: "UK", flag: "gb", lat: 51.50, lng: -0.12, region: "europe", hubCity: "London / Aberdeen" },
  { name: "Belgium", flag: "be", lat: 50.85, lng: 4.35, region: "europe", hubCity: "Brussels / Antwerp" },
  { name: "Denmark", flag: "dk", lat: 55.67, lng: 12.56, region: "europe", hubCity: "Copenhagen" },
  { name: "Finland", flag: "fi", lat: 60.16, lng: 24.93, region: "europe", hubCity: "Helsinki / Turku" },
  { name: "Germany", flag: "de", lat: 51.16, lng: 10.45, region: "europe", hubCity: "Frankfurt / Essen" },
  { name: "Holland", flag: "nl", lat: 52.55, lng: 4.60, region: "europe", hubCity: "Rotterdam Port" },
  { name: "Netherlands", flag: "nl", lat: 51.85, lng: 5.75, region: "europe", hubCity: "Amsterdam / Utrecht" },
  { name: "Norway", flag: "no", lat: 59.91, lng: 10.75, region: "europe", hubCity: "Oslo / Stavanger" },
  { name: "Sweden", flag: "se", lat: 59.32, lng: 18.06, region: "europe", hubCity: "Stockholm / Gothenburg" },
  { name: "Switzerland", flag: "ch", lat: 47.37, lng: 8.54, region: "europe", hubCity: "Zurich / Basel" },
  { name: "Czech Republic", flag: "cz", lat: 50.07, lng: 14.43, region: "europe", hubCity: "Prague / Ostrava" },
  { name: "Turkey", flag: "tr", lat: 41.00, lng: 28.97, region: "europe", hubCity: "Istanbul / Ankara" },
  { name: "Russia", flag: "ru", lat: 55.75, lng: 37.61, region: "europe", hubCity: "Moscow / St. Petersburg" },
  { name: "Austria", flag: "at", lat: 48.20, lng: 16.37, region: "europe", hubCity: "Vienna / Linz" },
  { name: "Italy", flag: "it", lat: 45.46, lng: 9.19, region: "europe", hubCity: "Milan / Genoa" },
  { name: "Romania", flag: "ro", lat: 44.42, lng: 26.10, region: "europe", hubCity: "Bucharest / Ploiești" },
  { name: "Greece", flag: "gr", lat: 37.98, lng: 23.72, region: "europe", hubCity: "Athens / Piraeus" },
  { name: "Hungary", flag: "hu", lat: 47.49, lng: 19.04, region: "europe", hubCity: "Budapest" },
  { name: "Ireland", flag: "ie", lat: 53.34, lng: -6.26, region: "europe", hubCity: "Dublin / Cork" },
  { name: "Poland", flag: "pl", lat: 52.22, lng: 21.01, region: "europe", hubCity: "Warsaw / Gdańsk" },

  // Americas & Africa (5)
  { name: "South Africa", flag: "za", lat: -26.20, lng: 28.04, region: "americasAfrica", hubCity: "Johannesburg / Durban" },
  { name: "Brazil", flag: "br", lat: -23.55, lng: -46.63, region: "americasAfrica", hubCity: "São Paulo / Rio" },
  { name: "Canada", flag: "ca", lat: 45.42, lng: -75.69, region: "americasAfrica", hubCity: "Calgary / Toronto" },
  { name: "U.S.A.", flag: "us", lat: 29.76, lng: -95.36, region: "americasAfrica", hubCity: "Houston Energy Corridor" },
  { name: "Mexico", flag: "mx", lat: 19.43, lng: -99.13, region: "americasAfrica", hubCity: "Mexico City / Monterrey" },
];
