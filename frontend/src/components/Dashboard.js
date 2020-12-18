import React from "react";
import { useContext, useState, useEffect } from "react";
import { CategoryContext } from "../contexts/CategoryContext";
import { AuthContext } from "../contexts/AuthContext";
import Chart from "chart.js";
import { Form } from "react-bootstrap";

const ConfigureUser = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [monthlyBudgetTotal, setMonthlyBudgetTotal] = useState(user.monthly_budget_total);
  const { categories } = useContext(CategoryContext);
  const [currentMonth, setCurrentMonth] = useState(0);

  const [dataSourceByCategory, setDataSourceByCategory] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#FF0000bf",
          "#00FF00bf",
          "#0000FFbf",
          "#FFFF00bf",
          "#FF00FFbf",
          "#00FFFFbf",
          "#000000bf",
          "#800000bf",
          "#008000bf",
          "#000080bf",
          "#808000bf",
          "#800080bf",
          "#008080bf",
          "#808080bf",
          "#C00000bf",
          "#00C000bf",
          "#0000C0bf",
          "#C0C000bf",
          "#C000C0bf",
          "#00C0C0bf",
          "#C0C0C0bf",
          "#400000bf",
          "#004000bf",
          "#000040bf",
          "#404000bf",
          "#400040bf",
          "#004040bf",
          "#404040bf",
          "#200000bf",
          "#002000bf",
          "#000020bf",
          "#202000bf",
          "#200020bf",
          "#002020bf",
          "#202020bf",
          "#600000bf",
          "#006000bf",
          "#000060bf",
          "#606000bf",
          "#600060bf",
          "#006060bf",
          "#606060bf",
          "#A00000bf",
          "#00A000bf",
          "#0000A0bf",
          "#A0A000bf",
          "#A000A0bf",
          "#00A0A0bf",
          "#A0A0A0bf",
          "#E00000bf",
          "#00E000bf",
          "#0000E0bf",
          "#E0E000bf",
          "#E000E0bf",
          "#00E0E0bf",
          "#E0E0E0bf",
        ],
        borderColor: [
          "#FF0000bf",
          "#00FF00bf",
          "#0000FFbf",
          "#FFFF00bf",
          "#FF00FFbf",
          "#00FFFFbf",
          "#000000bf",
          "#800000bf",
          "#008000bf",
          "#000080bf",
          "#808000bf",
          "#800080bf",
          "#008080bf",
          "#808080bf",
          "#C00000bf",
          "#00C000bf",
          "#0000C0bf",
          "#C0C000bf",
          "#C000C0bf",
          "#00C0C0bf",
          "#C0C0C0bf",
          "#400000bf",
          "#004000bf",
          "#000040bf",
          "#404000bf",
          "#400040bf",
          "#004040bf",
          "#404040bf",
          "#200000bf",
          "#002000bf",
          "#000020bf",
          "#202000bf",
          "#200020bf",
          "#002020bf",
          "#202020bf",
          "#600000bf",
          "#006000bf",
          "#000060bf",
          "#606000bf",
          "#600060bf",
          "#006060bf",
          "#606060bf",
          "#A00000bf",
          "#00A000bf",
          "#0000A0bf",
          "#A0A000bf",
          "#A000A0bf",
          "#00A0A0bf",
          "#A0A0A0bf",
          "#E00000bf",
          "#00E000bf",
          "#0000E0bf",
          "#E0E000bf",
          "#E000E0bf",
          "#00E0E0bf",
          "#E0E0E0bf",
        ],
        borderWidth: 1,
      },
    ],
  });

  const [dataSourceByMonth, setDataSourceByMonth] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#FF0000bf",
          "#00FF00bf",
          "#0000FFbf",
          "#FFFF00bf",
          "#FF00FFbf",
          "#00FFFFbf",
          "#000000bf",
          "#800000bf",
          "#008000bf",
          "#000080bf",
          "#808000bf",
          "#800080bf",
          "#008080bf",
          "#808080bf",
          "#C00000bf",
          "#00C000bf",
          "#0000C0bf",
          "#C0C000bf",
          "#C000C0bf",
          "#00C0C0bf",
          "#C0C0C0bf",
          "#400000bf",
          "#004000bf",
          "#000040bf",
          "#404000bf",
          "#400040bf",
          "#004040bf",
          "#404040bf",
          "#200000bf",
          "#002000bf",
          "#000020bf",
          "#202000bf",
          "#200020bf",
          "#002020bf",
          "#202020bf",
          "#600000bf",
          "#006000bf",
          "#000060bf",
          "#606000bf",
          "#600060bf",
          "#006060bf",
          "#606060bf",
          "#A00000bf",
          "#00A000bf",
          "#0000A0bf",
          "#A0A000bf",
          "#A000A0bf",
          "#00A0A0bf",
          "#A0A0A0bf",
          "#E00000bf",
          "#00E000bf",
          "#0000E0bf",
          "#E0E000bf",
          "#E000E0bf",
          "#00E0E0bf",
          "#E0E0E0bf",
        ],
        borderColor: [
          "#FF0000bf",
          "#00FF00bf",
          "#0000FFbf",
          "#FFFF00bf",
          "#FF00FFbf",
          "#00FFFFbf",
          "#000000bf",
          "#800000bf",
          "#008000bf",
          "#000080bf",
          "#808000bf",
          "#800080bf",
          "#008080bf",
          "#808080bf",
          "#C00000bf",
          "#00C000bf",
          "#0000C0bf",
          "#C0C000bf",
          "#C000C0bf",
          "#00C0C0bf",
          "#C0C0C0bf",
          "#400000bf",
          "#004000bf",
          "#000040bf",
          "#404000bf",
          "#400040bf",
          "#004040bf",
          "#404040bf",
          "#200000bf",
          "#002000bf",
          "#000020bf",
          "#202000bf",
          "#200020bf",
          "#002020bf",
          "#202020bf",
          "#600000bf",
          "#006000bf",
          "#000060bf",
          "#606000bf",
          "#600060bf",
          "#006060bf",
          "#606060bf",
          "#A00000bf",
          "#00A000bf",
          "#0000A0bf",
          "#A0A000bf",
          "#A000A0bf",
          "#00A0A0bf",
          "#A0A0A0bf",
          "#E00000bf",
          "#00E000bf",
          "#0000E0bf",
          "#E0E000bf",
          "#E000E0bf",
          "#00E0E0bf",
          "#E0E0E0bf",
        ],
        borderWidth: 1,
      },
    ],
  });

  const onRadioChange = (e) => {
    setCurrentMonth(parseInt(e.target.value));
  };

  useEffect(() => {
    setMonthlyBudgetTotal(user.monthly_budget_total);
    var d = new Date();
    var monthResult = d.getMonth();
    setCurrentMonth(monthResult);
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      var copyDataState1 = Object.assign({}, dataSourceByCategory);
      for (let i = 0; i < categories.length; i++) {
        copyDataState1.labels[i] = categories[i].category_name;
        copyDataState1.datasets[0].data[i] = categories[i].category_totals[currentMonth];
      }
      setDataSourceByCategory(copyDataState1);

      var copyDataState2 = Object.assign({}, dataSourceByMonth);
      let arrSpendingByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let i = 0; i < categories.length; i++) {
        for (let j = 0; j < categories[i].category_totals.length; j++) {
          arrSpendingByMonth[j] += categories[i].category_totals[j];
        }
      }

      for (let i = 0; i < arrSpendingByMonth.length; i++) {
        copyDataState2.datasets[0].data[i] = arrSpendingByMonth[i];
      }
      setDataSourceByMonth(copyDataState2);
    }
  }, [currentMonth, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      createChart1();
      createChart2();
    }
  }, [dataSourceByCategory]);

  useEffect(() => {
    if (isAuthenticated) {
      createChart3();
    }
  }, [dataSourceByMonth]);

  const createChart1 = () => {
    let ctx = document.getElementById("myChart1").getContext("2d");
    let myPieChart = new Chart(ctx, {
      type: "pie",
      data: dataSourceByCategory,
      options: {
        responsive: true,
        labels: {
          fontColor: "#23272a",
          fontSize: 18,
        },
        legend: {
          display: "bottom",
          labels: {
            fontSize: 16,
          },
        },
        title: {
          display: true,
          text: "Spending by category",
          fontSize: 20,
        },
      },
    });
    Chart.defaults.global.defaultFontColor = "#23272a";
    Chart.defaults.global.defaultFontSize = 16;
  };

  const createChart2 = () => {
    let ctx = document.getElementById("myChart2").getContext("2d");
    let myBarChart = new Chart(ctx, {
      type: "bar",
      data: dataSourceByCategory,
      options: {
        responsive: true,
        labels: {
          fontColor: "#23272a",
          fontSize: 18,
        },
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Spending by category",
          fontSize: 20,
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "spending in dollars ($)",
                fontSize: 18,
              },
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  };

  const createChart3 = () => {
    let ctx = document.getElementById("myChart3").getContext("2d");

    var horizonalLinePlugin = {
      afterDraw: function (chartInstance) {
        var yScale = chartInstance.scales["y-axis-0"];
        var canvas = chartInstance.chart;
        var ctx = canvas.ctx;
        var index;
        var line;
        var style;
        var yValue;

        if (chartInstance.options.horizontalLine) {
          for (index = 0; index < chartInstance.options.horizontalLine.length; index++) {
            line = chartInstance.options.horizontalLine[index];

            if (!line.style) {
              style = "rgba(169,169,169, .6)";
            } else {
              style = line.style;
            }

            if (line.y) {
              yValue = yScale.getPixelForValue(line.y);
            } else {
              yValue = 0;
            }

            ctx.lineWidth = 3;

            if (yValue) {
              ctx.beginPath();
              ctx.moveTo(0, yValue);
              ctx.lineTo(canvas.width, yValue);
              ctx.strokeStyle = style;
              ctx.stroke();
            }

            if (line.text) {
              ctx.fillStyle = style;
              ctx.fillText(line.text, 0, yValue + ctx.lineWidth - 10);
            }
          }
          return;
        }
      },
    };
    Chart.pluginService.register(horizonalLinePlugin);

    let myYearlyBarChart = new Chart(ctx, {
      type: "bar",
      data: dataSourceByMonth,
      options: {
        responsive: true,
        labels: {
          fontColor: "#23272a",
          fontSize: 18,
        },
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Spending by month",
          fontSize: 20,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                suggestedMax: monthlyBudgetTotal + 100,
              },
            },
          ],
        },
        horizontalLine: [
          {
            y: monthlyBudgetTotal,
            style: "rgba(255, 0, 0, .4)",
            text: "budget",
          },
        ],
      },
    });
  };

  const authOpen = () => {
    return (
      <div className="Dashboard">
        <div class="canvasContainer-wrapper">
          <div class="canvasContainer">
            <p>
              <canvas id="myChart3"></canvas>
            </p>
          </div>
        </div>
        <div class="canvasContainer-wrapper">
          <Form>
            <div className="monthSelection">
              <Form.Check checked={currentMonth === 0} value="0" onChange={onRadioChange} inline label="Jan" type={"radio"} className="inlineRadio" id="inline-radio-0" />
              <Form.Check checked={currentMonth === 1} value="1" onChange={onRadioChange} inline label="Feb" type={"radio"} className="inlineRadio" id="inline-radio-1" />
              <Form.Check checked={currentMonth === 2} value="2" onChange={onRadioChange} inline label="Mar" type={"radio"} className="inlineRadio" id="inline-radio-2" />
              <Form.Check checked={currentMonth === 3} value="3" onChange={onRadioChange} inline label="Apr" type={"radio"} className="inlineRadio" id="inline-radio-3" />
              <Form.Check checked={currentMonth === 4} value="4" onChange={onRadioChange} inline label="May" type={"radio"} className="inlineRadio" id="inline-radio-4" />
              <Form.Check checked={currentMonth === 5} value="5" onChange={onRadioChange} inline label="Jun" type={"radio"} className="inlineRadio" id="inline-radio-5" />
              <Form.Check checked={currentMonth === 6} value="6" onChange={onRadioChange} inline label="Jul" type={"radio"} className="inlineRadio" id="inline-radio-6" />
              <Form.Check checked={currentMonth === 7} value="7" onChange={onRadioChange} inline label="Aug" type={"radio"} className="inlineRadio" id="inline-radio-7" />
              <Form.Check checked={currentMonth === 8} value="8" onChange={onRadioChange} inline label="Sep" type={"radio"} className="inlineRadio" id="inline-radio-8" />
              <Form.Check checked={currentMonth === 9} value="9" onChange={onRadioChange} inline label="Oct" type={"radio"} className="inlineRadio" id="inline-radio-9" />
              <Form.Check checked={currentMonth === 10} value="10" onChange={onRadioChange} inline label="Nov" type={"radio"} className="inlineRadio" id="inline-radio-10" />
              <Form.Check checked={currentMonth === 11} value="11" onChange={onRadioChange} inline label="Dec" type={"radio"} className="inlineRadio" id="inline-radio-11" />
            </div>
          </Form>
          <div class="canvasContainer">
            <p>
              <canvas id="myChart1"></canvas>
            </p>
          </div>
        </div>
        <div class="canvasContainer-wrapper">
          <Form>
            <div className="monthSelection">
              <Form.Check checked={currentMonth === 0} value="0" onChange={onRadioChange} inline label="Jan" type={"radio"} className="inlineRadio" id="inline-radio-0" />
              <Form.Check checked={currentMonth === 1} value="1" onChange={onRadioChange} inline label="Feb" type={"radio"} className="inlineRadio" id="inline-radio-1" />
              <Form.Check checked={currentMonth === 2} value="2" onChange={onRadioChange} inline label="Mar" type={"radio"} className="inlineRadio" id="inline-radio-2" />
              <Form.Check checked={currentMonth === 3} value="3" onChange={onRadioChange} inline label="Apr" type={"radio"} className="inlineRadio" id="inline-radio-3" />
              <Form.Check checked={currentMonth === 4} value="4" onChange={onRadioChange} inline label="May" type={"radio"} className="inlineRadio" id="inline-radio-4" />
              <Form.Check checked={currentMonth === 5} value="5" onChange={onRadioChange} inline label="Jun" type={"radio"} className="inlineRadio" id="inline-radio-5" />
              <Form.Check checked={currentMonth === 6} value="6" onChange={onRadioChange} inline label="Jul" type={"radio"} className="inlineRadio" id="inline-radio-6" />
              <Form.Check checked={currentMonth === 7} value="7" onChange={onRadioChange} inline label="Aug" type={"radio"} className="inlineRadio" id="inline-radio-7" />
              <Form.Check checked={currentMonth === 8} value="8" onChange={onRadioChange} inline label="Sep" type={"radio"} className="inlineRadio" id="inline-radio-8" />
              <Form.Check checked={currentMonth === 9} value="9" onChange={onRadioChange} inline label="Oct" type={"radio"} className="inlineRadio" id="inline-radio-9" />
              <Form.Check checked={currentMonth === 10} value="10" onChange={onRadioChange} inline label="Nov" type={"radio"} className="inlineRadio" id="inline-radio-10" />
              <Form.Check checked={currentMonth === 11} value="11" onChange={onRadioChange} inline label="Dec" type={"radio"} className="inlineRadio" id="inline-radio-11" />
            </div>
          </Form>
          <div class="canvasContainer">
            <p>
              <canvas id="myChart2"></canvas>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const notAuthOpen = () => {
    return <div className="notLoggedInMessage">Must be logged in to view your dashboard.</div>;
  };

  return (
    <>
      {isAuthenticated && authOpen()}
      {!isAuthenticated && notAuthOpen()}
    </>
  );
};

export default ConfigureUser;
