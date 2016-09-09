import React from 'react';
import ReactDOM from 'react-dom';
import MarketContainer from './components/Market';

export default class MarketComponents {
    constructor(options = {}) {
        this.parentDom = options.parentDom;
        this.settings = options.options;
    }

    init() {
        this.pageElem = (<MarketContainer {...this.settings} />);
        this.MarketContainer = ReactDOM.render(this.pageElem, this.parentDom);
        return this;
    }
}

// export
window.MarketComponents = MarketComponents;

