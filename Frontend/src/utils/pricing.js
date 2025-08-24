const vehicleRates = {
  miniTruck: 10,
  pickupTruck: 12,
  threeWheeler: 8,
  smallVan: 15,
  mediumDutyTruck: 20,
  containerTruck: 25,
  openBodyTruck: 30
};

export const calculatePricing = (distance, vehicleType, numWorkers) => {
  const base = 100;
  const rate = vehicleRates[vehicleType] || 0;
  const vehicleCost = distance * rate;
  const workersCost = numWorkers * 200;
  const total = base + vehicleCost + workersCost;

  return {
    base,
    vehicle: vehicleCost,
    workers: workersCost,
    total,
  };
};