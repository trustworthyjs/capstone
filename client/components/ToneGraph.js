import React from 'react'
import { Line } from '@nivo/line'
import {connect} from 'react-redux'

let info = [
  {
    "id": "whisky",
    "color": "hsl(5, 70%, 50%)",
    "data": [
      {
        "color": "hsl(118, 70%, 50%)",
        "x": "GG",
        "y": 57
      },
      {
        "color": "hsl(157, 70%, 50%)",
        "x": "NU",
        "y": 12
      },
      {
        "color": "hsl(108, 70%, 50%)",
        "x": "LY",
        "y": 21
      },
      {
        "color": "hsl(261, 70%, 50%)",
        "x": "LR",
        "y": 44
      },
      {
        "color": "hsl(298, 70%, 50%)",
        "x": "AR",
        "y": 22
      },
      {
        "color": "hsl(164, 70%, 50%)",
        "x": "ST",
        "y": 35
      },
      {
        "color": "hsl(340, 70%, 50%)",
        "x": "MK",
        "y": 37
      },
      {
        "color": "hsl(350, 70%, 50%)",
        "x": "ES",
        "y": 19
      },
      {
        "color": "hsl(45, 70%, 50%)",
        "x": "SH",
        "y": 43
      }
    ]
  },
  {
    "id": "rhum",
    "color": "hsl(346, 70%, 50%)",
    "data": [
      {
        "color": "hsl(261, 70%, 50%)",
        "x": "GG",
        "y": 57
      },
      {
        "color": "hsl(204, 70%, 50%)",
        "x": "NU",
        "y": 55
      },
      {
        "color": "hsl(286, 70%, 50%)",
        "x": "LY",
        "y": 40
      },
      {
        "color": "hsl(124, 70%, 50%)",
        "x": "LR",
        "y": 29
      },
      {
        "color": "hsl(65, 70%, 50%)",
        "x": "AR",
        "y": 2
      },
      {
        "color": "hsl(338, 70%, 50%)",
        "x": "ST",
        "y": 47
      },
      {
        "color": "hsl(156, 70%, 50%)",
        "x": "MK",
        "y": 30
      },
      {
        "color": "hsl(206, 70%, 50%)",
        "x": "ES",
        "y": 57
      },
      {
        "color": "hsl(86, 70%, 50%)",
        "x": "SH",
        "y": 42
      }
    ]
  },
  {
    "id": "gin",
    "color": "hsl(166, 70%, 50%)",
    "data": [
      {
        "color": "hsl(221, 70%, 50%)",
        "x": "GG",
        "y": 16
      },
      {
        "color": "hsl(200, 70%, 50%)",
        "x": "NU",
        "y": 34
      },
      {
        "color": "hsl(164, 70%, 50%)",
        "x": "LY",
        "y": 24
      },
      {
        "color": "hsl(345, 70%, 50%)",
        "x": "LR",
        "y": 52
      },
      {
        "color": "hsl(325, 70%, 50%)",
        "x": "AR",
        "y": 10
      },
      {
        "color": "hsl(132, 70%, 50%)",
        "x": "ST",
        "y": 55
      },
      {
        "color": "hsl(134, 70%, 50%)",
        "x": "MK",
        "y": 57
      },
      {
        "color": "hsl(92, 70%, 50%)",
        "x": "ES",
        "y": 35
      },
      {
        "color": "hsl(173, 70%, 50%)",
        "x": "SH",
        "y": 48
      }
    ]
  },
]

class ToneGraph extends React.Component {
  constructor(){
    super()
  }
  componentDidMount(){
    console.log('nivo?', Line)
  }
  render () {
    return (
      <div className="container">
        <h1>This is a graph of your tones over time</h1>
        <Line
          data={info}
          width={800}
          height={500}
          margin={{
              "top": 35,
              "right": 110,
              "bottom": 50,
              "left": 60
          }}
          minY="auto"
          axisBottom={{
              "orient": "bottom",
              "tickSize": 5,
              "tickPadding": 5,
              "tickRotation": 0,
              "legend": "country code",
              "legendOffset": 36,
              "legendPosition": "center"
          }}
          axisLeft={{
              "orient": "left",
              "tickSize": 5,
              "tickPadding": 5,
              "tickRotation": 0,
              "legend": "count",
              "legendOffset": -40,
              "legendPosition": "center"
          }}
          lineWidth={4}
          dotSize={10}
          dotColor="inherit:darker(0.3)"
          dotBorderWidth={2}
          dotBorderColor="#ffffff"
          enableDotLabel={true}
          dotLabel="y"
          dotLabelYOffset={-12}
          enableArea={true}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          legends={[
              {
                  "anchor": "bottom-right",
                  "direction": "column",
                  "translateX": 100,
                  "itemWidth": 80,
                  "itemHeight": 20,
                  "symbolSize": 12,
                  "symbolShape": "circle"
              }
          ]}
        />
      </div>
    )
  }
}

export default connect(null)(ToneGraph)
