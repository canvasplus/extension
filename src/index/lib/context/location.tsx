import {
  createSignal,
  createContext,
  useContext,
  Accessor,
  Setter,
} from "solid-js";

type Store = [
  {
    getCurrentLocation(): string;
    getFullLocation: Accessor<CPXLocation | undefined>;
  },
  {
    goTo(newRoute: string): void;
    doneLoading(): void;
    setFullLocation: Setter<CPXLocation | undefined>;
  }
];

const LocationContext = createContext<Store>();

export type CPXLocation = {
  route: string;
  prev?: string;
};

export function LocationProvider(props) {
  const [location, setLocation] = createSignal<CPXLocation | undefined>({
    route: "hi",
    prev: "no",
  });

  const store: Store = [
    {
      getCurrentLocation(): string {
        return location().prev ?? location().route;
      },
      getFullLocation: location,
    },
    {
      goTo(newRoute: string) {
        const current = location();
        current.prev = newRoute;

        setLocation(current);
      },
      doneLoading() {
        const current = location();
        current.route = current.prev;
        current.prev = undefined;

        setLocation(current);
      },
      setFullLocation: setLocation,
    },
  ];

  return <LocationContext.Provider value={store} children={props.children} />;
}

export function useLocation() {
  return useContext(LocationContext);
}
