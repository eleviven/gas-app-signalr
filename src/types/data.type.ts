export type RouteEdge = RouteType & {
  points: PointType[];
};

export type RouteType = {
  routeId: number;
  routeName: string;
  source: number;
};

export type PointType = {
  pointType: string;
  calculationType: string;
  spread: number;
  feeCost: number;
  tariffCostFixed: number;
  tariffCostVariable: number;
  finalCost: number;
  value: number;
  otmItm: string;
};
