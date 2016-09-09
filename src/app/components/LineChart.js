import React, {Component} from 'react';
import './lineChat.scss';

export default class LineChart extends Component {
    state = {
        dataPoints: '0,50 200,0'
    };

    componentDidMount() {
        this.handleLineData(this.props.klineData);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state === nextState) {
            return false;
        }
        return true;
    }

    handleLineData(dataArray) {
        const minValue = Math.min.apply(null, dataArray);
        const maxValue = Math.max.apply(null, dataArray);
        const finalDots = this.cookCharts(dataArray, minValue, maxValue);
        this.setState({
            dataPoints: finalDots
        });
    }

    cookCharts(dataArray, minValue, maxValue) {
        const chartWidth = 80;
        const chartHeight = 34;
        const valueDelta = maxValue - minValue;
        const dotArray = dataArray.map((value, index) => {
            if (valueDelta === 0) {
                return 0 + ',' + 0;
            }
            const y = (maxValue - value) / valueDelta * chartHeight;
            const x = index / (dataArray.length) * chartWidth;
            return x + ',' + y;
        });
        return dotArray.join(' ');
    }

    render() {
        const state = this.state;
        return (
            <svg>
                <polyline
                    className="path"
                    fill="none"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    strokeLinecap="round"
                    points={state.dataPoints}/>
            </svg>
        );
    }
}
