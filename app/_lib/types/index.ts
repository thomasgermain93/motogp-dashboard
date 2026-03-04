export interface Country {
  iso: string;
  name: string;
  flag?: string;
  region_iso?: string;
}

export interface Constructor {
  id: string;
  name: string;
  legacy_id: number;
}

export interface Team {
  id: string;
  name: string;
  legacy_id: number;
  color: string;
  text_color: string;
  picture?: string;
  constructor: Constructor;
  season?: Season;
  published?: boolean;
}

export interface Category {
  id: string;
  name: string;
  legacy_id: number;
  acronym?: string;
  active?: boolean;
  timing_id?: number;
  priority?: number;
}

export interface Season {
  id: string;
  year: number;
  name?: string | null;
  current?: boolean;
}

export interface Circuit {
  id: string;
  name: string;
  iso_code: string;
  country: string;
  city: string;
  lat: string;
  lng: string;
  length?: string;
  width?: string;
  longest_straight?: string;
  left_corners?: string;
  right_corners?: string;
  constructed?: number;
  track?: {
    id: string;
    length: string;
    width: string;
    longest_straight: string;
    left_corners: string;
    right_corners: string;
    assets?: {
      info?: { path: string };
      simple?: { path: string };
    };
  };
}

export interface RiderPictures {
  profile: {
    main: string | null;
    secondary?: string | null;
  };
  bike?: {
    main: string | null;
    secondary?: string | null;
  };
  helmet?: {
    main: string | null;
    secondary?: string | null;
  };
  number?: string | null;
  portrait?: string | null;
}

export interface CareerStep {
  id?: string;
  season: number;
  number: number;
  sponsored_team: string;
  team: Team;
  category: Category;
  in_grid: boolean;
  short_nickname: string;
  current: boolean;
  pictures: RiderPictures;
  type: string;
}

export interface Rider {
  id: string;
  name: string;
  surname: string;
  nickname?: string | null;
  full_name?: string;
  country: Country;
  birth_city?: string;
  birth_date?: string;
  years_old?: number;
  legacy_id: number;
  published?: boolean;
  retired?: boolean;
  current_career_step?: CareerStep;
  career?: CareerStep[];
  pictures?: RiderPictures;
}

export interface Broadcast {
  id: string;
  shortname: string;
  name: string;
  date_start: string;
  date_end: string;
  type: string;
  kind: string;
  status: string;
  progressive: number;
  has_timing: boolean;
  has_results: boolean;
  is_live: boolean;
  category: Category;
  gp_day: number;
}

export interface Event {
  id: string;
  name: string;
  shortname: string;
  sponsored_name?: string;
  country: string;
  circuit: Circuit;
  date_start: string;
  date_end: string;
  status: 'UPCOMING' | 'ONGOING' | 'FINISHED';
  kind?: string;
  type?: string;
  hashtag?: string;
  broadcasts?: Broadcast[];
  categories?: Category[];
  season?: Season;
  schedule?: {
    options: Array<{
      date: number;
      dateStart: string;
      name: string;
      day: number;
      month: string;
      gp_day: number;
    }>;
    selected_day: number;
  };
}

export interface Session {
  id: string;
  date: string;
  number: number;
  type: string;
  status: string;
  circuit: string;
  shortname: string;
  condition?: {
    track: string;
    air: string;
    humidity: string;
    ground: string;
    weather: string;
  };
  category: Category;
  event?: Event;
  session_files?: {
    classification?: string;
  };
}

export interface ClassificationEntry {
  id: string;
  position: number;
  rider: Rider;
  team: Team;
  constructor: Constructor;
  best_lap?: {
    number: number;
    time: string;
  };
  total_laps?: number;
  top_speed?: number;
  gap?: {
    first: string;
    prev: string;
  };
  status?: string;
  points?: number;
  session?: string;
}

export interface StandingEntry {
  id: string;
  position: number;
  rider: Rider;
  team: Team;
  constructor: Constructor;
  points: number;
  session?: string;
}

export interface LiveTimingEntry {
  order: number;
  rider_id: number;
  rider_number: string;
  rider_name: string;
  rider_surname: string;
  rider_shortname: string;
  pos: number;
  lap_time: string;
  num_lap: number;
  last_lap_time: string;
  last_lap: number;
  gap_first: string;
  gap_prev: string;
  top_speed?: number;
  team_name: string;
  bike_name: string;
  on_pit: boolean;
  color: string;
  text_color: string;
  status_name: string;
  trac_status: string;
}

export interface LiveTimingData {
  head: {
    championship_id: string;
    category: string;
    circuit_id: string;
    circuit_name: string;
    event_id: string;
    event_shortname: string;
    date: string;
    session_id: string;
    session_type: number;
    session_name: string;
    session_shortname: string;
    session_status_id: string;
    session_status_name: string;
    num_laps: number;
    remaining: string;
  };
  rider: Record<string, LiveTimingEntry>;
}

export interface RiderStats {
  first_grand_prix: Array<{
    category: Category;
    event: Event;
  }>;
  podiums: {
    categories: Array<{ category: Category; count: number }>;
    total: number;
  };
  last_wins: Array<{
    category: Category;
    event: Event;
  }>;
  poles: {
    categories: Array<{ category: Category; count: number }>;
    total: number;
  };
  grand_prix_victories: {
    categories: Array<{ category: Category; count: number }>;
    total: number;
  };
  world_championship_wins: {
    categories: Array<{ category: Category; count: number }>;
    total: number;
  };
  all_races: {
    categories: Array<{ category: Category; count: number }>;
    total: number;
  };
  race_fastest_laps: {
    categories: Array<{ category: Category; count: number }>;
    total: number;
  };
}

export interface SeasonStats {
  season: string;
  category: string;
  constructor: string;
  starts: number;
  first_position: number;
  second_position: number;
  third_position: number;
  podiums: number;
  poles: number;
  points: number;
  position: number;
}
