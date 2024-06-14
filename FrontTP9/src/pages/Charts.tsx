import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import {
  getOrdersByInstrument,
  getOrdersByMonth,
} from "../services/ReportesCRUD";

interface OrdersByMonth {
  monthYear: string;
  orderCount: number;
}

interface OrdersByInstrument {
  instrumentName: string;
  orderCount: number;
}

const Charts: React.FC = () => {
  const [ordersByMonth, setOrdersByMonth] = useState<
    Array<Array<string | number>>
  >([]);
  const [ordersByInstrument, setOrdersByInstrument] = useState<
    Array<Array<string | number>>
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getOrdersByMonth()
      .then((orders) => {
        const chartData = [
          ["Month-Year", "Orders"],
          ...orders.map((order: OrdersByMonth) => [
            order.monthYear,
            order.orderCount,
          ]),
        ];
        setOrdersByMonth(chartData);
      })
      .catch((error) => {
        setError(
          `Error al obtener los datos de pedidos por mes: ${error.message}`
        );
      });

    getOrdersByInstrument()
      .then((orders) => {
        const chartData = [
          ["Instrument", "Orders"],
          ...orders.map((order: OrdersByInstrument) => [
            order.instrumentName,
            order.orderCount,
          ]),
        ];
        setOrdersByInstrument(chartData);
      })
      .catch((error) => {
        setError(
          `Error al obtener los datos de pedidos por instrumento: ${error.message}`
        );
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Chart
        chartType="PieChart"
        width="100%"
        height="500px"
        data={ordersByInstrument}
        options={{
          title: "Cantidad de pedidos por instrumento:",
          titleTextStyle: { fontSize: 24 },
          is3D: true,
          slices: {
            0: { offset: 0.16 },
            2: { offset: 0.3 },
            4: { offset: 0.14 },
            5: { offset: 0.15 },
          },
        }}
      />
      <Chart
        chartType="BarChart"
        width="100%"
        height="400px"
        data={ordersByMonth}
        options={{
          title: "Cantidad de pedidos por mes y año:",
          titleTextStyle: { fontSize: 24 },
          hAxis: { title: "Cantidad de pedidos" },
          vAxis: { title: "Mes-Año" },
          colors: ["#DAE803"],
        }}
      />
    </>
  );
};

export default Charts;
