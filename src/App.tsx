import type { PointType, RouteEdge, RouteType } from "./types/data.type";
import {
  useEffect,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";
import { Container } from "@chakra-ui/react";
import * as signalR from "@microsoft/signalr";

import AppRoutePicker from "./AppRoutePicker";
import AppTable from "./AppTable";

import { normalize } from "./utils/functions";

type AppContextType = {
  connection: signalR.HubConnection | null;
  routesData: RouteType[] | null;
  pointsData: PointType[] | null;
  selectedRouteID: number | null;
  setSelectedRouteID: Dispatch<
    SetStateAction<AppContextType["selectedRouteID"]>
  >;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

const App: React.FC = () => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );

  const [routes, setRoutes] = useState<Record<number, RouteType>>({});
  const [points, setPoints] = useState<
    Record<number, Record<string, PointType>>
  >({});
  const [selectedRouteID, setSelectedRouteID] =
    useState<AppContextType["selectedRouteID"]>(null);

  const routesData = useMemo(() => Object.values(routes), [routes]);
  const pointsData = useMemo(
    () => (selectedRouteID ? Object.values(points[selectedRouteID]) : null),
    [points, selectedRouteID]
  );

  const subscribeData = () => {
    connection?.on("ReceiveMessage", (route: RouteEdge) => {
      setRoutes((prev) => {
        prev[route.routeId] = route;
        return structuredClone(prev);
      });

      setPoints((prev) => {
        const prevPoints = prev[route.routeId];
        prev[route.routeId] = {
          ...prevPoints,
          ...normalize(["calculationType", "pointType"], route.points),
        };
        return structuredClone(prev);
      });
    });
    return () => {
      connection?.off("ReceiveMessage");
    };
  };

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://31.53.16.222:5000/routes")
      .build();

    connection.start();

    setConnection(connection);
  }, []);

  useEffect(() => {
    if (!connection) return;
    const subscription = subscribeData();
    return () => {
      subscription();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection]);

  return (
    <AppContext.Provider
      value={{
        connection,
        routesData,
        pointsData,
        selectedRouteID,
        setSelectedRouteID,
      }}
    >
      <Container maxW="container.lg">
        <AppRoutePicker />
        <AppTable />
      </Container>
    </AppContext.Provider>
  );
};

export default App;
