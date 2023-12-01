import { ChangeEvent, useContext } from "react";
import { HStack, Icon, IconButton, Select } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { AppContext } from "./App";

const AppRoutePicker: React.FC = () => {
  const { routesData, setSelectedRouteID, selectedRouteID } =
    useContext(AppContext);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedRouteID(+e.target.value);
  };

  const handleReset = () => {
    setSelectedRouteID(null);
  };

  return (
    <HStack py="5">
      <Select
        name="routes"
        value={selectedRouteID || ""}
        onChange={handleChange}
        width={"48"}
        disabled={!routesData?.length}
      >
        <option value="" disabled>
          Choose Route
        </option>
        {routesData?.map((route) => {
          return (
            <option key={route.routeId} value={route.routeId}>
              {route.routeName}
            </option>
          );
        })}
      </Select>

      {!routesData?.length && (
        <IconButton aria-label="Loading" onClick={handleReset} isLoading />
      )}

      {selectedRouteID && (
        <IconButton
          icon={<Icon as={CloseIcon} />}
          aria-label="Clear"
          onClick={handleReset}
        />
      )}
    </HStack>
  );
};

export default AppRoutePicker;
