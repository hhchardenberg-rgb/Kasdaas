import {
  Anchor, Armchair, Baby, Banknote, Bath, Battery, BedDouble, Bike, Binoculars, Bug, CalendarDays, Camera, Car,
  ChefHat, Clock, CloudRain, CloudSun, Coffee, Compass, CookingPot, DoorOpen, Droplets, Fan, Fish, Flame,
  Footprints, Fuel, Gauge, Gem, GlassWater, Globe, Hand, HeartPulse, House, IceCreamCone, Info, KeyRound, Leaf,
  LifeBuoy, Lightbulb, LogOut, MapPin, Microwave, Mountain, Navigation, Package, Phone, Pill, Plug, Refrigerator,
  Route, Sailboat, Shield, Ship, Shirt, ShoppingBag, ShowerHead, Siren, Smartphone, Sofa, Sparkles, Speaker, Sun,
  Sunrise, Sunset, Thermometer, Trash2, Trees, TriangleAlert, Tv, Umbrella, User, Utensils, UtensilsCrossed,
  WashingMachine, Waves, Wifi, Wind, Wine, Wrench, Zap, type LucideIcon, type LucideProps,
} from "lucide-react";
import type { IconName } from "@/lib/types";

const icons: Record<IconName, LucideIcon> = {
  home: House, key: KeyRound, "map-pin": MapPin, car: Car, clock: Clock, user: User, wifi: Wifi, sofa: Sofa,
  "chef-hat": ChefHat, bed: BedDouble, bath: Bath, sun: Sun, waves: Waves, trees: Trees, wind: Wind, fan: Fan,
  thermometer: Thermometer, flame: Flame, microwave: Microwave, refrigerator: Refrigerator, coffee: Coffee,
  "washing-machine": WashingMachine, tv: Tv, speaker: Speaker, plug: Plug, lightbulb: Lightbulb,
  "shower-head": ShowerHead, utensils: Utensils, armchair: Armchair, droplets: Droplets, zap: Zap, bug: Bug,
  "door-open": DoorOpen, shield: Shield, "glass-water": GlassWater, trash: Trash2, "log-out": LogOut, phone: Phone,
  "heart-pulse": HeartPulse, siren: Siren, wrench: Wrench, alert: TriangleAlert, sparkles: Sparkles, anchor: Anchor,
  ship: Ship, "life-buoy": LifeBuoy, fuel: Fuel, battery: Battery, compass: Compass, navigation: Navigation,
  gauge: Gauge, "cloud-sun": CloudSun, smartphone: Smartphone, package: Package, hand: Hand, leaf: Leaf, fish: Fish,
  banknote: Banknote, globe: Globe, sunrise: Sunrise, sunset: Sunset, mountain: Mountain, bike: Bike,
  binoculars: Binoculars, calendar: CalendarDays, "shopping-bag": ShoppingBag, pill: Pill, info: Info,
  camera: Camera, umbrella: Umbrella, baby: Baby, gem: Gem, "ice-cream": IceCreamCone, wine: Wine,
  "cloud-rain": CloudRain, route: Route, footprints: Footprints, sailboat: Sailboat, shirt: Shirt,
  dishwasher: UtensilsCrossed, "cooking-pot": CookingPot,
};

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const C = icons[name] ?? Info;
  return <C aria-hidden strokeWidth={1.6} {...props} />;
}
