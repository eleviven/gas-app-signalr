import { useContext } from "react";
import {
  Alert,
  AlertIcon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { AppContext } from "./App";

const AppTable: React.FC = () => {
  const { pointsData, selectedRouteID } = useContext(AppContext);

  if (!selectedRouteID) {
    return (
      <Alert status="warning" rounded={"lg"}>
        <AlertIcon />
        Select route to see table
      </Alert>
    );
  }

  return (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            {Object.keys(pointsData?.[0] || {}).map((key) => {
              return <Th key={key}>{key}</Th>;
            })}
          </Tr>
        </Thead>
        <Tbody>
          {pointsData?.map((point) => (
            <Tr
              key={`${selectedRouteID}${point.pointType}${point.calculationType}`}
            >
              <Td>{point.pointType}</Td>
              <Td>{point.calculationType}</Td>
              <Td>{point.spread.toFixed(2)}</Td>
              <Td>{point.feeCost.toFixed(2)}</Td>
              <Td>{point.tariffCostFixed.toFixed(2)}</Td>
              <Td>{point.tariffCostVariable.toFixed(2)}</Td>
              <Td>{point.finalCost.toFixed(2)}</Td>
              <Td>{point.value}</Td>
              <Td>{point.otmItm}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default AppTable;
